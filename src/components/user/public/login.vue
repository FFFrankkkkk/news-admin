<template>
	<div id="login">
		<form id="myform">
			<div class="center loginDiv">
				<table  height="121" border="0" align="center">
					<tbody>
						<tr height="30">
							<td></td><td>登录</td>
						</tr>
						<tr height="30">
							<td align="right">用户名：</td>
                            <!-- v-model表示绑定表单元素和本组件的数据login.name，   -->
							<td align="left"><input type="text" v-model="login.name"></td>
						</tr>
						<tr height="30">
							<td align="right">密码：</td>
                            <!-- v-model表示绑定表单元素和本组件的数据login.password，   -->
							<td align="left"><input type="password" v-model="login.password"></td>
						</tr>
					    <tr>
					      <td align="right">图形验证码：</td>
					      <td valign="middle">
                                <!-- v-model表示绑定表单元素和本组件的数据login.checkCode   -->
                                <input type="text" v-model="login.checkCode" required="required">
                                <!-- this.GLOBAL.BASE_URL 表示base.vue中定义的全局变量GLOBAL.BASE_URL（服务器端部分网址）   -->
					      		<img id="checkImg"   :src="this.GLOBAL.BASE_URL+'/servlet/ImageCheckCodeServlet?rand=-1'" class="hand" /></td>
					    </tr>
						<tr height="30">
                            <!-- v-on:click绑定鼠标点击事件   -->
							<td></td><td><input v-on:click="submitForm" type="button"  value="    登  录    "/>
							&nbsp; &nbsp; &nbsp; &nbsp; <a href="findPassword.jsp">找回密码</a></td>
						</tr>
					</tbody>
				</table>
			</div>
		</form>
	</div>
</template>

<script type="text/javascript">
    //qs是一个npm仓库所管理的包，安装方式：npm install qs命令进行安装，
    //引入qs工具，进行提交数据的格式转换
    import Qs from 'qs';

    export default {
        name: 'login',

    　　　　data () {  //组件数据
    　　　　　　return {
                login:{//表单数据整合成一个对象login
                    name: '',
                    password: '',
                    checkCode: ''
                }
    　　　　　　}
    　　　　},
        methods:{
            submitForm:function(){
                console.log(this.login);
                //qs.stringify()将对象 序列化成查询字符串，如：'name=hehe&age=10'
                var data = Qs.stringify(this.login);
                console.log(data)

                var url ='/servlet/UserServlet?type1=login'
                //利用axios发出ajax的post请求
                this.$http.post(url,data,
                     {headers:{'Content-Type':'application/x-www-form-urlencoded'}})  //设置提交Content-Type类型，无文件域的一般表单，可以设置为'application/x-www-form-urlencoded'
                    .then(response =>{
                        // 响应成功回调
                        if(response.data.result==1){
                            //成功登陆后，1.更新headPage.vue组件中关于用户的信息；2、显示home.vue组件
                            console.log(response.data);
                            console.log( "aaaaaa"+this.$store.getters.getLoginFresh);
                            //修改store中的loginFresh为true，使得headPage刷新用户数据
                            this.$store.dispatch('needLoginFresh');
                            console.log( "bbbbbb"+this.$store.getters.getLoginFresh);
                            //使得App.vue中的<router-view/>显示home.vue组件
                            this.$router.push({path:'/'});
                        }
                        else//登录失败
                          console.log(response);
                        alert(response.data);
                    }).catch(error => {
                        console.log(error);
                    }
                );
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
