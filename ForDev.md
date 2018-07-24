# Dasdaq 前端开发文档

## 关于此项目

Dasdaq 前端使用了 React.js, Redux 和 React-router

后端文档位于 https://github.com/lucky917/dasdaq_api

如果你没接触过 React，我建议先查看 React 官方的 [入门教程](https://reactjs.org/tutorial/tutorial.html)

为了优化用户体验，还用了动态加载来异步分块加载内容，详见[代码分割与异步加载](#代码分割与异步加载😯)

## 项目结构

现在规划为 三大模块

* 账户系统

  目前仅有注册、登录和账户管理操作

* 市场信息

  以指定加密货币为基准，显示目前法币的涨跌情况

* 应用商店

  类似于 DappRadar， DappReview 的 Dapp 榜单

## 目前要做的 

  *初步阶段，有待完善*

- 账户系统

  * 对接注册、退出逻辑，对接后端用户管理的 API
  * 账户绑定数字钱包的体验优化（如签名绑定）

- 市场信息

  * 获取法币与加密货币之间的行情数据

  * 行情数据可视化

- 应用商店

  * 做一个最基本的 Dapp 榜单
  * 抓取链上数据



## 目前文件夹结构📁

```
项 目 根 目 录 Root Folder
├── build # 前端构建出来的成品，无需理会
├── doc # 文档
├── public # 静态资源，包括 React 即将注入的 index.html
└── src # 前端代码
    ├── actions # 对应 Redux 的 Action
    ├── api # 通用的API接口应该存放于此
    ├── components # 存放通用组件
    │   ├── crypto
    │   └── nav
    ├── containers # Redux 与页面的连接器
    │   └── Account
    ├── locale # 国际化的翻译文件
    ├── pages # 存放业务特定的页面逻辑
    │   ├── Account # 账户系统相关的页面
    │   ├── DappStore # 应用商店相关的页面
    │   └── Market # 市场信息相关的页面
    └── reducers # 对应 Redux 的 reducer
```

## 代码分割与异步加载😯

你可能会留意到有些组件们是读取该文件夹的 `index.js` 里定义的组件

对！这些 `index.js`  使用了 `react-loadable` 库，能够同时做两件事：代码分割 (Code Splitting) 和异步加载。

怎么解释呢？我们举个例子

小明打开了 Dasdaq 首页，下载了启动React和首页必要的 js 文件。

当小明打开了账户管理模块（注册、登录、用户中心 etc.) 后，因为账户管理模块 `Account` 里面的组件使用了 `react-loadable` 做了一层包裹，所以小明的浏览器会请求后才从服务器加载相应模块。 做到了按需加载，首次加载提速。

## 一些让开发体验更好的规矩😄

* 一个文件里面的代码尽量不要超过 300 行
* 拒绝多层嵌套的回调，拒绝 Javascript 回调地狱
* 提交前检查 Dev Server 有没有 Error 和 Warning



## 有疑问？ 想添加新内容

尽管在 Slack 频道 `#dasdaq` 讨论！