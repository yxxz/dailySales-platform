
$(function(){
	$("#trendId").css("height", ($('#salesDaily_Div').css('height').replace('px', '') * 0.7) + 'px');
	//区域   分公司  切换
	$('body').delegate('.lcs_check', 'lcs-on', function() { //  区域
		$("#condition_list .tabTit_First").text("大区");
		dimType = "1";
		dateSelected(selectDate);
	});
	$('body').delegate('.lcs_check', 'lcs-off', function() {  // 分公司
		$("#condition_list .tabTit_First").text("分公司");
		dimType = "2";
		dateSelected(selectDate);
	});
})
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		$('.dailySales_header').css({
			'height' : '60px',
			'padding-top' : '14px'
		});
	$('#back').css({'top': '25px'})
	$('#dateImg').css({'top': '22px'})
	$('#dailySales_title').css({'line-height': '70px'})
} else if (/(Android)/i.test(navigator.userAgent)) {
		$('.dailySales_header').css({
			'padding-top' : '0px'
		}, {
			'height' : '50px'
		});
	}
//获取当前路径
function getContextPath() {
    var pathName = document.location.origin;   
    return pathName; 
};
getContextPath();
// 判断浏览器类型
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
	$('#Loading_img').css('width','120px');
} else if (/(Android)/i.test(navigator.userAgent)) {
	$('#Loading_img').css('width','100px');
}
/*返回页面*/
function backpage(){
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		window.webkit.messageHandlers.backToHome.postMessage("");
	} else if (/(Android)/i.test(navigator.userAgent)) {
		window.appInterface.backToHome();
	} else{
		history.back(-1);
	}
};
//table操作事件
var setTable = {
    init:function(){
        var $parent = $('.tableBox');
        if($parent.hasClass('tableBox2')){
            setTable.tableCell_two();
        }else{
            setTable.tableCell_one();
        }
    },
    tableCell_one:function(){
        var left_tr = $('.tLeft').find('tr');
        var tr_length = left_tr.length;
        var header_td = $('.tHeader').find('td');
        var td_length = header_td.length;
        var $content = $('#salesDaily_Div').find('.content');
        var content_td_num =  $content.find("tr").length;
        var html = '<table>';
        for(var i=0;i<tr_length;i++){
            html += '<tr class="' + $(left_tr[i]).attr('class') + '">';
            for(var j = 0;j < td_length;j++){
                html += '<td><div></div></td>';
            };
            html += '</tr>';
        };
        html += '</table>';
        $content.html(html);
        setTable.setWith();
        //setTable.setColor();
        setTable.hasScrollBar();
        setTable.tableScroll();
    },
    setWith:function() {
        var $topTable = $('#condition_list');
        var $contentTable = $('#salesDailyCont table');
        $topTable.find('td').css('width', 100 / $topTable.find('td').length + "%");
        $contentTable.find('td').css('width', 100 / $topTable.find('td').length + "%");
    },
    // table隔行颜色设置
    setColor:function() {
        var $table = $('.tableBox').find('.row2').find('table');
        $table.each(function() {
            var _this = $(this);
            var _trEvent = _this.find('tr:even');
            var _trOdd = _this.find('tr:odd');
            _trOdd.find('td:not(".bgColor")').css('background', '#f9f9f9');
        });
    },
    // 滚动条联动
    tableScroll:function() {
        var $parent = $('.tableBox');
        var $header = $parent.find('.tHeader');
        var $left = $parent.find('.tLeft');
        var $content = $parent.find('.content');
        $content.scroll(function() {
            var _this = $(this);
            var left = _this.scrollLeft();
            var top = _this.scrollTop();
            var c_width = _this[0].clientWidth;
            var s_width = _this[0].scrollWidth;
            var res = s_width - c_width;
            if (left >= res - 2) {
                left = res;
            }
            $left.scrollTop(top);
            _this.scrollLeft(left);
            $header.scrollLeft(left);
        });
    },
    tableCell_two:function(){
        var $parent = $('.tableBox2');
        var $header = $parent.find('.tHeader');
        var $content = $parent.find('.content');
        var $content_td = $content.find("tr:eq(0)");
        var $rowspan_td =$header.find('tr:eq(0)').find(".rowspan");
        var rowspan_td_num = $rowspan_td.length;
        var $sub_td = $header.find('tr:last').find('td');
        var sub_td_num = $sub_td.length;
        var num = parseInt(rowspan_td_num)+parseInt(sub_td_num);
        var $all_tr = $content.find('tr');
        for(var i=0;i<num;i++){
             var _width;
             if(i<rowspan_td_num){
                 _width = $rowspan_td.eq(i).width();
                 //重置header里面td的宽度
                 $rowspan_td.eq(i).css("width",_width);
                 $rowspan_td.eq(i).find("div").css("width",_width-1);
             }else if(i>=rowspan_td_num){
                 _width = $sub_td.eq(i-rowspan_td_num).width();
                 $sub_td.eq(i-rowspan_td_num).css("width",_width);
                 $sub_td.eq(i-rowspan_td_num).find("div").css("width",_width-1);
             }
             if($content_td.length===0){
                 $header.removeClass('scrollY');
                 return false;
             }
             for(var j=0;j<$all_tr.length;j++){
                var $item_td =$all_tr.eq(j).find("td:eq("+i+")");
                $item_td.css("width",_width);
                $item_td.find("div").css("width",_width-1);
                var val = $item_td.find("div").html();
                $item_td.attr('title',val);
             }
         };
         setTable.hasScrollBar();
    },
    hasScrollBar:function(){
    	var biaozhu_h = $('#biaozhu_font').height();
        var $parent = $('.tableBox');
        var $header = $parent.find('.tHeader');
        var $content = $parent.find('.content');
        var $tLeft = $parent.find('.tLeft');
        var window_height = $(window).height();
        var top_height = $('#topContent').height()+$('.container-fuild').height()+$('.tHeader').height();
        var dif_height = parseInt(window_height)-parseInt(top_height)-biaozhu_h;
        var content_table_height = $content.find('table').height();
        var c_width = $content[0].offsetWidth;
        var s_width = $content[0].scrollWidth;
        var set_height = 0;
        //判断列表实际高度和widow剩余下面的高度对比，那个值小取那个值作为列表的高度
        if(dif_height>=content_table_height){
            if(s_width-c_width<=4){
                set_height = content_table_height;
                $parent.css({'background':"none"});
                $content.css('border-bottom',"0");
            }else{
                set_height = content_table_height+19;
            }
            $header.removeClass('scrollY');           
        }else{
            if(s_width-c_width<=0){
                set_height = dif_height-10;
            }else{
                //ie8能够获取隐藏条件查询的高度，其他浏览器都不能获取被隐藏的高度，所以要对ie8浏览器下的列表高度做特殊设置
                var $moreBtn = $('.moreBtn');
                    set_height = dif_height-10;
            }
            //如果出现y轴滚动条，头部最右侧要添加class名为scrollY来设置最右侧背景色
            $header.addClass('scrollY');
             //ie7下重置table宽度，将header的table的宽度赋给列表table
                var tHeader_table_width = $header.find('table').width();
                $content.find('table').width(tHeader_table_width);
            $parent.css({'background':"#f1f1f1"});
            $content.css('border-bottom',"1px solid #e5eff8");
        }
        $content.height(set_height);
        if($tLeft.length>0){
            $tLeft.height(set_height);
        }
    }
};
//$("#sales_btn_trend").hide();
//获取url 参数
function getUrlParam (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r !== null) return unescape(r[2]);
  return null;
}

