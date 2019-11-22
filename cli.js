#!/usr/bin/env node
const { proxy, init, publish } = require('./index.js');
const [ cpath, apath, spath, ppath ] = ['./config.json', './ca.crt', './server.json', './pub.json'];
switch(process.argv[2]){
case 'proxy': proxy(cpath); break;
case 'publish': publish(cpath, ppath); break;
case 'init': init(cpath, apath, spath, ppath).then(console.log); break;
default: 
console.log(
`Usage: cf-agent <option>

Options:
  init 		Setup the config
  proxy 	Start the local proxy
  publish 	Publish the Worker to Cloudflare Worker
`);
}