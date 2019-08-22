package com.common.util;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class ClassReflection {
	/** 将class1中与class2字段相同的部分填入到class2中 **/
	public static void reflectionAttr(Object class1, Object class2) throws Exception {
		Class<?> clazz1 = Class.forName(class1.getClass().getName());
		Class<?> clazz2 = Class.forName(class2.getClass().getName());
		// 获取两个实体类的所有属性
		Field[] fields1 = clazz1.getDeclaredFields();
		Field[] fields2 = clazz2.getDeclaredFields();
		ClassReflection cr = new ClassReflection();
		// 遍历class1Bean，获取逐个属性值，然后遍历class2Bean查找是否有相同的属性，如有相同则赋值
		for (Field f1 : fields1) {
			Object value = cr.invokeGetMethod(class1, f1.getName(), null);
			for (Field f2 : fields2) {
				if (f1.getName().equals(f2.getName())) {
					Object[] obj = new Object[1];
					obj[0] = value;
					cr.invokeSetMethod(class2, f2.getName(), obj);
				}
			}
		}
	}

	/** 获取bean中的某一字段 **/
	public static Object reflectionGetAttrObj(Object clazz, String fieldName) {
		ClassReflection cr = new ClassReflection();
		Object value = cr.invokeGetMethod(clazz, fieldName, null);
		return value;
	}

	/** 给bean中的某一字段赋值 **/
	public static void reflectionSetAttrObj(Object clazz, String fieldName, Object value) {
		Object[] obj = new Object[1];
		obj[0] = value;
		ClassReflection cr = new ClassReflection();
		cr.invokeSetMethod(clazz, fieldName, obj);
	}

	/** 获取bean中的某一字段 **/
	public static int reflectionGetAttr(Object clazz, String fieldName, Object[] args) {
		ClassReflection cr = new ClassReflection();
		String value = String.valueOf(cr.invokeGetMethod(clazz, fieldName, args));
		if (St.isEmpty(value))
			return 0;
		return Integer.parseInt(value);
	}

	/** 给bean中的某一字段赋值 **/
	public static void reflectionSetAttr(Object clazz, String fieldName, int value) {
		Object[] obj = new Object[1];
		obj[0] = value;
		ClassReflection cr = new ClassReflection();
		cr.invokeSetMethod(clazz, fieldName, obj);
	}

	private Object invokeGetMethod(Object clazz, String fieldName, Object[] args) {
		String methodName = fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
		Method method = null;
		try {
			method = Class.forName(clazz.getClass().getName()).getDeclaredMethod("get" + methodName);
			return method.invoke(clazz);
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}

	private Object invokeSetMethod(Object clazz, String fieldName, Object[] args) {
		String methodName = fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
		Method method = null;
		try {
			Class<?>[] parameterTypes = new Class[1];
			Class<?> c = Class.forName(clazz.getClass().getName());
			Field field = c.getDeclaredField(fieldName);
			parameterTypes[0] = field.getType();
			method = c.getDeclaredMethod("set" + methodName, parameterTypes);
			return method.invoke(clazz, args);
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}
	
	/** 根据类名创建对象 
	 * @param <T>**/
	@SuppressWarnings("unchecked")
	public static <T> T reflectionGetBeanByClassName(String className) {
		if(St.notEmpty(className)){
			try {
				Class<T> clz = (Class<T>)Class.forName(className);
				T obj = clz.newInstance();
				return obj;
			} catch (ClassNotFoundException | InstantiationException | IllegalAccessException e) {
				e.printStackTrace();
			} 
		}
		return null;
	}
}