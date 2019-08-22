function returnHome() {
	P.returnHome('auth');
}
function returnPrevious() {
	history.go(-1);
}
var P = {
	/** ajax提交请求* */
	ajax : function(url, data, opt) {
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
			if (opt) {
				defaults = $.extend(true, defaults, opt);
			}
			$.ajax(defaults);
		} else {
			P.log('ajax提交请求参数不正确,url:' + url + ',href:' + window.location.href);
		}
		return jsonResult;
	},
	getAjaxPageUrl : function() {
		var url = window.location.pathname;
		if (P.notEmpty(url)) {
			var s = url.split('/')
			return s[s.length - 1];
		}
		return "";
	},
	notEmpty : function(str) {
		if (str && typeof (str) == 'string' && str != '') {
			return true;
		}
	},
	log : function(msg) {
		if (P.notEmpty(msg))
			window.console.log(msg);
		else
			window.console.log("空");
	},
	returnHome : function(type) {
		var json = P.ajax('publicfunc/initLoginDefault');
		var url = '/';
		switch (type) {
		case 'auth':
			if (json.authUrl) {
				url = json.authUrl;
			}
			break;
		case 'tab':
			if (json.tabUrl) {
				url = json.tabUrl;
			}
			break;
		case 'service':
			if (json.serviceUrl) {
				url = json.serviceUrl;
			}
			break;
		default:
			if (json.defaultUrl) {
				url = json.defaultUrl;
			}
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
	}
}