const readline = require('readline');
const fs = require('fs');
const https = require('https');
const blob = require('./worker.js');
const magent = require('magent');

const proxy = async(cpath)=>magent.proxy(cpath,true);
const init = async(cpath, apath, spath, ppath)=>{
	const rl=readline.createInterface({input:process.stdin, output:process.stdout});
	const q=text=>new Promise(res=>rl.question(text,res));
	const id=await q('Account ID (*): ');
	const token=await q('API Token (*): ');
	const domain=await q('Worker domain (*): ');
	const name=await q('Script Name [random]: ')||Math.random().toString(36).slice(2);
	const t=await q('Script Token [random]: ')||Math.random().toString(36).slice(2);
	const u=`https://${name}.${domain}`;
	rl.close();
	fs.writeFileSync(ppath, JSON.stringify({id,token,name}));
	return magent.init(cpath,apath,spath, 'cfa-u','cfa-t',t,u,6580,443,65443).then(e=>({id,token,name,...e}));
}
const api = async(method,url,headers,payload)=>new Promise(resolve=>{
	https.request(url, {method,headers},res=>res.on('end',resolve).pipe(process.stdout)).end(payload);
});
const publish = async(cpath, ppath)=>{
	const {tname,uname,t}=JSON.parse(fs.readFileSync(cpath));
	const {id,token,name}=JSON.parse(fs.readFileSync(ppath));
	const worker='const obj='+JSON.stringify([tname,uname,t])+blob;
	const url='https://api.cloudflare.com/client/v4/accounts';
	await api('PUT',`${url}/${id}/workers/scripts/${name}`,{'Authorization':'Bearer '+token, 'Content-Type':'application/javascript'},worker);
	await api('POST',`${url}/${id}/workers/scripts/${name}/subdomain`,{'Authorization':'Bearer '+token, 'Content-Type':'application/json'},'{"enabled":true}');
}
module.exports={proxy,publish,init};