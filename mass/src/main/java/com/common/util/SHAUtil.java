package com.common.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/** 采用SHA加密 **/
public class SHAUtil {
	/** 随机生成的全局数组 **/
	private static final char HEX_DIGITS[] = { '5', '0', 'a', '9', 'f', '4', '2', '3', '8', 'e', 'b', 'd', 'c', '7', '6', '1' };

	public SHAUtil() {
	}

	/** SHA编码 **/
	public static String createSHACode(String s) {
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA");
			digest.update(s.getBytes());
			byte messageDigest[] = digest.digest();
			return createDigits(messageDigest);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return "";
	}

	/** 转换字节数组转换为16进制字串 **/
	private static String createDigits(byte[] b) {
		StringBuilder sb = new StringBuilder(b.length * 2);
		for (int i = 0; i < b.length; i++) {
			sb.append(HEX_DIGITS[(b[i] & 0xf0) >>> 4]);
			sb.append(HEX_DIGITS[b[i] & 0x0f]);
		}
		return sb.toString();
	}
}