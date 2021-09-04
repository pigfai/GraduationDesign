<template>
  <b-container class="userinfo2">
    
       <!--
          用户名：<input v-model="name" placeholder="name" class="inputBox" disabled="true"></input>
          密码：
        
      


  </b-container>
</template>

<script>

import { Message } from "element-ui";

export default {
  
  data() {
    return {
      name: "",
      msg: ""
    };
  },
  
  methods: {}
};
-->

            <el-breadcrumb separator="/">
                
                <el-breadcrumb-item>修改用户</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    <div class="userContent">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="name" label="用户名称">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item prop="pw" label="修改密码" >
          <el-input v-model="form.pw"></el-input>
        </el-form-item>
        <el-form-item prop="card" label="身份证">
          <el-input v-model="form.card" placeholder="请输入身份证"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-select class="select-sex" v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="woman"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
         <el-button type="primary" @click="getUserData()">获取信息</el-button>
          <el-button type="primary" @click="updateUserData('form')">确定</el-button>
          <el-button @click="onCancle()">取消</el-button>

        </el-form-item>
      </el-form>
    </div>
  
</b-container>

</template>

<script>
  import Util from '../utils/utils';
  //import idCard from '../utils/idCard';
  import axios from 'axios'
  export default {
    
    data() {
   //   Vue.prototype.validid=idCard;

      var validateCard = (rule, value, callback) => {

        var validid = require('validid');
        if (value === '') {
          callback(new Error('请输入身份证号'));
        } else if (!Util.idCardReg.test(this.form.card)){
          callback(new Error('请输入正确的身份证号'));
        } else if(!validid.cnid(this.form.card)){
          callback(new Error('不是中国大陆身份证号'));

        } else{
          console.log(validid.cnid(this.form.card));
          callback();
        }
        }
      
        return {
        listentest:"http://127.0.0.1:3000",
        form: {
          name:'',
          pw: '',                  
          card: '',        
          sex: ''
        },
        rules: {
                    
                    pw: [
                        { required: true, message: '不修改不要填', trigger: 'blur' }
                    ],
                    card: [
                        { validator: validateCard, trigger: 'blur' }
                    ],              
                    sex: [
                        { required: true, message: '请输入性别', trigger: 'blur' }
                    ]
                }
      }
        },
        methods:{

          confirmid()
          {
          },
      
          getUserData()
          {
          const self = this;
       
               
          axios.get('/api/user/getdata',{name: this.name}).then(function(response){
          console.log(response);
          let result = response.data[0];   
          self.form.card = result.card;
          self.form.sex = result.sex;

        }).then(function(error) {
          console.log(error);
        })
         //   let data = "name=" + this.form.name + "&" + "pw=" + this.form.pw;
            
/*
          let username=this.form.name;
          this.$http.get('/api/user/getdata',{name: username}).then(function(response) {
                        console.log(response);
          let result = response.data[0];
          
          this.form.pw = result.password;
          
         
          this.form.card = result.card;
         
          this.form.sex = result.sex;
         
          
        }).then(function(error) {
          console.log(error);
        })
            
        */

          },
            
        updateUserData(formName) {
          const self = this;
          let formData = {

          pw: self.form.pw,  
          card: self.form.card,  
          sex: self.form.sex
         };
            
        
        axios.post('/api/user/updateUser',formData).then(function(response) {
              console.log(response);                    
              
            }).then(function(error) {
              console.log(error);
            })
                    
       
        },
            
       

          onCancle() {
             this.$router.push('/');
          }         
    },
    //初始化
    created() {
      
      this.form.name = window.sessionStorage.getItem("user");
      console.log(this.form.name);
/*
      this.$http({
                //this指向vue实例
                url:'http://localhost:3000/getdata',
                //url请求地址
                method:'GET',
                //请求方法,这边采用GET,常用还有POST
                params:{id:1},
                
            }).then(
                (res)=>{
                    //成功回调
                    if(res.status == 200){
                        this.form = res.body[0]
                    }
                }
                ,(err)=>{
                    //失败回调
                    console.log(err)
                }
            )


*/
    }

  }
</script>

<style>
  .userContent {
    width: 400px;
    margin: 0 auto;
  }
  .select-sex {
    width: 320px;
  }
</style>