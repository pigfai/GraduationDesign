<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/">
          <img src="./assets/logo.png" alt="MediaShare" height="24">
        </b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item to="/blockchaindata">区块上的文字和图片</b-nav-item>
          
<div class="top-box">
          <div class="tag" v-show="!islogin">
            <router-link :to="{name : 'login'}"> <el-button class="button"  type="primary">登录/注册</el-button>
            </router-link>
          </div>
          <div class="tag" v-show="islogin">{{name}}</div>
            <div class="tag" v-show="islogin">
            <el-button class="button" type="primary" @click="exit">退出登录</el-button>
            </div>
          </div>

          </b-navbar-nav>


          <b-navbar-nav class="ml-auto">
         <!--   <b-nav-item-dropdown text="DB:" right>
              <b-dropdown-item href="#">TEST1</b-dropdown-item>
              <b-dropdown-item href="#">TEST2</b-dropdown-item>
              <b-dropdown-item href="#">TEST3</b-dropdown-item>  -->
            </b-nav-item-dropdown>
            <b-nav-item to="/about">About</b-nav-item>

           <!-- <button @click="jump"> 登录 </button> -->
          

            <b-nav-item-dropdown :text="userAccount.nickname" right>
              <b-dropdown-item to="/userinfo2">普通用户设置</b-dropdown-item>
              <b-dropdown-item to="/userinfo">区块链用户设置</b-dropdown-item>
              <b-dropdown-item to="/upload">视频上传</b-dropdown-item>
              <b-dropdown-item to="/txtrecognize">文字上传</b-dropdown-item> 
               <b-dropdown-item to="/imgrecognize">图片上传</b-dropdown-item> 
               <b-dropdown-item to="/transfer">设置版权和交易</b-dropdown-item> 

            </b-nav-item-dropdown>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>
<script>
  import Axios from 'axios'
  import Web3 from 'web3'
  import {addressab} from "./utils/assist";
  export default {
    data () {
      return {
        name: "",
        islogin: false,
        userAccount:{
          address:null,
          nickname:'未登录',
          avatar: 'QmbApgSEbuX3dQGXornrDNhASxBWEFPgYxGYKzvNxKMhcY'
        }
      }
    },
    methods: {
      
    enter() {
      let that = this;
      if (
        window.sessionStorage.getItem("done") != undefined &&
        window.sessionStorage.getItem("done") == "login"
      ) {
        that.islogin = true;
        that.name = window.sessionStorage.getItem("user");
      }
      else if( window.sessionStorage.getItem("done") == "register"){
        console.log("注册成功！")
      }
      else
        that.islogin = false;
    },
    exit() {
      this.name="";
      window.sessionStorage.removeItem("done");
      window.sessionStorage.removeItem("user");
      this.$router.push("/login");
    },

      init() {

    //    const url1="http://127.0.0.1:3000";
     //   if (this.$store.state.listengate === '') this.$store.commit('setListenGate', url1);
     //   console.log(this.$store.state.listengate);

        //先get一下我下载下来的公共网关列表
        Axios.get('./gateways.json').then((res) => {
          
          let gateways = res.data;
          const host1 = window.location.host;
          const host2 = document.domain;
          //添加3个本地网关
          gateways = [
            "http://127.0.0.1:8081/ipfs/:hash",
            "http://" + host1 + "/ipfs/:hash",
            "http://" + host2 + ":8081/ipfs/:hash"
          ].concat(gateways);
          //定义用于测试的hash和文本
          const hashToTest = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';
          const hashString = 'Hello from IPFS Gateway Checker';
          //定义在线的网关列表
          let gatewayOnline = [];
          gateways.forEach((value) => {
            //拼接hash到网关url里
            const gatewayAndHash = value.replace(':hash', hashToTest);
            Axios.get(gatewayAndHash, {timeout: 5000}).then((res) => {
              const matched = res.data.trim() === hashString.trim();
              if (matched) {
                //重新把hash替换成占位符
                const url = res.config.url.replace(hashToTest, ':hash');
                //把在线的网关添加到列表
                gatewayOnline.push(url);
                //把第一个返回的网关记录到全局变量中。
                
                if (this.$store.state.gateway === '') this.$store.commit('setGateWay', url);
              }
            }).catch((err) => {
              //捕获到异常，无需处理
            })
          });
        });

        let web3js;
        //检查是否开启的插件
        if (typeof web3 !== 'undefined') {
          //使用插件的ethAPI
          web3js = new Web3(web3.currentProvider);
        } else {
          //使用外置的ethAPI
          web3js = new Web3(new Web3.providers.HttpProvider(config["network"][0]["httpApi"]));

      //      web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
        }
        //定义合约
        const videoShare = new web3js.eth.Contract(videoShareAbi, config["network"][0]["contractAddress"]);

        
        this.$store.commit('setVideoShare', videoShare);
        //检测是否登陆
        web3js.eth.getAccounts((error, result) => {
          if (result.length > 0) {
            this.$store.commit('setUserAccount', result[0]);
            this.userAccount.address=result[0];
            //获取用户信息
            videoShare.methods.getUserInfo(this.userAccount.address).call().then((res) => {
              console.log(res);
              if(res.nickname!==""){
                this.userAccount.nickname=res.nickname;
              } else {
                this.userAccount.nickname=addressab(this.userAccount.address);
              }
            })
          }
        });
        //创建一个ipfs节点
        const ipfsNode = new window.Ipfs({
          // TODO fix issue with persistance
          repo: '/ipfs-' + Math.random(),
          config: {
            Addresses: {
              Swarm: [
                '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star/'
              ]
            }
          },
          EXPERIMENTAL: {
            pubsub: true
          }
        });
        this.$store.commit('setIpfsNode', ipfsNode);
          ipfsNode.once('ready', () => {
            console.log("ipfs node ready.");
            //每隔10秒输出一下连上的ipfs节点的数量
            setInterval(() => {
                  ipfsNode.swarm.peers((err, peerInfos) => {
                      if (err) {
                          throw err
                      }
                      if (peerInfos.length > 0) {
                        console.log(peerInfos.length+" ipfs node Connect.");
                      }
                  })
              }, 10000)
          })
      }
    },
    mounted() {
    this.enter();
    this.$router.beforeEach((to, from, next) => {
      /* 路由发生变化时相应变化 */
      if (to.meta.judge) {
        this.enter();
      }
      next();
    });
  },
    created() {
      this.init();
    }

  }
</script>
<style>

</style>
