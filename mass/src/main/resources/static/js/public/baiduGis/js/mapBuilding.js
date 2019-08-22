var baiduGis, drawingManager, nowPolygon, map;
$(function() {
	baiduGis = function(mapId, options) {
		map = new BMap.Map(mapId, {
			enableMapClick : false
		});
		var drawOptions = {
			strokeColor : "blue", // 边线颜色。
			strokeWeight : 2, // 边线的宽度，以像素为单位。
			strokeOpacity : 0.8, // 边线透明度，取值范围0 - 1。
			fillOpacity : 0.1, // 填充的透明度，取值范围0 - 1。
			strokeStyle : 'solid' // 边线的样式，solid或dashed。
		};
		var defaults = {// 默认值
			currentCity : "洛阳市",// 中心城市
			pointLng : 112.458883,// 中心点经度
			pointLat : 34.624376,// 中心点纬度
			zoomLevel : 13,// 缩放控件级别
			minZoom : 7,// 最大缩放比例，为市级
			drawOptions : drawOptions
		// 话多边形的样式
		};
		this.opt = $.extend(defaults, options);// 合并参数
		this.map = map;
		this.baseInit();// 加载baiduGis的基本框架
		this.bindDraw();
	}
	baiduGis.prototype.baseInit = function() {
		// 初始化地图,设置中心点坐标和地图级别
		var map = this.map;
		map.setMinZoom(this.opt.minZoom);
		map.centerAndZoom(new BMap.Point(this.opt.pointLng, this.opt.pointLat), this.opt.zoomLevel);
		map.addControl(new BMap.NavigationControl());// 添加平移缩放控件
		map.addControl(new BMap.ScaleControl());// 添加比例尺控件
		map.addControl(new BMap.OverviewMapControl());// 添加缩略地图控件
		map.enableScrollWheelZoom();// 启用滚轮放大缩小
		map.addControl(new BMap.MapTypeControl({
			mapTypes : [ BMAP_NORMAL_MAP, BMAP_HYBRID_MAP ]
		}));// 添加地图类型控件
		map.setCurrentCity(this.opt.currentCity);// 设置地图显示的城市 此项是必须设置的
	};
	baiduGis.prototype.bindDraw = function() {
		drawingManager = new BMapLib.DrawingManager(this.map, {
			isOpen : false, // 是否开启绘制模式
			enableCalculate : false,
			polygonOptions : this.opt.drawOptions
		// 多边形的样式,
		});
		drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
		drawingManager.addEventListener("overlaycomplete", function(e) {
			nowPolygon = e.overlay;
			nowPolygon.enableEditing();
		});
	}
});
function openDraw() {
	drawingManager.open();
}
function closeDraw() {
	drawingManager.close();
}