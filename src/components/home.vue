<template>
  <div id="home"> <!-- template下只能有一个子标签，该子标签下可以有任意个孙标签  -->
    <div class="news">
      <!-- v-for用于循环  newsTypes是组件中data中的数据   index是当前数组元素的下标   -->
      <template v-for="(newsType,index) in newsTypes">
        <div :class="{ newsleft:index%2==0, newsRight:index%2!=0}"><!-- 每一个类别的新闻放在一个div中  -->
          <table class="invisibleTable">
            <tbody>
            <tr class="newsColumn"><!-- 新闻栏目（类别） -->
              <td>
                <!-- v-if用于条件  -->
                <template  v-if="newsType === 'all'">
                  最新
                </template >
                <template  v-else>
                  {{newsType}}   <!-- 文本插值  -->
                </template >
              </td>
              <td class="right">
                <!-- vue链接传递参数的一种方式，参数放在query中，注意to前的冒号    -->
                <!-- 具体可参考：https://www.cnblogs.com/alan2kat/p/7345503.html    -->
                <router-link :to="{path:'/newsShowByType',query:{newsType:newsType}}">更多</router-link>
              </td>
            </tr>
            <template v-for="news in newsesList[index]">
              <tr>
                <td class="mainPageUl">
                  <a :href="base_url+'/servlet/NewsServlet?type1=showANews&newsId='+news.newsId+'&page=1&pageSize=10'" target="_blank">{{news.caption}}</a>
                </td>
                <td class="right">
                  <!-- 文本插值  可以调用组件中method中定义的方法 -->
                  {{getYearMonthDay(news.newsTime)}}
                </td>
              </tr>
            </template >
            </tbody>
          </table>
        </div>
      </template>
    </div>
  </div>
</template>

<script type="text/javascript">

  // export default 表示公开组件，以便其他地方可以
  export default {
    name: 'home',

    data () {  //组件数据
      return {
        newsTypesNumber:0,
        newsTypes: [],
        newsesList:[],
        base_url:this.$http.defaults.baseURL
      }
    },

    //vue生命周期钩子函数详解：https://blog.csdn.net/qq_35585701/article/details/81216704
    //钩子函数created，在模板渲染成html前调用，即通常初始化某些属性值
    created:function(){
      this.getNewsHeads();
    },
    methods:{//组件的中的方法，可以在组件中使用，包括在标签中
      getNewsHeads:function(){
        var url ='/servlet/NewsServlet?type1=homepageTypes';
        //利用axios发出get请求 默认要求的返回结果必须是json格式，且数据保存在response.data中
        this.$http.get(url)  //发出请求
          .then(response =>{
            // 响应成功回调
            this.newsTypesNumber=response.data[0];
            this.newsTypes=response.data[1];
            this.newsesList=response.data[2];
            console.log(response);
          }).catch(error => {
          console.log(err);
        });
      },
      getYearMonthDay: function( date ){
        if(date!=null)
          return date.date.year+"-"
            +(date.date.month>9?date.date.month:"0"+date.date.month)+"-"
            +(date.date.day>9?date.date.day:"0"+date.date.day);
        else
          return "";
      }
    }
  }
</script>
<style scoped></style>
