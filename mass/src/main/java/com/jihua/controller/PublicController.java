package com.jihua.controller;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.text.StringEscapeUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import com.common.util.BeanUtil;
import com.common.util.ClassReflection;
import com.common.util.Coder;
import com.common.util.Common;
import com.common.util.DES;
import com.common.util.Dt;
import com.common.util.EncryptVerify;
import com.common.util.St;

public class PublicController {
	// protected final String defaultProduces = "text/html;charset=UTF-8";
	protected final String defaultProduces = "application/json;charset=UTF-8";
	@Value("${spring.application.name}")
	protected String serviceId;
	@Autowired
	protected HttpServletRequest request;
	@Autowired
	protected HttpServletResponse response;


	/** 返回结果 **/
	protected String result(Document document) {
		return document.toJson();
	}

	/** 返回结果 **/
	protected String resultEscape(Document document) {
		return StringEscapeUtils.escapeJava(document.toJson().replaceAll("\"", "\'")).replaceAll("\'", "\"");
	}

	/** 清除部分无效字段 **/
	protected void cleanDocument(Document document, String... fields) {
		document.put("id", document.get("_id").toString());
		document.remove("_id");
		for (String field : fields) {
			document.remove(field);
		}
	}

	/** 获取日期 **/
	protected String getDateStr(Document document, String field) {
		if (document != null && document.containsKey(field)) {
			Object value = document.get(field);
			if (value instanceof Date) {
				return Dt.format((Date) value, "yyyy年MM月dd日");
			}
		}
		return "";
	}

	/** 获取日期 **/
	protected String getTimeStr(Document document, String field) {
		if (document != null && document.containsKey(field)) {
			Object value = document.get(field);
			if (value instanceof Date) {
				return Dt.format((Date) value, "yyyy年MM月dd日HH时mm分ss秒");
			}
		}
		return "";
	}

	/** 将bean1里面的部分字段内容赋给bean2 **/
	protected void moveBeanValue(Object bean1, Object bean2, String... fields) {
		for (String field : fields) {
			Object value = ClassReflection.reflectionGetAttrObj(bean1, field);
			ClassReflection.reflectionSetAttrObj(bean2, field, value);
		}
	}

	/** 将bean1里面的部分有值字段内容赋给bean2 **/
	protected void moveBeanValueHasValue(Object bean1, Object bean2, String... fields) {
		for (String field : fields) {
			Object value = ClassReflection.reflectionGetAttrObj(bean1, field);
			if (null != value) {
				if (value instanceof String && St.isEmpty(value.toString()))
					value = "";// continue;
				ClassReflection.reflectionSetAttrObj(bean2, field, value);
			}
		}
	}

	/** 将bean1里面的部分字段内容转为Document并赋给bean2 **/
	protected void moveBeanDocValue(Object bean1, Object bean2, String... fields) {
		for (String field : fields) {
			Object value = ClassReflection.reflectionGetAttrObj(bean1, field);
			if (null != value) {
				Document doc = BeanUtil.bean2Document(value);
				ClassReflection.reflectionSetAttrObj(bean2, field, doc);
			}
		}
	}

	/** 时间格式 */
	protected void documentDate2Str(Document document) {
		Set<String> keys = document.keySet();
		for (String key : keys) {
			Object value = document.get(key);
			if (value instanceof Date) {
				document.put(key, Dt.formatDateTime("yyyy-MM-dd", (Date) value));
			}
		}
	}
	
	/** 时间格式-长 */
	protected void documentDate2StrLong(Document document, String... fields) {
		for(String key : fields){
			if(null != document && document.containsKey(key)){
				Object value = document.get(key);
				if (value instanceof Date) {
					document.put(key, Dt.formatDateTime("yyyy-MM-dd HH:mm:ss", (Date) value));
				}
			}
		}
	}
	
