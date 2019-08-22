$(function(){
	var myTable = new TableInit();
	myTable.Init();
});

var TableInit = function () {
	var myTableInit = new Object();
	/**获取的参数**/
	myTableInit.queryParams = function (params) {
		var temp = {
			/**页面大小**/
			pageSize: params.pageSize,
			/**页码**/
			pageNumber: params.pageNumber
		};
		return temp;
	};
	/**初始化列表**/
	myTableInit.Init = function () {
		$('#tableList').bootstrapTable({
		/**服务端**/
		/**ajax方式**/
			/**自定义ajax方法,function**/
			ajax: undefined,
			/**提交ajax时附带的参数**/
			ajaxOptions: {},
		/**url方式**/
			/**服务器数据的加载地址**/
			url: undefined,
		/**服务端通用参数**/
			/**请求方式,get/post**/
			method: 'get',
			/**服务器返回的数据类型**/
			dataType: 'json',
			/**是否使用缓存,默认使用,设置false禁用ajax数据缓存**/
			cache: true,
			/**发送到服务端的数据编码类型**/
			contentType: 'application/json',
			/**undefined可获取pageNumber,pageSize,searchText,sortName,sortOrder**/
			/**limit可获取limit, offset, search, sort, order,默认为limit**/  
            queryParamsType : "limit",
			/**服务器请求的参数**/
			queryParams: function(params){
				return params;
			},
			/**加载服务器数据之前的处理程序,用来格式化数据**/
			responseHandler: function(res){
				return res;
			},
		/**客户端**/
			/**直接加载json格式数据**/
			data: [],
		/**样式**/
			/**表格的类名称,默认table table-hove,添加table-no-bordered可删除边框样式**/
			classes: 'table table-hove',
			/**排序的类名称,默认undefined**/
			sortClass: undefined,
			/**自定义行样式**/
			rowStyle: function(row,index) {
				return class;
			},
			/**自定义行属性**/
			rowAttributes: function(row,index) {
				return attributes;
			},
		/**通用属性**/
			/**表格高度**/
			height: undefined,
			/**数据为undefined时显示的字符,默认为-**/
			undefinedText: '-',
			/**是否显示隔行变色效果,默认为false**/
			striped: false,
		/**客户端排序**/
			/**排序字段,默认为undefined**/
			sortName: undefined,
			/**定义排序方式,默认asc可填写desc**/
			sortOrder: "asc",
			/**是否启用稳定的排序**/
			sortStable: false,
		/**排序**/
			/**false时禁止所有列排序**/
			sortable: true,
			/**false时分页将记住排序**/
			silentSort: true,
		/**其他属性**/
			/**定义字体库,默认为glyphicon**/
			iconsPrefix: 'glyphicon',
			/**自定义图标**/
			icons : {
				paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
				paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
				refresh: 'glyphicon-refresh icon-refresh',
				toggle: 'glyphicon-list-alt icon-list-alt',
				columns: 'glyphicon-th icon-th',
				detailOpen: 'glyphicon-plus icon-plus',
				detailClose: 'glyphicon-minus icon-minus'
			},
		/**数据**/
			/**列配置项**/
			columns: [],
		/**分页**/
			/**是否底部显示分页条**/
			pagination: false,
			/**分页条垂直位置bottom/top/bonth**/
			paginationVAlign: 'bottom',
			/**分页条水平位置right/left**/
			paginationHAlign: 'right',
			/**分页详细信息水平位置right/left**/
			paginationDetailHAlign: 'left',
			/**上一页按钮的图标或文字**/
			paginationPreText: '<',
			/**下一页按钮的图标或文字**/
			paginationNextText: '>',
			/**是否启用分页无限循环功能**/
			paginationLoop: true,
			/**是否只显示总数据数,不显示分页按钮**/
			onlyInfoPagination: false,
			/**设置分页方式:client客户端,server服务端**/
			sidePagination: "client",
			/**设置分页首页页码**/
			pageNumber: 1,
			/**每页数据条数**/
			pageSize: 10,
			/**可供选择的页面数据条数**/
			pageList: [10, 25, 50, 100, All],
		/**单选框复选框**/
			/**radio或checkbox字段名**/
			selectItemName: 'btSelectItem',
			/**true时点击行自动选择单选框复选框**/
			clickToSelect: false,
			/**true时禁止多选**/
			singleSelect: false,
			/**false时列头隐藏全选按钮**/
			checkboxHeader: true,
			/**true时搜索将记住单选复选框**/
			maintainSelected: false,
		/**显示形式**/
			smartDisplay: true,
			/**是否转义html字符**/
			escape: false,
		/**显示内容**/
			/**是否显示搜索框**/
			search: false,
			/**搜索框位置left/right**/
			searchAlign: 'right',
			/**按钮水平位置left/right**/
			buttonsAlign: 'right',
			/**toolbar水平位置left/right**/
			toolbarAlign: 'right',
			/**是否回车触发搜索方法**/
			searchOnEnterKey: false,
			/**是否全匹配搜索,否则为模糊搜索**/
			strictSearch: false,
			/**初始化搜索文字**/
			searchText: '',
			/**搜索时间限制**/
			searchTimeOut: 500,
			/**是否允许空字符串搜索**/
			trimOnSearch: true,
			/**是否显示列头**/
			showHeader: true,
			/**是否显示列脚**/
			showFooter: false,
			/**是否显示内容下拉框**/
			showColumns: false,
			/**是否显示刷新按钮**/
			showRefresh: false,
			/**是否显示切换视图按钮table/card**/
			showToggle: false,
			/**是否显示数据条选择框**/
			showPaginationSwitch: false,
			/**小于多少列时隐藏内容选择下拉框**/
			minimumCountColumns: 1,
			/**显示卡片视图**/
			cardView: false,
			/**显示详细内容页面**/
			detailView: false,
			/**格式化详细内容页面**/
			detailFormatter: function(index,row){
				return "";
			},
		/**唯一参数**/
			/**指定主键列**/
			idField: undefined,
			uniqueId: undefined,
		/**工具按钮容器**/
			/**指定toolbar容器**/
			toolbar: undefined,
		/**其他**/
			customSearch: $.noop,
			customSort: $.noop
		});
	};
	return myTableInit;
	
	var column = [{
		/**单选按钮**/
		radio: false,
		/**复选按钮**/
		checkbox: false,
		/**字段名**/
		field: undefined,
		/**显示名称**/
		title: undefined,
		/**html显示名称**/
		titleTooltip: undefined,
		/**class名称**/
		class: undefined,
		/**占多少行**/
		rowspan: undefined,
		/**占多少列**/
		colspan: undefined,
		/**内容对齐方式**/
		align: undefined,
		/**表头对齐方式**/
		halign: undefined,
		/**底部对齐方式**/
		falign: undefined,
		/**垂直对齐方式**/
		valign: undefined,
		/**宽度**/
		width: undefined,
		/**是否允许排序**/
		sortable: false,
		/**排序方式**/
		order: 'asc',
		/**false则隐藏**/
		visible: true,
		/**false隐藏card状态**/
		cardVisible: true,
		/**false不允许切换**/
		switchable: true,
		/**点击行选择单选复选框**/
		clickToSelect: true,
		/**格式化**/
		formatter: undefined,
		/**底部格式化**/
		footerFormatter: undefined,
		/**事件**/
		events: undefined,
		/**排序**/
		sorter: undefined,
		/**排序名称**/
		sortName: undefined,
		cellStyle: undefined,
		searchable: undefined,
		searchFormatter: undefined
	}]
};

function refreshTable(id){
	$('#'+id).bootstrapTable('method', "refresh");
}