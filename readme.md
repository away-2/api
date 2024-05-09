# 一、项目的初始化
1. npm初始化
```npm init -y```
生成`package.json`文件：
 - 记录项目的依赖

2. git初始化
```git init```
生成`.git`隐藏文件夹，git的本地仓库

3. 创建`readme`文件

# 二、搭建项目
1. 安装koa框架
```npm install koa```

2. 编写最基本的app
创建src/main.js
```
const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
    ctx.body = 'hello world'
});

app.listen(3000, () => {
    console.log(`this is listening on port 3000`);
})
```

3. 测试
在终端，使用`node src/main.js`

# 三、项目的基本优化
1. 自动重启服务
安装nodemon工具
```npm i nodemon```
编写`package.json`脚本
```
 "scripts": {
    "dev": "nodemon ./src/main.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
执行`npm run dev`命令启动服务

2. 读取配置文件
安装`dotenv`,读取根目录中的`.env`文件，将配置写`process.env`中
```npm i dotenv```
创建`.evn`文件
```APP_PORT = 8000```
创建`src/config/config.default.js`
```
const dotenv = require('dotenv');

dotenv.config()

// console.log(process.env.APP_PORT);

module.exports = process.env

```
改写`main.js`
```
const Koa = require('koa');

const { APP_PORT } = require('./config/config.default');

const userRouter = require('./router/user')

const app = new Koa();

app.use(userRouter.routes());

app.listen(APP_PORT, () => {
    console.log(`this is listening on port ${APP_PORT}`);
})
```



