var $table;
var TableInit = function (id,url,columns,queryParams) {
	$table = $('#'+id);
	var myTableInit = new Object();
	/**获取的参数**/
	myTableInit.queryParams = queryParams,
	/**初始化列表**/
	myTableInit.Init = function () {
		$table.bootstrapTable({
			/**服务器数据的加载地址**/
			url: url,
			/**请求方式**/
			method: 'post',
			/**服务器返回的数据类型**/
			dataType: 'json',
			/**是否使用缓存,默认使用,设置false禁用ajax数据缓存**/
			cache: false,
			/**发送到服务器端的数据编码类型**/
			contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
			/**undefined可获取pageNumber,pageSize,searchText,sortName,sortOrder**/
			queryParamsType : "undefined",
			/**服务器请求的参数**/
			queryParams: myTableInit.queryParams,
			/**表格高度**/
			height: getHeight(),
			/**是否底部显示分页条**/
			pagination: true,
			/**false时分页将记住排序**/
			silentSort: false,
			/**分页方式:client客户端,server服务端**/
			sidePagination: "server",
			/**初始化加载第一页**/
			pageNumber: 1,
			/**每页记录行数**/
			pageSize: 10,
			/**可供选择的每页行数**/
			pageList: [10, 15, 20],
			/**true时点击行自动选择单选框复选框**/
			clickToSelect: true,
			/**false时列头隐藏全选按钮**/
			checkboxHeader: true,
			/**true时搜索将记住单选复选框**/
			maintainSelected: false,
			/**是否启用搜索框**/
			search: true,
			/**回车触发搜索方法**/
			searchOnEnterKey: true,
			/**显示内容列下拉框**/
			showColumns: true,
			/**显示刷新按钮**/
			showRefresh: true,
			/**table/card切换视图**/
			showToggle: true,
			/**显示列数据选择框**/
			showPaginationSwitch: true,
			/**列内容小于1时隐藏列内容选择框**/
			minimumCountColumns: 1,
			/**显示导出按钮**/
			showExport: true,
			/**列配置项**/
			columns: columns,
			/**指定toolbar容器**/
			toolbar: "#toolbar",
			/**toolbar水平位置left/right**/
			toolbarAlign: 'left'
		});
	};
	
	$(window).resize(function () {
	    $table.bootstrapTable('resetView', {
	        height: getHeight()
	    });
	});
	
	return myTableInit;
};

function refreshTable(){
	$table.bootstrapTable('refresh', {});
}

function getHeight() {
    return $(window).height();
}

function initDeleteBtnShow(id){
	$table.on('check.bs.table uncheck.bs.table ' +
            'check-all.bs.table uncheck-all.bs.table', function () {
        $("#"+id).prop('disabled', !$table.bootstrapTable('getSelections').length);
    });
}

function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.id
    });
}