package com.common.util;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;

import com.mongodb.BasicDBList;

public class Aggregate {
	/**
	 * $collStats 数据集合统计信息
	 * $project 数据投影，用于对字段进行操作
	 * $match 数据筛选
	 * $redact 一般与$cond配合使用(主要包含:$$DESCEND(包含当前文档,继续检测子文档);$$PRUNE(不包含当前文档,舍弃全部);$$KEEP(包含当前文档,不再继续检测子文档);)
	 * $limit 限制数量
	 * $skip 跳过部分数据
	 * $unwind 数组拆分
	 * $group 数据分组
	 * $sample 返回指定大小的随机数据集合,同一条记录可能多次出现
	 * $sort 数据排序
	 * $geoNear 坐标操作
	 * $lookup 同时对两张表进行操作
	 * $out 返回结果存储位置
	 * $indexStats 索引使用统计信息
	 * $facet 一个步骤中处理多个管道
	 * $bucket 设定边界
	 * $bucketAuto 自动设定边界
	 * $sortByCount 按统计数量排序
	 * $addFields 新增字段
	 * $replaceRoot 指定嵌入文档替换最上级文档
	 * $count 返回总数
	 * $graphLookup 对集合递归搜索,添加一个新的字段包含递归搜索结果
	 */
	/**
	 * 返回结果字段的集合,默认不返回_id,如果需要返回,请将_id放入fields中
	 * @param project 数据投影
	 * @param fields 字段集合
	 * @return project
	 */
	public static Document projectShow(Document project, String... fields) {
		project.append("_id", 0);
		for (String field : fields) {
			project.append(field, 1);
		}
		return project;
	}

	/**
	 * 返回截取字段
	 * @param project 数据投影
	 * @param field 截取字段
	 * @param start 截取开始位置
	 * @param end 截取结束为止
	 * @param showFields 其他返回字段
	 * @return project
	 */
	public static Document projectSubStr(Document project, String field, int start, int end) {
		project.append(field + "subBute", new Document("$substrBytes", listObj("$" + field, start, end)));
		project.append(field + "subCp", new Document("$substrCP", listObj("$" + field, start, end)));
		return project;
	}

	/**
	 * 将时期拆分为年月日
	 * @param project 数据投影
	 * @param field 日期字段
	 * @param yearFlag 是否返回年
	 * @param monthFlag 是否返回月
	 * @param dayFlag 是否返回日
	 * @param weekFlag 是否返回周
	 * @return project
	 */
	public static Document projectTimeShow(Document project, String field, boolean yearFlag, boolean monthFlag, boolean dayFlag, boolean weekFlag) {
		if (yearFlag) {
			project.append(field + "Year", new Document("$year", "$" + field));
		}
		if (monthFlag) {
			project.append(field + "Month", new Document("$month", "$" + field));
		}
		if (dayFlag) {
			project.append(field + "Day", new Document("$dayOfMonth", "$" + field));
		}
		if (weekFlag) {
			project.append(field + "Week", new Document("$week", "$" + field));
		}
		return project;
	}

	public static Document projectDateDayOfYear(Document project, String... fields) {
		for (String field : fields) {
			project.append(field + "DayOfYear", new Document("$dayOfYear", "$" + field));
		}
		return project;
	}

	public static Document projectDateDayOfMonth(Document project, String... fields) {
		for (String field : fields) {
			project.append(field + "DayOfMonth", new Document("$dayOfMonth", "$" + field));
		}
		return project;
	}

	public static Document projectDateDayOfWeek(Document project, String... fields) {
		for (String field : fields) {
			project.append(field + "DayOfWeek", new Document("$dayOfWeek", "$" + field));
		}
		return project;
	}

	public static Document projectDateYear(Document project, String... fields) {
		for (String field : fields) {
			project.append(field + "Year", new Document("$year", "$" + field));
		}
		return project;
	}

	public static Document projectDateMonth(Document project, String... fields) {
		for (String field : fields) {
			project.append(field + "Month", new Document("$month", "$" + field));
		}
		return project;
	}

	public static Document projectDateWeek(Document project, String... fields) {
		for (String field : fields) {
			project.append(field + "Week", new Document("$week", "$" + field));
		}
		return project;
	}

	public static Document projectDateHour(Document project, String... fields) {
		for (String field : fields) {
			project.append(field + "Hour", new Document("$hour", "$" + field));
		}
		return project;
	}

	public static Document projectDateMinute(Document project, String... fields) {
		for (String field : fields) {
			project.append(field + "Minute", new Document("$minute", "$" + field));
		}
		return project;
	}

	public static Document projectDateSecond(Document project, String... fields) {
		for (String field : fields) {
			project.append(field + "Second", new Document("$second", "$" + field));
		}
		return project;
	}

	public static Document projectDateMillisecond(Document project, String... fields) {
		for (String field : fields) {
			project.append(field + "Millisecond", new Document("$millisecond", "$" + field));
		}
		return project;
	}

