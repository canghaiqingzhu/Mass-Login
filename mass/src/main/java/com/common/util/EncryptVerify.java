package com.common.util;

public class EncryptVerify {
	/** 加密 **/
	public static String encrypt(String data) {
		String now = Dt.getTimeSSS();
		String rand = RandomUtil.getRandom();
		data = data + now + rand;
		String md5 = MD5Util.createMd5Code(data);
		return ZipUtils.zip(DES.encrypt(data + md5));
	}

	/** md5验证 **/
	public static boolean encryptVerify(String data) {
		data = DES.decrypt(ZipUtils.unzip(data));
		String md5 = data.substring(data.length() - 32, data.length());
		data = data.substring(0, data.length() - 32);
		String newMd5 = MD5Util.createMd5Code(data);
		if (md5.equals(newMd5)) {
			return true;
		}
		return false;
	}

	/** 解密 **/
	public static String decrypt(String data) {
		data = DES.decrypt(ZipUtils.unzip(data));
		data = data.substring(0, data.length() - 53);
		return data;
	}
}