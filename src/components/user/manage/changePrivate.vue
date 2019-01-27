<template>
    <div class="changePriDiv">
        <form action=""  id="chaMyForm">
            <table width="400" border="0" align="center" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr><td colspan="2"><h2>修改个人信息</h2><br></td>
                    <tr><td width="50px">头像：</td>
                         <!--this.BASE_URL_CLIENT 表示base.vue中定义的全局变量BASE_URL_CLIENT（服务器端部分网址） -->
                        <td><img :src="this.GLOBAL.BASE_URL_CLIENT+user.headIconUrl" height="100px"/>
                            <!--@change绑定改变文件选择的事件 -->
                            <input @change="getFile($event)" type="file" multiple="multiple">
                            <br>修改预览：<img id="myImage" height="100px"/>
                        </td>
                    </tr>
                <template  v-if="user.type=='user'">
                    <tr><td height="30px">性别：</td>
                        <td><select v-model="userinformation.sex">
                                <option value="男">男</option>
                                <option value="女">女</option>
                            </select>
                        </td>
                    </tr>
                    <tr><td height="60px">爱好：</td>
                        <td>
                            <!-- textarea没有value属性，值放在标签内部  -->
                            <textarea v-model="userinformation.hobby" cols="40" rows="4">{{userinformation.hobby}}</textarea>
                        </td>
                    </tr>
                </template >
                    <tr>
                        <td></td><td><br><input type="button" @click="submitForm($event)" value="提交" id="submit"/></td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
</template>

<script type="text/javascript">
　　export default {
    name: 'changePrivate',

　　　　data () {  //组件数据
　　　　　　return {
            user:{},
            userinformation:{},
            file: ''
　　　　　　}
　　　　},
    created:function(){  //钩子函数，创建vue组件后被自动调用。发生在mounted之后
        this.getUserInformation();
    },
    methods:{
        getUserInformation:function(){  //获取用户信息
            var url ='/servlet/UserServlet?type1=changePrivate1' ;
            //利用axios发出get请求
            this.$http.get(url)  //发出请求
                .then(response =>{
                    if (response.status === 200) {//200表示请求成功，200请求成功、303重定向、400请求错误、401未授权、403禁止访问、404文件未找到、500服务器错误
                        console.log(response.data);
                        this.user=response.data[0];
                        this.userinformation=response.data[1];
                    }

                }).catch(error => {
                    console.log(error);
                });
        },
        getFile:function(event){ //换头像时被调用
            this.file = event.target.files[0];
            var objUrl = this.getObjectURL(this.file) ;
            if (objUrl) {
                document.getElementById("myImage").setAttribute("src", objUrl) ;
            }
            console.log(this.file);
        },
        submitForm:function(event){//修改用户信息
            event.preventDefault();//阻止提交
            let formData = new FormData();
            if(this.user.type=="user"){
                formData.append('sex', this.userinformation.sex);
                formData.append('hobby', this.userinformation.hobby);
            }

            formData.append('file', this.file);
            //设置要提交文件
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'//提交包含文件域时的设置
              }
            };

            this.$http.post('/servlet/UserServlet?type1=changePrivate2', formData, config).then(
                function (response) {
                    if (response.status === 200) {
                        console.log(response.data.message);
                        if(response.data!=null) {
                          console.log(response.data);
//                          document.getElementById("rightDiv").innerHTML = response.data.message;
                            alert(response.data.message);
                        }else
                            document.getElementById("rightDiv").innerHTML="修改异常！";
                    }
                }
            );
        },
        getObjectURL:function(file){
            var url = null ;
            if (window.createObjectURL!=undefined) { // basic
                url = window.createObjectURL(file) ;
            } else if (window.URL!=undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file) ;
            } else if (window.webkitURL!=undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file) ;
            }
            return url ;
        }
    }
　　}

</script>


<style type="text/css">

    .loginDiv {
       width:600px;
       margin-top:40px
    }
</style>
