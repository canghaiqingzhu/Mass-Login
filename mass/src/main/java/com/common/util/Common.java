package com.common.util;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.regex.Pattern;

import org.bson.Document;
import org.json.JSONObject;

import com.mongodb.BasicDBList;

public class Common {
	/************************************
	 * mongo query
	 *********************************************/
	/**
	 * 多条件查询，满足其中任一条件即可
	 * 
	 * @param query
	 * @param field
	 * @param values
	 */
	public static void queryOr(Document query, String field, String... values) {
		List<Document> list = new ArrayList<Document>();
		for (String value : values) {
			Document qry = new Document();
			Common.queryEq(qry, field, value);
			list.add(qry);
		}
		query.put("$or", list);
	}

	/**
	 * 多条件查询，满足其中任一条件即可
	 * 
	 * @param query
	 * @param field
	 * @param values
	 */
	public static void queryOr(Document query, Document... querys) {
		List<Document> list = new ArrayList<Document>();
		for (Document qry : querys) {
			list.add(qry);
		}
		query.put("$or", list);
	}

	/**
	 * 多条件查询，满足其中所有条件即可
	 * 
	 * @param query
	 * @param field
	 * @param values
	 */
	public static void queryAnd(Document query, String field, String... values) {
		List<Document> list = new ArrayList<Document>();
		for (String value : values) {
			Document qry = new Document();
			Common.queryEq(qry, field, value);
			list.add(qry);
		}
		query.put("$and", list);
	}

	/**
	 * 多条件查询，满足其中所有条件即可
	 * 
	 * @param query
	 * @param field
	 * @param values
	 */
	public static void queryAnd(Document query, Document... querys) {
		List<Document> list = new ArrayList<Document>();
		for (Document qry : querys) {
			list.add(qry);
		}
		query.put("$and", list);
	}
	
	public static void queryAndNotNull(Document query, Document... querys) {
		List<Document> list = new ArrayList<Document>();
		for (Document qry : querys) {
			if(qry != null)
				list.add(qry);
		}
		query.put("$and", list);
	}
	/**
	 * 精确查询
	 * 
	 * @param query
	 * @param field
	 * @param value
	 */
	public static void queryEq(Document query, String field, String value) {
		if (Common.strNotEmpty(value)) {
			query.put(field, value);
		}
	}

	/**
	 * 精确查询(传入值为空用默认值替代)
	 * 
	 * @param query
	 * @param field
	 * @param value
	 * @param defVal
	 */
	public static void queryEqWithDefault(Document query, String field, String value, String defVal) {
		if (Common.strNotEmpty(value)) {
			query.put(field, value);
		} else {
			query.put(field, defVal);
		}
	}

	/**
	 * 非等于查询
	 * 
	 * @param query
	 * @param field
	 * @param value
	 */
	public static void queryNe(Document query, String field, String value) {
		if (value != null) {
			query.put(field, new Document("$ne", value));
		}
	}

	/**
	 * 模糊查询
	 * 
	 * @param query
	 * @param field
	 * @param value
	 */
	public static void queryPattern(Document query, String field, String value) {
		if (Common.strNotEmpty(value)) {
			query.put(field, Pattern.compile(value, Pattern.CASE_INSENSITIVE));
		}
	}

	public static void queryGt(Document query, String field, Object begin) {
		query.put(field, new Document("$gt", begin));
	}

	public static void queryLt(Document query, String field, Object end) {
		query.put(field, new Document("$lt", end));
	}

	/**
	 * 查询两个日期之间
	 * 
	 * @param query
	 * @param field
	 * @param begin
	 * @param end
	 */
	public static void queryDateLtGt(Document query, String field, Date begin, Date end) {
		query.put(field, new Document("$gte", begin).append("$lte", end));
	}

	public static void queryLtGt(Document query, String field, Object begin, Object end) {
		query.put(field, new Document("$gte", begin).append("$lte", end));
	}

	/**
	 * 查询大于某一日期
	 * 
	 * @param query
	 * @param field
	 * @param begin
	 */
	public static void queryDateGt(Document query, String field, Date begin) {
		query.put(field, new Document("$gte", begin));
	}