var dimType, // 获取报表数据 入参
	project_id, // 全部产品的id
	orderS_id, // 订单来源的id
	channel_id, // 渠道类型
	rights_data, //是否有权限
	username_index, // 当前用户的域账号
	username_index = getUrlParam('username');

/*tab 1 切换*/
var menu_attr;
$('#menu_tab_Box .menu_tabfont').click(function(){
	/*$(this).addClass('tabAct').siblings().removeClass('tabAct');*/
	var $this_txt = $(this).text().trim();
		menu_attr = $(this).attr("data-type");
	$(this).find('span').addClass('border-t');
	$(this).addClass('font_c');
	$(this).siblings().find('span').removeClass('border-t');
	$(this).siblings().removeClass('font_c');
	$('.jjl').remove();
	switch($this_txt){
		case "成交量" :
			$("#sales_table").hide();
			$(".nityFiv #tipT").text("成交量销售日报");
			$("#sales_table").find(".fixedHeader table>tbody>tr>td").text("成交排名");
			$("#sales_table").find(".tHeader #condition_list").find(".tabTit_Thirdc").text("成交量");
			$("#sales_table").find(".tHeader #condition_list").find(".tabTit_Fourthc").text("占比 (/全国成交量)");
			$("#sales_table").find(".tHeader #condition_list").find(".tabTit_sp").css("display","none");
			/*大区*/
			$("#condition_list .tabTit_First").text("大区");
			//dimType = "1";
			break;
		case "进件量" :
			$("#sales_table").hide();
			$(".nityFiv #tipT").text("进件量销售日报");
			$("#sales_table").find(".fixedHeader table>tbody>tr>td").text("进件排名");
			$("#sales_table").find(".tHeader #condition_list").find(".tabTit_Thirdc").text("进件量");
			$("#sales_table").find(".tHeader #condition_list").find(".tabTit_Fourthc").text("进件成交转化率");
			$("#sales_table").find(".tHeader #condition_list").find(".tabTit_sp").css("display","none");
			$("#condition_list .tabTit_First").text("大区");
			break;
		case "审批通过率" :
			$("#sales_table").hide();
			$(".nityFiv #tipT").text("审批通过率销售日报");
			$("#condition_list tr").append('<td class="jjl" style="width: 44px;"><div class="tabTit_sp">拒绝量</div></td>')
			$("#sales_table").find(".fixedHeader table>tbody>tr>td").text("通过率排名");
			$("#sales_table").find(".tHeader #condition_list").find(".tabTit_Thirdc").text("审批通过率");
			$("#sales_table").find(".tHeader #condition_list").find(".tabTit_Fourthc").text("通过量");
			$("#sales_table").find(".tHeader #condition_list").find(".tabTit_sp").css("display","block");
			$("#condition_list .tabTit_First").text("大区");
			break;
		case "融资额" : // 二期迭代新增
			$("#sales_table").hide();
			$(".nityFiv #tipT").text("融资额销售日报");
			$("#condition_list tr").append('<td class="jjl" style="width: 44px;"><div class="tabTit_sp">易鑫放款金额(万)</div></td>')
			$("#sales_table").find(".fixedHeader table>tbody>tr>td").text("融资额排名");
			$("#sales_table").find(".tHeader #condition_list").find(".tabTit_Thirdc").text("成交融资额(万)");
			$("#sales_table").find(".tHeader #condition_list").find(".tabTit_Fourthc").text("银行放款金额(万)");
			$("#sales_table").find(".tHeader #condition_list").find(".tabTit_sp").css("display","block");
			$("#condition_list .tabTit_First").text("大区");
			break;
	}
	initSelect();
	$('#sales_btn_day').addClass('active');
	$('#salesDailyCont table').empty();
	$('#city_list').empty();
	$('#sales_btn_day').siblings().removeClass('active');
	getMaxT();	
});
//2016年XX月XX日
function Pridtarr(arr) {
	tmp = (arr.substr(0,7) + '月').replace('-','年') + arr.substr(8,9) + '日';
	return tmp;
};
//2016年XX月01日
function Pridtarr2(arr) {
	tmp = (arr.substr(0,7) + '月').replace('-','年') + '01日';
	return tmp;
};
//2016年01月01日
function Pridtarr3(arr) {
	tmp = arr.substr(0,4) + '年01月01日';
	return tmp;
};
//2016年XX月
function Pridtarr4(arr) {
	tmp = (arr.substr(0,7) + '月').replace('-','年');
	return tmp;
};

	//$("#dateFilters").mobiscroll($.extend(opt['date'], opt['default']));

