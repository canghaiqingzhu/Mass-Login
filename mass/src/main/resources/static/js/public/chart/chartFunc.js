var tempDataQuery = {}, legendFontSize = 18, xAxisFontSize = 18, yAxisFontSize = 18, pieFontSize = 18, barFontSize = 18, titleFontSize = 30, rateTitleFontSize = 25;
var toolbox = {
	show : true,
	top : '20px',
	right : '100px',
	feature : {
		saveAsImage : {
			show : true
		}
	}
};
var C = {
	initHighChart : function(callback) {
		var js = [ 'js/public/echarts/echarts.js', 'js/public/echarts/macarons.js' ];
		P.loadJsOrCss(js, P.getScript, function() {
			if (P.isFunc(callback))
				callback();
		});
	},
	initDrugUserMoreLink : function(id, data, link, categories, clickFunc) {
		var option = {
			title : {
				text : '吸毒人员社会关系图',
				top : 'bottom',
				left : 'right'
			},
			tooltip : {},
			legend : [ {
				data : categories.map(function(a) {
					return a.name;
				})
			} ],
			animationDuration : 1500,
			animationEasingUpdate : 'quinticInOut',
			series : [ {
				name : '吸毒人员社会关系图',
				type : 'graph',
				layout : 'force',
				focusNodeAdjacency : true,
				roam : true,
				label : {
					normal : {
						position : 'right',
						formatter : '{b}'
					}
				},
				lineStyle : {
					normal : {
						curveness : 0.1,
						color : 'source',
					}
				},
				edgeLabel : {
					normal : {
						show : true,
						formatter : function(x) {
							return x.data.name;
						}
					}
				},
				force : {
					repulsion : 650,
					gravity : 0.25,
					edgeLength : [ 100, 150 ]
				},
				categories : categories,
				data : data,
				links : link
			} ]
		};
		C.showChartInfo(id, option, clickFunc);
	},
	initDrugUserLink : function(id, data, link) {
		var option = {
			tooltip : {
				formatter : function(x) {
					return x.data.des;
				}
			},
			series : [ {
				type : 'graph',
				layout : 'force',
				symbolSize : 58,
				roam : true,
				edgeSymbol : [ 'circle', 'arrow' ],
				// edgeSymbolSize: [80, 10],
				edgeLabel : {
					normal : {
						textStyle : {
							fontSize : 20
						}
					}
				},
				force : {
					repulsion : 2500,
					edgeLength : [ 10, 50 ]
				},
				draggable : true,
				itemStyle : {
					normal : {
						color : '#4b565b'
					}
				},
				lineStyle : {
					normal : {
						width : 2,
						color : '#4b565b'
					}
				},
				edgeLabel : {
					normal : {
						show : true,
						formatter : function(x) {
							return x.data.name;
						}
					}
				},
				label : {
					normal : {
						show : true,
						textStyle : {}
					}
				},
				data : data,
				links : link
			} ]
		};
		C.showChartInfo(id, option);
	},
	initDeptTypeBarAndPie : function(id, dataLabel, data) {
		var lineLabel = [], series = [], pieData = [];
		var clearIndex = [];
		$.each(data, function(k, v) {
			var num = 0;
			$.each(v.value, function(i) {
				num += v.value[i];
			})
			if (num != 0) {
				pieData.push({
					name : k,
					value : num
				});
				lineLabel.push(k);
				series.push({
					name : k,
					stack : '人数',
					type : 'bar',
					label : {
						normal : {
							show : true,
							position : 'inside',
							formatter : function(params) {
								return params.data > 0 ? params.data : '';
							},
							fontSize : barFontSize
						}
					},
					data : v.value
				});
			}
		});
		series.push({
			type : 'pie',
			center : [ '65%', '35%' ],
			radius : [ '12%', '25%' ],
			tooltip : {
				trigger : 'item',
				formatter : "{b} : {c} ({d}%)"
			},
			label : {
				formatter : '{b} : {c} ({d}%)',
				fontSize : pieFontSize
			},
			data : pieData
		});
		var option = {
			tooltip : {
				trigger : 'axis',
				axisPointer : {
					type : 'shadow'
				}
			},
			legend : {
				textStyle : {
					fontSize : legendFontSize
				},
				bottom : '1%',
				data : lineLabel
			},
			grid : {
				left : '3%',
				right : '80px',
				top : '8%',
				bottom : '10%',
				containLabel : true
			},
			toolbox : toolbox,
			xAxis : {
				axisLabel : {
					fontSize : xAxisFontSize
				},
				name : '人数',
				nameTextStyle : {
					fontSize : xAxisFontSize
				},
				type : 'value'
			},
			yAxis : {
				type : 'category',
				axisLabel : {
					show : true,
					fontSize : xAxisFontSize
				},
				data : dataLabel
			},
			series : series
		};
		C.showChartInfo(id, option);
	},
	initDepartmentSimpleBar : function(id, dataLabel, data, clickFunc) {
		var label = [];
		data.sort(function(a, b) {
			return a.value - b.value;
		})
		var sum = 0;
		$.each(data, function(i) {
			var v = data[i].value;
			sum += v;
			label.push(data[i].name)
		});
		var option = {
			tooltip : {
				trigger : 'item'
			},
			title : [ {
				id : 'statistic',
				text : '总人数: ' + sum,
				top : 0,
				left : 'center',
				textStyle : {
					fontSize : titleFontSize
				}
			} ],
			grid : {
				left : '3%',
				right : '3%',
				bottom : '3%',
				top : 40,
				containLabel : true
			},
			toolbox : {
				show : true,
				top : '10px',
				right : '50px',
				feature : {
					saveAsImage : {
						show : true
					}
				}
			},
			xAxis : {
				type : 'value',
				position : 'top',
				splitLine : {
					show : false
				},
				axisLine : {
					show : false
				},
				axisTick : {
					show : false
				},
				axisLabel : {
					show : false
				},
				minInterval : 1,
				splitNumber : 3
			},
			yAxis : {
				type : 'category',
				axisLabel : {
					fontSize : xAxisFontSize
				},
				splitLine : {
					show : false
				},
				axisLine : {
					show : false
				},
				axisTick : {
					show : false
				},
				data : label
			},
			series : [ {
				id : 'bar',
				type : 'bar',
				itemStyle : {
					normal : {
						color : '#ddb926'
					}
				},
				label : {
					show : true,
					position : 'right',
					fontSize : barFontSize,
					color : '#008acd'
				},
				data : data
			} ]
		};
		C.showChartInfo(id, option, clickFunc);
	},
	initBigDoubleSimpleBarX : function(id, dataLabel, data) {
		var legend = [], series = [];
		$.each(data, function(k, v) {
			legend.push(k);
			series.push({
				name : k,
				type : 'bar',
				stack : '人数',
				label : {
					normal : {
						show : true,
						position : 'inside',
						formatter : function(params) {
							return params.data > 0 ? params.data : '';
						},
						fontSize : barFontSize
					}
				},
				data : v.value
			});
		});
		var option = {
			tooltip : {
				trigger : 'axis',
				axisPointer : {
					type : 'shadow'
				}
			},
			legend : {
				textStyle : {
					fontSize : legendFontSize
				},
				data : legend
			},
			toolbox : toolbox,
			grid : {
				left : '3%',
				right : '60px',
				bottom : '3%',
				containLabel : true
			},
			xAxis : {
				axisLabel : {
					fontSize : xAxisFontSize
				},
				name : '人数',
				nameTextStyle : {
					fontSize : xAxisFontSize
				},
				type : 'value'
			},
			yAxis : {
				type : 'category',
				axisLabel : {
					fontSize : xAxisFontSize
				},
				data : dataLabel
			},
			series : series
		};
		C.showChartInfo(id, option);
	},
	initBigDoubleSimpleRadar : function(id, dataLabel, dataList) {
		var option = {
			tooltip : {
				trigger : 'item',
				formatter : "{b}: {c} ({d}%)"
			},
			legend : {
				textStyle : {
					fontSize : legendFontSize
				},
				data : dataLabel
			},
			radar : {
				name : {
					textStyle : {
						color : '#fff',
						backgroundColor : '#999',
						borderRadius : 3,
						padding : [ 3, 5 ]
					}
				},
				indicator : dataLabelMax
			},
			series : [ {
				type : 'radar',
				data : dataList
			} ]
		};
		C.showChartInfo(id, option);
	},
	initBigTwoSimpleBar : function(id, dataLabel, dataList) {
		var option = {
			tooltip : {
				trigger : 'item',
				formatter : "{b}: {c} ({d}%)"
			},
			legend : {
				textStyle : {
					fontSize : legendFontSize
				},
				orient : 'vertical',
				x : 'left',
				top : 'middle',
				data : dataLabel
			},
			toolbox : toolbox,
			series : [ {
				name : '人数',
				type : 'pie',
				clockWise : true,
				radius : [ 0, 80 ],
				label : {
					normal : {
						formatter : function(v) {
							if (P.notEmpty(v.name) && '无' != v.name) {
								return v.name + ': ' + v.value + ' (' + v.percent + '%)';
							} else {
								return '';
							}
						},
						fontSize : pieFontSize
					},
				},
				labelLine : {
					normal : {
						show : true
					}
				},
				hoverAnimation : false,
				data : dataList[0]
			}, {
				name : '人数',
				type : 'pie',
				clockWise : true,
				radius : [ 120, 200 ],
				label : {
					normal : {
						formatter : function(v) {
							if (P.notEmpty(v.name) && '无' != v.name) {
								return v.name + ': ' + v.value + ' (' + v.percent + '%)';
							}
							return '';
						},
						fontSize : pieFontSize
					},
				},
				labelLine : {
					normal : {
						show : true
					}
				},
				hoverAnimation : false,
				data : dataList[1]
			} ]
		};
		C.showChartInfo(id, option);
	},
	initBigThreeSimpleBar : function(id, dataLabel, dataList) {
		var option = {
			tooltip : {
				trigger : 'item',
				formatter : "{b}: {c} ({d}%)"
			},
			legend : {
				textStyle : {
					fontSize : legendFontSize
				},
				orient : 'vertical',
				x : 'left',
				data : dataLabel
			},
			toolbox : toolbox,
			series : [ {
				name : '人数',
				type : 'pie',
				clockWise : true,
				radius : [ 0, 60 ],
				label : {
					normal : {
						formatter : function(v) {
							if (P.notEmpty(v.name) && '无' != v.name) {
								return v.name + ': ' + v.value + ' (' + v.percent + '%)';
							} else {
								return '';
							}
						},
						fontSize : pieFontSize
					},
				},
				labelLine : {
					normal : {
						show : true
					}
				},
				hoverAnimation : false,
				data : dataList[0]
			}, {
				name : '人数',
				type : 'pie',
				clockWise : true,
				radius : [ 100, 160 ],
				label : {
					normal : {
						formatter : function(v) {
							if (P.notEmpty(v.name) && '无' != v.name) {
								return v.name + ': ' + v.value + ' (' + v.percent + '%)';
							} else {
								return '';
							}
						},
						fontSize : pieFontSize
					},
				},
				labelLine : {
					normal : {
						show : true
					}
				},
				hoverAnimation : false,
				data : dataList[1]
			}, {
				name : '人数',
				type : 'pie',
				clockWise : true,
				radius : [ 200, 260 ],
				label : {
					normal : {
						formatter : function(v) {
							if (P.notEmpty(v.name) && '无' != v.name) {
								return v.name + ': ' + v.value + ' (' + v.percent + '%)';
							}
							return '';
						},
						fontSize : pieFontSize
					},
				},
				labelLine : {
					normal : {
						show : true
					}
				},
				hoverAnimation : false,
				data : dataList[2]
			} ]
		};
		C.showChartInfo(id, option);
	},
	initBigDoubleSimpleBar : function(id, dataLabel, data, smallData) {
		var option = {
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b}: {c} ({d}%)"
			},
			legend : {
				textStyle : {
					fontSize : legendFontSize
				},
				orient : 'vertical',
				x : 'left',
				data : dataLabel
			},
			series : [ {
				name : '人数',
				type : 'pie',
				selectedMode : 'single',
				radius : [ 0, '30%' ],
				label : {
					normal : {
						position : 'inner',
						fontSize : pieFontSize
					},
				},
				labelLine : {
					normal : {
						show : false
					}
				},
				data : data
			}, {
				name : '人数',
				type : 'pie',
				normal : {
					fontSize : pieFontSize
				},
				radius : [ '40%', '60%' ],
				data : smallData
			} ]
		};
		C.showChartInfo(id, option);
	},
	initBigSimpleBar : function(id, dataLabel, data, clickFunc) {
		var seriesData = [];
		$.each(data, function(i) {
			seriesData.push(data[i].value);
		});
		var option = {
			xAxis : {
				type : 'category',
				axisLabel : {
					fontSize : xAxisFontSize
				},
				data : dataLabel
			},
			yAxis : {
				axisLabel : {
					fontSize : xAxisFontSize
				},
				type : 'value'
			},
			series : [ {
				data : seriesData,
				type : 'bar',
			} ]
		};
		C.showChartInfo(id, option, clickFunc);
	},
	initBigSimplePie : function(id, dataLabel, data, clickFunc, title, dataColor) {
		var series = [], seriesData = [];
		$.each(data, function(i) {
			seriesData.push(data[i]);
		});
		series.push({
			type : 'pie',
			radius : '65%',
			center : [ '50%', '55%' ],
			label : {
				formatter : '{b} : {c} ({d}%)',
				fontSize : pieFontSize
			},
			data : seriesData
		});
		var option = {
			tooltip : {
				trigger : 'item',
				formatter : "{b} : {c} ({d}%)"
			},
			toolbox : toolbox,
			legend : {
				textStyle : {
					fontSize : legendFontSize
				},
				orient : 'vertical',
				left : 'left',
				data : dataLabel
			},
			series : series
		};
		if (P.notEmpty(title)) {
			option = $.extend(true, option, {
				title : {
					text : title,
					x : 'center',
					textStyle : {
						fontSize : titleFontSize
					}
				}
			});
		}
		if (dataColor) {
			var colorInfo = [];
			$.each(dataColor, function(k, v) {
				colorInfo.push(v);
			});
			option = $.extend(true, option, {
				color : colorInfo
			});
		}
		C.showChartInfo(id, option, clickFunc);
	},
	initBigSimpleLine : function(id, dataLabel, data, clickFunc) {
		var series = [], legendLabel = [];
		$.each(data, function(k, v) {
			var oneData = $.extend(true, v, {
				name : k,
				type : 'bar',
				stack : '总量',
				itemStyle : {
					normal : {
						show : true,
						barBorderRadius : 10,
						borderWidth : 0,
						borderColor : '#333'
					}
				},
				barGap : '0%',
				barCategoryGap : '50%',
				label : {
					normal : {
						show : true,
						position : 'insideRight',
						formatter : function(params) {
							return params.data > 0 ? params.data : '';
						}
					},
				},
				data : v.value
			});
			series.push(oneData);
			legendLabel.push(k);
			if (P.isArray(v.searchQuery)) {
				$.each(v.searchQuery, function(i) {
					tempDataQuery[dataLabel[i] + ',' + k] = v.searchQuery[i];
				});
			}
		});
		var option = {
			tooltip : {
				trigger : 'axis',
				axisPointer : { // 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend : {
				textStyle : {
					fontSize : legendFontSize
				},
				data : legendLabel
			},
			xAxis : {
				axisLabel : {
					fontSize : xAxisFontSize
				},
				type : 'value'
			},
			yAxis : {
				axisLabel : {
					fontSize : xAxisFontSize
				},
				type : 'category',
				data : dataLabel
			},
			series : series
		};
		C.showChartInfo(id, option, clickFunc);
	},
	initPieRingCircular : function(id, dataLabel, data) {
		var dataAxis = [];
		$.each(dataLabel, function(i) {
			if (i == 0) {
				dataAxis.push({
					value : dataLabel[i],
					textStyle : {
						fontSize : 25,
					}
				});
			} else {
				dataAxis.push(dataLabel[i]);
			}
		});
		var nameNum = 0;
		var series = [];
		var totalData = [];
		var totalName = [];
		$.each(data, function(k, v) {
			var oneData = $.extend(true, v, {
				type : 'bar',
				data : v.value,
				coordinateSystem : 'polar',
				stack : 'a',
				itemStyle : {
					normal : {
						borderWidth : 4,
						borderColor : '#ffffff'
					},
					emphasis : {
						borderWidth : 0,
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				}
			});
			series.push(oneData);
			totalData.push(v.value);
			totalName.push(k);
		});
		var oneData = [];
		$.each(totalData, function(i) {
			oneData.push(totalData[i][nameNum])
		})
		series.push({
			name : '流程类型',
			type : 'pie',
			radius : [ '80%', '85%' ],
			avoidLabelOverlap : false,
			label : {
				normal : {
					show : true,
					position : 'outside',
					fontSize : pieFontSize,
					formatter : '{b} : {c} ({d}%)'
				},
				emphasis : {
					show : true,
					textStyle : {
						fontSize : pieFontSize,
						fontWeight : 'normal'
					}
				},
			},
			labelLine : {
				normal : {
					show : false
				}
			},
			data : oneData,
			legend : {
				textStyle : {
					fontSize : legendFontSize
				},
				show : true,
				orient : 'vertical',
				x : 'right',
				y : 'top',
				data : totalName
			},
			itemStyle : {
				normal : {
					borderWidth : 3,
					borderColor : '#ffffff',
				},
				emphasis : {
					borderWidth : 3,
					shadowBlur : 10,
					shadowOffsetX : 0,
					shadowColor : 'rgba(0, 0, 0, 0.5)'
				}
			}
		});
		var option = {
			tooltip : {
				trigger : 'item',
				padding : 10,
				backgroundColor : '#222',
				borderColor : '#777',
				borderWidth : 1,
				formatter : tooltipFormatter
			},
			angleAxis : {
				type : 'category',
				data : dataAxis,
				z : 10
			},
			polar : {
				center : [ '50%', '50%' ],
				radius : 180
			},
			radiusAxis : {},
			series : series
		}
		C.showChartInfo(id, option, clickFunc);
		function tooltipFormatter(params) {
			var valuesFormatter = [];
			if (params.componentSubType == 'pie') {
				valuesFormatter.push('<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' + option.angleAxis.data[nameNum].value + '<br>' + '</div>' + '<span style="color:'
						+ params.color + '">' + params.name + '</span>: ' + params.value);
			} else {
				valuesFormatter.push('<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' + params.seriesName + '</div>' + '<span style="color:' + params.color + '">'
						+ params.name + '</span>: ' + params.value + '<br>');
			}
			return valuesFormatter;
		}
		function clickFunc(params, myChart) {
			if (params.componentSubType != 'pie') {
				nameNum = params.dataIndex;
				var oneData = [];
				$.each(totalData, function(i) {
					oneData.push(totalData[i][nameNum])
				})
				option.series[option.series.length - 1].data = oneData;
				var labelData = dataLabel;
				labelData[nameNum] = {
					value : labelData[nameNum],
					textStyle : {
						fontSize : 25,
					}
				};
				option.angleAxis.data = labelData;
				myChart.setOption(option);
			}
		}
	},
	/** 仪表盘 */
	initVerySmallSimpleRate : function(id, rate, name, title, bColor) {
		bColor = bColor || 'white';
		var option = {
			tooltip : {
				formatter : "{a} <br/>{b} : {c}%"
			},
			// backgroundColor : bColor,
			series : [ {
				name : title,
				type : 'gauge',
				detail : {
					formatter : '{value}%',
					fontSize : 15,
					offsetCenter : [ 0, '25%' ]
				},
				title : {
					fontSize : 12,
					offsetCenter : [ 0, '-30%' ]
				},
				splitLine : {
					length : 10
				},
				axisLine : {
					show : true,
					lineStyle : {
						width : 10,
						shadowBlur : 0,
						color : [ [ 0.3, '#fd666d' ], [ 0.7, '#37a2da' ], [ 1, '#67e0e3' ] ]
					}
				},
				data : [ {
					value : rate,
					name : name
				} ]
			} ]
		};
		C.showChartInfo(id, option);
	},
	/** 仪表盘 */
	initSmallSimpleRate : function(id, rate, name, title, bColor) {
		bColor = bColor || 'white';
		var option = {
			tooltip : {
				formatter : "{a} <br/>{b} : {c}%"
			},
			toolbox : toolbox,
			series : [ {
				name : title,
				type : 'gauge',
				detail : {
					formatter : '{value}%'
				},
				axisLine : {
					show : true,
					lineStyle : {
						width : 12,
						shadowBlur : 0,
						color : [ [ 0.3, '#fd666d' ], [ 0.7, '#37a2da' ], [ 1, '#67e0e3' ] ]
					}
				},
				title : {
					show : true,
					fontSize : rateTitleFontSize
				},
				data : [ {
					value : rate,
					name : name
				} ]
			} ]
		};
		C.showChartInfo(id, option);
	},
	initThreeRate : function(id, rate, total, complete) {
		var option = {
			tooltip : {
				formatter : function(data) {
					if (data.data) {
						var d = data.data;
						return d.name + '<br/>' + d.value + ' ' + d.show;
					}
				}
			},
			toolbox : toolbox,
			series : [ {
				name : '任务完成率(' + rate + '%)',
				type : 'gauge',
				center : [ '25%', '70%' ],
				radius : '85%',
				min : 0,
				max : 100,
				startAngle : 180,
				endAngle : 0,
				splitNumber : 10,
				axisLine : {
					lineStyle : {
						width : 8
					}
				},
				axisTick : {
					length : 12,
					lineStyle : {
						color : 'auto'
					}
				},
				splitLine : {
					length : 20,
					lineStyle : {
						color : 'auto'
					}
				},
				pointer : {
					width : 5
				},
				title : {
					offsetCenter : [ 0, '-30%' ],
					fontWeight : 'bolder',
					fontSize : rateTitleFontSize
				},
				data : [ {
					value : rate,
					name : '任务完成率(' + rate + '%)',
					show : '%'
				} ]
			}, {
				name : '完成任务数(' + complete + '个)',
				type : 'gauge',
				center : [ '75%', '70%' ],
				radius : '85%',
				min : 0,
				max : total,
				startAngle : 180,
				endAngle : 0,
				axisLine : {
					lineStyle : {
						width : 8
					}
				},
				axisTick : {
					length : 12,
					lineStyle : {
						color : 'auto'
					}
				},
				splitLine : {
					length : 20,
					lineStyle : {
						color : 'auto'
					}
				},
				pointer : {
					width : 5
				},
				title : {
					offsetCenter : [ 0, '-30%' ],
					fontWeight : 'bolder',
					fontSize : rateTitleFontSize
				},
				data : [ {
					value : complete,
					name : '完成任务数(' + complete + '个)',
					show : '个'
				} ]
			} ]
		}
		C.showChartInfo(id, option);
	},
	initThreeControlRate : function(id, rate1, rate2) {
		var option = {
			tooltip : {
				formatter : function(data) {
					if (data.data) {
						var d = data.data;
						return d.name + '<br/>' + d.value + ' ' + d.show;
					}
				}
			},
			toolbox : toolbox,
			series : [ {
				name : '社区戒毒执行率(' + rate1 + '%)',
				type : 'gauge',
				center : [ '25%', '70%' ],
				radius : '85%',
				min : 0,
				max : 100,
				startAngle : 180,
				endAngle : 0,
				splitNumber : 10,
				axisLine : {
					lineStyle : {
						width : 8
					}
				},
				axisTick : {
					length : 12,
					lineStyle : {
						color : 'auto'
					}
				},
				splitLine : {
					length : 20,
					lineStyle : {
						color : 'auto'
					}
				},
				pointer : {
					width : 5
				},
				title : {
					offsetCenter : [ 0, '-30%' ],
					fontWeight : 'bolder',
					fontSize : rateTitleFontSize
				},
				data : [ {
					value : rate1,
					name : '社区戒毒执行率(' + rate1 + '%)',
					show : '%'
				} ]
			}, {
				name : '社区康复执行率(' + rate2 + '%)',
				type : 'gauge',
				center : [ '75%', '70%' ],
				radius : '85%',
				min : 0,
				max : 100,
				startAngle : 180,
				endAngle : 0,
				axisLine : {
					lineStyle : {
						width : 8
					}
				},
				axisTick : {
					length : 12,
					lineStyle : {
						color : 'auto'
					}
				},
				splitLine : {
					length : 20,
					lineStyle : {
						color : 'auto'
					}
				},
				pointer : {
					width : 5
				},
				title : {
					offsetCenter : [ 0, '-30%' ],
					fontWeight : 'bolder',
					fontSize : rateTitleFontSize
				},
				data : [ {
					value : rate2,
					name : '社区康复执行率(' + rate2 + '%)',
					show : '%'
				} ]
			} ]
		}
		C.showChartInfo(id, option);
	},
	/** 简洁饼图 */
	initSmallSimplePie : function(id, dataLabel, data, title, bColor) {
		bColor = bColor || 'white';
		var total = 0;
		$.each(data, function(i) {
			total += data[i].value;
		})
		var colorList = [ '#66c5d7', '#11c88c', '#989cff', '#ffa55d', '#9c7de1', '#5d9eff', '#ffdb5d', '#ee82ed', '#8fca5f', '#b995f5' ];
		var dataInfo = [];
		$.each(data, function(i) {
			dataInfo.push(data[i]);
		});
		var option = {
			tooltip : {
				trigger : 'item',
				formatter : '{b}: {c} ({d}%)'
			},
			backgroundColor : bColor,
			title : [ {
				text : "总数",
				left : '48%',
				top : '40%',
				textAlign : 'center',
				textBaseline : 'middle',
				textStyle : {
					color : '#999',
					fontWeight : 'normal',
					fontSize : 14
				}
			}, {
				text : total,
				left : '47%',
				top : '53%',
				textAlign : 'center',
				textBaseline : 'middle',
				textStyle : {
					color : '#666',
					fontWeight : 'normal',
					fontSize : 20
				}
			} ],
			series : [ {
				hoverAnimation : false, // 设置饼图默认的展开样式
				radius : [ '20%', '50%' ],
				name : 'pie',
				type : 'pie',
				selectedMode : 'single',
				selectedOffset : 16, // 选中是扇区偏移量
				clockwise : true,
				startAngle : 90,
				label : {
					normal : {
						// formatter: '{b}: {c} ({d}%)',
						formatter : '{b}:{c}',
						position : 'outside',
						fontSize : pieFontSize
					},
				},
				labelLine : {
					normal : {
						show : true
					}
				},
				itemStyle : {
					normal : {
						borderWidth : 3,
						borderColor : '#ffffff'
					},
					emphasis : {
						borderWidth : 0,
						shadowBlur : 5,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.2)'
					}
				},
				data : dataInfo
			} ]
		};
		if (P.notEmpty(title)) {
			option = $.extend(true, option, {
				title : {
					text : title,
					x : 'center'
				}
			});
		}
		C.showChartInfo(id, option);
	},
	initSmallBar : function(id, dataLabel, data, title, dataColor, bColor, clickFunc) {
		bColor = bColor || 'white';
		var series = [];
		var dataValue = [];
		$.each(data, function(i) {
			if (dataColor) {
				var oneData = $.extend(true, data[i], {
					itemStyle : {
						normal : {
							color : dataColor[data[i].name]
						}
					}
				});
				dataValue.push(oneData);
			} else {
				dataValue.push(data[i]);
			}
		});
		series.push({
			name : "人数",
			type : 'bar',
			itemStyle : {
				normal : {
					show : true,
					barBorderRadius : 10,
					borderWidth : 0,
					borderColor : '#333',
				}
			},
			label : {
				show : true,
				position : 'right',
				fontSize : barFontSize,
				color : '#008acd'
			},
			data : dataValue
		});
		var option = {
			backgroundColor : bColor,
			tooltip : {
				show : "true",
				trigger : 'axis',
				axisPointer : { // 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid : {
				left : '3%',
				right : '45px',
				bottom : '20px',
				containLabel : true
			},
			xAxis : {
				name : '人',
				type : 'value',
				nameTextStyle : {
					fontSize : xAxisFontSize
				},
				axisLabel : {
					show : false
				},
				axisTick : {
					show : false
				},
				axisLine : {
					show : false
				},
				splitLine : {
					show : false
				}
			},
			yAxis : {
				type : 'category',
				axisLabel : {
					fontSize : xAxisFontSize
				},
				axisTick : {
					show : false
				},
				axisLine : {
					show : true
				},
				axisTick : {
					show : false
				},
				data : dataLabel
			},
			series : series
		};
		if (P.notEmpty(title)) {
			option = $.extend(true, option, {
				title : {
					text : title,
					x : 'center',
					top : '30px'
				}
			});
		}
		C.showChartInfo(id, option, clickFunc);
	},
	initSmallCategoryBarMore : function(id, dataLabel, data, title, dataColor, bColor) {
		bColor = bColor || 'white';
		var series = [], legendLabel = [];
		$.each(data, function(k, v) {
			var oneData = $.extend(true, v, {
				name : k,
				type : 'bar',
				stack : 'A',
				itemStyle : {
					normal : {
						show : true,
						color : dataColor[k],
						barBorderRadius : 10,
						borderWidth : 0,
						borderColor : '#333',
					}
				},
				barGap : '0%',
				barCategoryGap : '50%',
				data : v.value
			});
			series.push(oneData);
			legendLabel.push(k);
		});
		var option = {
			backgroundColor : bColor,
			tooltip : {
				show : "true",
				trigger : 'axis',
				axisPointer : { // 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend : {
				textStyle : {
					fontSize : legendFontSize
				},
				data : legendLabel
			},
			grid : {
				top : '100px',
				left : '3%',
				right : '10%',
				bottom : '3%',
				containLabel : true
			},
			xAxis : {
				name : '(人)',
				type : 'value',
				axisLabel : {
					fontSize : xAxisFontSize
				},
				axisTick : {
					show : false
				},
				axisLine : {
					show : false,
					lineStyle : {
						color : 'black',
					}
				},
				splitLine : {
					show : false
				},
			},
			yAxis : {
				type : 'category',
				axisLabel : {
					fontSize : xAxisFontSize
				},
				axisTick : {
					show : false
				},
				axisLine : {
					show : true,
					lineStyle : {
						color : 'black',
					}
				},
				data : dataLabel
			},
			series : series
		};
		if (P.notEmpty(title)) {
			option = $.extend(true, option, {
				title : {
					text : title,
					x : 'center',
					top : '70px'
				}
			});
		}
		C.showChartInfo(id, option);
	},
	initSmallCategoryBar : function(id, dataLabel, data, title, dataColor, bColor) {
		bColor = bColor || 'white';
		var series = [], legendLabel = [];
		$.each(data, function(k, v) {
			var oneData = $.extend(true, v, {
				name : k,
				type : 'bar',
				stack : 'A',
				itemStyle : {
					normal : {
						show : true,
						color : dataColor[k],
						barBorderRadius : 10,
						borderWidth : 0,
						borderColor : '#333',
					}
				},
				barGap : '0%',
				barCategoryGap : '50%',
				data : v.value
			});
			series.push(oneData);
			legendLabel.push(k);
		});
		var option = {
			backgroundColor : bColor,
			tooltip : {
				show : "true",
				trigger : 'axis',
				axisPointer : { // 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend : {
				textStyle : {
					fontSize : legendFontSize
				},
				data : legendLabel
			},
			grid : {
				left : '3%',
				right : '10%',
				bottom : '3%',
				containLabel : true
			},
			xAxis : {
				name : '(人)',
				type : 'value',
				axisLabel : {
					fontSize : xAxisFontSize
				},
				axisTick : {
					show : false
				},
				axisLine : {
					show : false,
					lineStyle : {
						color : 'black',
					}
				},
				splitLine : {
					show : false
				},
			},
			yAxis : {
				type : 'category',
				axisLabel : {
					fontSize : xAxisFontSize
				},
				axisTick : {
					show : false
				},
				axisLine : {
					show : true,
					lineStyle : {
						color : 'black',
					}
				},
				data : dataLabel
			},
			series : series
		};
		if (P.notEmpty(title)) {
			option = $.extend(true, option, {
				title : {
					text : title,
					x : 'center',
					top : '30px'
				}
			});
		}
		C.showChartInfo(id, option);
	},
	initSmallTypeBoard : function(id, dataLabel, data) {
		var total, label1, label2, num1 = 0, num2 = 0;
		var j = 0;
		$.each(data, function(i) {
			if (j == 0) {
				label1 = data[i].name;
				num1 = data[i].value
			} else if (j == 1) {
				label2 = data[i].name;
				num2 = data[i].value
			}
			j++;
		});
		total = num1 + num2;
		var options = [ {
			title : {
				text : label1,
				subtext : num1 + '人',
			},
			series : [ {
				data : [ {
					value : num1 * 0.75
				}, {
					value : total - num1 * 0.75
				} ]
			} ]
		}, {
			title : {
				text : label2,
				subtext : num2 + '人',
			},
			series : [ {
				data : [ {
					value : num2 * 0.75
				}, {
					value : total - num2 * 0.75
				} ]
			} ]
		} ]
		var option = {
			baseOption : {
				timeline : {
					show : false,
					type : 'slider',
					axisType : 'category',
					bottom : '10',
					currentIndex : 0,// 0 时表示当前选中项为 timeline.data[0]（即使用
					// options[0]
					autoPlay : true,// 是否自动播放
					loop : true,
					realtime : true,// 拖动圆点的时候，是否实时更新视图。
					controlPosition : 'left',
					label : {
						normal : {
							color : '#2998ff',
						},
					},
					itemStyle : {
						normal : {
							color : '#fff',
							borderColor : '#2998ff',
							borderWidth : 2,
						}
					},
					checkpointStyle : {// 『当前项』（checkpoint）的图形样式
						color : 'rgb(215, 0, 0)',
					},
					lineStyle : {
						show : true,// false 不显示轴线
						color : '#2998ff',
					},
					controlStyle : {// 控制按钮的样式
						show : false,
						showPrevBtn : false,
						showNextBtn : false,
						itemGap : 50,
						itemSize : 36,
						normal : {
							color : 'rgb(215, 0, 0)',
							borderColor : 'rgb(215, 0, 0)',
						},
						emphasis : {
							color : 'rgb(215, 0, 0)',
							borderColor : 'rgb(215, 0, 0)',
						},
					},
					data : [ label1, label2 ],
				},
				title : {
					text : '',
					x : '47%',
					y : '42%',
					textAlign : "center",
					textStyle : {
						fontWeight : 'normal',
						fontSize : 14
					},
					subtextStyle : {
						fontWeight : 'bold',
						fontSize : 20,
						color : '#3ea1ff'
					}
				},
				tooltip : { // 提示框组件
					trigger : 'axis',
					formatter : '{b}<br />{a0}: {c0}<br />{a1}: {c1}',
					axisPointer : {
						type : 'shadow',
						label : {
							backgroundColor : '#6a7985'
						}
					},
					textStyle : {
						color : '#fff',
						fontStyle : 'normal',
						fontFamily : '微软雅黑',
						fontSize : 12,
					}
				},
				grid : {
					left : 10,
					right : 35,
					bottom : 70,
					top : 60,
					containLabel : true,
				},
				legend : {// 图例组件，颜色和名字
					left : 0,
					top : 0,
					itemGap : 16,
					itemWidth : 20,
					itemHeight : 14,
					data : [ {
						name : '2017-08-05 至 2017-08-05',
						icon : 'rect',
					}, {
						name : '2017-08-06 至 2017-08-06',
						icon : 'rect',
					} ],
					textStyle : {
						color : '#a8aab0',
						fontStyle : 'normal',
						fontFamily : '微软雅黑',
						fontSize : legendFontSize,
					}
				},
				series : [ {
					name : '比例圆',
					type : 'pie',
					label : {
						normal : {
							fontSize : pieFontSize
						},
					},
					radius : [ '50%', '70%' ],
					startAngle : 225,
					color : [ new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
						offset : 0,
						color : '#00a2ff'
					}, {
						offset : 1,
						color : '#70ffac'
					} ]), "transparent" ],
					hoverAnimation : false,
					legendHoverLink : false,
					itemStyle : {
						normal : {
							borderColor : "transparent",
							borderWidth : "20"
						},
						emphasis : {
							borderColor : "transparent",
							borderWidth : "20"
						}
					},
					z : 10,
					labelLine : {
						normal : {
							show : false
						}
					}
				}, {
					name : '底层圆',
					type : 'pie',
					label : {
						normal : {
							fontSize : pieFontSize
						},
					},
					radius : [ '50%', '70%' ],
					startAngle : 225,
					color : [ "#c2f5e1", "transparent" ],
					labelLine : {
						normal : {
							show : false
						}
					},
					data : [ {
						value : 75
					}, {
						value : 25
					} ]
				} ]
			},
			options : options
		};
		C.showChartInfo(id, option);
	},
	/** 圆环图 */
	initSmallRingCircular : function(id, dataLabel, data, title, dataColor, bColor, labelFmt) {
		bColor = bColor || 'white';
		var dataValue = {};
		var max = 0;
		$.each(data, function(i) {
			if (data[i].value > max) {
				max = data[i].value;
			}
			dataValue[data[i].name] = data[i].value;
		})
		var series = [];
		var k = 15;
		$.each(dataLabel, function(i) {
			series.push({
				name : dataLabel[i],
				type : 'pie',
				/** 顺时针加载* */
				clockWise : true,
				/** 取消鼠标移入变大* */
				hoverAnimation : false,
				radius : [ k * i + 5, k * (i + 1) ],
				label : {
					normal : {
						show : false,
						fontSize : pieFontSize
					},
				},
				data : C.getSmallRingCircularData(dataLabel[i], dataValue, dataColor, max * 5 / 3)
			});
		})
		var option = {
			backgroundColor : bColor,
			tooltip : {
				trigger : 'item',
				formatter : function(params, ticket, callback) {
					if (params.name) {
						if (P.isFunc(labelFmt))
							return labelFmt(params.seriesName, params.name);
						return params.seriesName + ": " + params.name;
					}
				}
			},
			series : series
		};
		if (P.notEmpty(title)) {
			option = $.extend(true, option, {
				title : {
					text : title,
					x : 'center'
				}
			});
		}
		C.showChartInfo(id, option);
	},
	initSmallBarChart : function(id, dataLabel, data, title, clickFunc) {
		var dataInfo = [];
		var max = 0;
		$.each(data, function(i) {
			if (data[i].value > max) {
				max = data[i].value;
			}
			dataInfo.push(data[i]);
		})
		option = {
			tooltip : {
				trigger : 'axis',
				axisPointer : {
					type : 'shadow'
				}
			},
			xAxis : {
				data : dataLabel,
				axisLine : {
					lineStyle : {
						color : '#0177d4'
					}
				},
				axisLabel : {
					fontSize : 13,
					show : true,
					rotate : 40
				}
			},
			yAxis : {
				axisLine : {
					lineStyle : {
						color : '#0177d4'
					}
				},
				type : 'value',
				minInterval : 1,
				boundaryGap : [ 0, 0.1 ],
				axisLabel : {
					fontSize : yAxisFontSize,
					show : true
				},
				splitLine : {
					show : false
				}
			},
			series : [ {
				name : '人数',
				type : 'bar',
				barWidth : 18,
				itemStyle : {
					normal : {
						color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
							offset : 0,
							color : '#00b0ff'
						}, {
							offset : 0.8,
							color : '#7052f4'
						} ], false)
					}
				},
				label : {
					fontSize : legendFontSize,
					show : true,
					position : 'top'
				},
				data : dataInfo
			} ]
		};
		if (P.notEmpty(title)) {
			option = $.extend(true, option, {
				title : {
					text : title,
					x : 'center',
					textStyle : {
						fontWeight : 'bold',
						fontSize : titleFontSize
					}
				}
			});
		}
		C.showChartInfo(id, option, clickFunc);
	},
	initSmallLineChart : function(id, dataLabel, data, title, bColor, labelFmt) {
		bColor = bColor || 'white';
		var dataInfo = [];
		var max = 0;
		$.each(data, function(i) {
			if (data[i].value > max) {
				max = data[i].value;
			}
			dataInfo.push(data[i].value);
		})
		option = {
			backgroundColor : bColor,
			grid : {
				left : '3%',
				right : '3%',
				bottom : '3%',
				top : '3%',
				containLabel : true
			},
			tooltip : {
				trigger : 'axis',
				axisPointer : {
					type : 'shadow'
				}
			},
			legend : {
				textStyle : {
					fontSize : legendFontSize
				},
				data : dataLabel
			},
			xAxis : {
				data : dataLabel,
				axisLine : {
					lineStyle : {
						color : '#0177d4'
					}
				},
				axisLabel : {
					show : true,
					fontSize : xAxisFontSize,
					rotate : 30
				}
			},
			yAxis : {
				axisLine : {
					lineStyle : {
						color : '#0177d4'
					}
				},
				minInterval : 1,
				boundaryGap : [ 0, 0.1 ],
				axisLabel : {
					fontSize : xAxisFontSize,
					show : true
				},
				splitLine : {
					show : false,
					lineStyle : {
						color : '#0177d4'
					}
				},
				interval : max / 4,
				max : max * 5 / 4
			},
			series : [ {
				name : '人数',
				type : 'line',
				barWidth : 18,
				itemStyle : {
					normal : {
						color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
							offset : 0,
							color : '#00b0ff'
						}, {
							offset : 0.8,
							color : '#7052f4'
						} ], false)
					}
				},
				label : {
					show : true,
					position : 'top'
				},
				data : dataInfo
			} ]
		};
		if (P.notEmpty(title)) {
			option = $.extend(true, option, {
				title : {
					text : title,
					x : 'center'
				}
			});
		}
		C.showChartInfo(id, option);
	},
	showChartInfo : function(id, option, clickFunc) {
		var myChart = echarts.init(document.getElementById(id), 'macarons');
		myChart.setOption(option);
		if (myChart._$handlers.click) {
		} else {
			myChart.on('click', function(params, doc) {
				if (P.isFunc(clickFunc)) {
					clickFunc(params, this);
				}
			});
		}
	},
	getSmallRingCircularData : function(value, data, dataColor, max) {
		var color0 = dataColor[value] || '#00B2EE';
		var color1 = dataColor[value] || '#00DDE6';
		var count = data[value];
		var percent = count / max;
		return [ {
			value : percent,
			name : count,
			itemStyle : {
				normal : {
					color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
						offset : 0,
						color : color0
					}, {
						offset : 1,
						color : color1
					} ])
				}
			}
		}, {
			value : 1 - percent,
			itemStyle : {
				normal : {
					color : 'transparent'
				}
			}
		} ]
	}
}
var CG = {
	initSmallSimplePie : function(id, dataLabel, data, title, showTotal, clickFunc) {
		if (showTotal) {
			var total = 0;
			$.each(data, function(i) {
				total += data[i].value;
			})
			title = '目前' + title + '数量:' + total;
		}
		option = {
			title : {
				text : title,
				left : 'center',
				textStyle : {
					fontWeight : 'bold',
					fontSize : titleFontSize
				}
			},
			tooltip : {
				trigger : 'item',
				formatter : '{a} <br/>{b}: {c} ({d}%)'
			},
			series : [ {
				name : title,
				type : 'pie',
				center : [ '50%', '55%' ],
				radius : [ '30%', '60%' ],
				label : {
					normal : {
						position : 'inner',
						formatter : '{b}: {c}',
						fontSize : 15
					}
				},
				data : data
			} ]
		};
		C.showChartInfo(id, option, clickFunc);
	},
	initSimpleAreaPie : function(id, dataLabel, data, title, clickFunc) {
		option = {
			title : {
				text : title,
				left : 'center',
				textStyle : {
					fontWeight : 'bold',
					fontSize : titleFontSize
				}
			},
			tooltip : {
				trigger : 'item',
				formatter : '{a} <br/>{b}: {c} ({d}%)'
			},
			series : [ {
				name : title,
				type : 'pie',
				center : [ '50%', '55%' ],
				radius : [ '30%', '60%' ],
				roseType : 'area',
				label : {
					normal : {
						position : 'inner',
						formatter : '{b}: {c}',
						fontSize : 15
					}
				},
				data : data
			} ]
		};
		C.showChartInfo(id, option, clickFunc);
	},
	initSimpleLine : function(id, dataLabel, data, title) {
		var legendLabel = [];
		$.each(data, function(i) {
			var bean = data[i];
			legendLabel.push(bean['name']);
			bean['type'] = 'line';
			bean['stack'] = bean['name'];
		});
		option = {
			title : {
				text : title,
				left : 'center',
				textStyle : {
					fontWeight : 'bold',
					fontSize : titleFontSize
				}
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				top : 'bottom',
				data : legendLabel
			},
			xAxis : {
				type : 'category',
				boundaryGap : false,
				data : dataLabel
			},
			yAxis : {
				type : 'value'
			},
			series : data
		};
		C.showChartInfo(id, option);
	}
}
