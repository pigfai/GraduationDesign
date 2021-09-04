
<template>
  <b-container>
    <div class="imgrecognize">



   
    <hr>
    <b-row>
      <b-col cols="3">
        <p>
          <b-img rounded="circle" class="avatar" :src="picsrc"></b-img>
        </p>
        <p>
          <b-button-group vertical>
            <b-form-file v-model="file" :state="Boolean(file)" placeholder="选择图片"></b-form-file>
            <b-button variant="warning" @click="uploadpic">上传图片</b-button>
            <b-button variant="outline-success" @click="savepic">保存</b-button>
          </b-button-group>
        </p>
       
      </b-col>
    </b-row>
      
    </div>
  </b-container>
</template>

<script>
  export default {
    name: "Imgrecognize",
    data () {
      return {
        userAccount:{
          address:null,
          
          pic: '',
          
        },
        file:null,
      }
    },
    methods: {
      init() {
        //获取登陆的账号地址和合约实例
        this.userAccount.address = this.$store.state.userAccount;
        const videoShare = this.$store.state.videoShare;
        //查询用户是否设置过自己的属性，如果设置过就显示出来
        videoShare.methods.getUserInfo(this.$store.state.userAccount).call().then((res)=>{
          if(res.avatar!=="")this.userAccount.avatar = res.avatar;
          
          
        });
      },
      
      uploadpic(){
        //获取ipfs节点
        const ipfsNode = this.$store.state.ipfsNode;
        //new一个文件对象
        const reader = new FileReader();
        const userAccount = this.userAccount;
        reader.readAsArrayBuffer(this.file);
        reader.onloadend = function(){
          //将文件内存转成buffer对象
          const buffer = Buffer.from(reader.result);
          //调用ipfs的api上传文件
          ipfsNode.files.add(buffer).then((response)=>{
            userAccount.avatar = response[0].hash;
            console.log(response);
          })
        }
      },
      savepic(){
        //获取合约实例
        const videoShare = this.$store.state.videoShare;
        //setAvatar的调用方式需要传入设置的值，还有send中传入用户自己的地址，价格是程序自己计算完成的，不需要输入。
        videoShare.methods.setMyAvatar(this.userAccount.avatar)
                .send({ from: this.userAccount.address })
                .on("receipt", function(receipt) {
                  //返回成功上链的信息
                  alert("上链成功，区块高度："+receipt.blockNumber);
                  console.log(receipt);
                }).on("error", function(error) {
          console.log(error);
        })
      },
      
    },
    created() {
      this.init();
    },
    computed: {
      picsrc() {
        return this.$store.state.gateway.replace(':hash', this.userAccount.avatar)
      },
    }
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







