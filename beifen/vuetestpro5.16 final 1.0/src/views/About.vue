<template>
  <div class="about">
    <h1>如何使用本项目</h1>
    <p> 安装nodejs 、 npm 和 Geth</p>
    <p> npm install ----安装依赖</p>
    <p> 安装ganache  并在windows启动</p>
    <p> 安装metamask  并在google启动</p>
    <p> 网页remix IDE 放入VideoShare.sol 编译并将ABI替换到videoShare_abi.js中 </p>
    <p> 网页remix IDE 运行智能合约 选择web3 provider 选择ganache端口，默认8545，获取合约地址 替换至config.js中的contractAddress </p>
    <p> 安装ipfs  并在命令行启动</p>
    <p> 安装Mysql  并在电脑服务内启动（根据src/service/db/db.js 和 http.js配置数据库）</p>
    <p> 安装Navicat 并在windows启动</p>
    <p> 命令行 node src/service/http.js</p>
    <p> 命令行 npm run serve </p>
    
  </div>
</template>
