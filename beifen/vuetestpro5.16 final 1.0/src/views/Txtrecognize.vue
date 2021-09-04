<!--
<template>


<div class="txtrecognize">
<div class="modal-body">
              <div class="modal-box">
                 <div class="row">
                   <div class="col-md-6">
                     <p>文字内容：<input ref="input_txt" type="text" placeholder="请输入" /></p>  
                     <button type="button" class="btn btn-danger"  id="Submitblockchain"  @click="updatetxtblockchain">上传到区块链
                     </button>


                     <p>上传文字文件：<b-form-file v-model="file" :state="Boolean(file)" placeholder="选择文件"></b-form-file></p>
                              
                   </div>
                  
                 </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger"  id="Submitipfs"  @click="updatetxt">上传到ipfs</button>
              <button type="button" class="btn btn-danger"  id="showipfs" @click="showtxt">显示文本</button>



              
            </div>
       <div class="modal-footer">     
    <div  class="btn btn-danger" @click="toRescue">
      跳转到ipfs
    </div>
  </div>

    <div class="modal-footer">     
    

  </div>

  </div>
</div>

  </template>
<script>
  export default {


  
    data () {
     
      return {
        file:null,
        txt2:{
          content1:'',
          
          contenthash:'',
          
        },
        
        
      }
    },
    methods: {
      init() {

        
       
      },
      toRescue() {
        window.location.href = this.$store.state.gateway.replace(':hash', this.txt2.contenthash);
      },
      updatetxtblockchain()
      {

        const txt2 = this.txt2;
        txt2.content1 = this.$refs.input_txt.value;
        console.log(txt2.content1);

        const videoShare = this.$store.state.videoShare;
        const userAccount = this.$store.state.userAccount
        console.log(videoShare);
        //setMyNickname的调用方式需要传入设置的值，还有send中传入用户自己的地址，价格是程序自己计算完成的，不需要输入。
        videoShare.methods.setTxt(0,this.txt2.content1,true,0)
                .send({ from: this.userAccount })
                .on("receipt", function(receipt) {
                  //返回成功上链的信息
                  alert("上链成功，区块高度："+receipt.blockNumber);
                  console.log(receipt);
                }).on("error", function(error) {
                  console.log(error);
                })
                

      },
      updatetxt(){
        /*
        const ipfsNode = this.$store.state.ipfsNode;
        
        //new一个文件对象
       
        const txt2 = this.txt2;

        txt2.content1 = this.$refs.input_txt.value;
        
          //将文件内存转成buffer对象
       //   const buffer = Buffer.from(reader.result);
          //调用ipfs的api上传文件
        //  ipfsNode.files.add(input_txt).then((response)=>{
        //    txt2.contenthash = response[0].hash;
        console.log(txt2.content1)

        const buffer = Buffer.from(txt2.content1);

        ipfsNode.files.add(buffer).then((response)=>{
            txt2.contenthash= response[0].hash;
            console.log(response);
          })

        console.log(txt2.contenthash)

        */
        const ipfsNode = this.$store.state.ipfsNode;
        //new一个文件对象
        const reader = new FileReader();
        const txt2 = this.txt2;
        reader.readAsArrayBuffer(this.file);
        reader.onloadend = function(){
          //将文件内存转成buffer对象
          const buffer1 = Buffer.from(reader.result);
          //调用ipfs的api上传文件
          ipfsNode.files.add(buffer1).then((response)=>{
            txt2.contenthash = response[0].hash;
            console.log(txt2.contenthash);
          })
        } 
       // txt2.content1=this.$store.state.gateway.replace(':hash', this.txt2.contenthash);

      },
      showtxt(){
       

        this.$dialog.alert('文本的hash值为：'+ this.txt2.contenthash).then(function(dialog) {
                  console.log('Closed');
          });

// Trigger a confirmation dialog
//          this.$dialog
  //          .confirm('Please confirm to continue')
  //          .then(function(dialog) {
   //          console.log('Clicked on proceed');
   //          })
  //        .catch(function() {
   //       console.log('Clicked on cancel');
  //       } );
        
      },
      
    },
    created() {
      this.init();
    },
    computed: {

        ipfstxtshow(){
          return this.$store.state.gateway.replace(':hash', this.txt2.contenthash)
        }

      
      },
    }
  
</script>

-->
<template>
  <b-container class="txtrecognize">
    <b-row>
      <b-col>
        <h1>文字上传</h1>
        <b-tabs>
            <p>文字内容：<input ref="input_txt" type="text" placeholder="请输入" /></p>

                    <button type="button" class="btn btn-danger"  id="a"  @click="simhash">simhash
                     </button>

                    <button type="button" class="btn btn-danger"  id="Submi"  @click="flash">刷新
                     </button>

                    <button type="button" class="btn btn-danger"  id="Submitifsame"  @click="ifsame">是否文本重复
                     </button>

                     <button type="button" class="btn btn-danger"  id="Submit2"  @click="sha256">sha256算法
                     </button>

                     <button type="button" class="btn btn-danger"  id="Submitblockchain"  @click="updatetxtblockchain">上传到区块链
                     </button>


                     <p>上传文字文件：<b-form-file v-model="file" :state="Boolean(file)" placeholder="选择文件"></b-form-file></p>
                              
                   </div>
                  
                 </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger"  id="Submitipfs"  @click="updatetxt">上传到ipfs</button>
              <button type="button" class="btn btn-danger"  id="showipfs" @click="showtxt">显示文本</button>
              
            </div>
       <div class="modal-footer">     
    <div  class="btn btn-danger" @click="toRescue">
      跳转到ipfs
    </div>
  </div>

          
            </b-tabs>
          </b-col>
    </b-row>
  </b-container>
