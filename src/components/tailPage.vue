<template>
  <div>
    <div class="clear center tail">
      <hr class="margin-top1">
      Copyright © 2006-2015 renming.com All Rights Reserved. 人民网 版权所有 <br>
      京ICP证120085号 京ICP备16004154号 京网文[2012]0620-206号<br>
      京公网安备 11011202000608号<br>
    </div>
    <div style="text-align: left">
      <p><strong>相关知识点：</strong></p>
      <table width="904" border="1" cellspacing="0">
        <tbody>
        <tr>
          <td width="121">vue调用顺序： </td>
          <td width="767">index.html → main.js → app.vue → index.js → components/组件</td>
        </tr>
        <tr>
          <td>index.html：</td>
          <td>main.js中的根实例会挂载到index.html中的&lt;div id=&quot;app&quot;&gt;，且用template替换，即替换为&lt;App&gt;&lt;/App&gt;. 由于根实例注册了App组件，所以这标签就是App.vue组件。由于App.vue中含有&lt;router-view/&gt;，所以路由匹配成功的页面都在这里进行渲染和切换。</td>
        </tr>
        <tr>
          <td>main.js：</td>
          <td>入口文件，主要作用是初始化vue实例并使用需要的插件。</td>
        </tr>
        <tr>
          <td>App.vue</td>
          <td>主组件，所有页面都是在App.vue下进行切换的。</td>
        </tr>
        <tr>
          <td>router/index.js：</td>
          <td>定义路由</td>
        </tr>
        <tr>
          <td>components：</td>
          <td>在App组件中使用components中的其他自定义组件。</td>
        </tr>
        </tbody>
      </table>
      <br><br><br>
      <p><strong>工具安装：</strong></p>
      <table width="636" border="1" cellspacing="0">
        <tbody>
        <tr>
          <td width="212">http请求工具axios：</td>
          <td width="408">npm install axios</td>
        </tr>
        <tr>
          <td>状态管理工具vuex ：</td>
          <td>npm install vuex --save</td>
        </tr>
        <tr>
          <td>路由管理工具vue-router：</td>
          <td>npm install vue-router</td>
        </tr>
        <tr>
          <td>Qs工具：</td>
          <td>npm install qs</td>
        </tr>
        </tbody>
      </table>
      <br><br><br>
      <p><strong>技术点：</strong></p>
      <table width="900" border="1" cellspacing="0">
        <tbody>
        <tr>
          <td width="309">全局变量：</td>
          <td width="575">全局变量定义在base.vue文件中。全局变量在main.js文件中被引入到vue和axios。在任意vue组件中，可以通过this.GLOBAL.全局变量名的方式来访问全局变量，比如login.vue文件中的this.GLOBAL.BASE_URL。</td>
        </tr>
        <tr>
          <td>文本插值、绑定元素特性、条件与循环：</td>
          <td>见home.vue</td>
        </tr>
        <tr>
          <td>vue生命周期：</td>
          <td>https://blog.csdn.net/qq_35585701/article/details/81216704</td>
        </tr>
        <tr>
          <td>vue生命周期中的钩子函数created、mounted：</td>
          <td>见manageMain.vue、home.vue</td>
        </tr>
        <tr>
          <td>计算属性和监听：</td>
          <td>见headPage.vue</td>
        </tr>
        <tr>
          <td>无参数请求服务器：</td>
          <td>见home.vue中的getNewsHeads方法</td>
        </tr>
        <tr>
          <td>表单元素绑定、普通表单提交方法：</td>
          <td>见login.vue</td>
        </tr>
        <tr>
          <td>上传文件：</td>
          <td>见changePrivate.vue</td>
        </tr>
        <tr>
          <td>组件内部css样式设定：</td>
          <td>见headPage.vue中的&lt;style scoped&gt;</td>
        </tr>
        <tr>
          <td>路由切换：</td>
          <td>见headPage.vue的&lt;router-link&gt;和manageMain.vue中的this.$router.push</td>
        </tr>
        <tr>
          <td>事件绑定：</td>
          <td>见manageMain.vue中的@click</td>
        </tr>
        <tr>
          <td>自定义事件：</td>
          <td>App.vue中的@go_home</td>
        </tr>
        <tr>
          <td>&lt;router-view/&gt;：见</td>
          <td>App.vue和manageMain.vue</td>
        </tr>
        <tr>
          <td>vue通过html标签的ref属性访问标签对象：</td>
          <td>见manageMain.vue</td>
        </tr>
        </tbody>
      </table>
      <br><br><br>
      <p><strong>技术难点：</strong></p>
      <table width="897" border="1" cellpadding="3" cellspacing="0">
        <tbody>
        <tr>
          <td width="208">vuex的状态管理：</td>
          <td width="673">store/index.js中定义了一个状态loginFresh以及获得它和修改它的一些函数；login.vue中，当登录成功后，通过this.$store.dispatch('needLoginFresh');将状态修改为真；在headPage.vue中通过watch监听loginFresh状态，当状态修改为真时，更新用户信息，最后通过this.$store.dispatch('unneedLoginFresh');将状态修改为假。</td>
        </tr>
        <tr>
          <td>子组件传数据给父组件或子组件调用父组件的方法（函数）：</td>
          <td>App.vue为父组件，headPage.vue为子组件。在子组件中自定义事件go_home（见App.vue中的 &lt;headPage @go_home=&quot;gohome&quot;&gt;&lt;/headPage&gt;），并绑定父组件的gohome方法；在子组件注销功能成功后，通过调用this.$emit('go_home',1); 来激发子组件的自定义事件go_home，并传递数据（这里的第二个参数1），从而执行父组件的gohome方法来切换路由为home.vue</td>
        </tr>
        </tbody>
      </table>
      <br><br><br>
      <p><strong>打包部署到tomcat的一般步骤：</strong></p>
      <table width="897" border="1" cellpadding="3" cellspacing="0">
        <tbody>
        <tr>
          <td width="113">打包准备：</td>
          <td width="766">在config/index.js中设置build:{assetsPublicPath:'/'}，默认路径是&lsquo;/&rsquo;,需要加上'.'，修改为'./&rsquo;</td>
        </tr>
        <tr>
          <td>打包：</td>
          <td>在命令提示符工具（控制台）中进入vue项目文件夹（比如：E:\vueProject\news2），执行命令：npm run build</td>
        </tr>
        <tr>
          <td>部署到tomcat：</td>
          <td>把生成的dist文件夹内的全部内容 复制到 myeclipse中项目的webapp（或webroot）文件夹下，并修改myeclipse项目的web.xml文件，设置主页为：index.html（&lt;welcome-file-list&gt;<br>
            &lt;welcome-file&gt;index.html&lt;/welcome-file&gt;<br>
            &lt;/welcome-file-list&gt;）。重新发布myeclipse项目到tomcat中</td>
        </tr>
        <tr>
          <td>访问网页：</td>
          <td>启动tomcat，访问网址：http://localhost:8080/news2</td>
        </tr>
        </tbody>
      </table>
      <br><br><br>
      <p><strong>打包部署到myeclipse中news2项目的步骤：</strong></p>
      <table width="897" border="1" cellpadding="3" cellspacing="0">
        <tbody>
        <tr>
          <td width="113">打包准备：</td>
          <td width="766">在config/index.js中设置build:{assetsPublicPath:'/'}，默认路径是&lsquo;/&rsquo;,需要加上'.'，修改为'./&rsquo;</td>
        </tr>
        <tr>
          <td>打包：</td>
          <td>在命令提示符工具（控制台）中进入vue项目文件夹（比如：E:\vueProject\news2），执行命令：npm run build</td>
        </tr>
        <tr>
          <td>myeclipse中news2项目处理：</td>
          <td>删除HeadFilter过滤器（包括删除HeadFilter.java文件，删除web.xml中关于过滤器HeadFilter的设定）；删除其它无关的客户端文件夹和文件，参考的保留文件和文件夹如图：<img src="../assets/1.png" width="256" height="323" alt=""/></td>
        </tr>
        <tr>
          <td>部署vue项目到tomcat：</td>
          <td>把生成的dist文件夹内的全部内容 复制到 myeclipse中项目的webapp（或webroot）文件夹下，并修改myeclipse项目的web.xml文件，设置主页为：index.html（&lt;welcome-file-list&gt;<br>
            &lt;welcome-file&gt;index.html&lt;/welcome-file&gt;<br>
            &lt;/welcome-file-list&gt;）。重新发布myeclipse项目到tomcat中</td>
        </tr>
        <tr>
          <td>访问网页：</td>
          <td>启动tomcat，访问网址：http://localhost:8080/news2</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style>
  .margin-top1 {
    margin-top:25px;
  }
</style>
