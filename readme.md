# cf-agent #
### A magent proxy server on Cloudflare Worker ###

Cloudflare Worker 代理联网

此项目基于 [magent](https://github.com/DNetL/magent#readme)

### 准备工作 ###
* 注册Worker账号，记录子域。 例如: example.workers.dev
* 在账户生成 API Token。 操作权限为[Workers Scripts:Edit]
* 获取 Account ID。
* [参考文档](https://developers.cloudflare.com/workers/quickstart/#finding-your-cloudflare-api-keys)

### 安装 ###
* ```npm i cf-agent -g```

### 使用 ###
* 设置参数：
	* ```cf-agent init```
* 导入证书：
	* 将目录下生成的```ca.crt```导入到系统受信任的根证书颁发机构或者由浏览器的证书管理器导入 
* 开启本地代理：
	* ```cf-agent proxy```

默认将绑定一个本地HTTP代理服务到本机6580端口

[提交Bugs](https://github.com/free-gx/cf-agent/issues)