	/**
	 * 查询小于某一日期
	 * 
	 * @param query
	 * @param field
	 * @param end
	 */
	public static void queryDateLt(Document query, String field, Date end) {
		query.put(field, new Document("$lte", end));
	}

	public static void queryLte(Document query, String field, Object end) {
		query.put(field, new Document("$lte", end));
	}

	/**
	 * 查询在符合集合内的数据
	 * 
	 * @param query
	 * @param field
	 * @param list
	 */
	public static void queryIn(Document query, String field, Object list) {
		if (list != null) {
			query.put(field, new Document("$in", list));
		}
	}

	public static void queryFieldInOr(Document query, List<String> list, String... fields) {
		List<Document> listQuery = new ArrayList<Document>();
		for (String field : fields) {
			Document qry = new Document();
			Common.queryIn(qry, field, list);
			listQuery.add(qry);
		}
		query.put("$or", listQuery);
	}

	/**
	 * 查询不在符合集合内的数据
	 * 
	 * @param query
	 * @param field
	 * @param list
	 */
	public static void queryNotIn(Document query, String field, Object list) {
		if (list != null) {
			query.put(field, new Document("$nin", list));
		}
	}

	/**
	 * 某一字段不存在
	 * 
	 * @param query
	 * @param field
	 */
	public static void queryNotExists(Document query, String field) {
		if (Common.strNotEmpty(field)) {
			query.put(field, new Document("$exists", false));
		}
	}

	/**
	 * 某一字段不存在或为空
	 * 
	 * @param query
	 * @param field
	 */
	public static void queryNotExistsEmpty(Document query, String field) {
		Document query1 = new Document();
		Document query2 = new Document();
		Document query3 = new Document();
		List<Document> list = new ArrayList<Document>();
		Common.queryNotExists(query1, field);
		query2.put(field, "");
		query3.put(field, null);
		list.add(query1);
		list.add(query2);
		list.add(query3);
		query.put("$or", list);
	}

	/**
	 * 某一字段存在
	 * 
	 * @param query
	 * @param field
	 */
	public static void queryExists(Document query, String field) {
		if (Common.strNotEmpty(field)) {
			query.put(field, new Document("$exists", true));
		}
	}

	/**
	 * 某一字段存在且不为空
	 * 
	 * @param query
	 * @param field
	 */
	public static void queryExistsNotEmpty(Document query, String field) {
		Document query1 = new Document();
		Document query2 = new Document();
		Document query3 = new Document();
		List<Document> list = new ArrayList<Document>();
		Common.queryExists(query1, field);
		Common.queryNe(query2, field, "");
		query3.put(field, new Document("$ne", null));
		list.add(query1);
		list.add(query2);
		list.add(query3);
		query.put("$and", list);
	}

	/** 地理空间查询,圆形 **/
	public static void queryNear(Document query, String field, double lat, double lng, Integer instance) {
		BasicDBList point = new BasicDBList();
		point.add(lng);
		point.add(lat);
		query.put(field, new Document("$near", new Document("$geometry", new Document("type", "Point").append("coordinates", point)).append("$maxDistance", instance)));
	}

