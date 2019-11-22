module.exports=`
const [tname,uname,t]=obj
const names=[tname,uname,'cf-connecting-ip','cf-ipcountry','cf-ray','cf-visitor','x-real-ip','x-forwarded-proto']
async function handleRequest(request){
	const {cf,headers,method}=request
	if(cf.tlsVersion!=='TLSv1.3') throw 'tlsv error'
	if(headers.get(tname)==t){
		const url=new URL(headers.get(uname))
		headers.set('host', url.host)
		for(let name of names) headers.delete(name)
		return fetch(new Request(url, {method, headers}))
	}else throw 'token error'
}
addEventListener('fetch', event=>event.respondWith(handleRequest(new Request(event.request))
	.catch(e=>new Response(null, {status:500}))))
`