	/**解密***/
	protected void documentDecdecrypt(Document document,String...fields){
		for (String field : fields) {
			if(document.containsKey(field)){
				Object value = document.get(field);
				if(value instanceof String){
					String valueStr = decryptPassword(document.getString(field));
					if(St.notEmpty(valueStr)&&"citizenId".equals(field)&&valueStr.length()>15){
						StringBuffer citizenIdBuf = new StringBuffer(valueStr);
						if(citizenIdBuf.length() > 14)
							citizenIdBuf.replace(6, 14, "********");
						valueStr = citizenIdBuf.toString();
					}
					document.put(field, valueStr);
				}
			}
		}
	}
	
	/**解密***/
	protected void documentDesdecrypt(Document document,String...fields){
		for (String field : fields) {
			if(document.containsKey(field)){
				Object value = document.get(field);
				if(value instanceof String){
					String valueStr = DES.decrypt(document.getString(field));
					if(St.notEmpty(valueStr)&&"citizenId".equals(field)&&valueStr.length()>15){
						StringBuffer citizenIdBuf = new StringBuffer(valueStr);
						if(citizenIdBuf.length() > 14)
							citizenIdBuf.replace(6, 14, "********");
						valueStr = citizenIdBuf.toString();
					}
					document.put(field, valueStr);
				}
			}
		}
	}

	/** 数字格式 */
	protected void documentNumToStr(Document document) {
		Set<String> keys = document.keySet();
		for (String key : keys) {
			Object value = document.get(key);
			if (value instanceof Double) {
				if (key.endsWith("lat") || key.endsWith("lng"))
					document.put(key, ((Double) value).toString());
				else
					document.put(key, ((Double) value).intValue() + "");
			}
			if (value instanceof Integer) {
				document.put(key, value + "");
			}
		}
	}

	protected void documentDate2StrC(Document document) {
		Set<String> keys = document.keySet();
		for (String key : keys) {
			Object value = document.get(key);
			if (value instanceof Date) {
				document.put(key, Dt.formatDateTime("yyyy年MM月dd日", (Date) value));
			}
		}
	}

	/** 从document中获取List<String> **/
	@SuppressWarnings("unchecked")
	protected List<String> getStrList(Document document, String key) {
		if (document != null && document.containsKey(key)) {
			return document.get(key, List.class);
		}
		return null;
	}

	/** 从document中获取List<document> **/
	@SuppressWarnings("unchecked")
	protected List<Document> getDocList(Document document, String key) {
		if (document != null && document.containsKey(key)) {
			return document.get(key, List.class);
		}
		return null;
	}

	protected static List<ObjectId> setObjIds(String... ids) {
		List<ObjectId> list = new ArrayList<ObjectId>();
		for (String id : ids) {
			if (St.notEmpty(id)) {
				list.add(new ObjectId(id));
			}
		}
		return list;
	}


	protected static String getMapInfo(Map<String, String> map, String key) {
		if (St.notEmpty(key) && map.containsKey(key)) {
			return map.get(key);
		}
		return "";
	}

	/** 密码加密 **/
	protected String encryptPassword(String password) {
		if (St.notEmpty(password)) {
			return Base64.encodeBase64String(password.getBytes());
		}
		return null;
	}

	/** 密码解密 **/
	protected String decryptPassword(String password) {
		if (St.notEmpty(password)) {
			byte[] decodePwd = Base64.decodeBase64(password);
			return new String(decodePwd);
		}
		return null;
	}

