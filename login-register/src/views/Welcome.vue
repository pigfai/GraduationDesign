<template>
  <div class="welcome">
  <b-container>
    <h1>数字版权管理系统 welcome! <b-col sm="10">{{ userAccount.nickname }}</b-col></h1>

    <hr>
    <b-row>
     
      <b-col cols="9">
        <b-row class="info">
          <b-col sm="2">账户</b-col>
          <b-col sm="10">{{ userAccount.address }}  </b-col>
          

          </b-row>
          
        
      </b-col>  
    </b-row>
  </b-container>
</div>
</template>

<script>
  export default {
    name: "Welcome",
    data () {
      return {
        userAccount:{
          address:null,
          
          
          
        },
        file:null,
      }
    },
    methods: {
      init() {
        //获取登陆的账号地址和合约实例
        this.userAccount.address = this.$store.state.userAccount;
     //   const videoShare = this.$store.state.videoShare;
        //查询用户是否设置过自己的属性，如果设置过就显示出来
    //    this.userAccount.balance=videoShare.methods.getBalance(this.$store.state.userAccount);
     //   videoShare.methods.getUserInfo(this.$store.state.userAccount).call().then((res)=>{
      //    if(res.avatar!=="")this.userAccount.avatar = res.avatar;
      //    if(res.nickname!=="")this.userAccount.nickname = res.nickname;
      //    if(res.profile!=="")this.userAccount.profile = res.profile;
      //  }
       // );
        
          
    
      },

     
      
    

    },
    created() {
      this.init();
    },
    computed: {
      
      },
     
    }
  
</script>

<style scoped>
  .avatar{
    width: 100%;
  }
  .info {
    padding: 5px;
  }
</style>
    
  
