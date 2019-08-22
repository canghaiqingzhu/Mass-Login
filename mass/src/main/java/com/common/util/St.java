package com.common.util;

import org.apache.commons.lang3.StringUtils;

public class St {
	/** 非空判断 **/
	public static boolean notEmpty(final String s) {
		return !isEmpty(s);
	}

	/** 空值判断 **/
	public static boolean isEmpty(final String s) {
		return StringUtils.isEmpty(s);
	}

	public static String getString(String string, String str) {
		int index = string.indexOf(str);
		return string.substring(index, string.length());
	}
}