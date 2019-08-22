function setSelectPara(id,searchInfo,msg,field){
	if(msg==""||msg==undefined){
		msg = "---请选择---"
	}
	$.ajax({
		url : "syspara/searchSubPara.action",
		type : 'post',
		dataType : 'json',
		data : {searchInfo:searchInfo,field:field},
		async : false,
		success : function(json) {
			$("#"+id).empty().append("<option value=''>"+msg+"</option>");
			if (!json.map)
				return;
			$.each(json.map,function(key,value){
				$("#"+id).append("<option value='"+key+"'>"+value+"</option>");
			});
		}
	});
}

function setParentSelectPara(id,searchInfo,msg,field){
	if(msg==""||msg==undefined){
		msg = "---请选择---"
	}
	var bean = undefined;
	$.ajax({
		url : "syspara/searchParentSubPara.action",
		type : 'post',
		dataType : 'json',
		data : {searchInfo:searchInfo,field:field},
		async : false,
		success : function(json) {
			if(json.bean){
				$("#"+id).empty().append("<option value=''>"+json.bean.paraName+"</option>");
				if (!json.map)
					return;
				$.each(json.map,function(key,value){
					$("#"+id).append("<option value='"+key+"'>"+value+"</option>");
				});
				bean = json.bean;
			}
		}
	});
	return bean;
}

function setCheckBoxPara(id,searchInfo,name,field){
	if(name==""||name==undefined){
		name = id;
	}
	$.ajax({
		url : "syspara/searchSubPara.action",
		type : 'post',
		dataType : 'json',
		data : {searchInfo:searchInfo,field:field},
		async : false,
		success : function(json) {
			$("#"+id).empty();
			if (!json.map)
				return;
			$.each(json.map,function(key,value){
				$("#"+id).append("<label><input type='checkbox' name='"+name+"' value='"+key+"' title='"+value+"'> "+value+"</label>");
			});
		}
	});
}

function setRadioPara(id,searchInfo,name,field){
	if(name==""||name==undefined){
		name = id;
	}
	$.ajax({
		url : "syspara/searchSubPara.action",
		type : 'post',
		dataType : 'json',
		data : {searchInfo:searchInfo,field:field},
		async : false,
		success : function(json) {
			$("#"+id).empty();
			if (!json.map)
				return;
			$.each(json.map,function(key,value){
				$("#"+id).append("<label><input type='radio' name='"+name+"' value='"+key+"' title='"+value+"'> "+value+"</label>");
			});
		}
	});
}

function publicAlert(msg){
	layer.alert(msg);
}

function publicConfirm(msg,func1,func2,btn1,btn2){
	if(msg==""||msg==undefined)
		msg="是否确认操作？"
	if(btn1==""||btn1==undefined)
		btn1="确定";
	if(btn2==""||btn2==undefined)
		btn2="取消";
	layer.confirm(msg,{
		btn : [btn1,btn2]
	}, function(index, layero){
		layer.close(index);
		if (func1 != "" && func1 != null) {
			if(typeof(func1)=="string"){
				window.location.href = func1;
			}else if(typeof(func1)=="function"){
				func1();
			}
		}
	}, function(index){
		layer.close(index);
		if (func2 != "" && func2 != null) {
			if(typeof(func2)=="string"){
				window.location.href = func2;
			}else if(typeof(func2)=="function"){
				func2();
			}
		}
	});
}

function openFullIframe(url,title){
	var index = layer.open({
		type: 2,
		content: url,
		title: title
	});
	layer.full(index);
}

function openFullDom(id,title){
	var index = layer.open({
		type: 1,
		content: $("#"+id),
		title: title
	});
}

function openLoading(){
	layer.load();
}

function closeLoading(){
	layer.closeAll('loading');
}

function formPrint(){
	window.print();
}