<template>

    <div>
        <table width="500" border="0" align="center">
      <tbody>
      <tr><td colspan="2"  align="center">个人信息：</td></tr>
      <tr><td  align="right" width="100">用户类型：</td>
        <td>{{ user.type}}</td>
      </tr>
      <tr><td  align="right" >用户名：</td>
        <td>{{ user.name}}</td>
      </tr>
      <tr><td align="right">头像：</td>
        <!--this.BASE_URL_CLIENT 表示base.vue中定义的全局变量BASE_URL_CLIENT（服务器端部分网址） -->
        <td><img :src="this.GLOBAL.BASE_URL_CLIENT+user.headIconUrl" height="200"/></td></tr>
      <tr><td align="right">注册日期：</td>
        <!--this.GLOBAL.getYearMonthDayFromTimestamp表示base.vue中定义的全局函数 -->
        <td>{{this.GLOBAL.getYearMonthDayFromTimestamp(user.registerDate)}}</td>
      </tr>
      <template  v-if="user.type=='user'">
        <tr><td align="right">性别：</td>
          <td>{{ userinformation.sex}}</td></tr>
        <tr><td align="right">爱好：</td>
          <td>{{ userinformation.hobby}}</td>
        </tr>
      </template>
      </tbody>
    </table>
    </div>
</template>

<script type="text/javascript">
　　export default {
    name: 'showPrivate',

　　　　data () {  //组件数据
　　　　　　return {
            user:{},
            userinformation:{},
      　}
　　　　},
    created:function(){  //钩子函数，创建vue组件后被自动调用。发生在mounted之后
        this.getUserInformation();
    },
    methods:{
        getUserInformation:function(){  //获取用户信息
            var url ='/servlet/UserServlet?type1=showPrivate' ;
            //利用axios发出get请求
            this.$http.get(url)  //发出请求
                .then(response =>{
                    if (response.status === 200) {//200表示请求成功，200请求成功、303重定向、400请求错误、401未授权、403禁止访问、404文件未找到、500服务器错误
                        console.log(response.data); //console.log：输出参数数据到浏览器控制台，可以观察数据
                        this.user=response.data[0];
                      console.log( this.user);
                      this.userinformation=response.data[1];
                        var timestamp = Date.parse(new Date());
                        console.log(timestamp);
                        console.log(this.user.registerDate);
                    }

                }).catch(error => {
                    console.log(error);
                });
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
