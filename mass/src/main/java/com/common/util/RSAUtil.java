package com.common.util;

import java.security.Key;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.Signature;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.Cipher;

import org.bson.Document;

public class RSAUtil extends Coder {
	public static final String KEY_ALGORTHM = "RSA";
	public static final String SIGNATURE_ALGORITHM = "MD5withRSA";
	public static final String PUBLIC_KEY = "RSAPublicKey";
	public static final String PRIVATE_KEY = "RSAPrivateKey";
	/** 随机生成的全局数组 **/
	private static final char HEX_DIGITS[] = { '8', 'e', '9', '2', 'b', '4', 'f', '5', '1', '3', 'c', '7', '0', '6', 'a', 'd' };

	public RSAUtil() {
	}

	/** 初始化秘钥 **/
	public static Document initKey() {
		/** KeyPairGenerator类用于生成公钥和私钥对，基于RSA算法生成对象 **/
		KeyPairGenerator keyPairGenerator = null;
		try {
			keyPairGenerator = KeyPairGenerator.getInstance(KEY_ALGORTHM);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		/** 初始化秘钥生成器，秘钥大小为96-1024位 **/
		keyPairGenerator.initialize(512, new SecureRandom());
		/** 生成一个密钥对，保存在keyPair中 **/
		KeyPair keyPair = keyPairGenerator.generateKeyPair();
		/** 得到公钥 **/
		RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
		/** 得到私钥 **/
		RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
		Document document = new Document();
		document.put(PUBLIC_KEY, publicKey);
		document.put(PRIVATE_KEY, privateKey);
		return document;
	}

	/** 获取公钥 **/
	public static String getPublicKey(Document document) {
		Key key = (Key) document.get(PUBLIC_KEY);
		return encryptBASE64(key.getEncoded());
	}

	/** 获取私钥 **/
	public static String getPrivateKey(Document document) {
		Key key = (Key) document.get(PRIVATE_KEY);
		return encryptBASE64(key.getEncoded());
	}

	/** 公钥加密 **/
	public static byte[] encryptByPublicKey(byte[] data, String key) throws Exception {
		/** 对公钥解密 **/
		byte[] keyBytes = decryptBASE64(key);
		/** 取公钥 **/
		X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(keyBytes);
		KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORTHM);
		Key publicKey = keyFactory.generatePublic(x509EncodedKeySpec);
		/** 对数据解密 **/
		Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
		cipher.init(Cipher.ENCRYPT_MODE, publicKey);
		return cipher.doFinal(data);
	}

	/** 私钥加密 **/
	public static byte[] encryptByPrivateKey(byte[] data, String key) throws Exception {
		/** 解密密钥 **/
		byte[] keyBytes = decryptBASE64(key);
		/** 取私钥 **/
		PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(keyBytes);
		KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORTHM);
		Key privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);
		/** 对数据加密 **/
		Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
		cipher.init(Cipher.ENCRYPT_MODE, privateKey);
		return cipher.doFinal(data);
	}

	/** 公钥解密 **/
	public static byte[] decryptByPublicKey(byte[] data, String key) throws Exception {
		/** 对公钥解密 **/
		byte[] keyBytes = decryptBASE64(key);
		/** 取公钥 **/
		X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(keyBytes);
		KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORTHM);
		Key publicKey = keyFactory.generatePublic(x509EncodedKeySpec);
		/** 对数据解密 **/
		Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
		cipher.init(Cipher.DECRYPT_MODE, publicKey);
		return cipher.doFinal(data);
	}

	/** 私钥解密 **/
	public static byte[] decryptByPrivateKey(byte[] data, String key) throws Exception {
		/** 对私钥解密 **/
		byte[] keyBytes = decryptBASE64(key);
		/** 取私钥 **/
		PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(keyBytes);
		KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORTHM);
		Key privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);
		/** 对数据解密 **/
		Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
		cipher.init(Cipher.DECRYPT_MODE, privateKey);
		return cipher.doFinal(data);
	}

	/** 转换字节数组转换为16进制字串 **/
	public static String createDigits(byte[] b) {
		StringBuilder sb = new StringBuilder(b.length * 2);
		for (int i = 0; i < b.length; i++) {
			sb.append(HEX_DIGITS[(b[i] & 0xf0) >>> 4]);
			sb.append(HEX_DIGITS[b[i] & 0x0f]);
		}
		return sb.toString();
	}

	/** 私钥签名 **/
	public static String sign(byte[] data, String key) throws Exception {
		/** 解密私钥 **/
		byte[] keyBytes = decryptBASE64(key);
		/** 取私钥 **/
		PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(keyBytes);
		KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORTHM);
		PrivateKey privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);
		/** 用私钥对信息生成数字签名 **/
		Signature signature = Signature.getInstance(SIGNATURE_ALGORITHM);
		signature.initSign(privateKey);
		signature.update(data);
		return encryptBASE64(signature.sign());
	}

	/** 公钥校验 **/
	public static boolean verify(byte[] data, String key, String sign) throws Exception {
		/** 解密公钥 **/
		byte[] keyBytes = decryptBASE64(key);
		/** 取公钥 **/
		X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(keyBytes);
		KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORTHM);
		PublicKey publicKey = keyFactory.generatePublic(x509EncodedKeySpec);
		Signature signature = Signature.getInstance(SIGNATURE_ALGORITHM);
		signature.initVerify(publicKey);
		signature.update(data);
		/** 验证签名是否正常 **/
		return signature.verify(decryptBASE64(sign));
	}
}