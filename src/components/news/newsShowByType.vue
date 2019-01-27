<template>
  	 	<div class="newsShowByType_frame center" id="frameDiv" ref="frameDiv">
 	 		<!-- 左边新闻类别div  -->
 	  		<div class="newsShowByType_left" id="leftDiv" ref="leftDiv" style="height: 450px;">
	  	  		<ul>
	  	  			<li @click="newsTypeClick('全部')">全部</li>
	  	  			<li @click="newsTypeClick('国际')">国际</li>
	  	  			<li @click="newsTypeClick('社会')">社会</li>
	  	  			<li @click="newsTypeClick('体育')">体育</li>
	  	  			<li @click="newsTypeClick('科学')">科学</li>
	  	  			<li @click="newsTypeClick('汽车')">汽车</li>
	  	  		</ul>
			</div>
			<!-- 右边新闻列表div  -->
			<!-- 右边上部：新闻列表div  -->
			<div class="newsShowByType_rightTop" id="newsShowByType" ref="rightTopDiv">
				<div>
					<ul id="newsShowByTypeUL">
						<!-- 新闻标题（带超链接）  -->
						<template v-for="news in newses">
							<li><a :href="base_url+'/servlet/NewsServlet?type1=showANews&newsId='+news.newsId+'&page=1&pageSize=10'" target="_blank">{{news.caption}}</a></li>
						</template>
					</ul>
				</div>
			</div>
			<!-- 右边下部：分页div  -->
			<div class="newsShowByType_rightBottom" ref="rightBottomDiv">
				<div class="center" style="width:150px;">
					<a id="previous" @click="prePage()" href="javascript:void(0);">上一页</a>
					<a id="next" @click="nextPage()" href="javascript:void(0);">下一页</a>
				</div>
			</div>
			<div class="clear"></div>
		</div>
</template>
<script type="text/javascript">
	//qs是一个npm仓库所管理的包，安装方式：npm install qs命令进行安装，
	//引入qs工具，进行提交数据的格式转换
	import Qs from 'qs';

　　export default {
    name: 'newsShowByType',

　　　data () {  //组件数据
　　　　　　return {
        newses:{},
        pageInformation:0,
        newsType:"",
        base_url:this.$http.defaults.baseURL
　　　　　　　　　　　　　　　　　　　　　　　　}
　　　　},
    created:function(){  //钩子函数，创建vue组件后被自动调用。发生在mounted之后
    	//this.$route.query.newsType表示从home.vue的链接中传递过来的参数newsType
    	console.log(this.$route.query.newsType);
    	//展现新闻类别对应的新闻列表
        this.newsTypeClick(this.$route.query.newsType);
    },
    //mounted钩子：类似jquery的ready方法，在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。发生在created之后
    mounted(){
        //设置外框高度 this.$refs.frameDiv:可以通过这种方式获取 ref属性值 为frameDiv的元素（标签）对象
       this.$refs.frameDiv.style.height=this.$refs.leftDiv.offsetHeight+"px";
    },
    methods:{
    	//展现新闻类别对应的新闻列表
    	newsTypeClick:function(newsType1){
    		if(newsType1==="全部")
    			this.newsType="all";
    		else
    			this.newsType=newsType1;

    		this.getNewsByType();
    	},
    	//前一页
        prePage : function(){
			if (this.pageInformation.page > 1)
					this.pageInformation.page--;

        	this.getNewsByType();
        },
        //后一页
        nextPage : function(){
        	 console.log(this.pageInformation);
			if (this.pageInformation.page < this.pageInformation.totalPageCount)
					this.pageInformation.page++;

        	this.getNewsByType();
        },
        ////展现新闻类别对应的新闻列表
        getNewsByType:function(){
             var url ='/servlet/NewsServlet?type1=showNewsByNewsTypeAjax&newsType='+this.newsType;
          console.log(url);
          if(this.pageInformation==0){
             	//防止 点击home.vue的链接时this.pageInformation为null
             	this.pageInformation={};
             	this.pageInformation.page=1;
             	this.pageInformation.pageSize=10;
             }
             //收集需传递的参数
             var data = Qs.stringify(this.pageInformation);
          //利用axios发出get请求
            this.$http.post(url,data,
                     {headers:{'Content-Type':'application/x-www-form-urlencoded'}})  //设置提交Content-Type类型，无文件域的一般表单，可以设置为'application/x-www-form-urlencoded'
                    .then(response =>{
                    if (response.status === 200) {//200表示请求成功，200请求成功、303重定向、400请求错误、401未授权、403禁止访问、404文件未找到、500服务器错误
                        console.log(response.data); //console.log：输出参数数据到浏览器控制台，可以观察数据
                        this.pageInformation=response.data[0];
                        this.pageInformation.searchSql="";
                        this.newses=response.data[1];
                    }
                }).catch(error => {
                    console.log(error);
                });
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

    #newsShowByTypeUL li{
    	text-align: left;
    }
</style>
