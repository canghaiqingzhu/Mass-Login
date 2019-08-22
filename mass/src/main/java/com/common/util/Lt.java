package com.common.util;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class Lt {
	/** 获取两个list中不同元素的list **/
	public static List<String> compareListReturnDifferent(List<String> list1, List<String> list2) {
		List<String> listAll = compareListReturnAll(list1, list2);
		List<String> listSame = compareListReturnSame(list1, list2);
		listAll.removeAll(listSame);
		return listAll;
	}

	/** 获取两个list中所有不重复元素的list **/
	public static List<String> compareListReturnAll(List<String> list1, List<String> list2) {
		List<String> listAll = new ArrayList<String>();
		listAll.addAll(list1);
		listAll.addAll(list2);
		return removeSameFromList(listAll);
	}

	/** 获取两个list中所有不重复元素的list **/
	public static List<Integer> compareListReturnAllInt(List<Integer> list1, List<Integer> list2) {
		List<Integer> listAll = new ArrayList<Integer>();
		listAll.addAll(list1);
		listAll.addAll(list2);
		return removeSameFromListInt(listAll);
	}

	/** 获取两个list中相同元素的list **/
	public static List<String> compareListReturnSame(List<String> list1, List<String> list2) {
		List<String> listSame = new ArrayList<String>();
		List<String> listFir = new ArrayList<String>();
		List<String> listSec = new ArrayList<String>();
		listSame.addAll(list1);
		listFir.addAll(list1);
		listSec.addAll(list2);
		listFir.removeAll(listSec);
		listSame.removeAll(listFir);
		return listSame;
	}

	/** list去重复 **/
	public static List<String> removeSameFromList(List<String> list) {
		List<String> listNoSame = new ArrayList<String>(new HashSet<String>(list));
		return listNoSame;
	}

	/** list去重复 **/
	public static List<Integer> removeSameFromListInt(List<Integer> list) {
		List<Integer> listNoSame = new ArrayList<Integer>(new HashSet<Integer>(list));
		return listNoSame;
	}
}