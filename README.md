# auto-deploy 自动部署

## 注：
不想写核心部分了，对 [deploy-cli-service](https://github.com/fuchengwei/deploy-cli-service) 项目的v1.3.0进行了一些改动，特注于此。如有版权问题，可随时改动。(主要项目不想使用私钥并且密码不想明文😢)

## 说明
本项目是对 [deploy-cli-service](https://github.com/fuchengwei/deploy-cli-service) 项目初始化以及部署做了一些改动，具体如下
* 移除bin目录，不打算做成shell脚本命令，我需要在部署后 [对接钉钉机器人](https://github.com/tnnevol/robot-for-ding) ，故部署方法会新增一些HOOK。
* 新增初始化生成uuid前16位字符
* 对初始化的**deploy.config.js**文件中的服务器用户名和密码加密（因为公司直接给了密码，懒得生成ssh的公私密钥），项目初始化自动生成加密密钥和加密偏移（cryptoKey， cryptoIv），这俩个值可以直接解开加密密文，所以务必不要将这个俩个字段的值上传。
* 本项目暴露了加密方法，开发者可以自行生成**cryptoKey**、**cryptoIv**（请使用16位16进制的字符），然后进行加密。解密使用**deploy.config.js**文件中暴露的**cryptoKey**、**cryptoIv**字段进行内部解密，本项目没有直接暴露解密方法，如有特殊需求，请 [查阅](https://github.com/tnnevol/auto-deploy) 代码

## api
**doInit**
项目初始化生成 *deploy.config.js*文件

**doDeploy**
部署

参数 | 参数类型 | 默认值 | 是否必填 | 必须
----- | ----- | ----- | ----- | -----
env|String|--|是| 部署环境
options|Object|```{ startTask(){}, endTask(){} }```|否| 部署时的
options.startTask|Function|--|否| 任务开始的callback <br />返回参数部署环境```[env]```
options.endTask|Function|--|否| 任务结束的callback <br />返回参数部署环境```[env]```

**doEncryption**
通过  *deploy.config.js* 配置文件中的 ```cryptoKey```、```cryptoIv```，生成需要加密的密文
