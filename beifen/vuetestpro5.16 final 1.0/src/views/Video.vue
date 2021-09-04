<template>
  <div>
 <!-- 	<b-form-file v-model="file" :state="Boolean(file)" placeholder="选择文件"></b-form-file> -->
  	
  	<b-button variant="outline-success" @click="getvideoNum">刷新</b-button>
  	<p>
  	<input ref="input_video" type="text" placeholder="请输入" />
  </p>

  	<b-button variant="warning" @click="test">video</b-button>
  	<b-row>
      <b-col>
        <b-tabs>
          <b-tab title="视频预览" active>
            <br>
            <video id="player" controls></video>
          </b-tab>

          <b-button variant="outline-success" @click="buyvideo">我想购买此版权</b-button>
          
          </b-tab>
        </b-tabs>
      </b-col>
      <b-col>
        <b-form-group
                label="标题"
                label-for="title" >
                <b-form-input id="title" v-model="title" disabled></b-form-input>
          
        </b-form-group>
        <b-form-group
                label="视频简介"
                label-for="info">
          <b-form-textarea id="info"
                           v-model="info"
                           placeholder="简介"
                           :rows="1"
                           :max-rows="2" disabled>
          </b-form-textarea>
        </b-form-group>
        
         <b-form-group
                    label="作者"
                    label-for="author">
              <b-form-input id="author" v-model="author" disabled></b-form-input>
         </b-form-group>

         <b-form-group
                    label="时间"
                    label-for="time">
              <b-form-input id="time" v-model="time" disabled></b-form-input>
         </b-form-group>
          

        
            <b-form-group
                    label="评论"
                    label-for="comment">
              <b-form-input id="comment" v-model="comment"></b-form-input>
          </b-form-group>
      </b-col>
         
                 
        </b-row>
      </b-col>
    </b-row>
  
  	
  </div>
</template>

<script type="text/javascript">

var finalvedionum;


  export default {
    name: "Video",
    data () {
      return {
      	userAccount:{
          address:null,
          nickname:'',
      	},
      	whichvideo:0,
      	title:'',
      	info:'',
      	author:'',
        time:'',
      	comment:'',
      	filename:'',
      	numvediofromblockchain:0,
        
        file:null,
      }
    },
  	methods: {

    buytxt()
      {
        let web3js;
        web3js = new Web3(web3.currentProvider);

        var w = this.$refs.input_video.value;

      //  this.userAccount.address = this.$store.state.userAccount;

     //   var ethmoney = web3js.eth.getBalance(this.userAccount.address);
      
    //    console.log(ethmoney.toString(10));

        const videoShare = this.$store.state.videoShare;
        this.userAccount.address = this.$store.state.userAccount;



        videoShare.methods.getVideoFee(w).call().then((res)=>{

          var fee= parseInt(res._hex,16);
          console.log(fee);
          var fee2 = web3js.toWei(fee,'ether');


        videoShare.methods.buyVideoRight(w)
        .send({from: this.userAccount.address , value: fee2})
        .then(console.log);

        }); 




       // var fee
      },

  	getvideoNum()
      {
        
   //     videoShare.methods.getAllNum().call().then(console.log);
         this.$store.state.videoShare.methods.getAllNum().call().then((res)=>{

          this.numvediofromblockchain = res.Num3._hex;
           
        });

          finalvedionum = parseInt(this.numvediofromblockchain,16);
          console.log("videonum:"+finalvedionum);

      //    

      },
      test()
      {

      	this.whichvideo = this.$refs.input_txt.value;

      	const self_ = this;

      	self_.userAccount.address = this.$store.state.userAccount;
        const videoShare = this.$store.state.videoShare;

        videoShare.methods.getVideo(this.whichvideo).call().then((res)=>{
        
        this.title = res.title;
        this.info = res.info;

        this.author = res.author;
            
        });
        videoShare.methods.getVideoFile(this.whichvideo).call().then((res)=>{
        
        this.filename = res.filename;
        var txttimechuo2 = new Date(parseInt(res.time._hex)*1000).toLocaleString();

          
            this.time = txttimechuo2;
            
        });

        videoShare.methods.getUserInfo(this.author).call().then((res)=>{
        
        if(res.nickname)
        {
        	this.author = res.nickname;
        }
            
        });

      	const video=document.getElementById("player");
        video.src = self_.$store.state.gateway.replace(':hash', self_.filename);


  	  },
        
    },
}
</script>
<style scoped>
</style>