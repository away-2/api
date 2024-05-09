# 项目的初始化
1. npm初始化
npm init -y
生成package.json文件：
 - 记录项目的依赖
2. git初始化
git init
生成.git隐藏文件夹，git的本地仓库
3. 创建readme文件

# 搭建项目
1. 安装koa框架
npm install koa

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