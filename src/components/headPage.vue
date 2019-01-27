<template>
  <div id="headPage">
    <form id="searchForm" action="" method="post">
      <div class="div-out">
        <div class="logleft">
          <a href="/news/index.jsp">
            <!-- 图片一般放在assets文件夹下，这里使用相对路径访问，..表示父文件夹   -->
            <img src="../assets/images/log.png"></a>
        </div>
        <div class="logMiddle">
          <div class="logMiddleInner">
            <input type="text" id="search" name="search">
            <!-- 图片一般放在assets文件夹下，这里使用相对路径访问，..表示父文件夹   -->
            <img class="imagePointer" src="../assets/images/search_b.jpg" onclick="search();" >
          </div>
        </div>
        <div class="logRight">
          <div class="logRightInner">
            <template  v-if=" user ">
              <!-- router-link类似a标签，点击可以跳转路由， /manageMain是router/index.js中定义的路由路径  -->
              <router-link to="/manageMain">管理</router-link>
            </template >

            <a href="/news/index.jsp">首页</a>&nbsp;

            <template  v-if=" !user ">
              <!-- router-link类似a标签，点击可以跳转路由， /manageMain是router/index.js中定义的路由路径  -->
              <router-link to="/login">登录</router-link>
              &nbsp;<a href="/news/user/public/register.jsp">注册</a>
            </template >
            <template  v-else>
              {{user.name}}&nbsp;
              <!-- @click表示绑定的click事件，处理函数为logout（组件中method中定义的方法）  -->
              <a @click="logout" href="#">注销</a>
            </template >

          </div>
        </div>
      </div>
      <div class="clear"></div>
    </form>

  </div>
</template>

<script type="text/javascript">
  //用于vuex的状态管理
  import {mapState,mapMutations,mapGetters} from 'vuex';

  export default {
    name: 'headPage',

    data () {  //组件数据
      return {
        user: {}
      }
    },
    created:function(){  //钩子函数
      this.getUser();
    },
    methods:{
      getUser:function(){
        var url ='/servlet/UserServlet?type1=user'
        //利用axios发出ajax的get请求
        this.$http.get(url)  //发出请求
          .then(response =>{
            // 响应成功回调
            this.user=response.data;
             console.log(this.user);
          }).catch(error => {
          console.log(err);
        });
      },
      logout:function(){
          var url ='/servlet/UserServlet?type1=exit';
        this.$http.get(url)  //发出请求
          .then(response =>{
            // 响应成功回调
            if(response.data.result===1){
              this.user=null;//更新用户为null
              //触发本组件的go_home事件，1为传给父组件函数的数据，这里并没有利用它
              this.$emit('go_home',1);
            }
          }).catch(error => {
          console.log(error);
        });

      }
    } ,
    computed: {
      //计算方法，使得store中的loginFresh可以被监听
      ...mapGetters([
        'getLoginFresh'
      ])
    },
    watch: {
      //监视store中的loginFresh，如果发生变化，自动调用 getLoginFresh(curval,oldval)函数
      getLoginFresh(curval,oldval) {
        console.log( "ccccccc"+curval);
        //如果vuex中的loginFresh状态值被改为真（表示登录成功，见login.vue中this.$store.dispatch('needLoginFresh');语句），则要重新获取登录之后的用户信息，并更新本组件的数据
        if(curval==true){
          this.getUser();
          //$store.getters.getLoginFresh  获取vuex中的loginFreshh状态值
          console.log( "dddddd"+this.$store.getters.getLoginFresh);
          //设置vuex中的loginFresh状态值为假
          this.$store.dispatch('unneedLoginFresh');
          console.log( "eeeeee"+this.$store.getters.getLoginFresh);
        }
      }
    }
  }

</script>
<style scoped>
  .cursor:pointer{
    cursor:pointer;
    width:20px;
    height: 20px
  }

</style>
