package com.common.util;

import java.lang.reflect.Field;

import org.apache.commons.beanutils.BeanUtils;
import org.bson.Document;

public class BeanUtil {
	public static <T> Document bean2Document(T bean) {
		if (bean == null) {
			return null;
		}
		Document document = new Document();
		// 获取对象对应类中的所有属性域
		Field[] fields = bean.getClass().getDeclaredFields();
		for (Field field : fields) {
			// 获取属性名
			String fieldName = field.getName();
			// 修改访问控制权限
			boolean accessFlag = field.isAccessible();
			if (!accessFlag) {
				field.setAccessible(true);
			}
			try {
				Object param = field.get(bean);
				if (param == null) {
					continue;
				} else {
					document.put(fieldName, param);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			// 恢复访问控制权限
			field.setAccessible(accessFlag);
		}
		return document;
	}

	public static <T> T document2Bean(Document document, T bean) {
		if (bean == null || document == null) {
			return null;
		}
		Field[] fields = bean.getClass().getDeclaredFields();
		for (Field field : fields) {
			String varName = field.getName();
			Object object = document.get(varName);
			if (object != null) {
				try {
					BeanUtils.setProperty(bean, varName, object);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return bean;
	}
}