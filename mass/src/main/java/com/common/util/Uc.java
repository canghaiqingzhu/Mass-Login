package com.common.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

public class Uc {
	/**
	 * �ַ���ת��.
	 * 
	 * @param value
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public static String decUTF8(String value) throws UnsupportedEncodingException {
		if(St.isEmpty(value))
			return value;
		return URLDecoder.decode(value, "utf-8");
	}
	
	public static String encUTF8(String value) throws UnsupportedEncodingException {
		if(St.isEmpty(value))
			return value;
		return URLEncoder.encode(value, "utf-8");
	}
	/**
	 * ���ַ���ת��unicode
	 * 
	 * @param str
	 *            ��ת�ַ���
	 * @return unicode�ַ���
	 */
	public static String convert(String str) {
		str = (str == null ? "" : str);
		String tmp;
		StringBuffer sb = new StringBuffer(1000);
		char c;
		int i, j;
		sb.setLength(0);
		for (i = 0; i < str.length(); i++) {
			c = str.charAt(i);
			sb.append("\\u");
			j = (c >>> 8); // ȡ����8λ
			tmp = Integer.toHexString(j);
			if (tmp.length() == 1)
				sb.append("0");
			sb.append(tmp);
			j = (c & 0xFF); // ȡ����8λ
			tmp = Integer.toHexString(j);
			if (tmp.length() == 1)
				sb.append("0");
			sb.append(tmp);

		}
		return (new String(sb));
	}

	/**
	 * ��unicode �ַ���
	 * 
	 * @param str
	 *            ��ת�ַ���
	 * @return ��ͨ�ַ���
	 */
	public static String revert(String str) {
		str = (str == null ? "" : str);
		if (str.indexOf("\\u") == -1)// �������unicode����ԭ������
			return str;

		StringBuffer sb = new StringBuffer(1000);

		for (int i = 0; i < str.length();) {
			String strTemp = str.substring(i, i + 6);
			String value = strTemp.substring(2);
			int c = 0;
			for (int j = 0; j < value.length(); j++) {
				char tempChar = value.charAt(j);
				int t = 0;
				switch (tempChar) {
				case 'a':
					t = 10;
					break;
				case 'b':
					t = 11;
					break;
				case 'c':
					t = 12;
					break;
				case 'd':
					t = 13;
					break;
				case 'e':
					t = 14;
					break;
				case 'f':
					t = 15;
					break;
				default:
					t = tempChar - 48;
					break;
				}

				c += t * ((int) Math.pow(16, (value.length() - j - 1)));
			}
			sb.append((char) c);
			i = i + 6;
		}
		return sb.toString();
	}

}