	/**
	 * 添加数据投影,优先级:1,数据投影,主要用于重命名、增加、删除字段
	 * @param pipeline 操作集合
	 * @param project 数据投影
	 */
	public static void aggregateProject(List<Document> pipeline, Document project) {
		/** 只返回_id和title两个字段 **/
		// pipeline.add(new Document("$project",new Document("title",1)));
		/** 不返回_id **/
		// pipeline.add(new Document("$project",new Document("_id",0)));
		/** 将age字段加10作为newAge字段返回 **/
		// pipeline.add(new Document("$project", new Document("newAge", new Document("$add", listObj("$age", 10)))));
		/** 将age字段重命名为newAge字段返回 **/
		// pipeline.add(new Document("$project",new Document("newAge","$age")));
		/** 将age字段重命名为子文档的newAge字段返回 **/
		// pipeline.add(new Document("$project",new Document("child",new Document("newAge","$age"))));
		pipeline.add(new Document("$project", project));
	}

	/**
	 * 添加查询条件,优先级:1,滤波操作,筛选符合条件的文档,尽量出现在管道前面
	 * @param pipeline 操作集合
	 * @param query 查询条件
	 */
	public static void aggregateMatch(List<Document> pipeline, Document query) {
		pipeline.add(new Document("$match", query));
	}

	/**
	 * 添加数量限制,优先级:2,限制经过管道的文档数量,只能是正整数
	 * @param pipeline 操作集合
	 * @param limit 限制数量
	 */
	public static void aggregateLimit(List<Document> pipeline, int limit) {
		pipeline.add(new Document("$limit", limit));
	}

	/**
	 * 优先级:2,从开始位置跳过文档的数量,只能是正整数
	 * @param pipeline 操作集合
	 * @param skip 跳过的数量
	 */
	public static void aggregateSkip(List<Document> pipeline, int skip) {
		pipeline.add(new Document("$skip", skip));
	}

	/**
	 * 数组拆分,将数组元素拆分为独立字段,目标字段不存在返回空,目标字段不为数组将产生错误,目标字段为数组但是值为空将忽略该文档
	 * @param pipeline 操作集合
	 * @param field 拆分字段
	 */
	public static void aggregateUnwind(List<Document> pipeline, String field) {
		pipeline.add(new Document("$unwind", "$" + field));
	}

	/**
	 * 分组,对数据进行分组
	 * @param pipeline 操作集合
	 * @param group 分组
	 */
	public static void aggregateGroup(List<Document> pipeline, Document group) {
		pipeline.add(new Document("$group", group));
	}

	/**
	 * 根据单个字段作为id分组统计总数
	 * @param group 分组
	 * @param field 单个字段
	 * @return group
	 */
	public static Document groupCount(Document group, String field) {
		group.append("_id", "$" + field).append("count", new Document("$sum", 1));
		return group;
	}

	public static Document groupSum(Document group, String... fields) {
		group.append("_id", null);
		for (String field : fields) {
			group.append(field, new Document("$sum", "$" + field));
		}
		return group;
	}

	/**
	 * 根据多个字段作为id分组统计总数
	 * @param group 分组
	 * @param fields 多个字段
	 * @return group
	 */
	public static Document groupCount(Document group, String... fields) {
		Document id = new Document();
		for (String field : fields) {
			id.append(field, "$" + field);
		}
		group.append("_id", id).append("count", new Document("$sum", 1));
		return group;
	}

	/**
	 * 根据多个字段作为id进行分组
	 * @param group 分组
	 * @param fields 多个字段
	 * @return group
	 */
	public static Document groupId(Document group, String... fields) {
		Document id = new Document();
		if (fields.length == 1) {
			group.append("_id", "$" + fields[0]);
		} else {
			for (String field : fields) {
				id.append(field, "$" + field);
			}
			group.append("_id", id);
		}
		return group;
	}

	/**
	 * 分组返回多个字段的第一条记录
	 * @param group 分组
	 * @param fields 多个字段
	 * @return group
	 */
	public static Document groupFirst(Document group, String... fields) {
		for (String field : fields) {
			group.append(field, new Document("$first", "$" + field));
		}
		return group;
	}

	/**
	 * 分组返回多个字段的第一条记录
	 * @param group 分组
	 * @param fields 多个字段
	 * @return group
	 */
	public static Document groupFirst(Document group, List<String> fields) {
		for (String field : fields) {
			group.append(field, new Document("$first", "$" + field));
		}
		return group;
	}

	public static Document groupList(Document group, String listField, String... fields) {
		Document id = new Document();
		for (String field : fields) {
			id.append(field, "$" + field);
		}
		group.append("_id", id).append(listField, new Document("$addToSet", "$" + listField));
		return group;
	}

	/**
	 * 统计某一字段不同范围内数据
	 * @param pipeline 操作集合
	 * @param field 统计字段
	 * @param bounds 范围
	 */
	public static void aggregateBucket(List<Document> pipeline, String field, Object... bounds) {
		List<Object> boundaries = new ArrayList<Object>();
		for (Object bound : bounds) {
			boundaries.add(bound);
		}
		pipeline.add(new Document("$bucket",
				new Document("groupBy", "$" + field).append("boundaries", boundaries).append("default", "other").append("output", new Document("count", new Document("$sum", 1)).append("matches", new Document("$push", "$" + field)))));
	}

