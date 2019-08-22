package com.common.util;

import java.util.Random;

public class RandomUtil {
	/** 生成四位随机数 **/
	public static String getRandom() {
		Random random = new Random();
		String sRand = "";
		for (int i = 0; i < 4; i++) {
			String rand = String.valueOf(random.nextInt(10));
			sRand += rand;
		}
		return sRand;
	}
}