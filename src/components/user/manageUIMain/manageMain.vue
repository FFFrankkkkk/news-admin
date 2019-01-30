<template>
    <!-- ref="frameDiv"  vue可以获得设置了ref属性的元素对象（标签）   -->
    <div class="newsShowByType_frame center"  id="frameDiv" ref="frameDiv">
        <!-- ref="leftDiv"  vue可以获得设置了ref属性的元素对象（标签）   -->
        <div class="newsShowByType_left" id="leftDiv" ref="leftDiv">
            <ul>
                <!-- @click绑定鼠标点击事件  -->
                <li @click="goFunc(1)">显示个人信息</li>
                <li @click="goFunc(2)">修改个人信息</li>
              <li ><a :href="base_url+'/user/manage/changePassword.jsp'" target="_blank">修改密码</a></li>
            <template  v-if="  this.user.type=='manager' ">
                <br>
                <li><a :href="base_url+'/manager/userShow.jsp'" target="_blank">浏览用户</a></li>
                <li ><a :href="base_url+'/servlet/UserServlet?type1=check&page=1&pageSize=2'" target="_blank">审查用户</a></li>
                <li><a :href="base_url+'/manager/userSearch.jsp'" target="_blank">查询用户</a></li>
                <li><a :href="base_url+'/servlet/UserServlet?type1=delete&page=1&pageSize=2'" target="_blank">删除用户</a></li>
                <li><a :href="base_url+'/manager/userBatchAdd.jsp'" target="_blank">批量添加用户</a></li>
                <li><a :href="base_url+'/servlet/NewsServlet?type1=manageNews&page=1&pageSize=2'" target="_blank">管理新闻</a></li>
                <br>
              <li><a :href="base_url+'/statistic/articleNumberByMonthInAYear.jsp'" target="_blank">年度新闻数</a></li>
              <li><a :href="base_url+'/servlet/StatisticServlet?type=articleNumberByMonthInAYearEveryYear'" target="_blank">各年新闻数</a></li>
              <li><a :href="base_url+'/servlet/StatisticServlet?type=firstTenCommentNumberAYearEveryYear'" target="_blank">各年评论前十</a></li>
              <li><a :href="base_url+'/servlet/AutoGeneratorServlet?type=newsHtml'" target="_blank">生成静态html</a></li>
                <br>
              <li><a :href="base_url+'/manager/databaseBackup.jsp'" target="_blank">数据库备份</a></li>
              <li><a :href="base_url+'/servlet/DatabaseServlet?type=restoreFirst'" target="_blank">数据库还原</a></li>
            </template >
            <template  v-if=" this.user.type=='newsAuthor' ">
                <br>
                <li > <a :href="base_url+'/manage/addNews.jsp'" target="_blank">添加新闻</a></li>
              <li ><a :href="base_url+'/servlet/NewsServlet?type1=manageNews&page=1&pageSize=2'" target="_blank">管理新闻</a></li>
            </template >
            </ul>
        </div>
        <div class="manageMain_right" id="rightDiv">
             <!-- 子组件显示在右边。 注意与App.vue中的<router-view></router-view>的区别  -->
            <router-view></router-view>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script type="text/javascript">
　　export default {
    name: 'manageMain',

　　　　data () {  //组件数据
　　　　　　return {
            user:"",
        base_url:this.$http.defaults.baseURL　　　　　　　　　}
　　　　},
    created:function(){  //钩子函数，创建vue组件后被自动调用。发生在mounted之前
        this.getUser();
    },
    //mounted钩子：类似jquery的ready方法，在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。发生在created之后
    mounted(){
            //设置外框高度 this.$refs.frameDiv:可以通过这种方式获取 ref属性值 为frameDiv的元素（标签）对象
           this.$refs.frameDiv.style.height=this.$refs.leftDiv.offsetHeight+"px";
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
        goFunc:function(i){
            switch(i){
                case 1:this.$router.push({ name: 'showPrivate' });break;
                case 2:
                    //使用路由名字进行跳转，此处组件changePrivate会显示在本组件的<router-view></router-view>中
                    this.$router.push({ name: 'changePrivate' });
                    break;
            }
        }
    }
　　}

</script>

<style type="text/css">
    .newsShowByType_left li:hover{
       color:red
    }
    .newsShowByType_left ul{
        list-style-type:none
    }
</style>
