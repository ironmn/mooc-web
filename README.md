# mooc-web

## Project setup

**分为两部分。一个是环境配置，用于配置运行整个vue框架的内容；一个是项目内容配置，用于配置前端项目的一些组件**

### 环境配置
首先得安装node.js。只要跟着官网流程走一遍（傻瓜式安装）

在CMD窗口中输入
```npm-v```或者```node-v```。只要这两个输入有结果，就表明node.js环境已经安装好了。

接着安装cnmp。在CMD中输入

```npm install cnpm -g```

-g表示全局的意思(global的缩写)。

cnpm 是npm国内的镜像代理。速度会比从github上直接下载要快很多

接着可以安装vue脚手架了。输入命令:

```cnpm install vue-cli -g```

如果不想折腾，可以安装vue可视化管理应用。

```npm install -g @vue/cli```

等待安装完。查看本地的vue环境。
以管理员模式，输入命令：

```vue list```
如果里面出现了webpack环境，说明已经配置完成了。我们的前端项目结构是基于webpack格式的。
### 项目运行配置：

这个步骤主要是用于配置运行项目所需要的插件。webpack项目一个很大的优势就在于它的可扩展性非常强。vue是专注于前端的，
而如果要与后台打交道，必须借助一些实现异步通信的组件。我们这里要用到axios组件。
在项目中输入以下命令:

```
1. npm install
2. vue add axios
3. vue add element-ui
4. npm install sass-loader@7.3.1 --save-dev
```


### Compiles and hot-reloads for development(项目部署)
```
npm run serve
```

### Compiles and minifies for production(项目发布)
这个功能不需要使用
```
npm run build
```
### Project Structure(项目结构)
```angular2html
-App----------------前端项目根目录
 |__Login-----------登录页面
 

```

### Project Log(项目日志)

<del>
选课页面中，如何标注选课的状态？（选择还是未选择）位置：AddCourse.vue
</del>
<br>
<del>
选课页面中进行按名称搜索
</del>