	public Document decryptDocument(String docStr) {
		try {
			if (St.notEmpty(docStr) && EncryptVerify.encryptVerify(docStr)) {
				return Document.parse(EncryptVerify.decrypt(docStr));
			}
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public String encryptDoc(Document document) {
		String docStr = document.toJson();
		return EncryptVerify.encrypt(docStr);
	}

	@SuppressWarnings("rawtypes")
	public String encryptArr(List list) {
		JSONArray ja = new JSONArray(list);
		return EncryptVerify.encrypt(ja.toString());
	}

	protected List<Document> initListId(List<Document> list) {
		if (list != null) {
			for (Document document : list) {
				document.put("id", document.get("_id").toString());
			}
		}
		return list;
	}

	protected Document initBeanId(Document document) {
		if (document != null && document.containsKey("_id")) {
			document.put("id", document.get("_id").toString());
		}
		return document;
	}


	@SuppressWarnings("unchecked")
	protected List<String> getStrList(String field, Document document) {
		if (document != null && document.containsKey(field))
			return document.get(field, List.class);
		return new ArrayList<String>();
	}

	protected List<ObjectId> listStr2ObjId(List<String> list) {
		List<ObjectId> objList = new ArrayList<ObjectId>();
		for (String id : list) {
			objList.add(new ObjectId(id));
		}
		return objList;
	}

	/**
	 * 根据最下级行政区划Id、详细地址获取坐标
	 * 
	 * @param divisionId
	 *            最下级行政区划Id
	 * @param address
	 *            详细地址
	 * @param <T>bean
	 * @param lngField
	 *            经度字段名
	 * @param latField
	 *            纬度字段名
	 * @param geoField
	 *            坐标检索字段名
	 * @return
	 */
	public <T> void gainCordinate(String divisionId, String address, T bean, String lngField, String latField, String geoField) {
		// Document result = new Document();
	}

	// private String gainAllParentName(String parentId, String chinaId, String allName) {
	// if (parentId.equals(chinaId)) {
	// return allName;
	// } else {
	// Document parent = restService.findSysCodeByKey(parentId, "");
	// if (null != parent) {
	// String parentName = parent.getString("codeName");
	// allName = parentName + allName;
	// return gainAllParentName(parent.getString("parentId"), chinaId, allName);
	// } else {
	// return allName;
	// }
	// }
	// }

	protected String getIpAddr(HttpServletRequest request) {
		String ipAddress = request.getHeader("x-forwarded-for");
		if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("Proxy-Client-IP");
		}
		if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getRemoteAddr();
			if (ipAddress.equals("127.0.0.1") || ipAddress.equals("0:0:0:0:0:0:0:1")) {
				// 根据网卡取本机配置的IP
				InetAddress inet = null;
				try {
					inet = InetAddress.getLocalHost();
				} catch (UnknownHostException e) {
					e.printStackTrace();
				}
				ipAddress = inet.getHostAddress();
			}
		}
		// 对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割
		if (ipAddress != null && ipAddress.length() > 15) { // "***.***.***.***".length()
															// = 15
			if (ipAddress.indexOf(",") > 0) {
				ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
			}
		}
		return ipAddress;
	}

	protected Document decryptBASE64(String document) {
		if (St.notEmpty(document)) {
			document = new String(Coder.decryptBASE64(document));
			return Document.parse(document);
		}
		return new Document();
	}

	protected String encryptBASE64(Document document) {
		return Coder.encryptBASE64(document.toJson().getBytes());
	}


	protected void documentTime2Str(Document document) {
		if (document != null) {
			Set<String> keys = document.keySet();
			Object value = null;
			for (String key : keys) {
				value = document.get(key);
				if (value instanceof Date) {
					document.put(key, Dt.formatDateTime("HH时mm分ss秒", (Date) value));
				}
			}
		}
	}
	
	protected  Document getStringGisInfoQuery(String managerId,String name,String referenceId,String lat,String lng,List<String> types){
		Document gis = new Document();
		if(St.notEmpty(managerId))
			gis.put("managerId", managerId);
		if(St.notEmpty(name))
			gis.put("name", name);
		if(St.notEmpty(referenceId))
			gis.put("referenceId", referenceId);
		if(St.notEmpty(lat))
			gis.append("lat", lat);
		if(St.notEmpty(lng))
			gis.append("lng", lng);
		if(types != null){
			StringBuilder typeStr = new StringBuilder();
			for (String type : types) {
				typeStr.append(type+",");
			}
			gis.append("types", typeStr.toString());
		}
		return gis;
	}
	private boolean judgeListDocExistence(Document doc , List<Document> list, String field){
		boolean existence = false;
		if(null != doc && null != list && St.notEmpty(field)){
			String val = doc.getString(field);
			if(St.notEmpty(val)){
				for(Document d : list){
					String v = d.getString(field);
					if(val.equals(v)){
						existence = true;
						break;
					}
				}
			}
		}
		return existence;
	}
	
	
}
