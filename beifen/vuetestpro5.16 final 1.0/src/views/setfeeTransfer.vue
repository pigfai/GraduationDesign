<template>
  <div class="transfer">
    <h1>版权设置费用和交易中心</h1>
    <b-button variant="success" @click="flash2">刷新</b-button>

    <b-row class="info">
        
           <b-col sm="4">
            <b-form-group label="文字版权数目" label-for="num1" >
                <b-form-input id="num1" v-model="num1" disabled></b-form-input>

                  
            </b-form-group>

          </b-col>
       
          <b-col sm="4">
          
            <b-form-group
                label="图片版权数目"
                label-for="num2" >
                <b-form-input id="num2" v-model="num2" disabled></b-form-input>
          
            </b-form-group>
            </b-col>
         
    
               <b-col sm="4">
        <b-form-group
                label="视频版权数目"
                label-for="num3" >
                <b-form-input id="num3" v-model="num3" disabled></b-form-input>
          
        </b-form-group>
         </b-col>

         <b-col sm="4">
            <b-form-group label="文字版权编号">
                <b-form-input id="txtbanquan" v-model="txtbanquan" disabled></b-form-input> 
         </b-form-group>

          </b-col>

        <b-col sm="4">
            <b-form-group label="图片版权编号">
                <b-form-input id="imgbanquan" v-model="imgbanquan" disabled></b-form-input> 
         </b-form-group>

          </b-col>

          <b-col sm="4">
            <b-form-group label="视频版权编号">
                <b-form-input id="videobanquan" v-model="videobanquan" disabled></b-form-input> 
         </b-form-group>

          </b-col>

          <b-col sm="4">
            <b-form-group label="设置文字版权价格">
                <input ref="txtnum" type="text" placeholder="版权编号"></b-form-input>
                <input ref="txtfee" type="text" placeholder="设置版权费用"></b-form-input> 
                <b-button variant="outline-success" @click="fortxtvalue">提交</b-button>
         </b-form-group>

          </b-col>

          <b-col sm="4">
            <b-form-group label="设置图片版权价格">
                                       
                <input ref="imgnum" type="text" placeholder="版权编号"></b-form-input> 
                <input ref="imgfee" type="text" placeholder="设置版权费用"></b-form-input> 
                <b-button variant="outline-success" @click="forimgvalue">提交</b-button>
           
         </b-form-group>

          </b-col>

          <b-col sm="4">
            <b-form-group label="设置视频版权价格">
                <input ref="videonum" type="text" placeholder="版权编号"></b-form-input> 
                <input ref="videofee" type="text" placeholder="设置版权费用"></b-form-input> 
                <b-button variant="outline-success" @click="forvideovalue">提交</b-button>
         </b-form-group>

          </b-col>


      
      </b-row>
      
    
  </div>
</template>
<script>

import web3 from 'web3'

  export default {
    name: "transfer",
    data () {
      return {
        num1:0,
        num2:0,
        num3:0,
        txtbanquan:'',
        imgbanquan:'',
        videobanquan:'',

        userAccount:{
          address:null,
          
        },
        
      }
    },
    methods: {
      init() {

        this.userAccount.address = this.$store.state.userAccount;
        
      },
      fortxtvalue()
      {

        var updatetxtnum = this.$refs.txtnum.value;
        var updatetxtfee = this.$refs.txtfee.value;

        console.log(updatetxtnum);
        console.log(updatetxtfee);

        const videoShare = this.$store.state.videoShare;
        this.userAccount.address = this.$store.state.userAccount;

        videoShare.methods.setTxtFee(updatetxtnum,updatetxtfee)
        .send({ from: this.userAccount.address });
      },

      forimgvalue()
      {
        var updateimgnum = this.$refs.imgnum.value;
        var updateimgfee = this.$refs.imgfee.value;

        console.log(updateimgnum);
        console.log(updateimgfee);

        const videoShare = this.$store.state.videoShare;
        this.userAccount.address = this.$store.state.userAccount;

        videoShare.methods.setImgFee(updateimgnum,updateimgfee)
        .send({ from: this.userAccount.address });


      },
      forvideovalue()
      {

        var updatevideonum = this.$refs.videonum.value;
        var updatevideofee = this.$refs.videofee.value;

        console.log(updatevideonum);
        console.log(updatevideofee);

        const videoShare = this.$store.state.videoShare;
        this.userAccount.address = this.$store.state.userAccount;

        videoShare.methods.setVideoFee(updatevideonum,updatevideofee)
        .send({ from: this.userAccount.address });
      },


      flash2()
      {
          const videoShare = this.$store.state.videoShare; 
          var txtwhich = new Array();
          var imgwhich = new Array();
          var videowhich = new Array();

      //    videoShare.methods.getTxtOwner(this.userAccount.address)
        //  .call().then(console.log);

          videoShare.methods.getTxtOwner(this.userAccount.address)
          .call().then((res)=>{
            var abc=res.num._hex;
            this.num1=parseInt(abc,16);
            
            for(var i=0;i<this.num1;i++)
            {
              var a=parseInt(res.which[i]._hex,16);
              txtwhich.push(a);
            }
            console.log(txtwhich);
            this.txtbanquan=txtwhich.toString();
            
            });

     //     videoShare.methods.getImgOwner(this.userAccount.address).call().then(console.log);

          videoShare.methods.getImgOwner(this.userAccount.address)
          .call().then((res)=>{
            var abc1=res.num._hex;
            this.num2=parseInt(abc1,16);
            
            for(var i=0;i<this.num2;i++)
            {
              var a=parseInt(res.which[i]._hex,16);
              imgwhich.push(a);
            }
            console.log(imgwhich);
            this.imgbanquan=imgwhich.toString();
            
            });

       //   videoShare.methods.getVideoOwner(this.userAccount.address).call().then(console.log);

          videoShare.methods.getVideoOwner(this.userAccount.address)
          .call().then((res)=>{
            var abc2=res.num._hex;
            this.num3=parseInt(abc2,16);
            
            for(var i=0;i<this.num3;i++)
            {
              var a=parseInt(res.which[i]._hex,16);
              videowhich.push(a);
            }
            console.log(imgwhich);
            this.videobanquan=videowhich.toString();
            
            });
            

          

         // document.getElementById("txtbanquan").innerHTML=;

          //"success flash");

          console.log("success flash");
      },
      
      
      
      
    },
    created() {
      this.init();
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