var salesDailyUpdateMax;//数据库最大日期
var salesDailyUpdateMin;//数据库最小日期
var selectDate;//当前选择时间
//获取数据库截止日期         getMaxTime
function getMaxT(){
	if(selectDate){
		getRights();
		return false;
	}
	$.ajax({
	    url: getContextPath() + "/pm/app/platSale/getMaxTime",
	    dataType: "json",   //返回格式为json
	    type: "POST",
	    async:false,   //请求方式
	    data:{
	    	rptf_type:menu_attr, //分别对应成交量，进件量，审批通过率
	    	username:username_index //当 前用户
	    },
	    success: function(MaxTime) {
	    	if(MaxTime.data.maxTime +'' !== null){
		    	salesDailyUpdateMax = MaxTime.data.maxTime[0];//最大
		    	salesDailyUpdateMin = "2017-05-01";//最小
		    	selectDate = salesDailyUpdateMax;
	    	}
	    	getRights();
	    	/*日期筛选*/
	    	var currYear = "2017";
	    	var currMon = "4";
	    	var currDay = "1";
	    	var end_year = salesDailyUpdateMax.substr(0,4);
	    		var opt={};
	    		opt.date = {preset : 'date'};
	    		opt.datetime = {preset : 'datetime'};
	    		opt.time = {preset : 'time'};
	    		opt.default = {
	    			theme: 'android-ics light', //皮肤样式
	    			display: 'bottom', //显示方式 
	    			mode: 'scroller', //日期选择模式
	    			dateFormat: 'yy-mm-dd',
	    			mode: 'scroller',
	    			lang: 'zh',
	    			showNow: true,
	    			animate: 'fade',
	    			nowText: "今天",
	    			startDate: salesDailyUpdateMin, //开始天
	    			endDate: salesDailyUpdateMax, //结束年份
	    			onSelect: function (valueText, inst) {//选择时事件（点击确定后），valueText 为选择的时间，
	    				selectDate = valueText;
	    				dateSelected(valueText);
	                }
	    		};
	    		$("#salesDate").mobiscroll($.extend(opt['date'], opt['default']));
	    		
	    },error:function(){
	    	$(function(){
	    		$('#salesModel').modal('hide');
	    	});
	    	$('#salesDaily_Div').html('');
	    	var kong_html='<div class="center-block text-center"><img src="../../img/NOTHING@3.png"  style="margin-top:50%;width:20%"><h4 style="color:#ccc">nothing...</h4></div>';
	    	$('#salesDaily_Div').html(kong_html);
	    }
	});
};	

function salesDailyUpdateMA(){
	return salesDailyUpdateMax;
};
salesDailyUpdateMA();
function salesDailyUpdateMI(){
	 return salesDailyUpdateMin;
};
salesDailyUpdateMI();
function getDataRange() {
	window.appInterface.toApp(salesDailyUpdateMax,salesDailyUpdateMin);
};