</template>
<script type="text/javascript">




var string1 = new Array();
//var numtemp2;

  export default {
  
  name: "txtrecognize",

    data () {
      
      return {
        num:0,
        numtemp:0,
        flag:false,
        file:null,
        sha256hash:'',

        txt2:{
          content1:'',
          
          contenthash:'',
          
        },
        
        
      }
    },
    methods: {
      init() {

        
       
      },
      simhash()
      {
        var sjs = require('simhash-js');
        var simhash = new sjs.SimHash();
        var x = simhash.hash("This is a test of the Emergency Blogcast System");
        var y = simhash.hash("This is a second test of the Emergency Blogcast System");

        var s = sjs.Comparator.similarity(x, y); 
        alert("文本相似度为："+ s);
        console.log(s);

      },
      toRescue() {
        window.open(this.$store.state.gateway.replace(':hash', this.txt2.contenthash));
      },
      sha256()
      {
        const sha256 = require("js-sha256").sha256;
        this.sha256hash = sha256(this.$refs.input_txt.value);
        alert(this.sha256hash);

      },
      flash()
      {
        this.$store.state.videoShare.methods.getTxt(this.num).call().then((res)=>{
        this.numtemp = res.num._hex;
            
        });
        this.num = parseInt(this.numtemp,16);

        console.log("当前num号"+this.num);

      },

      ifsame()
      {

        
        if(this.num==0)
        {
          string1[this.num]=this.$refs.input_txt.value;
          console.log(string1[this.num]);
          alert("可以上传至区块链");
        }
        else
        {
          
          var i=0;
          for(;i<this.num;i++)
          {
            if(this.$refs.input_txt.value == string1[i])
            {
              alert("文本有重复 不可上传");
              break;
              
            }

          }
          if(i >= this.num)
          {
            alert("没有重复 可上传");
          }
                  
        }

      },


      updatetxtblockchain() {
     //   console.log(this.string1[0]);
        
        
        console.log(this.num);

     
        const txt2 = this.txt2;
        txt2.content1 = this.$refs.input_txt.value;


        console.log(txt2.content1);

        

        const videoShare = this.$store.state.videoShare;
        const userAccount = this.$store.state.userAccount;
        console.log(videoShare);
        //setMyNickname的调用方式需要传入设置的值，还有send中传入用户自己的地址，价格是程序自己计算完成的，不需要输入。
        videoShare.methods.setTxt(this.num,this.txt2.content1,true,0)
                
                .send({ from: userAccount })
                .on("receipt", function(receipt) {
                  //返回成功上链的信息
                  alert("上链成功，区块高度："+receipt.blockNumber);
                  console.log(receipt);
                }).on("error", function(error) {
                  console.log(error);
                })

        this.num++;
         
      },
      updatetxt(){
        /*
        const ipfsNode = this.$store.state.ipfsNode;
        
        //new一个文件对象
       
        const txt2 = this.txt2;

        txt2.content1 = this.$refs.input_txt.value;
        
          //将文件内存转成buffer对象
       //   const buffer = Buffer.from(reader.result);
          //调用ipfs的api上传文件
        //  ipfsNode.files.add(input_txt).then((response)=>{
        //    txt2.contenthash = response[0].hash;
        console.log(txt2.content1)

        const buffer = Buffer.from(txt2.content1);

        ipfsNode.files.add(buffer).then((response)=>{
            txt2.contenthash= response[0].hash;
            console.log(response);
          })

        console.log(txt2.contenthash)

        */
        const ipfsNode = this.$store.state.ipfsNode;
        //new一个文件对象
        const reader = new FileReader();
        const txt2 = this.txt2;
        reader.readAsArrayBuffer(this.file);
        reader.onloadend = function(){
          //将文件内存转成buffer对象
          const buffer1 = Buffer.from(reader.result);
          //调用ipfs的api上传文件
          ipfsNode.files.add(buffer1).then((response)=>{
            txt2.contenthash = response[0].hash;
            console.log(txt2.contenthash);
          })
        } 
       // txt2.content1=this.$store.state.gateway.replace(':hash', this.txt2.contenthash);

      },
      showtxt(){
       

        this.$dialog.alert('文本的hash值为：'+ this.txt2.contenthash).then(function(dialog) {
                  console.log('Closed');
          });

// Trigger a confirmation dialog
//          this.$dialog
  //          .confirm('Please confirm to continue')
  //          .then(function(dialog) {
   //          console.log('Clicked on proceed');
   //          })
  //        .catch(function() {
   //       console.log('Clicked on cancel');
  //       } );
        
      },
      
    },
    created() {
      this.init();
    },
    computed: {

        ipfstxtshow(){
          return this.$store.state.gateway.replace(':hash', this.txt2.contenthash)
        }

      
      },
    }
  
</script>