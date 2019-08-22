package com.common.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.commons.codec.binary.Base64;

public class Coder {
	public static final String KEY_SHA = "SHA";
	public static final String KEY_MD5 = "MD5";

	/** base64解密 **/
	public static byte[] decryptBASE64(String key) {
		return Base64.decodeBase64(key);
	}

	/** base64加密 **/
	public static String encryptBASE64(byte[] key) {
		return Base64.encodeBase64String(key);
	}

	/** MD5加密 **/
	public static byte[] encryptMD5(byte[] data) {
		try {
			MessageDigest md5 = MessageDigest.getInstance(KEY_MD5);
			md5.update(data);
			return md5.digest();
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new byte[0];
	}

	/** SHA加密 **/
	public static byte[] encryptSHA(byte[] data) {
		try {
			MessageDigest sha = MessageDigest.getInstance(KEY_SHA);
			sha.update(data);
			return sha.digest();
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new byte[0];
	}
}