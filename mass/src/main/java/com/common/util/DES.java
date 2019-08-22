package com.common.util;

import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

/**
 * DES加密介绍 DES是一种对称加密算法，所谓对称加密算法即：加密和解密使用相同密钥的算法。DES加密算法出自IBM的研究，
 * 后来被美国政府正式采用，之后开始广泛流传，但是近些年使用越来越少，因为DES使用56位密钥，以现代计算能力，
 * 24小时内即可被破解。虽然如此，在某些简单应用中，我们还是可以使用DES加密算法，本文简单讲解DES的JAVA实现 。
 * 注意：DES加密和解密过程中，密钥长度都必须是8的倍数
 */
public class DES extends Coder {
	/** 随机生成的160位秘钥 **/
	private static final String password = "3207532460535356472484061683995206823800846668857261588499053219691559204648234388013621062986595660977143385535018889505199441359603011818133577209847413319346";

	public DES() {
	}

	/** 加密 **/
	public static String encrypt(String data) {
		byte[] bt = encrypt(data.getBytes(), password.getBytes());
		if (bt != null) {
			return encryptBASE64(bt);
		}
		return "";
	}

	private static byte[] encrypt(byte[] data, byte[] key) {
		try {
			/** 生成一个可信任的随机数源 **/
			SecureRandom sr = new SecureRandom();
			/** 从原始秘钥数据创建DESKeySpec对象 **/
			DESKeySpec dks = new DESKeySpec(key);
			/** 创建一个密钥工厂，然后用它把DESKeySpec转换成SecretKey对象 **/
			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
			SecretKey securekey = keyFactory.generateSecret(dks);
			/** Cipher对象实际完成加密操作 **/
			Cipher cipher = Cipher.getInstance("DES");
			/** 用密匙初始化Cipher对象 **/
			cipher.init(Cipher.ENCRYPT_MODE, securekey, sr);
			/** 加密 **/
			return cipher.doFinal(data);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return null;
	}

	/** 解密 **/
	public static String decrypt(String data) {
		if (data == null)
			return "";
		try {
			byte[] buf = decryptBASE64(data);
			byte[] bt = decrypt(buf, password.getBytes());
			if (bt != null) {
				return new String(bt);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	private static byte[] decrypt(byte[] data, byte[] key) {
		try {
			/** 生成一个可信任的随机数源 **/
			SecureRandom sr = new SecureRandom();
			/** 从原始密钥数据创建DESKeySpec对象 **/
			DESKeySpec dks = new DESKeySpec(key);
			/** 创建一个密钥工厂，然后用它把DESKeySpec转换成SecretKey对象 **/
			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
			SecretKey securekey = keyFactory.generateSecret(dks);
			/** Cipher对象实际完成解密操作 **/
			Cipher cipher = Cipher.getInstance("DES");
			/** 用密钥初始化Cipher对象 **/
			cipher.init(Cipher.DECRYPT_MODE, securekey, sr);
			/** 解密 **/
			return cipher.doFinal(data);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}