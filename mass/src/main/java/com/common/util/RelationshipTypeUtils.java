package com.common.util;

/**
 * 人员关系方向映射
 * @author dell
 *
 */
public class RelationshipTypeUtils {
	// 男性、女性、未知的性别、未说明的性别
	public static String getRelation(String relation, String sex) {
		String str = "";
		switch (relation) {
		// 亲属
		case "配偶":
			str = "配偶";
			break;
		case "夫":
			str = "妻";
			break;
		case "妻":
			str = "夫";
			break;
		case "养子或继子":
			if ("男".equals(sex)) {
				str = "继父或养父";
			} else if ("女".equals(sex)) {
				str = "继母或养母";
			} else {
				str = "其他父母关系";
			}
			break;
		case "女婿":
			if ("男".equals(sex)) {
				str = "岳父";
			} else if ("女".equals(sex)) {
				str = "岳母";
			} else {
				str = "其他父母关系";
			}
			break;
		case "子":
		case "独生子":
		case "长子":
		case "次子":
		case "三子":
		case "四子":
		case "五子":
		case "其他儿子":
			if ("男".equals(sex)) {
				str = "父亲";
			} else if ("女".equals(sex)) {
				str = "母亲";
			} else {
				str = "父母";
			}
			break;
		case "养女或继女":
			if ("男".equals(sex)) {
				str = "继父或养父";
			} else if ("女".equals(sex)) {
				str = "继母或养母";
			} else {
				str = "其他父母关系";
			}
			break;
		case "儿媳":
			if ("男".equals(sex)) {
				str = "公公";
			} else if ("女".equals(sex)) {
				str = "婆婆";
			} else {
				str = "其他父母关系";
			}
		case "女":
		case "独生女":
		case "长女":
		case "次女":
		case "三女":
		case "四女":
		case "五女":
		case "其他女儿":
			if ("男".equals(sex)) {
				str = "父亲";
			} else if ("女".equals(sex)) {
				str = "母亲";
			} else {
				str = "父母";
			}
			break;
		case "其他孙子、孙女或外孙子、外孙女":
			str = "祖父母或外祖父母";
			break;
		case "父母":
		case "父亲":
		case "母亲":
		case "其他父母关系":
			if ("男".equals(sex)) {
				str = "儿";
			} else if ("女".equals(sex)) {
				str = "女";
			} else {
				str = "其他亲属";
			}
		case "公公":
		case "婆婆":
			str = "儿媳";
			break;
		case "岳父":
		case "岳母":
			str = "女婿";
			break;
		case "继父或养父":
		case "继母或养母":
			if ("男".equals(sex)) {
				str = "养子或继子";
			} else if ("女".equals(sex)) {
				str = "养女或继女";
			} else {
				str = "其他亲属";
			}
			break;
		case "祖父母或外祖父母":
		case "祖父":
		case "祖母":
		case "外祖父":
		case "外祖母":
		case "配偶的祖父母或外祖父母":
		case "其他祖父母或外祖父母关系":
			str = "其他孙子、孙女或外孙子、外孙女";
			break;
		case "曾祖父":
		case "曾祖母":
		case "配偶的曾祖父母或外曾祖父母":
			str = "其他亲属";
			break;
		case "兄弟姐妹":
			str = "兄弟姐妹";
			break;
		case "兄":
		case "嫂":
		case "姐姐":
		case "姐夫":
			if ("男".equals(sex)) {
				str = "弟";
			} else if ("女".equals(sex)) {
				str = "妹妹";
			} else {
				str = "其他兄弟姐妹";
			}
			break;
		case "弟":
		case "弟媳":
		case "妹妹":
		case "妹夫":
			if ("男".equals(sex)) {
				str = "兄";
			} else if ("女".equals(sex)) {
				str = "姐姐";
			} else {
				str = "其他兄弟姐妹";
			}
			break;
		case "其他兄弟姐妹":
			str = "其他兄弟姐妹";
			break;
		case "伯父":
		case "伯母":
		case "叔父":
		case "婶母":
		case "姑父":
		case "姑母":
			if ("男".equals(sex)) {
				str = "侄子";
			} else if ("女".equals(sex)) {
				str = "侄女";
			} else {
				str = "其他亲属";
			}
			break;
		case "舅父":
		case "舅母":
		case "姨夫":
		case "姨母":
			if ("男".equals(sex)) {
				str = "外甥";
			} else if ("女".equals(sex)) {
				str = "外甥女";
			} else {
				str = "其他亲属";
			}
			break;
		case "堂兄弟、堂姐妹":
			str = "堂兄弟、堂姐妹";
			break;
		case "表兄弟、表姐妹":
			str = "表兄弟、表姐妹";
			break;
		case "侄子":
		case "侄女":
			str = "其他亲属";
			break;
		case "外甥":
		case "外甥女":
			str = "其他亲属";
			break;
		case "其他亲属":
			str = "其他亲属";
			break;
		}
		return str;
	}
}
