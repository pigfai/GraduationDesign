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
                     <button type="button" class="btn btn-danger"  id="Submitblockchain"  @click="updatetxtblockchain">上传到区块链
                     </button>


                     <p>上传文字文件：<b-form-file v-model="file" :state="Boolean(file)" placeholder="选择文件"></b-form-file></p>
                              
                   
                  
                 
             
            
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