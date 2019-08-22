package com.common.util;

import org.bson.Document;

public class Doc {
	public static String getDocStr(Document doc, String... fields) {
		String v = "";
		if (doc != null) {
			for (String field : fields) {
				if (doc.containsKey(field) && doc.get(field) instanceof String) {
					v += doc.getString(field);
				}
			}
		}
		return v;
	}
}