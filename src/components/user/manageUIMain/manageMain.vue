<template>
    <!-- ref="frameDiv"  vue可以获得设置了ref属性的元素对象（标签）   -->
    <div class="newsShowByType_frame center"  id="frameDiv" ref="frameDiv">
        <!-- ref="leftDiv"  vue可以获得设置了ref属性的元素对象（标签）   -->
        <div class="newsShowByType_left" id="leftDiv" ref="leftDiv">
            <ul>   
                <!-- @click绑定鼠标点击事件  -->         
                <li @click="goFunc(1)">显示个人信息</li>     
                <li @click="goFunc(2)">修改个人信息</li>     
                <li @click="goFunc(3)">修改密码</li>
            <template  v-if="  this.user.type=='manager' "> 
                <br>
                <li @click="goFunc(4)">浏览用户</li>
                <li @click="goFunc(5)">审查用户</li>
                <li @click="goFunc(6)">查询用户</li>
                <li @click="goFunc(7)">删除用户</li>
                <li @click="goFunc(8)">批量添加用户</li>
                <li @click="goFunc(9)">管理新闻</li>
                <br>
                <li @click="goFunc(10)">年度新闻数</li>  
                <li @click="goFunc(11)">各年新闻数</li> 
                <li @click="goFunc(12)">各年评论前十</li>
                <li @click="goFunc(13)">生成静态html</li>
                <br>
                <li @click="goFunc(14)">数据库备份</li>
                <li @click="goFunc(15)">数据库还原</li>
            </template >                                             
            <template  v-if=" this.user.type=='newsAuthor' "> 
                <br>
                <li @click="goFunc(16)">添加新闻</li>
                <li @click="goFunc(17)">管理新闻</li>
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
            user:""
　　　　　　}
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