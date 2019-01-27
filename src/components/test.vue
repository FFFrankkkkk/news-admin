<template>
  <div>
  <p>{{msg}}</p>
    &nbsp;<a href="http://localhost:8080/news/user/free/register.jsp">注册</a>
  </div>
</template>
<script>
  export default {
    name:'test',
    data () {
      return {
        msg:'Hello world'
      }
    },
    created:function(){
      this.getNewsHeads();
    },
    methods: {//组件的中的方法，可以在组件中使用，包括在标签中
      getNewsHeads: function () {
        var url = 'http://localhost:8080/news/servlet/NewsServlet?type1=homepageTypes';
        //利用axios发出get请求 默认要求的返回结果必须是json格式，且数据保存在response.data中
        this.$http.get(url)  //发出请求
          .then(response => {
            // 响应成功回调
            console.log(response.data);
            console.log("dsd");
          }).catch(error => {
          console.log(err);
        });
      }
    }
  }
</script>
