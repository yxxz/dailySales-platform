var trendIdoption = function(){
	return {
		    tooltip : {
		        trigger: 'axis',
		        backgroundColor:'#000',
		        textStyle: {
		        		color: '#eee'
		        	},
		        	formatter:function(data){
		        		var tmp = '';
		        		$('#trendId').removeClass('hidetooltip');
		        		if(!data[0].seriesName){
		        			$('#trendId').addClass('hidetooltip');
		        		}
		        		for (var i = 0; i < data.length; i++) {
		        			var seriesData = data[i].data,
		        				showDate = '日期：'+ data[i].name+'</br>',
		        				color = '#f959b0';
		        			if(data[i].seriesName+'' === '进件量'){
		        				color = '#4082EE'
		        			}
		        			if(seriesData +""!== "0"){
		        				if(data[i].seriesName+'' === '审批通过率' || data[i].seriesName+'' === '进件转化率'){
			        				seriesData = data[i].data +'%';
			        				showDate = '';
			        				color = '#f7aa4e'
			        			}else if(data[i].seriesName+'' === '银行放款金额'){
			        				seriesData = data[i].data +'万元';
			        				showDate = '';
			        				color = '#C0A9FD';
			        			}else if(data[i].seriesName+'' === '易鑫放款金额'){
			        				seriesData = data[i].data +'万元';
			        				showDate = '';
			        				color = '#A9C3FF';
			        			}
		        			}else{
		        				seriesData = data[i].data;
		        				showDate = '日期：'+ data[i].name+'</br>';
		        				if(seriesData +""=== "0"){
		        					showDate = '';
		        					if(data[i].seriesName+'' === '进件转化率'){
		        						color = '#f7aa4e'
		        					}else if(data[i].seriesName+'' === '银行放款金额'){
		        						color = '#C0A9FD'
		        					}else if(data[i].seriesName+'' === '易鑫放款金额'){
		        						color = '#A9C3FF'
		        					}
		        				}
		        			}
		        			if(data[i].seriesName && data[i].data !== ""){
		        				if(data[i].seriesName+'' === '审批通过率'){
		        					showDate = '日期：'+ data[i].name+'</br>';
		        					color = 'rgb(85,205,255)'
		        				}else if(data[i].seriesName+'' === '成交融资额'){
		        					showDate = '日期：'+ data[i].name+'</br>';
		        					if(seriesData +""=== "0"){
		        						seriesData = data[i].data;
			        				}else{
			        					seriesData = data[i].data +'万元';
			        				}
		        				}
		        				tmp += showDate;
		        				tmp += data[i].seriesName + ' : <span style="color:'+color+'">' + seriesData + '</span><br>';
		        			}
						}
		                return tmp;
		        	}
		    },
		    legend: {
		    	y:50,
		        itemWidth:10,  //图例标记的图形宽度
		        itemHeight:10, //图例标记的图形高度
		        data:[],
		        selectedMode:false,
		        textStyle: {  	    		
		    		color: '#F959B0'
		    	}
		    },
		    calculable : false,
		    animation : false,
		    dataZoom : {
		        show : true,
		        realtime : true,
		        start : 50,
		        end : 100,
		        height:35,
		        dataBackgroundColor: '#ECF3FF',
		        handleColor:'rgba(131,175,246,1)',
		        fillerColor:'rgba(131,175,246,0.2)'
		    },
		    grid: { // 控制图的大小，调整下面这些值就可以，
		        y: 60,
		        y2:85,
		        x2:40,
		        x:50,
		        borderWidth:0
		    },
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            axisLabel : {  
		                show:true,           	
		            	textStyle : {
		            		color:'#666'
		            	}
		           	},
		           	splitLine:{                    
			        	lineStyle: {
			        		type: 'solid',
		                    color:'#e5e5e5'
			        	}
			        },
			        axisLine:{
		                show:false
		            },
		            axisTick:{
		                show:false
		            },
		            data : []
		        }
		    ],
		    yAxis : [
		        { // 左轴
		            type : 'value',
		           
		            axisLine:{
		                show:false
		            },
		            axisLabel : {  
		                show:true,  
		                formatter: '{value}',
		            	textStyle : {
		            		color:'#666'
		            	}
		           	},
		           	splitLine:{                    
			        	lineStyle: {
			        		type: 'solid',
		                    color:'#e5e5e5'
			        	}
			        },
			        axisTick:{
		                show:false
		            }
		        },{ //右轴
		            type : 'value',
		            /*max :"",*/
		            axisLine:{
		                show:false
		            },
		            axisLabel : {  
		                show:true, 
		                formatter: '{value} %', 
		            	textStyle : {
		            		color:'#666'
		            	}
		           	},
		           	splitLine:{
		           		show:false,
			        	lineStyle: {
			        		type: 'solid',
		                    color:'#e5e5e5'
			        	}
			        },
			        axisTick:{
		                show:false
		            }
		        }
		    ],
		    series : [
		        {
		            //name:'提报量',
		            type:'line',
		            icon:'bar',
		            smooth: true,
		            showAllSymbol: true,
		            symbol: 'circle',
		            itemStyle: {
		            	normal: {
		            		color: '#F959B0',
		            		/*label:{
		                        show:false,
		                        position:'bottom'
		                      }*/
		            	}
		            	
		            },
		            data:[]
		        },{
		            //name:'成交合同量',
		            type:'line',
		            icon:'bar',
		            smooth: true,
		            showAllSymbol: true,
		            symbol: 'circle',
		            itemStyle: {
		            	normal: {
		            		color: '#ffd38c',
		            		label:{
		                        show:true,
		                        position:'top'
		                      },
		                      /*areaStyle: {type: 'default'}*/
		            	}
		            },
		            data:[]
		        }
		        ,{
		            //name:'成交合同量',
		            type:'line',
		            icon:'bar',
		            smooth: true,
		            showAllSymbol: true,
		            symbol: 'circle',
		            itemStyle: {
		            	normal: {
		            		color: '#ffd38c',
		            		label:{
		                        show:true,
		                        position:'top'
		                      },
		                      /*areaStyle: {type: 'default'}*/
		            	}
		            },
		            data:[]
		        }
		    ],
		    noDataLoadingOption: {
		        text: '暂无数据',
		        effect: 'spin',
		        effectOption: {
		            backgroundColor:'rgba(0,0,0,0)'
		        }
		     }
		};    
};            