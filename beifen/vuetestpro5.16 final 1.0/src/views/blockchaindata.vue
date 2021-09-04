<template>
	<div class="blockchaindata">




	<b-button variant="outline-success" @click="getdata">获取文本内容</b-button>
	<b-button variant="outline-success" @click="getimg">获取图片内容</b-button>
  <b-button variant="outline-success" @click="getAllNum">刷新</b-button>
 <!-- <b-button variant="outline-success" @click="forvalue">赋值</b-button>  -->
  <b-button variant="outline-success" @click="tran">交易测试</b-button>
  <b-row>
    <b-col cols="4">
           <b-col sm="6">已上传的文字</b-col>
           <p>
          <input ref="input_txt" type="text" placeholder="请输入" />
          </p>
          
          <td id="txt1"></td> 

          <b-button variant="outline-success" @click="buytxt">我想购买此版权</b-button>
 

          

        
    </b-col>

      <b-col cols="6">
        <b-col sm="9">已上传的图片</b-col>
        <p>
            <input ref="input_img" type="text" placeholder="请输入" />
        </p>

        <td id="txt2"></td> 
        <p>
            <b-img  class="img1" :src="blockchainimg"></b-img>
        </p>

        <b-button variant="outline-success" @click="buyimg">我想购买此版权</b-button>
    </b-col>
  </b-row>



	</div>
</template>
<script type="text/javascript">

var finaltxtnum;
var finalpicnum;
var finalvedionum;

import web3 from 'web3'

//var stringtxt = new String();
//var imghash= new String();

export default {
    name: "blockchaindata",
    
    data () {
      return {
        
        whichtxt:0,
        whichimg:0,
        time:'',
        uptxtdate:'',
       
        num1:0,
        authortxt:'',
        numtxtfromblockchain:0,
        numpicfromblockchain:0,
        numvediofromblockchain:0,
        userAccount:{
          address:null,
        },
        content1:'',
        
        pic:{
        	contenthash:'',
          uptime:'',
          author:'',
        },
      }
    },

    methods: {
      init()
      {
        
      },
      forvalue()
      {
        console.log("交易开始");

        const videoShare = this.$store.state.videoShare;
        this.userAccount.address = this.$store.state.userAccount;

        videoShare.methods.setTxtFee(0,1)
        .send({ from: this.userAccount.address });
      },
      buytxt()
      {
        let web3js;
        web3js = new Web3(web3.currentProvider);

        var w = this.$refs.input_txt.value;

      //  this.userAccount.address = this.$store.state.userAccount;

     //   var ethmoney = web3js.eth.getBalance(this.userAccount.address);
      
    //    console.log(ethmoney.toString(10));

        const videoShare = this.$store.state.videoShare;
        this.userAccount.address = this.$store.state.userAccount;



        videoShare.methods.getTxtFee(w).call().then((res)=>{

          var fee= parseInt(res._hex,16);
          console.log(fee);
          var fee2 = web3js.toWei(fee,'ether');


        videoShare.methods.buyTxtRight(w)
        .send({from: this.userAccount.address , value: fee2})
        .then(console.log);

        }); 




       // var fee
      },

      buyimg()
      {
        let web3js;
        web3js = new Web3(web3.currentProvider);

        var w = this.$refs.input_img.value;

      //  this.userAccount.address = this.$store.state.userAccount;

     //   var ethmoney = web3js.eth.getBalance(this.userAccount.address);
      
    //    console.log(ethmoney.toString(10));

        const videoShare = this.$store.state.videoShare;
        this.userAccount.address = this.$store.state.userAccount;



        videoShare.methods.getImgFee(w).call().then((res)=>{

          var fee= parseInt(res._hex,16);
          console.log(fee);
          var fee2 = web3js.toWei(fee,'ether');


        videoShare.methods.buyImgRight(w)
        .send({from: this.userAccount.address , value: fee2})
        .then(console.log);

        }); 




       // var fee
      },

      getAllNum()
      {
        
   //     videoShare.methods.getAllNum().call().then(console.log);
         this.$store.state.videoShare.methods.getAllNum().call().then((res)=>{

         this.numtxtfromblockchain = res.Num1._hex;
          this.numpicfromblockchain = res.Num2._hex;
          this.numvediofromblockchain = res.Num3._hex;
           
        });

          
          finaltxtnum = parseInt(this.numtxtfromblockchain,16);
          finalpicnum = parseInt(this.numpicfromblockchain,16);
          finalvedionum = parseInt(this.numvediofromblockchain,16);
          
          console.log(finaltxtnum);
          console.log(finalpicnum);
          console.log(finalvedionum);

      //    

      },

      getdata(){

      	const videoShare = this.$store.state.videoShare;
      	
     // 	console.log(this.txt.content);
    // videoShare.methods.getTxt(this.num1).call().then(console.log);
        var author= new String();
        var stringtxt=new Array(finaltxtnum);

        this.whichtxt = this.$refs.input_txt.value;

     //   videoShare.methods.getTxt(0).call().then(console.log);

        videoShare.methods.getTxt(this.whichtxt).call().then((res)=>{


          console.log(res.time._hex);

          var txttimechuo = new Date(parseInt(res.time._hex)*1000).toLocaleString();

          
            this.uptxtdate = txttimechuo;
            this.time = res.time._hex;
            this.authortxt = res.name;
            this.content1=res.content;
        })
        
const showtxt = "作者："+ this.authortxt + "\n" + "时间：" + this.uptxtdate +"\n"+"内容：" + this.content1;

        document.getElementById("txt1").innerHTML=showtxt;
        // new String();

        for( var j=0;j<finaltxtnum;j++)
        {

      	videoShare.methods.getTxt(j).call().then((res)=>{

      	  stringtxt[j] = res.content;
         // this.txts.content[j] = res.content;
          author[j] = res.name;
		      console.log("文字："+stringtxt[j]);
          console.log("作者："+author[j]);
        //  console.log(this.txts.content[j]);       
        })

      	}         

      },

      getimg(){

      	this.whichimg = this.$refs.input_img.value;

        this.$store.state.videoShare.methods.getPicture(this.whichimg).call().then((res)=>{
        //  this.pic.contenthash=res;
          this.pic.contenthash = res.pic;
          var txttimechuo2 = new Date(parseInt(res.time._hex)*1000).toLocaleString();
          this.pic.uptime = txttimechuo2;

         });

        const showtxt1 = "作者："+ this.pic.author + "\n" + "时间：" + this.pic.uptime +"\n"
        document.getElementById("txt2").innerHTML=showtxt1;


/*
        for( var i=0;i<finalpicnum;i++)
        {
      	 this.$store.state.videoShare.methods.getPicture(i).call().then((res)=>{
      	//	this.pic.contenthash=res;
          imghash[i] = res;

      		console.log(imghash[i]);
      	//	alert(this.pic.contenthash);
      	})

        }*/

      },


      
  	},

  	created() {
      this.init();
    },
    computed: {
      blockchainimg() {
        return this.$store.state.gateway.replace(':hash', this.pic.contenthash)

      },
    }


	


}


</script>