// 用户选择日期
//日期筛选条件（参数salesDateUser）
function dateSelected(salesDateUser){
	$('#salesModel').modal('show'); // 加载模态框
	$("#sales_table").hide();
	var salesDailyselect,//所选时间条件获得数据
	    rpt_Date = salesDateUser+"";
		salesDailyselect=null;
		if(!dimType){
			$('#salesModel').modal('hide'); // 加载模态框
			return;
		}
	$.ajax({
	    url: getContextPath() + "/pm/app/platSale/getPlatSaleDetail",
	    dataType: "json",   //返回格式为json
	    type: "POST",
	    /*data:{searchDate:salesDateUser},*/
	    data:{
	    	rptf_type: menu_attr, //分别对应成交量，进件量，审批通过率
	    	rpt_dt: rpt_Date,//数据日期
	    	dim_type: dimType, //维度类型1 大区 2 分公司
	    	project_no: project_id, //项目ID 对应界面产品id
	    	online_code: orderS_id,  //线上、线下
	    	channel_type: channel_id,  //渠道类型
	    	username:username_index //当 前用户
	    },
	    async:true,   //请求方式
	    success: function(data) {
	    	$('#nothing').hide();
	    	salesDailyselect = data.data;  	
	        var initDataTable = function(selectTabdata){
        		$('#city_list').empty();
        		$('#salesDailyCont table').empty();
	        	// 表格第一列
		    	if(selectTabdata.length !== 0){	    		
		    		$('#salesDaily_Div').show();
		    		$('#salesModel').modal('hide');
		    		$('#nothing').hide();
		    		$('#trendId').html("");
		    		$("#selectModel").hide(); 
		    		$("#sales_table").show();
			        var html='',
			        	oneData;
			        for(var i=0;i<selectTabdata[0].length;i++){
			        	oneData = selectTabdata[0][i];
			            html+='<tr class="' + (oneData === 1 ? 'trNum tr1' : (oneData === 2 ? 'trNum tr2' : (oneData === 3 ? 'trNum tr3' : '')))  + '"><td data-i = '+i+' class="alignL">'+ oneData +'</td></tr>';
			        }
			        $('#salesDaily_Div').find('#city_list').html(html);
			    	var tr_val = $('#city_list tbody').find('tr');
		    	}else{
		    		$('#nothing').show();
		    		$(function(){
		        		$('#salesModel').modal('hide');
		        		$("#selectModel").hide(); 
		        	});
		    	}
		        setTable.init();//表格初始化
	        	var cols = $('#salesDaily_Div').find('#salesDailyCont table tr'),
	        		colors = ['#b3b6c3', '#8d91a0'];
		        cols.each(function(index, elem){	
		        	$(elem).find('td div').each(function(index2, elem2){
		        		var $this = $(elem2);
		        		if(selectTabdata[index2]){
		        			$this.html(selectTabdata[index2 + 1][index]);
						}else{
							$this.html('0');
						}
		        	});
		        });
		        var div_txt = $('#salesDailyCont table tbody').find('tr').find('td').find('div');
		        $.each(div_txt,function(i,items){
		        	if($(items).text().trim()+'' === '全国'){
		        		$(items).parent().parent().find('td').find('div').addClass('color999');
		        	}
		        })
		   if(Number(rights_data) === 0){ // 不显示全国排名
		        $("#city_list tbody").find("tr>td:eq(0)").text("");
		      }
		        $('#salesModel').modal('hide');
	        }
			// 趋势图
			function getTrend(){
				var trendIdChart = echarts.init(document.getElementById('trendId'));
				var salesDail_data = salesDailyselect.LINE;
				if(salesDail_data!==null && salesDail_data.length>1){
					$('#salesModel').modal('hide');
					var time_data=[];
					for(var m = 0;m < salesDail_data[0].length;m++){
						time_data[m]= salesDail_data[0][m];
					}
					var echartsObj = new trendIdoption();
					//根据日期数显示不同的开始结束位置
					if(time_data.length > 12){
						echartsObj.dataZoom.start=100-(12/time_data.length*100);
						echartsObj.dataZoom.end=100;						
					}else{
						echartsObj.dataZoom.start=0;
						echartsObj.dataZoom.end=100;
					}
				/*	var maxV_arr = salesDail_data[2];
					var max_val = Math.max.apply(null, maxV_arr);*/
					//获取点击的tab
					switch(menu_attr){
						case'1': // 成交量
							echartsObj.series[0]['name'] = '成交量';
							var legend = {
									data : [{name:'成交量',icon:'circle'}]
							};
							echartsObj.legend = legend;
							echartsObj.legend['selectedMode']= false;
							break;
						case'2': // 进件量
							echartsObj.series[0]['name'] = '进件量';
							echartsObj.series[1]['name'] = '进件转化率';
							echartsObj.series[1]['yAxisIndex'] = '1';
							var legend = {
									data : [{name:'进件量',icon:'circle'},{name:'进件转化率',icon:'circle'}]
							};
							echartsObj.legend = legend;
							echartsObj.legend['selectedMode']= false;
							echartsObj.series[0]['itemStyle']['normal']['color'] = '#4082EE'; // 进件量折线颜色
							echartsObj.series[1]['itemStyle']['normal']['color'] = '#F7AA4E'; // 进件转化率折线颜色
							echartsObj.series[1]['itemStyle']['normal']['label']['show'] = false;
							break;
						case'3': // 审批通过率
							echartsObj.series[0]['name'] = '审批通过率';
							var legend = {
								data : [{name:'审批通过率',icon:'circle'}]
						};
						echartsObj.legend = legend;
						echartsObj.legend['selectedMode']= false;
						echartsObj.series[0]['itemStyle']['normal']['color'] = 'rgb(85,205,255)'; //审批通过率折线颜色
						echartsObj.yAxis[0]['axisLabel']['formatter'] = '{value}%'
							break;
						case'4': // 二期新增 融资额
							echartsObj.series[0]['name'] = '成交融资额';
							echartsObj.series[1]['name'] = '银行放款金额';
							echartsObj.series[2]['name'] = '易鑫放款金额';
							var legend = {
								data : [{name:'成交融资额',icon:'circle'},{name:'银行放款金额',icon:'circle'},{name:'易鑫放款金额',icon:'circle'}]
						};
						echartsObj.legend = legend;
						echartsObj.legend['selectedMode']= false;
						var obj = echartsObj.series[0]['itemStyle']['normal'];
						obj.areaStyle = {'type':'default'}; // 进件量折线颜色
						echartsObj.series[0]['itemStyle']['normal']['color'] = '#E98DBD'; //成交融资额折线颜色
						echartsObj.series[1]['itemStyle']['normal']['color'] = '#C0A9FD'; //银行放款金额折线颜色
						echartsObj.series[2]['itemStyle']['normal']['color'] = '#A9C3FF'; //易鑫放款金额折线颜色
						echartsObj.yAxis[0]['axisLabel']['formatter'] = '{value}'
							break;
					}
			    	echartsObj.xAxis[0]['data']= time_data;
			    	var k = 1;
			    	for (; k < salesDail_data.length; k++) {
			    		var arr1=[];
				    	for(var j = 0;j < salesDail_data[k].length;j++){
				    		if(salesDail_data[k][j]!==null){
				    			arr1[j]=salesDail_data[k][j];
				    		}else{
				    			arr1[j]='0';
				    		}
				    	};
				    	echartsObj.series[k - 1]['data']= arr1;
					}			    	
			    	trendIdChart.setOption(echartsObj);
				}else{
					var nothingH = '<div class="center-block text-center" id="nothingH"><img src="../../img/NOTHING@3.png"  style="margin-top:13%;width:20%"><h4 style="color:#ccc">nothing...</h4></div>';
					$("#trendId").html(nothingH)
					$('#salesModel').modal('hide');
					//echartsObj.xAxis[0]['data']= [];
			    	//echartsObj.series=[];
			    	//trendIdChart.setOption(echartsObj);
				}
				$('#salesModel').modal('hide');
			};
			/*当日*/
			$('#salesDaily_Div').find('#sales_btn_day').unbind().click(function(){
				$('#salesModel').modal('show');
				$('#salesDate').html(Pridtarr(salesDateUser));
				//$('#salesDate_div').html('<div class="date_tit">日期:</div><span style="width: 100%;text-align:center" id="salesDate" class="input" bind_elem="#dateImg">'+Pridtarr(salesDateUser)+'</span><img id="dateImg" class="dateImg" src="imgs/up.png">');
				$('#salesDaily_Div').find('#sales_table').show();
				$('#salesDaily_Div').find('#trendId').hide();				
				setTable.init();//表格初始化
				initDataTable(salesDailyselect.DTD);
				/*判断当前权限是否显示 全国*/
		   if(Number(rights_data) === 0){
		        	$("#city_list tbody").find("tr>td:eq(0)").text("");
		        }
			});
			//月累计
			$('#salesDaily_Div').find('#sales_btn_month').unbind().click(function(){
				$('#salesModel').modal('show');
				//$('#salesDate_div').html('<div class="date_tit">日期:</div><span style="width: 100%;text-align:center" id="salesDate" class="input" bind_elem="#dateImg">'+Pridtarr2(salesDateUser)+'-'+Pridtarr(salesDateUser).substr(5,10)+'</span><img id="dateImg" class="dateImg" src="imgs/up.png">');
				$('#salesDate').html(Pridtarr2(salesDateUser)+'-'+Pridtarr(salesDateUser).substr(5,10));
				$('#salesDaily_Div').find('#sales_table').show();
				$('#salesDaily_Div').find('#trendId').hide();
				setTable.init();//表格初始化
				initDataTable(salesDailyselect.MTD);
				/*判断当前权限是否显示 全国*/
			if(Number(rights_data) === 0){
		        	$("#city_list tbody").find("tr>td:eq(0)").text("");
		        }
		        /*else{
		        	$("#city_list tbody").find("tr:eq(0)").css("display","none");
			 	    $("#salesDailyCont table>tbody").find("tr:eq(0)").css("display","none");
		        }*/
			});
			//年累计
			$('#salesDaily_Div').find('#sales_btn_year').unbind().click(function(){
				$('#salesModel').modal('show');
				//$('#salesDate_div').html('<div class="date_tit">日期:</div><span style="width: 100%;text-align:center" id="salesDate" class="input" bind_elem="#dateImg">'+Pridtarr3(salesDateUser)+'-'+Pridtarr(salesDateUser).substr(5,10)+'</span><img id="dateImg" class="dateImg" src="imgs/up.png">');
				$('#salesDate').html(Pridtarr3(salesDateUser)+'-'+Pridtarr(salesDateUser).substr(5,10));
				$('#salesDaily_Div').find('#sales_table').show();
				$('#salesDaily_Div').find('#trendId').hide();
				setTable.init();//表格初始化
				initDataTable(salesDailyselect.YTD);
				/*判断当前权限是否显示 全国*/
		   if(Number(rights_data) === 0){
		        	$("#city_list tbody").find("tr>td:eq(0)").text("");
		        }
		        /*else{
		        	$("#city_list tbody").find("tr:eq(0)").css("display","none");
			 	    $("#salesDailyCont table>tbody").find("tr:eq(0)").css("display","none");
		        }*/
			});
			//总累计
			$('#salesDaily_Div').find('#sales_btn_sum').unbind().click(function(){
				$('#salesModel').modal('show');
				//$('#salesDate_div').html('<div class="date_tit">日期:</div><span style="width: 100%;text-align:center" id="salesDate" class="input" bind_elem="#dateImg">'+'截止至 '+Pridtarr(salesDateUser)+'</span><img id="dateImg" class="dateImg" src="imgs/up.png">');
				$('#salesDate').html('截止至 '+Pridtarr(salesDateUser));
				$('#salesDaily_Div').find('#sales_table').show();
				$('#salesDaily_Div').find('#trendId').hide();
				setTable.init();//表格初始化
				initDataTable(salesDailyselect.SUM);
				/*判断当前权限是否显示 全国*/
		   if(Number(rights_data) === 0){
		        	$("#city_list tbody").find("tr>td:eq(0)").text("");
		        }
			});
			$('#salesDaily_Div .active').click();
			//趋势
			$('#salesDaily_Div').find('#sales_btn_trend').unbind().click(function(){
				$('#salesModel').modal('show');
				//$('#salesDate_div').html('<div class="date_tit">日期:</div><span style="width: 100%;text-align:center" id="salesDate" class="input" bind_elem="#dateImg">'+'截止至 '+Pridtarr(salesDateUser)+'</span><img id="dateImg" class="dateImg" src="imgs/up.png">');
				$('#salesDate').html('截止至 '+Pridtarr(salesDateUser));
				$('#salesDaily_Div').find('#sales_table').hide();
				$('#salesDaily_Div').find('#trendId').show();
				getTrend();
			});
			if($('#salesDaily_Div').find('#sales_btn_trend').hasClass('active')){
				getTrend();
			}
			$('#sales_table').css('visibility','visible');
			$('#salesModel').modal('hide');
	    }
	});
}
function getRights(){ // 获取当前用户权限
	$.ajax({
		type:'POST',
		url:getContextPath() + "/pm/app/platSale/getRights",
		data:{
			username:username_index //当 前用户
		},
		dataType:'json',
		success:function(rightsData){
				rights_data = rightsData.data;
			//rights_data = "-2";
			var switch_btn = '';
			switch(rights_data){
				case '1' : //表示当前用户有完整的大区权限     可切换
					$("#sales_btn_trend").hide();
					$('.btn').css('width', '25%');
					switch_btn = '<input type="checkbox" name="check-s" class="lcs_check lcs_tt1" checked="checked" autocomplete="off" />';
					$("#switch").html(switch_btn);
					//区域   分公司  切换
					$('input[name="check-s"]').lc_switch();
					dimType = "1";
					dateSelected(selectDate);
					break;
				case '0' : //表示有总部权限  // 不显示‘全国排名’
					$("#sales_btn_trend").show();
					switch_btn = '<input type="checkbox" name="check-s" class="lcs_check lcs_tt1" checked="checked" autocomplete="off" />';
					$("#switch").html(switch_btn);
					$('input[name="check-s"]').lc_switch();
					/*if($("#switch").find(".lcs_wrap").find(".lcs_switch ").hasClass("lcs-on")){*/
						dimType = "1";
						dateSelected(selectDate);
					/*}*/
					//$("#switch").find(".lcs_wrap").find(".lcs_switch ").click();
					break;
				case '-1' : //表示没有完整的大区权限   （只显示分公司）不可切换
					$("#sales_btn_trend").hide();
					$('.btn').css('width', '25%');
					switch_btn = '<input type="checkbox" name="check-s" class="lcs_check lcs_tt1" autocomplete="off" />';
					$("#switch").html(switch_btn);
					$('input[name="check-s"]').lc_switch();
					$("#condition_list .tabTit_First").text("分公司");
					dimType = "2";
					dateSelected(selectDate);
					$("#switch .lcs_wrap").find(".lcs_switch").addClass("disabled");
					break;
				case '-2' : //表示当前用户有完整的大区权限     可切换
		        	$('#norights').show();
		        	return;
					break;
			}
		}
	});
};
var selData;
function getInit(){ // 获取页面初始化下拉数据
	$.ajax({
		type:'POST',
		url: getContextPath() + "/pm/app/platSale/getInit",
		data:{
			username:username_index //当 前用户
		},
		dataType:'json',
		success:function(initSel){
			selData = initSel.data;
			$("#menu_tab_Box").children(".menu_tabfont").eq(0).click();
			/*初始化页面下拉菜单默认选择不限
			全部产品
			$('#sub-menu-allpro .sub-menu_li').click(function(){ // 选中
				$(this).parent().parent().find(".menu-allpro_font").text($(this).find('a').text().trim())
				if($(this).find('a').text().trim() + '' === '不限'){
					$(this).parent().parent().parent().find(".menu-allpro_font").text("全部项目");
				}
				$(this).find('.sub-menu_img').css('display', 'inline-block'); // 选中勾
				$(this).siblings().find('.sub-menu_img').css('display', 'none');
				$(this).find('a').css('color', '#6488ff'); // 字的颜色
				$(this).siblings().find('a').css('color', '#000');
				project_id = $(this).find("a").attr("data-id");
				dateSelected(selectDate);
			});
			
			订单来源
			$('#sub-menu-orderS .sub-menu_li').click(function(){ // 选中
				$(this).parent().parent().find(".menu-orders_font").text($(this).find('a').text().trim())
				if($(this).find('a').text().trim() + '' === '不限'){
					$(this).parent().parent().parent().find(".menu-orders_font").text("订单来源");
				}
				$(this).find('.sub-menu_img').css('display', 'inline-block'); // 选中勾
				$(this).siblings().find('.sub-menu_img').css('display', 'none');
				$(this).find('a').css('color', '#6488ff'); // 字的颜色
				$(this).siblings().find('a').css('color', '#000');
				orderS_id = $(this).find("a").attr("data-id");
				dateSelected(selectDate);
			});
			渠道类型
			$('#sub-menu-channelT .sub-menu_li').click(function(){ // 选中
				$(this).parent().parent().find(".menu-channel_font").text($(this).find('a').text().trim())
				if($(this).find('a').text().trim() + '' === '不限'){
					$(this).parent().parent().parent().find(".menu-channel_font").text("渠道类型");
				}
				$(this).find('.sub-menu_img').css('display', 'inline-block'); // 选中勾
				$(this).siblings().find('.sub-menu_img').css('display', 'none');
				$(this).find('a').css('color', '#6488ff'); // 字的颜色
				$(this).siblings().find('a').css('color', '#000');
				channel_id = $(this).find("a").attr("data-id");
				dateSelected(selectDate);
			});*/
		}
	})
};
function initSelect(){
	var allProduct_arr = selData.allProduct, // 全部产品
	i = 0,
	allProduct_len = allProduct_arr.length,
	allProduct_html = '<li class="sub-menu_li"><a data-id="">不限</a><img class="sub-menu_img" src="imgs/ok.png"></li>',
	orderSrc_arr = selData.orderSrc, // 订单来源
	j = 0,
	orderSrc_len = orderSrc_arr.length,
	orderSrc_html = '<li class="sub-menu_li"><a data-id="">不限</a><img class="sub-menu_img" src="imgs/ok.png"></li>',
	channelType_arr = selData.channelType, // 渠道类型 (暂时不取数据)
	k = 0,
	channelType_len = channelType_arr.length,
	channelType_html = '<li class="sub-menu_li"><a data-id="">不限</a><img class="sub-menu_img" src="imgs/ok.png"></li>';
	/*全部产品*/
	for(;i<allProduct_len;i++){
		allProduct_html += '<li class="sub-menu_li"><a data-id="'+ allProduct_arr[i][0] +'">'+ allProduct_arr[i][1] +'</a><img class="sub-menu_img" src="imgs/ok.png"></li>';
	}
	$("#sub-menu-allpro").html(allProduct_html);
	/*订单来源*/
	for(;j<orderSrc_len;j++){
		orderSrc_html += '<li class="sub-menu_li"><a data-id="'+ orderSrc_arr[j][0] +'">'+ orderSrc_arr[j][1] +'</a><img class="sub-menu_img" src="imgs/ok.png"></li>';
	}
	$("#sub-menu-orderS").html(orderSrc_html);
	/*渠道类型*/
	for(;k<channelType_len;k++){
		channelType_html += '<li class="sub-menu_li"><a data-id="'+ channelType_arr[k][0] +'">'+ channelType_arr[k][1] +'</a><img class="sub-menu_img" src="imgs/ok.png"></li>';
	}
	$("#sub-menu-channelT").html(channelType_html);
	$("#sub-menu-allpro").find(".sub-menu_li>a").each(function(i,items){
		if($(this).text().trim()+'' === '不限'){
			//$(this).parent().click();
			/*模拟选中不限*/
			$(this).parent().find('.sub-menu_img').css('display', 'inline-block'); // 选中勾
			$(this).css('color', '#6488ff'); // 字的颜色
			project_id = "";
			$("#sub-menu-allpro").css('display', 'none');
			$(this).parent().parent().parent().find(".subimg").attr("src","imgs/up.png");
			
			$(this).parent().parent().parent().css("color","#000");
		}
	});
	$("#sub-menu-orderS").find(".sub-menu_li>a").each(function(i,items){
		if($(this).text().trim()+'' === '不限'){
			//$(this).parent().click();
			/*模拟选中不限*/
			$(this).parent().find('.sub-menu_img').css('display', 'inline-block'); // 选中勾
			$(this).css('color', '#6488ff'); // 字的颜色
			orderS_id = "";
			$("#sub-menu-orderS").css('display','none');
			$(this).parent().parent().parent().find(".subimg").attr("src","imgs/up.png");
			$(this).parent().parent().parent().css("color","#000");
		}
	});
	$("#sub-menu-channelT").find(".sub-menu_li>a").each(function(i,items){
		if($(this).text().trim()+'' === '不限'){
			//$(this).parent().click();
			/*模拟选中不限*/
			$(this).parent().find('.sub-menu_img').css('display', 'inline-block'); // 选中勾
			$(this).css('color', '#6488ff'); // 字的颜色
			channel_id = "";
			$("#sub-menu-channelT").css('display','none');
			$(this).parent().parent().parent().find(".subimg").attr("src","imgs/up.png");
			$(this).parent().parent().parent().css("color","#000");
		}
	});
	$('.menu-allpro_font').html('全部项目');
	$('.menu-orders_font').html('全部产品');	
	$('.menu-channel_font').html('全部渠道');
	
	/*初始化页面下拉菜单默认选择不限*/
	/*全部产品*/
	$('#sub-menu-allpro .sub-menu_li').click(function(){ // 选中
		$(this).parent().parent().find(".menu-allpro_font").text($(this).find('a').text().trim())
		if($(this).find('a').text().trim() + '' === '不限'){
			$(this).parent().parent().parent().find(".menu-allpro_font").text("全部项目");
		}
		$(this).find('.sub-menu_img').css('display', 'inline-block'); // 选中勾
		$(this).siblings().find('.sub-menu_img').css('display', 'none');
		$(this).find('a').css('color', '#6488ff'); // 字的颜色
		$(this).siblings().find('a').css('color', '#000');
		project_id = $(this).find("a").attr("data-id");
		dateSelected(selectDate);
	});
	
	/*订单来源*/
	$('#sub-menu-orderS .sub-menu_li').click(function(){ // 选中
		$(this).parent().parent().find(".menu-orders_font").text($(this).find('a').text().trim())
		if($(this).find('a').text().trim() + '' === '不限'){
			$(this).parent().parent().parent().find(".menu-orders_font").text("全部产品");
		}
		$(this).find('.sub-menu_img').css('display', 'inline-block'); // 选中勾
		$(this).siblings().find('.sub-menu_img').css('display', 'none');
		$(this).find('a').css('color', '#6488ff'); // 字的颜色
		$(this).siblings().find('a').css('color', '#000');
		orderS_id = $(this).find("a").attr("data-id");
		dateSelected(selectDate);
	});
	/*渠道类型*/
	$('#sub-menu-channelT .sub-menu_li').click(function(){ // 选中
		$(this).parent().parent().find(".menu-channel_font").text($(this).find('a').text().trim())
		if($(this).find('a').text().trim() + '' === '不限'){
			$(this).parent().parent().parent().find(".menu-channel_font").text("全部渠道");
		}
		$(this).find('.sub-menu_img').css('display', 'inline-block'); // 选中勾
		$(this).siblings().find('.sub-menu_img').css('display', 'none');
		$(this).find('a').css('color', '#6488ff'); // 字的颜色
		$(this).siblings().find('a').css('color', '#000');
		channel_id = $(this).find("a").attr("data-id");
		dateSelected(selectDate);
	});
}
	getInit(); //获取页面初始化下拉数据
	/*tab  2 下拉*/
	$('.menu_tab_drap li').click(function() { //下拉 
		$(this).siblings().find('.subimg').attr('src','imgs/up.png');
		$(this).css('color','#6488ff').siblings().css('color','#000');
		//$(this).find('.sub-menu').slideToggle(500).css('display', 'block'); 
		$(this).find('.sub-menu').slideToggle(function(){
		        if($(this).is(":visible")){
		        	$("#selectModel").show();
		        	$(this).parent().find('.subimg').attr('src','imgs/down.png');
		        }else{
		        	 $("#selectModel").hide();
		        	 $(this).parent().find('.subimg').attr('src','imgs/up.png');
		        }
		    });
		//$("#selectModel").css("height",$(document).height());     
	   // $("#selectModel").css("width",$(document).width());     
		$(this).siblings().find('.sub-menu').css('display', 'none');
	}); 
	$('#selectModel').click(function(){
		$('.sub-menu').hide();
		$("#selectModel").hide(); 
		$('.menu_tab_tit').find('.subimg').attr('src','imgs/up.png');
	})
