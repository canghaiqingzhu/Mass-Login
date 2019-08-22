function initDatePicker(id){
	/*$("#"+id).datetimepicker({
		language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
        showMeridian: 1
    });*/
	$("#"+id).datetimepicker({
	    language:  'zh-CN',
		minView: "month",
	    format: "yyyy-mm-dd",
	    autoclose: true,
	    todayBtn: true,
	    pickerPosition: "bottom-right"
	});
}