	/** 地理空间查询,多边形 **/
	public static void queryInPolygon (Document query, String field, List<BasicDBList> points) {
		Document doc = new Document();
		doc.append("type", "Polygon");
		List<Object> list = new ArrayList<>();
		list.add(points);
		doc.append("coordinates", list);
		query.put(field,new Document("$geoWithin",new Document("$geometry",doc)));
		System.out.println(query.toJson());
	}
	public static void main(String[] args) {
		List<BasicDBList> list = new ArrayList<>();
		BasicDBList b0 = new BasicDBList();b0.add(108.631472);b0.add(34.266996);list.add(b0);
		b0 = new BasicDBList();b0.add(108.625133);b0.add(34.266996);list.add(b0);
		b0 = new BasicDBList();b0.add(108.602809);b0.add(34.260697);list.add(b0);
		b0 = new BasicDBList();b0.add(108.600997);b0.add(34.254051);list.add(b0);
		b0 = new BasicDBList();b0.add(108.590255);b0.add(34.248883);list.add(b0);
		b0 = new BasicDBList();b0.add(108.58441);b0.add(34.241421);list.add(b0);
		b0 = new BasicDBList();b0.add(108.573642);b0.add(34.235092);list.add(b0);
		b0 = new BasicDBList();b0.add(108.551064);b0.add(34.229221);list.add(b0);
		b0 = new BasicDBList();b0.add(108.551064);b0.add(34.22892);list.add(b0);
		b0 = new BasicDBList();b0.add(108.512437);b0.add(34.23387);list.add(b0);
		b0 = new BasicDBList();b0.add(108.486385);b0.add(34.232172);list.add(b0);
		b0 = new BasicDBList();b0.add(108.476655);b0.add(34.213474);list.add(b0);
		b0 = new BasicDBList();b0.add(108.447841);b0.add(34.213911);list.add(b0);
		b0 = new BasicDBList();b0.add(108.404737);b0.add(34.203851);list.add(b0);
		b0 = new BasicDBList();b0.add(108.395959);b0.add(34.207167);list.add(b0);
		b0 = new BasicDBList();b0.add(108.392466);b0.add(34.215795);list.add(b0);
		b0 = new BasicDBList();b0.add(108.38596);b0.add(34.215795);list.add(b0);
		b0 = new BasicDBList();b0.add(108.362333);b0.add(34.219023);list.add(b0);
		b0 = new BasicDBList();b0.add(108.340936);b0.add(34.209924);list.add(b0);
		b0 = new BasicDBList();b0.add(108.318605);b0.add(34.208476);list.add(b0);
		b0 = new BasicDBList();b0.add(108.318236);b0.add(34.227134);list.add(b0);
		b0 = new BasicDBList();b0.add(108.322086);b0.add(34.236462);list.add(b0);
		b0 = new BasicDBList();b0.add(108.312432);b0.add(34.247558);list.add(b0);
		b0 = new BasicDBList();b0.add(108.317716);b0.add(34.259969);list.add(b0);
		b0 = new BasicDBList();b0.add(108.31254);b0.add(34.265697);list.add(b0);
		b0 = new BasicDBList();b0.add(108.312512);b0.add(34.281026);list.add(b0);
		b0 = new BasicDBList();b0.add(108.31726);b0.add(34.28919);list.add(b0);
		b0 = new BasicDBList();b0.add(108.318153);b0.add(34.303168);list.add(b0);
		b0 = new BasicDBList();b0.add(108.322558);b0.add(34.307695);list.add(b0);
		b0 = new BasicDBList();b0.add(108.323533);b0.add(34.332202);list.add(b0);
		b0 = new BasicDBList();b0.add(108.332273);b0.add(34.33803);list.add(b0);
		b0 = new BasicDBList();b0.add(108.333794);b0.add(34.348017);list.add(b0);
		b0 = new BasicDBList();b0.add(108.338612);b0.add(34.342852);list.add(b0);
		b0 = new BasicDBList();b0.add(108.349485);b0.add(34.344424);list.add(b0);
		b0 = new BasicDBList();b0.add(108.377416);b0.add(34.340156);list.add(b0);
		b0 = new BasicDBList();b0.add(108.380197);b0.add(34.35301);list.add(b0);
		b0 = new BasicDBList();b0.add(108.377492);b0.add(34.362933);list.add(b0);
		b0 = new BasicDBList();b0.add(108.407012);b0.add(34.360702);list.add(b0);
		b0 = new BasicDBList();b0.add(108.407146);b0.add(34.380102);list.add(b0);
		b0 = new BasicDBList();b0.add(108.409083);b0.add(34.382532);list.add(b0);
		b0 = new BasicDBList();b0.add(108.416572);b0.add(34.382114);list.add(b0);
		b0 = new BasicDBList();b0.add(108.416358);b0.add(34.388749);list.add(b0);
		b0 = new BasicDBList();b0.add(108.44518);b0.add(34.387174);list.add(b0);
		b0 = new BasicDBList();b0.add(108.446352);b0.add(34.392107);list.add(b0);
		b0 = new BasicDBList();b0.add(108.453624);b0.add(34.393701);list.add(b0);
		b0 = new BasicDBList();b0.add(108.454719);b0.add(34.380103);list.add(b0);
		b0 = new BasicDBList();b0.add(108.458696);b0.add(34.378905);list.add(b0);
		b0 = new BasicDBList();b0.add(108.480039);b0.add(34.384565);list.add(b0);
		b0 = new BasicDBList();b0.add(108.483208);b0.add(34.391087);list.add(b0);
		b0 = new BasicDBList();b0.add(108.496025);b0.add(34.391245);list.add(b0);
		b0 = new BasicDBList();b0.add(108.499623);b0.add(34.403788);list.add(b0);
		b0 = new BasicDBList();b0.add(108.513529);b0.add(34.407662);list.add(b0);
		b0 = new BasicDBList();b0.add(108.50993);b0.add(34.442425);list.add(b0);
		b0 = new BasicDBList();b0.add(108.526694);b0.add(34.444499);list.add(b0);
		b0 = new BasicDBList();b0.add(108.528302);b0.add(34.448128);list.add(b0);
		b0 = new BasicDBList();b0.add(108.538125);b0.add(34.450801);list.add(b0);
		b0 = new BasicDBList();b0.add(108.560663);b0.add(34.451983);list.add(b0);
		b0 = new BasicDBList();b0.add(108.563394);b0.add(34.447547);list.add(b0);
		b0 = new BasicDBList();b0.add(108.572535);b0.add(34.448118);list.add(b0);
		b0 = new BasicDBList();b0.add(108.577478);b0.add(34.427639);list.add(b0);
		b0 = new BasicDBList();b0.add(108.57349);b0.add(34.423061);list.add(b0);
		b0 = new BasicDBList();b0.add(108.573323);b0.add(34.409666);list.add(b0);
		b0 = new BasicDBList();b0.add(108.580386);b0.add(34.406221);list.add(b0);
		b0 = new BasicDBList();b0.add(108.584561);b0.add(34.398038);list.add(b0);
		b0 = new BasicDBList();b0.add(108.585694);b0.add(34.37774);list.add(b0);
		b0 = new BasicDBList();b0.add(108.616159);b0.add(34.364386);list.add(b0);
		b0 = new BasicDBList();b0.add(108.619668);b0.add(34.353649);list.add(b0);
		b0 = new BasicDBList();b0.add(108.630474);b0.add(34.345934);list.add(b0);
		b0 = new BasicDBList();b0.add(108.626228);b0.add(34.344448);list.add(b0);
		b0 = new BasicDBList();b0.add(108.625511);b0.add(34.33863);list.add(b0);
		b0 = new BasicDBList();b0.add(108.611282);b0.add(34.333337);list.add(b0);
		b0 = new BasicDBList();b0.add(108.606888);b0.add(34.323567);list.add(b0);
		b0 = new BasicDBList();b0.add(108.6081);b0.add(34.314632);list.add(b0);
		b0 = new BasicDBList();b0.add(108.620149);b0.add(34.314422);list.add(b0);
		b0 = new BasicDBList();b0.add(108.624087);b0.add(34.31031);list.add(b0);
		b0 = new BasicDBList();b0.add(108.614879);b0.add(34.29342);list.add(b0);
		b0 = new BasicDBList();b0.add(108.631472);b0.add(34.266996);list.add(b0);
		b0 = new BasicDBList();b0.add(108.631472);b0.add(34.266996);list.add(b0);
		queryInPolygon(new Document(),"geoJson",list);
     
     
	}
	/** 地理空间查询,公里圆形  1公里 = 1609.34米 **/
	public static void queryMetersNear(Document query, String field, double lat, double lng, Integer instance) {
		List<Object> local = new ArrayList<>();
		BasicDBList point = new BasicDBList();
		point.add(lng);
		point.add(lat);
		local.add(point);
		local.add(instance);
		query.put(field, new Document("$geoWithin", new Document("$centerSphere", local)));

	}
	
