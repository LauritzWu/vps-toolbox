import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {scripts} from '../data.mjs';
export function classifyLink(status,error){if(error)return 'unverified';if(status>=200&&status<300)return 'ok';if(status===404||status===410)return 'broken';return 'unverified'}
export function compareVersion(pinned,latest){return !latest?'unverified':!pinned?'observed':pinned===latest?'current':'review'}
export async function inspect(fetcher=fetch){
 const snapshot=JSON.parse(fs.readFileSync(new URL('../upstream-snapshot.json',import.meta.url),'utf8'));
 const headers={'User-Agent':'VPS-Toolbox-maintenance','Accept':'application/vnd.github+json'};
 const cache=new Map();const links=[];const versions=[];
 const request=async(url,api=false)=>{const h={...headers};if(api&&process.env.GITHUB_TOKEN)h.Authorization='Bearer '+process.env.GITHUB_TOKEN;try{const r=await fetcher(url,{headers:h,signal:AbortSignal.timeout(15000),redirect:'follow'});return {status:r.status,json:api&&r.ok?await r.json():null}}catch{return {error:'network_or_timeout'}}};
 const app=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
 const urls=[...new Set([...scripts.flatMap(s=>[s.source,s.codeUrl,s.docsUrl].filter(Boolean)),...scripts.flatMap(s=>[...(s.command||'').matchAll(/https:\/\/[^\s]+/g)].map(m=>m[0])),...[...app.matchAll(/link\('(https:[^']+)'/g)].map(m=>m[1])])];
 await Promise.all(urls.map(async url=>{const r=await request(url);links.push({url,status:r.status||null,state:classifyLink(r.status,r.error),error:r.error||null})}));
 for(const [id,m] of Object.entries(snapshot.records)){if(!m.repo)continue;const key=m.repo+'/'+m.branch;if(!cache.has(key))cache.set(key,await request('https://api.github.com/repos/'+m.repo+'/commits/'+m.branch,true));const r=cache.get(key);const sha=r.json?.sha||null;versions.push({id,repo:m.repo,pinned:m.pinned,recorded:m.upstream?.sha||null,latest:sha,state:compareVersion(m.pinned,sha),snapshotChanged:!!sha&&sha!==m.upstream?.sha,error:r.error||(r.status!==200?'HTTP '+r.status:null)})}
 return {checkedAt:new Date().toISOString(),links:links.sort((a,b)=>a.url.localeCompare(b.url)),versions};
}
export function summarize(report){return ['# VPS Toolbox 上游巡检','',`检查时间：${report.checkedAt}。仅检查链接和提交，不执行第三方代码、不更新站点快照。`,'','## 链接','',...report.links.map(x=>`- ${x.state}: ${x.url} (${x.status||x.error})`),'','## 版本','',...report.versions.map(x=>`- ${x.id}: ${x.latest||'未核实'} / ${x.state}${x.snapshotChanged?' / 快照有变化，需人工复核':''}`),'','403、429、5xx 和网络错误标为未核实，不当作链接失效。本站脚本仓库提交变化也可能只是文档变化。更新需人工核对变更、许可、数据行为与兼容性，再修改 upstream-snapshot.json。'].join('\n')}
if(process.argv[1]&&fileURLToPath(import.meta.url)===fs.realpathSync(process.argv[1])){const r=await inspect();fs.mkdirSync('maintenance-results',{recursive:true});fs.writeFileSync('maintenance-results/report.json',JSON.stringify(r,null,2));const md=summarize(r);fs.writeFileSync('maintenance-results/report.md',md);if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,md);console.log(JSON.stringify({links:r.links.length,broken:r.links.filter(x=>x.state==='broken').length,unverified:r.links.filter(x=>x.state==='unverified').length,changed:r.versions.filter(x=>x.snapshotChanged).length}));if(r.links.some(x=>x.state!=='ok')||r.versions.some(x=>x.state==='review'||x.state==='unverified'||x.snapshotChanged))process.exitCode=1;}
