package com.common.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * @Description:图片格式转换
 * 					Created by hui on 2018/11/15.
 */
@SuppressWarnings("restriction")
public class ImgFormatByJavaUtils {
	static BASE64Encoder encoder = new sun.misc.BASE64Encoder();
	static BASE64Decoder decoder = new sun.misc.BASE64Decoder();

	/**
	 * @Description: 将base64编码字符串转换为图片
	 * @Author:
	 * @CreateTime:
	 * @param imgStr
	 *            base64编码字符串
	 * @return
	 */
	public static byte[] strToImgByte(String imgStr) {
		try {
			return decoder.decodeBuffer(imgStr);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * @Description: 根据图片地址转换为base64编码字符串
	 * @Author:
	 * @CreateTime:
	 * @return
	 */
	public static String imgToStr(File file) {
		try {
			BufferedImage bi = ImageIO.read(file);
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			ImageIO.write(bi, "jpg", baos);
			byte[] bytes = baos.toByteArray();
			return encoder.encodeBuffer(bytes).trim();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static String imgToStr(String path) {
		File f = new File(path);
		return imgToStr(f);
	}

	public static void base64StringToImage(String base64String, String path, String name) {
		try {
			byte[] bytes1 = decoder.decodeBuffer(base64String);
			ByteArrayInputStream bais = new ByteArrayInputStream(bytes1);
			BufferedImage bi1 = ImageIO.read(bais);
			File f1 = new File(path + "/" + name + "jpg");
			ImageIO.write(bi1, "jpg", f1);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/*
	 * public static byte[] imgToStr (MultipartFile file) {
	 * byte[] bytes = new byte[0];
	 * try {
	 * bytes = file.getBytes();
	 * } catch (IOException e) {
	 * e.printStackTrace();
	 * }
	 * return bytes;
	 * }
	 * public static byte[] imgToStrBybaidu(String path) {
	 * byte[] bytes = new byte[0];
	 * try {
	 * bytes = Util.readFileByBytes(path);
	 * } catch (IOException e) {
	 * e.printStackTrace();
	 * }
	 * return bytes;
	 * }
	 */
}