	public static void queryGeoIn(Document query, String field, Object ary) {
		query.put(field, new Document("$geoWithin", new Document("$geometry", new Document("type", "Polygon").append("coordinates", ary))));
	}

	/************************************ keys *********************************************/
	/**
	 * 获取查询key 查询某些字段
	 * 
	 * @param fields
	 * @return
	 */
	public static Document queryKeys(String... fields) {
		Document keys = new Document();
		for (String field : fields) {
			keys.put(field, true);
		}
		return keys;
	}

	public static List<String> queryList(String... fields) {
		List<String> list = new ArrayList<String>();
		for (String field : fields) {
			list.add(field);
		}
		return list;
	}

	/************************************ order *********************************************/
	/**
	 * 获取查询排序
	 * 
	 * @param sortfield
	 * @param sortorder
	 * @param field
	 * @param order
	 * @return
	 */
	public static Document queryOrderBy(String sortfield, int sortorder, String field, int order) {
		Document orderBy = new Document();
		if (Common.strIsEmpty(sortfield)) {
			sortfield = field;
		}
		if (sortorder == 0 && order != 1 && order != -1) {
			sortorder = -1;
		}
		orderBy.put(sortfield, sortorder);
		return orderBy;
	}

	/************************************ str *********************************************/
	/**
	 * 字符串不为空
	 * 
	 * @param str
	 * @return
	 */
	public static boolean strNotEmpty(String str) {
		if (null == str || "".equals(str.trim()))
			return false;
		return true;
	}

