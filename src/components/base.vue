
<script>
  //这里可以设置全局变量
  const BASE_URL = 'http://localhost:8080/news'; // 设置全局 URL
  const BASE_URL_CLIENT = 'http://localhost:8080'; // 设置全局 URL
  export default{
    BASE_URL,
    BASE_URL_CLIENT,
    //服务器端返回的timestamp数据格式为：Sep 22, 2018 9:31:45 AM
    //转换为2018年09月22日上午9点31分45秒
    getYearMonthDayFromTimestamp:function( timestamp ){
      //如果timestamp不是字符串，则返回空字符串
      if(!(typeof timestamp=='string'))
        return "";

      var result="";
      //根据空格，split把timestamp分成字符数组
      var times = timestamp.split(" ");
      //得到月份
      if (times[0]=="Jan") 	times[0] = "01";
      if (times[0]=="Feb")   	times[0] = "02";
      if (times[0]=="Mar") 	times[0] = "03";
      if (times[0]=="Apr") 	times[0] = "04";
      if (times[0]=="May") 	times[0] = "05";
      if (times[0]=="Jun")	times[0] = "06";
      if (times[0]=="Jul")	times[0] = "07";
      if (times[0]=="Aug")	times[0] = "08";
      if (times[0]=="Sep")  	times[0] = "09";
      if (times[0]=="Oct") 	times[0] = "10";
      if (times[0]=="Nov") 	times[0] = "11";
      if (times[0]=="Dec")	times[0] = "12";

      var days=times[1].split(",");
      var hmss=times[3].split(":");
      var ap;
      if(times[4]=="AM")
        ap="上午";
      else
        ap="下午";

      result+=times[2]+"年"+times[0]+"月"+days[0]+"日 "+ap;
      result+=hmss[0]+"时"+hmss[1]+"分"+hmss[2]+"秒";

      return result;
    }
  }
</script>