	/**
	 * 统计某一字段不同范围内数据
	 * @param pipeline 操作集合
	 * @param field 统计字段
	 * @param boundaries 范围
	 */
	public static void aggregateBucket(List<Document> pipeline, String field, List<Object> boundaries) {
		pipeline.add(new Document("$bucket",
				new Document("groupBy", "$" + field).append("boundaries", boundaries).append("default", "other").append("output", new Document("count", new Document("$sum", 1))/* .append("matches", new Document("$push", "$" + field)) */)));
	}

	/**
	 * 优先级:1,对数据进行排序,如果放在管道前面可利用索引提高效率
	 * @param pipeline 操作集合
	 * @param order 排序
	 */
	public static void aggregateSort(List<Document> pipeline, Document order) {
		pipeline.add(new Document("$sort", order));
	}

	public static void aggregateNear(List<Document> pipeline, Double lng, Double lat, Integer distance) {
		BasicDBList point = new BasicDBList();
		point.add(lng);
		point.add(lat);
		Document doc = new Document();
		doc.append("near", point);
		doc.append("distanceField", "distance");
		doc.append("spherical", true);
		doc.append("distanceMultiplier", 6371393);
		doc.append("maxDistance", (double) distance / 6371393);
		doc.append("num", 100);
		Document result = new Document("$geoNear", doc);
		pipeline.add(result);
	}

	public static void aggregateOrderFirstWithGeo(Double lng, Double lat, Integer distance, List<Document> pipeline, Document query, Document order, String idField, String... returnField) {
		Aggregate.aggregateNear(pipeline, lng, lat, distance);
		Aggregate.aggregateMatch(pipeline, query);
		Aggregate.aggregateSort(pipeline, order);
		Aggregate.aggregateGroup(pipeline, Aggregate.groupFirst(Aggregate.groupId(new Document(), idField), returnField));
		Aggregate.aggregateSort(pipeline, new Document("distance", 1));
	}

	/**
	 * 根据查询条件和排序，查找符合条件的第一条记录
	 * @param pipeline 操作集合
	 * @param query 查询条件
	 * @param order 排序
	 * @param idField 条件字段
	 * @param returnField 返回数据字段
	 */
	public static void aggregateOrderFirst(List<Document> pipeline, Document query, Document order, String idField, String... returnField) {
		Aggregate.aggregateMatch(pipeline, query);
		Aggregate.aggregateSort(pipeline, order);
		Aggregate.aggregateGroup(pipeline, Aggregate.groupFirst(Aggregate.groupId(new Document(), idField), returnField));
	}

	/**
	 * 返回截取字段
	 * @param pipeline 操作集合
	 * @param query 查询条件
	 * @param field 截取字段
	 * @param start 截取开始位置
	 * @param end 截取结束为止
	 * @param showFields 其他返回字段
	 */
	public static void aggregateSubStrSize(List<Document> pipeline, Document query, String field, int start, int end, String... showFields) {
		Aggregate.aggregateMatch(pipeline, query);
		Aggregate.aggregateProject(pipeline, Aggregate.projectShow(Aggregate.projectSubStr(new Document(), field, start, end), showFields));
	}

	public static void aggregateCount(List<Document> pipeline) {
		pipeline.add(new Document("$count", "count"));
	}

	/**
	 * 组合成list
	 * @param objs
	 * @return
	 */
	private static List<Object> listObj(Object... objs) {
		List<Object> objList = new ArrayList<Object>();
		for (Object obj : objs) {
			objList.add(obj);
		}
		return objList;
	}

	public static void aggregateShowCond(Document project, String showField, String value, String... fields) {
		List<Document> condition = new ArrayList<Document>();
		for (String field : fields) {
			condition.add(new Document("$eq", listObj("$" + field, value)));
		}
		project.append(showField, new Document("$cond", new Document("if", new Document("$or", condition)).append("then", 1).append("else", 0)));
	}
	
	public static void aggregateShowLookUpCount(List<Document> pipeline, String dbName, String localField, String foreignField, String foreignValue, String asField) {
		Document lookUp = new Document();
		List<Document> pipeline2 = new ArrayList<Document>();
		Aggregate.aggregateMatch(pipeline2, new Document(foreignField,foreignValue));
//		Aggregate.aggregateCount(pipeline2);
		lookUp.append("$lookup", new Document("from",dbName).append("let", new Document(localField,"$"+localField)).append("pipeline",pipeline2).append("as", asField));
		pipeline.add(lookUp);
//		Document lookUp = new Document();
//		List<Document> pipeline2 = new ArrayList<Document>();
//		Aggregate.aggregateMatch(pipeline2, new Document(foreignField,foreignValue));
//		Aggregate.aggregateCount(pipeline2);
//		lookUp.append("$lookup", new Document("from",dbName).append("localField", localField).append("foreignField",foreignField).append("as", asField));
//		pipeline.add(lookUp);
	}
}