	/**
	 * 字符串为空
	 * 
	 * @param str
	 * @return
	 */
	public static boolean strIsEmpty(String str) {
		if (null == str || "".equals(str.trim()))
			return true;
		return false;
	}

	/**
	 * 将字符串中某几位以“*”号隐藏
	 * 
	 * @param str
	 * @param start
	 * @param end
	 * @return
	 */
	public static String strHideWithStar(String str, int start, int end) {
		if (Common.strIsEmpty(str))
			return "";
		start = Common.intReturnMax(start, 0);
		end = Common.intReturnMax(end, 0);
		start = Common.intReturnMin(start, str.length() - 1);
		end = Common.intReturnMin(end, str.length() - 1);
		if (start > end) {
			int middle = start;
			start = end;
			end = middle;
		}
		String strHide = str.substring(0, start);
		for (int i = start; i < end; i++) {
			strHide += "*";
		}
		strHide += str.substring(end, str.length() - 1);
		return strHide;
	}

	/************************************ int *********************************************/
	/**
	 * 返回小的值
	 * 
	 * @param a
	 * @param b
	 * @return
	 */
	public static int intReturnMin(int a, int b) {
		if (a < b)
			return a;
		return b;
	}

	/**
	 * 返回大的值
	 * 
	 * @param a
	 * @param b
	 * @return
	 */
	public static int intReturnMax(int a, int b) {
		if (a > b)
			return a;
		return b;
	}

	/************************************ double *********************************************/
	/**
	 * 根据数值返回百分比
	 * 
	 * @param num1
	 * @param num2
	 * @return
	 */
	public static String dbRateToString(double num1, double num2) {
		String rate = "0.00%";
		if (num2 != 0) {
			double fen = (num1 * 0.1) / (num2 * 0.1);
			DecimalFormat df = new DecimalFormat("0.00%");
			rate = df.format(fen);
		}
		return rate;
	}

	/************************************ 特殊方法 *********************************************/
	/**
	 * 根据身份证id获取性别
	 * 
	 * @param ID
	 * @return
	 */
	public static String specialIDToSex(String ID) {
		if (Common.strNotEmpty(ID)) {
			int j = 1;
			if (ID.length() > 2)
				j = Integer.parseInt(ID.substring(ID.length() - 2, ID.length() - 1)) % 2;
			if (j == 0) {
				return "女";
			} else {
				return "男";
			}
		}
		return "不明";
	}

	/**
	 * 将某一字符串改变颜色
	 * 
	 * @param str
	 * @param color
	 * @return
	 */
	public static String specialSpanColor(String str, String color) {
		if (Common.strNotEmpty(str))
			return "<span title='" + str + ";' style='color:" + color + ";'>" + str + "</span>";
		return "<span title='" + str + ";'>" + str + "</span>";
	}

	/**
	 * 将value转化为map
	 * 
	 * @param values
	 * @return
	 */
	public static Map<String, String> specialInitMap(String... values) {
		Map<String, String> map = new TreeMap<String, String>();
		for (String value : values) {
			map.put(value, value);
		}
		return map;
	}

	public static void geoIntersectsPoint(String queryFiledName, Document query, Object ary) {
		Document qry = new Document();
		qry.put("type", "Point");
		qry.put("coordinates", ary);
		Document geoQry = new Document();
		geoQry.put("$geoIntersects", new Document("$geometry", qry));
		query.put(queryFiledName, geoQry);
	}
	
}