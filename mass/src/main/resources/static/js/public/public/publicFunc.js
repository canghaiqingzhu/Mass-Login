var mouseClickFlag = false;
$(function() {
	var json = P.ajax('publicfunc/checkLogin');
	if (json.flag) {
		var obj = window.parent.document;
		function onMouseWheel(e) {
			var e = e || window.event;
			if (e.type == "mousewheel") {
				delta = e.wheelDelta / 12;
			} else {
				delta = e.detail / 3 * -10;
			}
			if (chrome != -1) {
			} else {
				obj.documentElement.scrollTop -= delta;
				// 阻止默认事件
				if (e.preventDefault) {
					e.preventDefault();
				}
				return false;
			}
		}
		if (obj != null && obj != undefined) {
			var chrome = navigator.userAgent.search(/chrome/i), delta = 0;
			if (chrome != -1) {
				document.addEventListener("mousewheel", onMouseWheel, false);
			}
		}
		$(document).bind("contextmenu", function(e) {
			if (mouseClickFlag) {
				mouseClickFlag = false;
			} else {
				// return false;
			}
		});
		$(document).bind("keydown", function(e) {
			if (e.keyCode == 123) {
				return false;
			} else if (e.keyCode = 17) {
				mouseClickFlag = true;
				P.delay(function() {
					mouseClickFlag = false;
				});
			}
		});
	} else {
		P.returnHome('auth');
	}
})
function noteShow() {
	/** 让方法按顺序执行* */
	var a = function() {
		var dtd = $.Deferred();
		var func = function() {
			console.log("a")
			/** 执行状态从"未完成"改为"已完成"* */
			dtd.resolve();
			/** 执行状态从"未完成"改为"已失败"* */
			// deferred.reject()
		};
		P.delay(func, 1000);
		return dtd;
	}
	var b = function() {
		var dtd = $.Deferred();
		var func = function() {
			console.log("b")
			/** 执行状态从"未完成"改为"已完成"* */
			dtd.resolve();
			/** 执行状态从"未完成"改为"已失败"* */
			// deferred.reject()
		};
		P.delay(func, 800);
		return dtd;
	}
	var c = function() {
		var dtd = $.Deferred();
		var func = function() {
			console.log("c")
			/** 执行状态从"未完成"改为"已完成"* */
			dtd.resolve();
			/** 执行状态从"未完成"改为"已失败"* */
			// deferred.reject()
		};
		P.delay(func, 600);
		return dtd;
	}
	var d = function() {
		var dtd = $.Deferred();
		var func = function() {
			console.log("d")
			/** 执行状态从"未完成"改为"已完成"* */
			dtd.resolve();
			/** 执行状态从"未完成"改为"已失败"* */
			// deferred.reject()
		};
		P.delay(func, 400);
		return dtd;
	}
	var dtd = $.Deferred();
	$.when(a()).done(function() {
		$.when(b()).done(function() {
			$.when(c()).done(function() {
				$.when(d()).done(function() {
					console.log("完成")
				}).fail(function() {
					console.log("d失败了");
				});
			}).fail(function() {
				console.log("c失败了")
			});
		}).fail(function() {
			console.log("b失败了")
		});
	}).fail(function() {
		console.log("a失败了")
	});
	/** layer弹框方法* */
	P.alert();
	/** layer提示方法* */
	P.msg();
	/** 手动设置参数，icon:5(哭脸，表示失败),shift:6(抖动效果)* */
	P.msg('提示', true, {
		icon : 5,
		shift : 6
	});
	/** 操作完成提示方法* */
	P.showWarnMsg();
	/** 打开iframe窗口方法* */
	P.openIframe();
	/** 打开iframe窗口后延迟200毫秒后放大到全屏* */
	P.openFullIframe();
	/** 打开iframe窗口后直接放大到全屏，不延迟* */
	P.openFullIframeNoDelay();
	/** 关闭当前ifame窗口* */
	P.closeThisIframe();
	/** 弹出输入框，输入并将输入内容作为参数传入默认方法* */
	P.prompt();
	/** 将页面元素作为窗口弹出* */
	P.openDom();
	/** 加载方法* */
	P.loading();
	/** 关闭加载方法* */
	P.closeLoading();
	/** 确认操作方法* */
	P.confirm();
	/** 打印方法* */
	P.print();
	/** 日期操作方法* */
	P.dateAdd();
	/** 字符串非空判断* */
	P.notEmpty();
	/** 显示activiti流程图* */
	P.showActivitiImg();
	/** 对下拉框进行模糊查询* */
	P.searchSelectInfo();
	/** 初始化下拉框内容* */
	P.showSelect();
	/** 初始化多选框内容* */
	P.showCheckBox();
	/** 初始化单选框内容* */
	P.showRadio();
	/** 初始化回车事件* */
	P.enterKeyUp();
	/** 初始化ztree树方法* */
	P.initZtree();
	/** 获取ztree树对象* */
	P.getZtree();
	/** 刷新ztree树方法* */
	P.refreshZtree();
	/** 初始化星星打分插件* */
	P.initJqueryRaty();
	/** ajax请求方法* */
	P.ajax();
	/** 初始化表单验证方法* */
	P.initFormValidate();
	/** 销毁表单验证方法* */
	P.destroyFormValidate();
	/** 重置表单验证* */
	P.resetFormValidate();
	/** 验证某一表单字段* */
	P.revalidField();
	/** 初始化分页列表方法* */
	P.initTable();
	/** 初始化分页列表方法* */
	P.initTableClient();
	/** 销毁分页列表* */
	P.destroyTable();
	/** 刷新分页列表* */
	P.refreshTable();
	/** 获取选中的分页列表的id集合* */
	P.getTableSelections();
	/** 显示分页列表打开的详情小页面* */
	P.showTableDetailView();
	/** 隐藏分页列表的查询按钮和搜索框* */
	P.hideTableSearchAndBtn();
	/** 重设分页列表的部分参数* */
	P.refreshTableOptions();
	/** 初始化分页列表删除按钮的隐藏显示效果* */
	P.initTableDeleteBtnStatus();
	/** 初始化文件上传插件* */
	P.initFileInputUpload();
	/** 初始化日期选择器* */
	P.initDatePicker();
	/** 移除日期选择器* */
	P.removeDatePicker();
	/** 打开日期选择器* */
	P.showDatePicker();
	/** 关闭日期选择器* */
	P.hideDatePicker();
	/** 更新日期选择器* */
	P.updateDatePicker();
	/** 为所有下拉框添加模糊搜索效果* */
	P.initBootstrapSelect();
	/** 初始化富文本编辑器* */
	P.initRichSummerNote();
	/** 富文本编辑器插入图片* */
	P.insertRichSummerNoteImg();
	/** 判断富文本编辑器内容是否为空* */
	P.richSummerNoteIsEmpty();
	/** 获取富文本编辑器内容* */
	P.richSummerNoteGetCode();
	/** 为富文本编辑器赋值* */
	P.richSummerNoteSetCode();
	/** 初始化百度地图* */
	P.initBaiduMap();
	/** 初始化百度地图（不加控件）* */
	P.initSimpleBaiduMap();
	/** 初始化百度地图绘图方法* */
	P.initBaiduMapDraw();
	/** 初始化天地图* */
	P.initTianDiTu();
	/** 获取当前窗口高度* */
	P.getHeight();
	/** 获取当前窗口宽度* */
	P.getWidth();
	/** 将传入内容初始化到页面，编辑查询方法可直接传入参数，自动赋值到页面* */
	P.initFormInfo();
	/** 仅将后面传入的有限参数初始化到页面* */
	P.initFormInfoOnly();
	/** 根据key和value向页面赋值* */
	P.setValue();
	/** 批量加载js或css* */
	P.loadJsOrCss();
	/** 加载js* */
	P.getScript();
	/** 加载css* */
	P.getLink();
	/** 打印到控制台* */
	P.log();
	/** 延迟操作* */
	P.delay();
	/** 判断页面元素是否存在* */
	P.exist();
	/** 判断参数是否是一个方法* */
	P.isFunc();
	/** 判断元素是否在数组里面* */
	P.inArray();
	/** 判断元素是否是一个数组* */
	P.isArray();
	/** 打开一个新的页面* */
	P.openLocation();
	/** 事前附件* */
	P.showPreFile();
	/** 事后附件** */
	P.showProFile();
}
var P = {
	/** icon:1(勾),2(叉),3(问号),4(锁),5(哭脸),6(笑脸),7(感叹号)* */
	/** 弹框方法,msg(提示信息),i(方法:回调方法,1-7:图标icon,1000-:时间,字符串:标题),title(标题)* */
	alert : function(msg, i, title) {
		msg = msg || '信息';
		title = title || '信息';
		if (i) {
			if (P.isFunc(i)) {
				layer.alert(msg, {
					title : title
				}, function(index) {
					i();
					layer.close(index);
				});
			} else if (typeof (i) == 'number') {
				layer.alert(msg, {
					icon : i,
					title : title
				});
			} else if (typeof (i) == 'string') {
				layer.alert(msg, {
					title : i
				});
			}
		}
		layer.alert(msg, {
			title : title
		});
	},
	/** 提示方法,msg(提示信息),i(方法:回调方法,1-7:图标icon,1000-:时间)* */
	msg : function(msg, i, opt) {
		msg = msg || '提示';
		if (i) {
			if (P.isFunc(i)) {
				layer.msg(msg, function() {
					i();
				})
			} else if (typeof (i) == 'number') {
				if (i >= 1000) {
					layer.msg(msg, {
						time : i
					});
				} else {
					layer.msg(msg, {
						icon : i
					});
				}
			} else if (typeof (i) == 'boolean') {
				opt = opt || {};
				layer.msg(msg, opt);
			}
		}
		layer.msg(msg);
	},
	/** 操作结束提示信息* */
	showWarnMsg : function(flag, func, successMsg, failMsg, defaultMsg) {
		successMsg = successMsg || '操作成功';
		failMsg = failMsg || '操作失败';
		if (flag) {
			P.msg(successMsg, 1);
			P.isFunc(func) && func();
		} else {
			defaultMsg = defaultMsg || failMsg;
			P.msg(defaultMsg, 2);
		}
	},
	/** 打开iframe窗口* */
	openIframe : function(url, title, opt) {
		if (P.notEmpty(url)) {
			title = title || '内容';
			var defaults = {
				type : 2,
				title : title,
				content : url
			}
			opt && (defaults = $.extend(true, defaults, opt));
			var index = layer.open(defaults);
		} else {
			P.log('openIframe打开窗口方法中url不存在,url:' + url + ',title:' + title + ',href:' + window.location.href);
		}
	},
	/** 打开iframe窗口并全屏显示* */
	openFullIframe : function(url, title, opt) {
		if (P.notEmpty(url)) {
			title = title || '内容';
			var height = P.getHeight();
			var width = P.getWidth();
			var defaults = {
				type : 2,
				title : title,
				content : url,
				area : [ width + 'px', height + 'px' ]
			}
			opt && (defaults = $.extend(true, defaults, opt));
			var index = layer.open(defaults);
			P.delay(function() {
				layer.full(index);
			}, 200);
		} else {
			P.log('openFullIframe打开窗口并全屏方法中url不存在,url:' + url + ',title:' + title + ',href:' + window.location.href);
		}
	},
	/** 打开iframe窗口并全屏显示* */
	openFullIframeNoDelay : function(url, title, opt) {
		if (P.notEmpty(url)) {
			title = title || '内容';
			var height = P.getHeight();
			var width = P.getWidth();
			var defaults = {
				type : 2,
				title : title,
				content : url,
				area : [ width + 'px', height + 'px' ]
			}
			opt && (defaults = $.extend(true, defaults, opt));
			var index = layer.open(defaults);
			layer.full(index);
		} else {
			P.log('openFullIframeNoDelay打开窗口并全屏方法中url不存在,url:' + url + ',title:' + title + ',href:' + window.location.href);
		}
	},
	/** 关闭当前iframe* */
	closeThisIframe : function() {
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index);
	},
	/** 获取查询值* */
	prompt : function(func, title, opt) {
		title = title || '信息';
		var defaults = {
			type : 0,
			title : title
		}
		opt && (defaults = $.extend(true, defaults, opt));
		layer.prompt(defaults, function(value, index, elem) {
			P.isFunc(func) && func(value);
			layer.close(index);
		});
	},
	/** 打开页面元素并弹出窗口* */
	openDom : function(id, title, opt) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			title = title || '内容';
			var defaults = {
				type : 1,
				content : o,
				title : title
			}
			opt && (defaults = $.extend(true, defaults, opt));
			var index = layer.open(defaults);
			return index;
		} else {
			P.log('openDom打开页面元素并弹出窗口方法中id不存在,id:' + id + ',title:' + title + ',href:' + window.location.href);
		}
	},
	/** 加载框,加载方式* */
	loading : function(i, t) {
		if (i) {
			if (typeof (i) == 'number') {
				i = i > 0 ? i : 3;
				if (typeof (t) == 'number') {
					layer.load(i, {
						time : t
					});
				} else {
					layer.load(i);
				}
			}
		}
		layer.load();
	},
	/** 关闭加载框* */
	closeLoading : function() {
		layer.closeAll('loading');
	},
	/** 关闭所有iframe* */
	closeAllIFrame : function() {
		layer.closeAll('iframe');
	},
	/** 确认操作* */
	confirm : function(msg, i, j, btn1, btn2) {
		msg = msg || '是否确认操作?';
		btn1 = btn1 || '确定';
		btn2 = btn2 || '取消';
		if (i) {
			layer.confirm(msg, {
				btn : [ btn1, btn2 ]
			}, function(index, layero) {
				layer.close(index);
				if (typeof (i) == 'string') {
					window.location.href = i;
				} else if (P.isFunc(i) && i()) {
				}
			}, function(index) {
				layer.close(index);
				if (j) {
					if (typeof (j) === 'string') {
						window.location.href = j;
					} else if (P.isFunc(j) && j()) {
					}
				}
			})
		} else {
			P.log('confirm确认操作方法中回调方法不存在,msg:' + msg + ',回调方法:' + i + ',href:' + window.location.href);
		}
	},
	/** 打印* */
	print : function() {
		window.print();
	},
	/** 日期操作:year(年),season(季),month(月),week(周),day(天),hour(时),minute(分),second(秒)* */
	dateAdd : function(date, i, j) {
		if (date && j && typeof (date) == 'date' && typeof (j) == 'number') {
			switch (i) {
			case 'year':
				date.setFullYear(date.getFullYear() + j);
				return date;
				break;
			case 'season':
				date.setMonth(date.getMonth() + j * 3);
				return date;
				break;
			case 'month':
				date.setMonth(date.getMonth() + j);
				return date;
				break;
			case 'week':
				date.setDate(date.getDate() + j * 7);
				return date;
				break;
			case 'day':
				date.setDate(date.getDate() + j);
				return date;
				break;
			case 'hour':
				date.setHours(date.getHours() + j);
				return date;
				break;
			case 'minute':
				date.setMinutes(date.getMinutes() + j);
				return date;
				break;
			case 'second':
				date.setSeconds(date.getSeconds() + j);
				return date;
				break;
			default:
				date.setDate(date.getDate() + j);
				return date;
			}
		} else {
			P.log('dateAdd日期操作中参数或参数格式不正确,date:' + date + ',操作:' + i + ',增加:' + j + ',href:' + window.location.href);
		}
	},
	/** 字符串非空判断* */
	notEmpty : function(str) {
		return (str && typeof (str) == 'string' && str != '');
	},
	/** 显示activiti流程图* */
	showActivitiImg : function(taskId, definitionId) {
		var url = "";
		if (P.notEmpty(taskId)) {
			url = 'activitishowimg?taskId=' + taskId;
		} else if (P.notEmpty(definitionId)) {
			url = 'activitishowimg?definitionId=' + definitionId;
		}
		if (P.notEmpty(url)) {
			P.openFullIframe(url, '流程图', {
				success : function(layero, index) {
					var body = layer.getChildFrame('body', index);
					$(body).find('img').dblclick(function() {
						this.width = this.width * 1.5;
						this.height = this.height * 1.5;
					});
				},
				cancel : function(index, layero) {
					P.closeAllIFrame();
					return false;
				}
			});
		}
		if (P.notEmpty(taskId)) {
			var width = P.getWidth();
			var index = layer.open({
				type : 2,
				title : '流程任务状态',
				content : 'activitishowstatus?taskId=' + taskId,
				area : [ '300px', '400px' ],
				offset : [ '50px', (width - 330) + 'px' ],
				shade : false
			});
		}
	},
	initAllSelect : function(sysCodeType, sysCodeData, allCheck) {
		if (sysCodeData) {
			var codeKeys = [];
			$.each(sysCodeData, function(k, v) {
				codeKeys.push(k);
			});
			var json = P.ajax('syscode/searchSysCodeList', {
				codeKeys : codeKeys
			});
			if (json) {
				$.each(sysCodeData, function(k, v) {
					if (json[k]) {
						switch (sysCodeType[k]) {
						case 'S':
							selectSet(v, json[k]);
							break;
						case 'C':
							checkBoxSet(v, json[k], allCheck);
							break;
						case 'CB':
							checkBoxSetNotAll(v, json[k], allCheck);
							break;
						case 'R':
							radioSet(v, json[k]);
							break;
						default:
							break;
						}
					}
				});
			}
		}
		function selectSet(id, list) {
			function selectOption(key, value) {
				return '<option value="' + key + '">' + value + '</option>';
			}
			var o = $('#' + id);
			if (P.notEmpty(id) && P.exist(o) && list) {
				o.empty();
				$.each(list, function(i) {
					var bean = list[i];
					o.append(selectOption(bean['id'], bean['codeName']));
				});
			}
		}
		function checkBoxSet(id, list, allCheck) {
			function checkBox(name, key, value, allCheck) {
				if (allCheck) {
					return '<label class="checkbox-inline"><input type="checkbox" name="' + name + '" value="' + key + '" onclick="P.checkAll(this)"> ' + value + '</label>';
				} else {
					return '<label class="checkbox-inline"><input type="checkbox" name="' + name + '" value="' + key + '"> ' + value + '</label>';
				}
			}
			var o = $('#' + id + 'Label');
			if (P.notEmpty(id) && P.exist(o) && list) {
				o.empty();
				$.each(list, function(i) {
					var bean = list[i];
					o.append(checkBox(id, bean['id'], bean['codeName'], allCheck));
				});
				allCheck && o.append(checkBox(id, 'all', '所有', allCheck));
			}
		}
		function checkBoxSetNotAll(id, list, allCheck) {
			function checkBox(name, key, value, allCheck) {
				if (allCheck) {
					return '<label class="checkbox-inline"><input type="checkbox" name="' + name + '" value="' + key + '" onclick="P.checkAll(this)"> ' + value + '</label>';
				} else {
					return '<label class="checkbox-inline"><input type="checkbox" name="' + name + '" value="' + key + '"> ' + value + '</label>';
				}
			}
			var o = $('#' + id + 'Label');
			if (P.notEmpty(id) && P.exist(o) && list) {
				o.empty();
				$.each(list, function(i) {
					var bean = list[i];
					o.append(checkBox(id, bean['id'], bean['codeName'], allCheck));
				});
				allCheck && o.append(checkBox(id, 'all', '所有', allCheck));
			}
		}
		function radioSet(id, list) {
			function radio(name, key, value) {
				return '<label class="radio-inline"><input type="radio" name="' + name + '" value="' + key + '"> ' + value + '</label>';
			}
			var o = $('#' + id + 'Label');
			if (P.notEmpty(id) && P.exist(o) && list) {
				o.empty();
				$.each(list, function(i) {
					var bean = list[i];
					o.append(radio(id, bean['id'], bean['codeName']));
				});
			}
		}
	},
	/** 对下拉框进行模糊查询 * */
	searchSelectInfo : function(key, func) {
		layer.prompt({
			title : '请输入查询条件',
			formType : 0
		}, function(value, index) {
			layer.close(index);
			var json = P.ajax('syspara/searchSubSysPara', {
				paraKey : key,
				searchText : value
			});
			var content = '<ul>';
			if (json.map) {
				$.each(json.map, function(mapKey, mapValue) {
					content += '<li onclick="' + func + '(' + "'" + mapKey + "'" + ')' + '">' + mapValue + '</li>'
				});
			}
			(content === '<ul>') && (content += '没有匹配的数据');
			content += '</ul>';
			var index = layer.open({
				type : 1,
				skin : 'layui-layer-rim',
				area : [ '420px', '240px' ],
				content : content
			});
		});
	},
	/** 显示下拉框* */
	/** id:下拉框id,url:下拉框查询路径,data:查询参数,faultTitle:默认显示,faultValue:默认值* */
	showSelect : function(id, url, data, faultTitle, faultValue) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.notEmpty(url) && P.exist(o)) {
			function option(key, value) {
				return '<option value="' + key + '">' + value + '</option>';
			}
			data = data || {};
			var json = P.ajax(url, data);
			o.empty();
			P.notEmpty(faultTitle) && o.append(option('', faultTitle));
			if (json.map) {
				$.each(json.map, function(key, value) {
					o.append(option(key, value));
				});
				if (P.notEmpty(faultValue)) {
					o.val(faultValue)
				} else if (json.searchParentId && P.notEmpty(json.searchParentId)) {
					o.val(json.searchParentId)
				}
			} else {
				P.log('showSelect初始化下拉框未查询到map,json:' + json + ',href:' + window.location.href);
			}
		} else {
			P.log('showSelect初始化下拉框参数不正确,id:' + id + ',url:' + url + ',href:' + window.location.href);
		}
	},
	/** 显示多选按钮* */
	/** id:多选按钮所在div的id,url:多选按钮查询路径,data:查询参数,name:多选按钮名称* */
	showCheckBox : function(id, url, data, name, notShow) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.notEmpty(url) && P.exist(o)) {
			function checkbox(name, key, value) {
				return '<input type="checkbox" name="' + name + '" value="' + key + '" title="' + value + '">';
			}
			data = data || {};
			notShow = notShow || [];
			var json = P.ajax(url, data);
			o.empty();
			if (json.map) {
				$.each(json.map, function(key, value) {
					(notShow.indexOf(key) == -1) && o.append(checkbox(name, key, value));
				});
			} else {
				P.log('showCheckBox初始化多选框未查询到map,json:' + json + ',href:' + window.location.href);
			}
		} else {
			P.log('showCheckBox初始化多选框参数不正确,id:' + id + ',url:' + url + ',href:' + window.location.href);
		}
	},
	/** 显示多选按钮* */
	/** id:多选按钮所在div的id,url:多选按钮查询路径,data:查询参数,name:多选按钮名称* */
	showCheckBoxLabel : function(id, url, data, name, notShow) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.notEmpty(url) && P.exist(o)) {
			function checkbox(name, key, value) {
				return '<label class="checkbox-inline"><input type="checkbox" name="' + name + '" value="' + key + '"> ' + value + '</label>';
			}
			data = data || {};
			notShow = notShow || [];
			var json = P.ajax(url, data);
			o.empty();
			if (json.map) {
				$.each(json.map, function(key, value) {
					(notShow.indexOf(key) == -1) && o.append(checkbox(name, key, value));
				});
			} else {
				P.log('showCheckBox初始化多选框未查询到map,json:' + json + ',href:' + window.location.href);
			}
		} else {
			P.log('showCheckBox初始化多选框参数不正确,id:' + id + ',url:' + url + ',href:' + window.location.href);
		}
	},
	/** 显示单选按钮* */
	/** id:单选按钮所在div的id,url:单选按钮查询路径,data:查询参数,name:单选按钮名称* */
	showRadio : function(id, url, data, name, notShow) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.notEmpty(url) && P.exist(o)) {
			function radio(name, key, value) {
				return '<label class="radio-inline"><input type="radio" name="' + name + '" value="' + key + '"> ' + value + '</label>';
			}
			data = data || {};
			notShow = notShow || [];
			var json = P.ajax(url, data);
			o.empty();
			if (json.map) {
				$.each(json.map, function(key, value) {
					(notShow.indexOf(key) == -1) && o.append(radio(name, key, value));
				});
			} else {
				P.log('showRadio初始化单选框未查询到map,json:' + json + ',href:' + window.location.href);
			}
		} else {
			P.log('showRadio初始化单选框参数不正确,id:' + id + ',url:' + url + ',href:' + window.location.href);
		}
	},
	/** 初始化回车方法* */
	/** id:回车时间所在table的id,i:回车事件触发的方法* */
	enterKeyUp : function(id, i, key) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.isFunc(i) && P.exist(o)) {
			key = key || 'keyword';
			$('#' + id + ' input[id^=' + key + ']').bind('keyup', function(e) {
				e = e || window.event;
				(e.keyCode === 13) && i();
			});
		} else {
			P.log('enterKeyUp初始化回车事件参数不正确,id:' + id + ',func:' + i + ',href:' + window.location.href);
		}
	},
	/** 初始化ztree树* */
	initZtree : function(id, url, opt, callback, jscript) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.notEmpty(url) && P.exist(o)) {
			var css = [ 'js/public/ztree/css/zTreeStyle/metro.css' ];
			P.loadJsOrCss(css, P.getLink);
			var js = [ 'js/public/ztree/js/jquery.ztree.core.min.js' ];
			P.notEmpty(jscript) && js.push(jscript);
			P.loadJsOrCss(js, P.getScript, function() {
				function nodeCreated(event, treeId, treeNode) {
					(treeNode.level == 0) && $('#' + treeNode.tId + '_switch').trigger('click');
				}
				var defaults = {
					async : {
						enable : true,
						type : 'post',
						dataType : 'json',
						url : url,
						autoParam : [ 'id' ]
					},
					callback : {
						onNodeCreated : nodeCreated
					}
				}
				opt && (defaults = $.extend(true, defaults, opt));
				var ztree = $.fn.zTree.init(o, defaults);
				P.isFunc(callback) && callback(ztree);
			});
		} else {
			P.log('initZtree初始化ztree树事件参数不正确,id:' + id + ',url:' + url + ',href:' + window.location.href);
		}
	},
	/** 获取ztree对象* */
	getZtree : function(id) {
		if (P.notEmpty(id)) {
			return $.fn.zTree.getZTreeObj(id);
		} else {
			P.log('getZtree获取ztree树事件参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 刷新ztree树* */
	refreshZtree : function(id) {
		if (P.notEmpty(id)) {
			var ztree = P.getZtree(id);
			if (ztree) {
				var nodes = zTreeSysPara.getSelectedNodes();
				if (nodes[0] == null) {
					ztree.reAsyncChildNodes(null, "refresh");
				} else if (nodes[0].isParent) {
					ztree.reAsyncChildNodes(nodes[0], 'refresh');
				} else {
					var parentNode = nodes[0].getParentNode();
					parentNode && ztree.reAsyncChildNodes(parentNode, 'refresh');
				}
			} else {
				P.log('refreshZtree刷新ztree树事件ztree不存在' + ',href:' + window.location.href);
			}
		} else {
			P.log('refreshZtree刷新ztree树事件参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 初始化星星插件* */
	initJqueryRaty : function(id, opt, callback) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			var js = [ 'js/public/raty/raty-2.5.2/lib/jquery.raty.min.js' ];
			P.loadJsOrCss(js, P.getScript, function() {
				var defaults = {
					path : 'js/public/raty/raty-2.5.2/lib/img',
					half : false,
					number : 5,
					hints : [ '轻微', '低', '一般', '高', '严重' ]
				}
				opt && (defaults = $.extend(true, defaults, opt));
				o.raty(defaults);
				P.isFunc(callback) && callback(ztree);
			});
		} else {
			P.log('initJqueryRaty初始化星星插件参数不正确,id:' + id + ',url:' + url + ',href:' + window.location.href);
		}
	},
	/** ajax提交请求* */
	ajax : function(url, data, opt, loading) {
		var jsonResult = {};
		if (P.notEmpty(url)) {
			data = data || {};
			data['ajaxPageUrl'] = P.getAjaxPageUrl();
			loading && P.loading();
			var defaults = {
				url : url,
				data : data,
				type : 'post',
				dataType : 'json',
				/** 同步请求,锁住浏览器* */
				async : false,
				success : function(json) {
					jsonResult = json;
				},
				error : function(error) {
					P.log('ajax提交请求发生错误,error:' + error + ',href:' + window.location.href);
				},
				/** 阻止深度序列化* */
				traditional : true
			}
			opt && (defaults = $.extend(true, defaults, opt));
			$.ajax(defaults);
			loading && P.closeLoading();
		} else {
			P.log('ajax提交请求参数不正确,url:' + url + ',href:' + window.location.href);
		}
		return jsonResult;
	},
	/** ajax提交请求* */
	ajaxN : function(url, data, opt, callback) {
		var jsonResult = {};
		if (P.notEmpty(url)) {
			data = data || {};
			data['ajaxPageUrl'] = P.getAjaxPageUrl();
			var defaults = {
				url : url,
				data : data,
				type : 'post',
				dataType : 'json',
				/** 同步请求,锁住浏览器* */
				async : true,
				success : function(json) {
					jsonResult = json;
					P.isFunc(callback) && callback(json);
				},
				error : function(error) {
					P.log('ajax提交请求发生错误,error:' + error + ',href:' + window.location.href);
				},
				/** 阻止深度序列化* */
				traditional : true
			}
			opt && (defaults = $.extend(true, defaults, opt));
			$.ajax(defaults);
		} else {
			P.log('ajax提交请求参数不正确,url:' + url + ',href:' + window.location.href);
		}
		return jsonResult;
	},
	/** 初始化表单验证* */
	initFormValidate : function(id, i, fields, opt, callback, anyValid) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.isFunc(i) && P.exist(o)) {
			var css = [ 'js/public/bootstrapvalidator/css/bootstrapValidator.min.css' ];
			P.loadJsOrCss(css, P.getLink);
			var js = [ 'js/public/bootstrapvalidator/js/bootstrapValidator.min.js', 'js/public/bootstrapvalidator/js/language/zh_CN.js' ];
			P.loadJsOrCss(js, P.getScript, function() {
				fields = fields || {};
				var defaults = {
					/** 验证提示,可为'tooltip'或'popover'显示* */
					container : null,
					/** 只读,隐藏,不可见的表单跳过验证* */
					excluded : [ ':disabled', ':hidden', ':not(:visible)' ],
					/** 验证显示bootstrap字体图表* */
					feedbackIcons : {
						valid : null,
						invalid : null,
						validating : null
					},
					/** 验证方式:enabled(内容修改后验证),disabled(错误内容提交表单时验证),submitted(所有内容提交表单时验证)* */
					live : 'enabled',
					/** 默认错误提示信息* */
					message : '验证失败',
					/** 验证失败时提交按钮不可点击,默认'[type="submit"]'(提交按钮不可点击)* */
					submitButtons : '',
					/** 小于某个长度不验证* */
					threshold : null,
					trigger : null,
					verbose : null,
					fields : fields
				}
				if (anyValid)
					defaults = $.extend(false, defaults, {
						excluded : null
					});
				opt && (defaults = $.extend(true, defaults, opt));
				o.bootstrapValidator(defaults);
				o.on('success.form.bv', function(e) {
					/** 阻止当前事件* */
					e.preventDefault();
					i();
				});
				P.isFunc(callback) && callback();
			});
		} else {
			P.log('initFormValidate初始化表单验证参数不正确,id:' + id + ',回调方法:' + i + ',href:' + window.location.href);
		}
	},
	/** 销毁表单验证* */
	destroyFormValidate : function(id) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			o.data('bootstrapValidator').destroy();
			o.data('bootstrapValidator', null);
		} else {
			P.log('destroyFormValidate销毁表单验证参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 重置表单验证* */
	resetFormValidate : function(id) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			o.data('bootstrapValidator').resetForm();
		} else {
			P.log('resetFormValidate重置表单验证参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 验证表单字段* */
	revalidField : function(id, field) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			o.data('bootstrapValidator').updateStatus(field, 'NOT_VALIDATED').validateField(field);
		} else {
			P.log('revalidField重新验证表单字段参数不正确,id:' + id + ',field:' + field + ',href:' + window.location.href);
		}
	},
	/** 初始化分页列表* */
	initTable : function(id, url, columns, queryParams, opt, callback, noResize) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.notEmpty(url) && columns && P.exist(o)) {
			queryParams = queryParams || function(params) {
				return params;
			}
			var css = [ 'js/public/bootstraptable/1.11.1/bootstrap-table.min.css', 'js/public/bootstraptable/1.11.1/local.css' ];
			P.loadJsOrCss(css, P.getLink);
			var js = [ 'js/public/bootstraptable/1.11.1/bootstrap-table.min.js', 'js/public/bootstraptable/1.11.1/locale/bootstrap-table-zh-CN.min.js', 'js/public/bootstraptable/1.11.1/extensions/export/bootstrap-table-export.min.js',
					'js/public/bootstraptable/1.11.1/extensions/export/tableExport.js' ];
			function initTableInfo() {
				var defaults = {
					/** 服务器数据加载地址* */
					url : url,
					/** 请求方式* */
					method : 'post',
					/** 服务器返回的数据类型* */
					dataType : 'json',
					/** 是否使用缓存,默认使用,设置false禁用ajax数据缓存* */
					cache : false,
					/** 发送到服务器端的数据编码类型* */
					contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
					/** undefined可获取pageNumber,pageSize,searchText,sortName,sortOrder* */
					queryParamsType : "undefined",
					/** 服务器请求的参数* */
					queryParams : queryParams,
					/** 表格高度* */
					height : P.getHeight() - 30,
					/** 是否底部显示分页条* */
					pagination : true,
					/** false时分页将记住排序* */
					silentSort : false,
					/** 分页方式:client客户端,server服务端* */
					sidePagination : "server",
					/** 初始化加载第一页* */
					pageNumber : 1,
					/** 每页记录行数* */
					pageSize : 10,
					/** 可供选择的每页行数* */
					pageList : [ 10, 20, 50, 500, 5000, 'ALL' ],
					/** radio或checkBox的字段名* */
					selectItemName : id,
					/** true时点击行自动选择单选框复选框* */
					clickToSelect : false,
					/** false时列头隐藏全选按钮* */
					checkboxHeader : true,
					/** true时搜索将记住单选复选框* */
					maintainSelected : true,
					/** 是否启用搜索框* */
					search : true,
					/** 回车触发搜索方法* */
					searchOnEnterKey : true,
					/** 显示内容列下拉框* */
					showColumns : true,
					/** 显示刷新按钮* */
					showRefresh : true,
					/** table/card切换视图* */
					showToggle : true,
					/** 显示列数据选择框* */
					showPaginationSwitch : false,
					/** 列内容小于1时隐藏列内容选择框* */
					minimumCountColumns : 1,
					/** 显示导出按钮* */
					showExport : true,
					/** 分页条放到列表上面* */
					paginationVAlign : 'top',
					/** 列配置项* */
					columns : columns,
					/** 指定toolbar容器* */
					toolbar : "#toolbar",
					/** toolbar水平位置left/right* */
					toolbarAlign : 'left'
				}
				opt && (defaults = $.extend(true, defaults, opt));
				o.bootstrapTable(defaults);
				if (noResize) {
				} else {
					$(window).resize(function() {
						o.bootstrapTable('resetView', {
							height : P.getHeight() - 30
						});
					});
				}
				// $('.pagination .active').onclick(function(e) {
				// return false;
				// })
				P.isFunc(callback) && callback();
			}
			P.loadJsOrCss(js, P.getScript, initTableInfo)
		} else {
			P.log('initTable初始化分页列表参数不正确,id:' + id + ',url:' + url + ',columns:' + columns + ',href:' + window.location.href);
		}
	},
	/** 初始化分页列表* */
	initTableClient : function(id, data, columns, queryParams, opt, callback, noResize) {
		var o = $('#' + id);
		if (P.notEmpty(id) && columns && P.exist(o)) {
			queryParams = queryParams || function(params) {
				return params;
			}
			var css = [ 'js/public/bootstraptable/1.11.1/bootstrap-table.min.css', 'js/public/bootstraptable/1.11.1/local.css' ];
			P.loadJsOrCss(css, P.getLink);
			var js = [ 'js/public/bootstraptable/1.11.1/bootstrap-table.min.js', 'js/public/bootstraptable/1.11.1/locale/bootstrap-table-zh-CN.min.js', 'js/public/bootstraptable/1.11.1/extensions/export/bootstrap-table-export.min.js',
					'js/public/bootstraptable/1.11.1/extensions/export/tableExport.js' ];
			function initTableInfo() {
				var defaults = {
					/** 服务器数据加载地址* */
					data : data,
					/** 请求方式* */
					// method : 'post',
					/** 是否使用缓存,默认使用,设置false禁用ajax数据缓存* */
					cache : false,
					striped : false,
					/** undefined可获取pageNumber,pageSize,searchText,sortName,sortOrder* */
					// queryParamsType : "undefined",
					/** 服务器请求的参数* */
					// queryParams : queryParams,
					/** 表格高度* */
					height : P.getHeight() - 30,
					/** 是否底部显示分页条* */
					pagination : true,
					/** false时分页将记住排序* */
					silentSort : false,
					sortName : "callBackRate",
					/** *排序方式* */
					sortable : true,
					/** 分页方式:client客户端,server服务端* */
					sidePagination : "client",
					/** 初始化加载第一页* */
					pageNumber : 1,
					/** 每页记录行数* */
					pageSize : 10,
					/** 可供选择的每页行数* */
					pageList : [ 10, 20, 50, 500, 5000, 'ALL' ],
					/** radio或checkBox的字段名* */
					selectItemName : id,
					/** true时点击行自动选择单选框复选框* */
					clickToSelect : false,
					/** false时列头隐藏全选按钮* */
					checkboxHeader : true,
					/** true时搜索将记住单选复选框* */
					maintainSelected : true,
					/** 是否启用搜索框* */
					search : true,
					/** 回车触发搜索方法* */
					searchOnEnterKey : true,
					/** 显示内容列下拉框* */
					showColumns : true,
					/** 显示刷新按钮* */
					showRefresh : true,
					/** table/card切换视图* */
					showToggle : true,
					/** 显示列数据选择框* */
					showPaginationSwitch : false,
					/** 列内容小于1时隐藏列内容选择框* */
					minimumCountColumns : 1,
					/** 显示导出按钮* */
					showExport : true,
					/** 导出全部* */
					exportDataType : "all",
					/** 分页条放到列表上面* */
					paginationVAlign : 'top',
					/** 列配置项* */
					columns : columns,
					/** 指定toolbar容器* */
					toolbar : "#toolbar",
					/** toolbar水平位置left/right* */
					toolbarAlign : 'left',
					strictSearch : true,
				}
				opt && (defaults = $.extend(true, defaults, opt));
				o.bootstrapTable(defaults);
				if (noResize) {
				} else {
					$(window).resize(function() {
						o.bootstrapTable('resetView', {
							height : P.getHeight() - 30
						});
					});
				}
				// $('.pagination .active').onclick(function(e) {
				// return false;
				// })
				P.isFunc(callback) && callback();
			}
			P.loadJsOrCss(js, P.getScript, initTableInfo)
		} else {
			P.log('initTable初始化分页列表参数不正确,id:' + id + ',url:' + url + ',columns:' + columns + ',href:' + window.location.href);
		}
	},
	/** 销毁分页列表* */
	destroyTable : function(id) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			o.bootstrapTable('destroy');
		} else {
			P.log('destroyTable销毁分页列表参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 刷新分页列表* */
	refreshTable : function(id) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			o.bootstrapTable('refresh', {});
		} else {
			P.log('refreshTable刷新分页列表参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 获取分页列表选择行* */
	getTableSelections : function(id, field) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			field = field || "id";
			return $.map(o.bootstrapTable('getSelections'), function(row) {
				return row[field];
			});
		} else {
			return [];
			P.log('getTableSelections获取分页列表选择行参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 显示分页列表详情* */
	showTableDetailView : function(id, i) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			o.bootstrapTable('refreshOptions', {
				/** true则显示详细页面模式* */
				detailView : true,
				/** 格式化详细页面模式视图* */
				detailFormatter : function detailFormatter(index, row) {
					var html = [];
					if (row.detail) {
						html.push(row.detail);
					} else {
						if (i) {
							if (typeof (i) == "string") {
								html.push(row[i]);
							} else if (P.isFunc(i)) {
								html.push(i(row));
							} else {
								html.push('无详细信息');
							}
						} else {
							html.push('无详细信息');
						}
					}
					return html.join('');
				}
			});
		} else {
			P.log('showTableDetailView显示分页列表详情参数不正确,id:' + id + ',详细内容:' + i + ',href:' + window.location.href);
		}
	},
	/** 隐藏分页列表搜索框和按钮* */
	hideTableSearchAndBtn : function(id) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			o.bootstrapTable('refreshOptions', {
				search : false,
				searchOnEnterKey : false,
				showColumns : false,
				showRefresh : false,
				showToggle : false,
				showPaginationSwitch : false,
				showExport : false,
			});
		} else {
			P.log('hideTableSearchAndBtn隐藏分页列表搜索和按钮参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 更新分页列表设置* */
	refreshTableOptions : function(id, opt) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			opt = opt || {};
			o.bootstrapTable('refreshOptions', opt);
		} else {
			P.log('refreshTableOptions更新分页设置参数不正确,id:' + id + ',参数:' + opt + ',href:' + window.location.href);
		}
	},
	/** 设置删除按钮隐藏显示* */
	initTableDeleteBtnStatus : function(id, btn) {
		var o = $('#' + id);
		var b = $('#' + btn);
		if (P.notEmpty(id) && P.notEmpty(btn) && P.exist(o) && P.exist(b)) {
			/** 选中/取消选中单行,选中/取消选中全部时触发* */
			o.on('check.bs.table uncheck.bs.table check-all.bs.table ' + 'uncheck-all.bs.table load-success.bs.table', function() {
				b.prop('disabled', !o.bootstrapTable('getSelections').length);
			});
		} else {
			P.log('initTableDeleteBtnStatus设置删除按钮隐藏显示参数不正确,id:' + id + ',btn:' + btn + ',href:' + window.location.href);
		}
	},
	/** 设置搜索框默认显示内容* */
	initTableSearchText : function(id, defaultInfo, width) {
		var o = $('#' + id);
		defaultInfo = defaultInfo || '搜索';
		width = width || '200px';
		if (P.notEmpty(id) && P.exist(o)) {
			var searchInput = o.parent().parent().parent().children(".fixed-table-toolbar").children('.search').children('.form-control');
			if (P.exist(searchInput)) {
				searchInput.attr('placeholder', defaultInfo);
				searchInput.css('width', width);
			}
		} else {
			P.log('initTableSearchText初始化搜索框显示参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	initTableToolbarEnd : function(id) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			var parent = o.parent().parent().parent().children(".fixed-table-toolbar");
			var toolbar = o.parent().parent().parent().children(".fixed-table-toolbar").children('.bs-bars');
			if (P.exist(toolbar) && P.exist(parent)) {
				var temp = toolbar;
				toolbar.remove();
				parent.append(temp);
			}
		} else {
			P.log('initTableToolbarEnd初始化工具栏,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 初始化上传插件* */
	initFileInputUpload : function(id, url, i, opt, callback) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.notEmpty(url) && P.exist(o)) {
			var css = [ 'js/public/fileinput/css/fileinput.min.css' ];
			P.loadJsOrCss(css, P.getLink);
			var js = [ 'js/public/fileinput/js/fileinput.min.js', 'js/public/fileinput/js/locales/zh.js' ];
			P.loadJsOrCss(js, P.getScript, function() {
				var defaults = {
					/** 语言中文* */
					language : 'zh',
					/** 上传路径* */
					uploadUrl : url,
					/** 允许上传的文件类型['image','text', 'video']* */
					allowedFileTypes : null,
					/** 允许上传的文件后缀名['jpg', 'gif', 'png', 'txt']* */
					allowedFileExtensions : null,
					/** 默认异步上传* */
					uploadAsync : true,
					/** 不显示上传按钮* */
					showBrowse : false,
					/** * */
					showRemove : false,
					/** 点击窗口允许上传* */
					browseOnZoneClick : true,
					/** 是否显示拖拽区域* */
					dropZoneEnabled : true,
					/** 最大上传数* */
					maxFileCount : 10,
					/** 最大上传文件大小,单位kb* */
					maxFileSize : 10000
				}
				opt && (defaults = $.extend(true, defaults, opt));
				o.fileinput(defaults);
				/** 上传失败* */
				o.on('fileerror', function(e, data, msg) {
					P.log('文件上传失败');
				});
				/** 上传成功* */
				o.on("fileuploaded", function(e, data, pid, index) {
					P.log('文件上传成功');
					P.isFunc(i) && i(data);
				});
				/** 批量上传失败* */
				o.on('filebatchuploaderror', function(e, data, msg) {
					P.log('批量上传失败');
				});
				/** 批量上传成功* */
				o.on("filebatchuploadsuccess", function(e, data, pid, index) {
					P.log('批量上传成功');
				});
				o.on('filesuccessremove', function(event, id) {
					P.msg('已上传附件不能删除', true, {
						icon : 5,
						shift : 6
					});
					event.preventDefault();
				});
				P.isFunc(callback) && callback();
			});
		} else {
			P.log('initFileInputUpload初始化上传插件参数不正确,id:' + id + ',url:' + url + ',href:' + window.location.href);
		}
	},
	/** 初始化日期选择器* */
	initDatePicker : function(id, opt, func, callback) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			var css = [ 'js/public/bootstraptimepicker/css/bootstrap-datetimepicker.min.css' ];
			P.loadJsOrCss(css, P.getLink);
			var js = [ 'js/public/bootstraptimepicker/js/bootstrap-datetimepicker.min.js', 'js/public/bootstraptimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js' ];
			P.loadJsOrCss(js, P.getScript, function() {
				var defaults = {
					/** 语言中文* */
					language : 'zh-CN',
					/** yyyy,yy,MM,M,mm,m,dd,d,HH,H,hh,h,ii,i,ss,s,P,p* */
					format : 'yyyy-mm-dd hh:ii:ss',
					/** 一周从第几天开始,0(星期天)* */
					weekStart : 0,
					/** 选择日期后是否自动关闭* */
					autoclose : true,
					/** 显示'今天'按钮,点击默认选中今天* */
					todayBtn : 'linked'
				}
				opt && (defaults = $.extend(true, defaults, opt));
				o.datetimepicker(defaults).on('hide', function(ev) {
					P.isFunc(func) && func();
				});
				P.isFunc(callback) && callback();
			});
		} else {
			P.log('initDatePicker初始化日期选择器参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 移除日期选择器* */
	removeDatePicker : function(id) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			o.datetimepicker('remove');
		} else {
			P.log('removeDatePicker移除日期选择器参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 显示日期选择器* */
	showDatePicker : function(id) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			o.datetimepicker('show');
		} else {
			P.log('showDatePicker显示日期选择器参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 隐藏日期选择器* */
	hideDatePicker : function(id) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			o.datetimepicker('hide');
		} else {
			P.log('hideDatePicker隐藏日期选择器参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 更新日期选择器* */
	updateDatePicker : function(id) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			o.datetimepicker('update');
		} else {
			P.log('updateDatePicker更新日期选择器参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 下拉框添加模糊查询* */
	initBootstrapSelect : function(id, opt, title, callback) {
		id = id || 'select';
		var o = $(id);
		if (P.notEmpty(id) && P.exist(o)) {
			var css = [ 'js/public/select2-4.0.3/css/select2.min.css' ];
			P.loadJsOrCss(css, P.getLink);
			var js = [ 'js/public/select2-4.0.3/js/select2.full.min.js', 'js/public/select2-4.0.3/js/i18n/zh-CN.js' ];
			P.loadJsOrCss(js, P.getScript, function() {
				// title = P.notEmpty(title)?title:'';
				var defaults = {
					placeholder : title,
					language : "zh-CN"
				}
				opt && (defaults = $.extend(true, defaults, opt));
				o.select2(defaults);
				P.isFunc(callback) && callback();
			});
		} else {
			P.log('initBootstrapSelect初始化下拉框参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 初始化富文本编辑器* */
	initRichSummerNote : function(id, opt, uploadFunc, callback) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			var t = [];
			t.push([ 'style', [ 'bold', 'italic', 'underline', 'clear' ] ]);
			t.push([ 'font', [ 'strikethrough', 'superscript', 'subscript' ] ]);
			t.push([ 'fontsize', [ 'fontsize' ] ]);
			t.push([ 'color', [ 'color' ] ]);
			t.push([ 'para', [ 'ul', 'ol', 'paragraph' ] ]);
			t.push([ 'insert', [ 'picture', 'link', 'table', 'hr' ] ]);
			var css = [ 'js/public/summernote/summernote.css' ];
			P.loadJsOrCss(css, P.getLink);
			var js = [ 'js/public/summernote/summernote.js' ];
			P.loadJsOrCss(js, P.getScript, function() {
				var defaults = {
					/** 默认内容* */
					placeholder : '请输入内容',
					/** 默认高度* */
					height : 300,
					/** 最小高度* */
					minHeight : null,
					/** 最大高度* */
					maxHeight : null,
					/** 工具栏* */
					toolbar : t,
					/** 回调方法* */
					callbacks : {
						onImageUpload : function(file) {
							P.isFunc(uploadFunc) && uploadFunc(file);
						}
					}
				}
				opt && (defaults = $.extend(true, defaults, opt));
				o.summernote(defaults);
				P.isFunc(callback) && callback();
			});
		} else {
			P.log('initRichSummerNote初始化富文本编辑器参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 富文本编辑器插入图片* */
	insertRichSummerNoteImg : function(id, url) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o) && P.notEmpty(url)) {
			o.summernote('insertImage', url, 'img');
		} else {
			P.log('insertRichSummerNoteImg富文本编辑器插入图片参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 富文本编辑器判断是否为空* */
	richSummerNoteIsEmpty : function(id) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			return o.summernote('isEmpty');
		} else {
			P.log('richSummerNoteIsEmpty富文本编辑判断是否为空参数不正确,id:' + id + ',href:' + window.location.href);
			return true;
		}
	},
	/** 富文本编辑器取值* */
	richSummerNoteGetCode : function(id) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			if (P.richSummerNoteIsEmpty(id)) {
				return '';
			} else {
				return o.summernote('code');
			}
		} else {
			P.log('richSummerNoteGetCode富文本编辑取值参数不正确,id:' + id + ',href:' + window.location.href);
			return '';
		}
	},
	/** 富文本编辑器赋值* */
	richSummerNoteSetCode : function(id, code) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o) && P.notEmpty(code)) {
			o.summernote('code', code);
		} else {
			P.log('richSummerNoteSetCode富文本编辑赋值参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 初始化百度地图* */
	initBaiduMap : function(id, opt, callback) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			var defaults = {
				/** 中心城市* */
				currentCity : '宜阳县',
				/** 中心点经度* */
				pointLng : 112.02424,
				/** 中心点纬度* */
				pointLat : 34.494886,
				/** 缩放控件级别* */
				zoomLevel : 11,
				/** 最小缩放比例* */
				minZoom : 7,
				/** 最大缩放比例* */
				maxZoom : 19
			}
			opt && (defaults = $.extend(true, defaults, opt));
			var map = new BMap.Map(id, {
				enableMapClick : false
			});
			/** 启用滚轮放大缩小* */
			map.enableScrollWheelZoom();
			/** 启用键盘方向键操作地图* */
			map.enableKeyboard();
			map.setMinZoom(defaults.minZoom);
			map.setMaxZoom(defaults.maxZoom);
			map.centerAndZoom(new BMap.Point(defaults.pointLng, defaults.pointLat), defaults.zoomLevel);
			/** 平移缩放控件* */
			map.addControl(new BMap.NavigationControl());
			/** html5地图定位控件* */
			map.addControl(new BMap.GeolocationControl());
			/** 缩略地图控件* */
			map.addControl(new BMap.OverviewMapControl());
			/** 地图比例尺控件* */
			map.addControl(new BMap.ScaleControl());
			/** 地图类型控件* */
			map.addControl(new BMap.MapTypeControl({
				mapTypes : [ BMAP_NORMAL_MAP, BMAP_PERSPECTIVE_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP ]
			}));
			P.isFunc(callback) && callback(map);
		} else {
			P.log('initBaiduMap初始化百度地图参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 初始化简单百度地图* */
	initSimpleBaiduMap : function(id, opt, callback) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			var defaults = {
				/** 中心城市* */
				currentCity : '宜阳县',
				/** 中心点经度* */
				pointLng : 112.02424,
				/** 中心点纬度* */
				pointLat : 34.494886,
				/** 缩放控件级别* */
				zoomLevel : 11,
				/** 最小缩放比例* */
				minZoom : 5,
				/** 最大缩放比例* */
				maxZoom : 19
			}
			opt && (defaults = $.extend(true, defaults, opt));
			var map = new BMap.Map(id, {
				enableMapClick : false
			});
			/** 启用滚轮放大缩小* */
			map.enableScrollWheelZoom();
			/** 启用键盘方向键操作地图* */
			map.enableKeyboard();
			map.setMinZoom(defaults.minZoom);
			map.setMaxZoom(defaults.maxZoom);
			map.centerAndZoom(new BMap.Point(defaults.pointLng, defaults.pointLat), defaults.zoomLevel);
			P.isFunc(callback) && callback(map);
		} else {
			P.log('initBaiduMap初始化百度地图参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 初始化百度地图绘制* */
	initBaiduMapDraw : function(map, opt, callback) {
		if (map) {
			var css = [ 'js/public/baiduGis/css/DrawingManager_min.css' ];
			P.loadJsOrCss(css, P.getLink);
			var js = [ 'js/public/baiduGis/js/DrawingManager_min.js' ];
			P.loadJsOrCss(js, P.getScript, function() {
				var defaults = {
					/** 是否开启绘制模式* */
					isOpen : false,
					/** 绘制时是否进行测距* */
					enableCalculate : false,
					/** 覆盖物样式* */
					polygonOptions : {
						/** 边线颜色* */
						strokeColor : "blue",
						/** 边线宽度* */
						strokeWeight : 2,
						/** 边线透明度* */
						strokeOpacity : 0.8,
						/** 填充透明度* */
						fillOpacity : 0.1,
						/** 边线样式,solid或dashed* */
						strokeStyle : 'solid'
					}
				}
				opt && (defaults = $.extend(true, defaults, opt));
				var drawManager = new BMapLib.DrawingManager(map, defaults);
				P.isFunc(callback) && callback(drawManager);
			});
		} else {
			P.log('initDatePicker初始化日期选择器参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 初始化天地图* */
	initTianDiTu : function(id, callback) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			var map = new TMap(id);
			/** 设置中心点和级别* */
			map.centerAndZoom(new TLngLat(108.974385, 34.329685), 8);
			/** 启用地图拖拽* */
			map.enableDrag();
			/** 启用滚轮放大缩小* */
			map.enableHandleMouseScroll();
			/** 启用双击放大* */
			map.enableDoubleClickZoom();
			/** 启用键盘操作* */
			map.enableHandleKeyboard();
			/** 添加缩放平移控件* */
			var naviConfig = {
				/** 缩放平移的显示类型* */
				type : "TMAP_NAVIGATION_CONTROL_LARGE",
				/** 缩放平移控件显示的位置* */
				anchor : "TMAP_ANCHOR_TOP_LEFT",
				/** 缩放平移控件的偏移值* */
				offset : [ 0, 0 ],
				/** 是否显示级别提示信息，true表示显示，false表示隐藏* */
				showZoomInfo : true
			};
			/** 创建缩放平移控件对象* */
			var naviControl = new TNavigationControl(naviConfig);
			/** 添加缩放平移控件* */
			map.addControl(naviControl);
			/** 添加比例尺控件* */
			/** 创建比例尺控件对象* */
			var scaleControl = new TScaleControl();
			/** 设置颜色* */
			scaleControl.setColor('black');
			/** 添加比例尺控件* */
			map.addControl(scaleControl);
			/** 添加鹰眼控件* */
			var overViewConfig = {
				/** 设置鹰眼位置,"TMAP_ANCHOR_TOP_LEFT"表示左上，"TMAP_ANCHOR_TOP_RIGHT"表示右上，"TMAP_ANCHOR_BOTTOM_LEFT"表示左下，"TMAP_ANCHOR_BOTTOM_RIGHT"表示右下，"TMAP_ANCHOR_LEFT"表示左边，"TMAP_ANCHOR_TOP"表示上边，"TMAP_ANCHOR_RIGHT"表示右边，"TMAP_ANCHOR_BOTTOM"表示下边，"TMAP_ANCHOR_OFFSET"表示自定义位置,默认值为"TMAP_ANCHOR_BOTTOM_RIGHT"* */
				anchor : "TMAP_ANCHOR_BOTTOM_RIGHT",
				/** 鹰眼显示的大小* */
				size : new TSize(180, 120),
				/** 鹰眼是否打开，true表示打开，false表示关闭，默认为关闭* */
				isOpen : true
			};
			/** 创建鹰眼控件* */
			var overViewMap = new TOverviewMapControl(overViewConfig);
			/** 添加鹰眼控件* */
			map.addControl(overViewMap);
			/** 添加版权信息* */
			var cotyRightControl = new TCopyrightControl();
			/** 设置版权的位置* */
			cotyRightControl.setLeft(70);
			cotyRightControl.setTop(10);
			/** 添加版权控件* */
			// map.addControl(cotyRightControl);
			/** 添加版权内容及事件* */
			cotyRightControl.addCopyright({
				id : 1,
				content : "<a href='http://www.tianditu.cn' target='_blank' style='font-size:14;'>集云控制台</a>"
			});
			/** 创建地图类型控件对象* */
			var mapTypControl = new TMapTypeControl();
			/** 将地图类型控件添加到地图上* */
			map.addControl(mapTypControl);
			/** 设置地图类型控件在地图上显示的位置，默认为在右侧，注：将控件加载到map之后再做此配置* */
			mapTypControl.setRight(10);
			mapTypControl.setTop(20);
			P.isFunc(callback) && callback(map, overViewMap);
		} else {
			P.log('initTianDiTu初始化天地图参数不正确,id:' + id + ',href:' + window.location.href);
		}
	},
	/** 初始化图片懒加载* */
	initLazyLoadImg : function() {
		var js = [ 'js/public/lazyload/jquery.lazyload.min.js' ];
		P.loadJsOrCss(js, P.getScript, function() {
			$("img").lazyload({
				placeholder : 'images/lazydefault.png',
				effect : 'fadeIn'
			});
		});
	},
	/** 获取屏幕高度* */
	getHeight : function() {
		return $(window).height();
	},
	/** 获取屏幕宽度* */
	getWidth : function() {
		return $(window).width();
	},
	/** 初始化表单数据* */
	initFormInfo : function(data, funcData) {
		if (data) {
			var keys = [];
			if (funcData) {
				$.each(funcData, function(k, v) {
					if (data[k] != null) {
						P.setValue(k, data[k], data);
						P.isFunc(funcData[k]) && funcData[k](data[k]);
						keys.push(k);
					}
				});
			}
			$.each(data, function(k) {
				(!P.inArray(k, keys)) && P.setValue(k, data[k], data);
			});
		}
	},
	/** 初始化表单数据并且仅初始化funcData中的数据* */
	initFormInfoOnly : function(data, funcData) {
		if (data && funcData) {
			$.each(funcData, function(k, v) {
				if (P.notEmpty(data[k])) {
					P.setValue(k, data[k], data);
					P.isFunc(funcData[k]) && funcData[k](data[k]);
				}
			});
		}
	},
	/** 根据key和value向表单中赋值* */
	setValue : function(key, value, data) {
		var flag = false;
		/** 根据id赋值* */
		var o = (P.exist($("#" + key)) ? $("#" + key) : (P.exist($("." + key + "C")) ? $("." + key + "C") : (P.exist($('[name="' + key + '"]')) ? $('[name="' + key + '"]') : (P.exist($('[name="bean.' + key + '"]')) ? $('[name="bean.' + key
				+ '"]') : null))));
		if (P.exist(o)) {
			$.each(o, function(i) {
				switch (o[i].tagName) {
				case 'LABEL':
					$(o[i]).html(value);
					break;
				case 'SPAN':
					$(o[i]).html(value);
					break;
				case 'INPUT':
					switch (o[i].type) {
					case 'radio':
						(o[i].value == value) && (o[i].checked = true);
						break;
					case 'checkbox':
						if (o[i].value == value) {
							o[i].checked = true;
						} else if (P.inArray(o[i].value, value)) {
							o[i].checked = true;
						}
						break;
					case 'text':
						$(o[i]).val(value);
						break;
					case 'number':
						$(o[i]).val(value);
						break;
					case 'hidden':
						$(o[i]).val(value);
						break;
					case 'email':
						$(o[i]).val(value);
						break;
					case 'password':
						$(o[i]).val(value);
						break;
					case 'tel':
						$(o[i]).val(value);
						break;
					default:
						P.log(key + ":INPUT[" + o[i].type + "]未加判断");
						break;
					}
					break;
				case 'SELECT':
					$(o[i]).val(value);
					break;
				case 'TEXTAREA':
					$(o[i]).val(value);
					break;
				case 'IMG':
					var signatureCheck = new RegExp('Signature');
					(signatureCheck.test(key)) && showSignature(key, data);
					break;
				case 'P':
					$(o[i]).html(value);
					break;
				default:
					P.log(key + ":" + o[i].tagName + "未加判断");
					break;
				}
			});
		}
	},
	/** 批量加载* */
	loadJsOrCss : function(arr, i, callback) {
		if (arr && arr.length && P.isFunc(i)) {
			callback = callback || function() {
			};
			var end = 0;
			var ite = function() {
				i(arr[end], function() {
					end += 1;
					if (end >= arr.length) {
						callback();
					} else {
						ite();
					}
				});
			};
			ite();
		} else {
			P.log('loadJsOrCss批量加载参数不正确,arr:' + arr + ',i:' + i + ',href:' + window.location.href);
		}
	},
	/** 加载js* */
	getScript : function(url, callback) {
		if (P.notEmpty(url)) {
			callback = callback || function() {
			};
			var njs = document.createElement('script');
			njs.src = url;
			var js = document.getElementsByTagName("script");
			for (i = 0; i < js.length; i++) {
				var cjs = js[i];
				if (njs.src == cjs.src) {
					callback();
					return;
				}
			}
			var h = document.getElementsByTagName('head')[0];
			var d = false;
			njs.onload = njs.onreadystatechange = function() {
				if ((!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') && !d) {
					d = true;
					callback();
					njs.onload = njs.onreadystatechange = null;
				}
			};
			h.appendChild(njs);
		} else {
			P.log('getScript加载js参数不正确,url:' + url + ',href:' + window.location.href);
		}
	},
	/** 加载css* */
	getLink : function(url, callback) {
		if (P.notEmpty(url)) {
			callback = callback || function() {
			};
			var ncss = document.createElement('link');
			ncss.href = url;
			ncss.rel = "stylesheet";
			var css = document.getElementsByTagName("link");
			for (i = 0; i < css.length; i++) {
				var ccss = css[i];
				if (ncss.href == ccss.href) {
					callback();
					return;
				}
			}
			var h = document.getElementsByTagName('head')[0];
			var d = false;
			ncss.onload = ncss.onreadystatechange = function() {
				if ((!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') && !d) {
					d = true;
					callback();
					ncss.onload = ncss.onreadystatechange = null;
				}
			};
			h.appendChild(ncss);
		} else {
			P.log('getLink加载css参数不正确,url:' + url + ',href:' + window.location.href);
		}
	},
	/** 任意浏览器控制台打印* */
	log : function(msg) {
		if (P.notEmpty(msg))
			window.console.log(msg);
		else
			window.console.log("空");
	},
	/** 延迟* */
	delay : function(callback, i) {
		i = i || 1000;
		setTimeout(function() {
			P.isFunc(callback) && callback();
		}, i);
	},
	/** 元素是否存在* */
	exist : function(o) {
		return (o != null && o.length != null && o.length > 0);
	},
	/** 是否是一个方法* */
	isFunc : function(func) {
		return (func && typeof (func) == 'function');
	},
	/** 值是否在数组里面* */
	inArray : function(v, array) {
		return ($.isArray(array) && $.inArray(v, array) != -1);
	},
	/** 判断是不是数组* */
	isArray : function(array) {
		return ($.isArray(array));
	},
	/** 打开新的页面* */
	openLocation : function(url, newFlag) {
		if (P.notEmpty(url)) {
			if (newFlag) {
				window.location.href = url;
			} else {
				if (document.baseURI) {
					window.location.href = (document.baseURI + url);
				} else {
					window.location.href = ($("base").attr("href") + url);
				}
			}
		} else {
			P.log('openLocation打开新页面参数不正确,url:' + url + ',href:' + window.location.href);
		}
	},
	showPreFile : function(file) {
		if (file) {
			function getFileInfo(file, k) {
				return "<div style='padding:5px;' id=" + file[k][0] + "><a style='color:blue;' href='PreFileDownServlet.do?id=" + file[k][0] + '&beanId=' + file[k][1] + "'>" + file[k][2] + "</a></div>";
			}
			$.each(file, function(k) {
				$("#prefile").append(getFileInfo(file, k));
			});
		}
	},
	showProFile : function(file) {
		if (file) {
			function getFileInfo(file, k) {
				return "<div style='padding:5px;' id=" + file[k][0] + "><a style='color:blue;' href='ProFileDownServlet.do?id=" + file[k][0] + '&beanId=' + file[k][1] + "'>" + file[k][2] + "</a></div>";
			}
			$.each(file, function(k) {
				$("#profile").append(getFileInfo(file, k));
			});
		}
	},
	getMapUrl : function(lat, lng) {
		return 'grid/showlocation?lat=' + lat + '&lng=' + lng;
	},
	base64Encode : function(v, callback) {
		if (P.notEmpty(v)) {
			var js = [ 'js/public/base64/jquery.base64.js' ];
			P.loadJsOrCss(js, P.getScript, function() {
				var r = $.base64.btoa(window.encodeURIComponent(v));
				P.isFunc(callback) && callback(r);
			});
		} else {
			P.isFunc(callback) && callback('');
		}
	},
	base64Decode : function(v, callback) {
		if (P.notEmpty(v)) {
			var js = [ 'js/public/base64/jquery.base64.js' ];
			P.loadJsOrCss(js, P.getScript, function() {
				var r = window.decodeURIComponent($.base64.atob(v));
				P.isFunc(callback) && callback(r);
			});
		} else {
			P.isFunc(callback) && callback('');
		}
	},
	/** 显示附件* */
	showFile : function(file) {
		if (file) {
			function getFileInfo(file, k) {
				return "<div style='padding:5px;' id=" + file[k][0] + "><a style='color:blue;' href='TaskFileDownServlet.do?id=" + file[k][0] + "'>" + file[k][1] + "</a></div>";
			}
			$.each(file, function(k) {
				$("#files").append(getFileInfo(file, k));
			});
		}
	},
	/** 显示备注* */
	showRemark : function(remark) {
		if (remark) {
			function getRemark(remark, k) {
				return "<label>" + remark[k][0] + "(任务名称：" + remark[k][1] + "&nbsp;&nbsp;&nbsp; 填写时间：" + remark[k][3] + ")<br/>备注内容：" + remark[k][2] + "</label><br/>";
			}
			$.each(remark, function(k) {
				$("#remarks").append(getRemark(remark, k));
			})
		}
	},
	/** 删除附件* */
	deleteFile : function(id) {
		if (P.notEmpty(id)) {
			var json = P.ajax('DeleteAllServlet.do', {
				id : id
			});
			if (json.code != null && json.code == 0) {
				P.msg('删除成功', 1);
				$("#" + id).remove();
			} else {
				P.msg('删除失败', 2);
			}
		}
	},
	getDomainUrl : function() {
		var url = window.location.href;
		if (P.notEmpty(url)) {
			var s = url.split('/')
			if (s.length > 3) {
				var d = s[2];
				var ds = d.split('.')
				if (ds.length > 1) {
					return ds[0];
				}
			}
		}
		return "";
	},
	getAjaxPageUrl : function() {
		var url = window.location.pathname;
		if (P.notEmpty(url)) {
			var s = url.split('/')
			return s[s.length - 1];
		}
		return "";
	},
	eachList : function(data, func) {
		if (data) {
			$.each(data, function(i) {
				P.isFunc(func) && func(data[i]);
			})
		}
	},
	eachMap : function(data, func) {
		if (data) {
			$.each(data, function(k, v) {
				P.isFunc(func) && func(k, v);
			})
		}
	},
	formSerializeExtra : function(id, data) {
		var o = $('#' + id);
		var result = '';
		if (P.notEmpty(id) && P.exist(o)) {
			result += o.serialize();
		}
		if (data) {
			P.notEmpty(result) && (result += '&');
			result += $.param(data, true);
		}
		return result;
	},
	showQueryInfo : function() {
		if ($('.extraGroup').is(':hidden')) {
			$('.extraGroup').show();
			$('.showExtraGroup').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
		} else {
			$('.extraGroup').hide();
			$('.showExtraGroup').removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
		}
	},
	getCheckBoxValue : function(name) {
		var o = $('[name="' + name + '"]');
		var value = [];
		if (P.notEmpty(name) && P.exist(o)) {
			$.each(o, function(i) {
				o[i].checked && value.push(o[i].value);
			});
		}
		return value;
	},
	arrayToStr : function(arr) {
		if (arr && P.isArray(arr)) {
			return arr.join(',');
		}
		return '';
	},
	initDivFlow : function(id, item, callback) {
		var o = $('#' + id);
		if (P.notEmpty(id) && P.exist(o)) {
			var js = [ 'js/public/masonry/masonry.pkgd.min.js', 'js/public/imagesloaded/imagesloaded.pkgd.min.js' ];
			P.loadJsOrCss(js, P.getScript, function() {
				var container = $('#' + id + ' .' + item);
				var masonryContainer = o;
				container.imagesLoaded(function() {
					container.fadeIn();
					P.isFunc(callback) && callback();
				});
			});
		}
	},
	checkAll : function(o) {
		if (o) {
			if (o.value == 'all') {
				var allChecks = $('[name="' + o.name + '"]');
				for (var i = 0; i < allChecks.length; i++) {
					allChecks[i].checked = o.checked;
				}
			} else {
				var allChecks = $('[name="' + o.name + '"]');
				var checked = true;
				for (var i = 0; i < allChecks.length; i++) {
					if (allChecks[i].value != 'all' && !allChecks[i].checked) {
						checked = false;
					}
				}
				var showAllChecks = $('[name="' + o.name + '"][value="all"]');
				for (var i = 0; i < showAllChecks.length; i++) {
					showAllChecks[i].checked = checked;
				}
			}
		}
	},
	returnHome : function(type) {
		var json = P.ajax('publicfunc/initLoginDefault');
		var url = '/';
		switch (type) {
		case 'auth':
			json.authUrl && (url = json.authUrl);
			break;
		case 'tab':
			json.tabUrl && (url = json.tabUrl);
			break;
		case 'service':
			json.serviceUrl && (url = json.serviceUrl);
			break;
		default:
			json.defaultUrl && (url = json.defaultUrl);
			break;
		}
		if (parent) {
			returnHomeByParent(parent, 1, url);
		} else {
			history.pushState({}, '', url);
			history.go(0);
		}
		function returnHomeByParent(thisParent, i, url) {
			if (thisParent.parent && thisParent.parent != parent && i < 5) {
				i++;
				returnHomeByParent(thisParent.parent, i, url);
			} else {
				thisParent.history.pushState({}, '', url);
				thisParent.history.go(0);
			}
		}
	},
	copyInfo : function(i) {
		var oInput = document.createElement('input');
		oInput.value = i;
		document.body.appendChild(oInput);
		oInput.select();
		document.execCommand("Copy");
		oInput.className = 'oInput';
		oInput.style.display = 'none';
	},
	showPhotoInfo : function(d) {
		if (P.isArray(d)&&d.length>0) {
			var o = $('#ImgDiv');
			var show = $('#showimageol');
			var ol = "";
			var imagediv = "";
			function getPhotoInfo(info, i) {
				if (i == 0) {
					return '<div class="item active"><img style="height:200px;width:300px;" src="' + info + '"></div>';
				} else {
					return '<div class="item"><img style="height:200px;width:300px;" src="' + info + '"></div>';
				}
			}
			function getShowInfo(i) {
				if (i == 0) {
					return '<li data-target="#myCarousel" data-slide-to="0" class="active" style="margin-left:5px;" ></li>';
				} else {
					return '<li data-target="#myCarousel" data-slide-to="' + i + '" class="active" style="margin-left:5px;" ></li>';
				}
			}
			$.each(d, function(i) {
				var info = d[i];
				show.append(getShowInfo(i));
				o.append(getPhotoInfo(info, i));
			});
		}
	},
	showFileInfo : function(d) {
		if (d&&d.length>0) {
			var o = $('#fileDiv');
			var temp = '<table class="table table-bordered" style="margin-top:15px;"><tr style="background-color:#f7f7f7;"><td>名称</td><td>类型</td><td>日期</td><td>操作</td></tr>';
			function getFileInfo(info) {
				return '<tr><td>' + info['name'] + '</td><td>' + info['type'] + '</td><td>' + info['time'] + '</td><td><a  target="_blank" style="color:blue;" href=' + info['url']
						+ '>播放</a>&nbsp;&nbsp;&nbsp;<a style="color:blue;" href=FileDownServlet.do?id=' + info['id'] + '>下载</a></td></tr>';
			}
			$.each(d, function(i) {
				var info = d[i];
				temp += getFileInfo(info);
			});
			temp += '</table>';
			o.append(temp);
		}
	},
	showBigImg : function(id) {
		layer.photos({
			photos : '#' + id
		});
	},
	getColor : function(i) {
		var colorPalette = [ '#ff7000', '#6fa7f3', '#8c7acc', '#c490bf', '#ec6941', '#f8b551', '#b3d465', '#32b16c', '#00b7ee', '#556fb5', '#8957a1', '#eb6877', '#eb6100', '#f39800', '#009944', '#009e96', '#00a0e9', '#1d2088', '#601986',
				'#e4007f', '#a40000', '#ac6a00', '#baad00' ];
		while (i >= colorPalette.length) {
			i -= colorPalette.length;
		}
		return colorPalette[i];
	},
	getPolygonOption : function(bean, i) {
		return {
			strokeColor : P.getColor(i),
			strokeWeight : bean.strokeWeight,
			strokeOpacity : bean.strokeOpacity,
			fillOpacity : 0.3,
			fillColor : P.getColor(i),
			strokeStyle : bean.strokeStyle
		};
	},
	getPolygonLabelStyle : function(bean, i) {
		return {
			"color" : P.getColor(i),
			"border" : bean.strokeWeight + "px solid " + P.getColor(i)
		};
	}
}