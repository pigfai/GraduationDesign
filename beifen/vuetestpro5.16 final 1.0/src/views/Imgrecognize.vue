
<template>
  <b-container class="imgrecognize">
<h1>图片上传</h1>
    <hr>
    <b-row>
      <b-col cols="3">
        <p>
          <b-img  class="pic" :src="picsrc">图片预览</b-img>
        </p>
        <p>
          <b-button-group vertical>
            <b-form-file v-model="file" :state="Boolean(file)" placeholder="选择图片"></b-form-file>
            <b-button variant="outline-success" @click="uploadpic">上传预览图片</b-button>
            <b-button variant="warning" @click="ipfshashsame">是否重复</b-button>
            <b-button variant="outline-success" @click="savepic">上传到区块链</b-button>
            <div  class="btn btn-danger" @click="toRescue1">
      ipfs中的图片
    </div>
          </b-button-group>
        </p>

        <b-button variant="outline-success" @click="flash1">刷新</b-button>

       
      </b-col>
    </b-row>
      
    
  </b-container>
</template>

<script type="text/javascript">
var stringimg = new Array();

  export default {
    name: "imgrecognize",
    
    data () {
      return {
        num1:0,
        numtemp:0,
        flag1:false,
        userAccount:{
          address:null,
          
          pic:'',
          
        },
        file:null,
      }
    },
    methods: {
      init(){
        //获取登陆的账号地址和合约实例
        this.userAccount.address = this.$store.state.userAccount;
        const videoShare = this.$store.state.videoShare;
       // 
        //查询用户是否设置过自己的属性，如果设置过就显示出来
       
        
      },
       toRescue1() {
        window.open(this.$store.state.gateway.replace(':hash', this.userAccount.pic));
      },
      flash1()
      {
        this.$store.state.videoShare.methods.getAllNum().call().then((res)=>{
        this.numtemp = res.Num2._hex;
            
        });
        this.num1 = parseInt(this.numtemp,16);

        console.log("当前num号"+this.num1);
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
            userAccount.pic = response[0].hash;
            console.log(userAccount.pic);
            console.log(response);
          })
        }

      },

      ipfshashsame()
      {   
        if(this.num1==0)
        {
          stringimg[this.num1]=this.userAccount.pic;
          console.log(stringimg[this.num1]);
          alert("可以上传至区块链");
        }
        else
        {
          
          var i=0;
          for(;i<this.num1;i++)
          {
            if(this.userAccount.pic == stringimg[i])
            {
              alert("图片hash有重复 不可上传");
              break;
              
            }

          }
          if(i >= this.num1)
          {
            alert("图片hash没有重复 可上传");
          }
                  
        }


      

      },
      savepic(){
        
        console.log("当前num号"+this.num1);
        //获取合约实例
        const videoShare = this.$store.state.videoShare;

        const userAccount = this.$store.state.userAccount;
        //setAvatar的调用方式需要传入设置的值，还有send中传入用户自己的地址，价格是程序自己计算完成的，不需要输入。
        videoShare.methods.setPicture(this.num1,this.userAccount.pic,true,0)
                .send({ from: userAccount })
                .on("receipt", function(receipt) {
                  //返回成功上链的信息
                  alert("上链成功，区块高度："+receipt.blockNumber);
                  console.log(receipt);
                }).on("error", function(error) {
          console.log(error);
        })

        this.num1++;
      },
      
    },
    created() {
      this.init();
    },
    computed: {
      picsrc() {
        return this.$store.state.gateway.replace(':hash', this.userAccount.pic)
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







