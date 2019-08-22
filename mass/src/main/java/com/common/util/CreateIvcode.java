package com.common.util;

import java.math.BigInteger;

/**
 * 	登录名封装邀请码
 * @author dell
 *
 */
public class CreateIvcode {
	public static void main(String[] args) {
		
		
		String str = new BigInteger("59dc2b1d337a3a13c84efc35",16).toString(10);
		System.out.println("59dc2b1d337a3a13c84efc35");
		BigInteger   l = new BigInteger(str,10);
		System.out.println(l);
		System.out.println(DES.encrypt(l.toString(32)));
		System.out.println(new BigInteger(str,10).toString(32));//最大32位
		
		//System.out.println(toMinuscule("abHj1"));
		//System.out.println(toCapital("abHj1"));
	}
	

	

	private static String toMinuscule(String s) {
		return s.toLowerCase();
	}
	private static String toCapital(String s) {
		return s.toUpperCase();
	}
	private static String deNum(String s) {
		char[] v = {'W','4','Y','0','Z','3','1','2','X','5'};
		StringBuffer sb = new StringBuffer();
		for(char c : s.toCharArray()) {
			if(Character.isDigit(c)) {
				sb.append(v[Integer.parseInt(c+"")]);
			}else {
				sb.append(c);
			}
		}
		return sb.toString();
	}
	private static String enNum(String s) {
		String v = "W4Y0Z312X5";
		StringBuffer sb = new StringBuffer();
		for(char c : s.toCharArray()) {
			if(v.indexOf(c)>=0) {
				sb.append(v.indexOf(c));
			}else {
				sb.append(c);
			}
		}
		return sb.toString();
	}
	private static String intTo64(long n) { 
		StringBuffer s = new StringBuffer(); 
		String a; 
		char []b = {'l','m','n','0','q','r','s','2','6','7','/','=','8','A','B','E',
				'G','H','I','J','K','N','O','P','Q','R','S','T','U','V','W','X',
				'Y','3','Z','a','b','c','d','4','5','e','f','g','h','i','1','j',
				'o','p','t','u','v','C','D','w','9','x','y','z','L','M','F','k'}; 
		while(n != 0){ 
			s = s.append(b[(int) (n % 64)]); 
			n = n/64; 
		} 
		a = s.reverse().toString(); 
		return a; 
	}
	public static int char32ToDecimal(char hexChar){
		if(hexChar>='A'&&hexChar<='V')
			return 10+hexChar-'A';
		else
			return hexChar-'0';
	}
	
/**
 * 64进制和10进制的转换类
 * @author Administrator
 *
 */
    final static char[] digits = {
    	'0' , '1' , '2' , '3' , '4' , '5' ,
    	'6' , '7' , '8' , '9' , 'a' , 'b' ,
    	'c' , 'd' , 'e' , 'f' , 'g' , 'h' ,
    	'i' , 'j' , 'k' , 'l' , 'm' , 'n' ,
    	'o' , 'p' , 'q' , 'r' , 's' , 't' ,
    	'u' , 'v' , 'w' , 'x' , 'y' , 'z' ,
    	'A' , 'B' , 'C' , 'D' , 'E' , 'F' ,
    	'G' , 'H' , 'I' , 'J' , 'K' , 'L' ,
    	'M' , 'N' , 'O' , 'P' , 'Q' , 'R' ,
    	'S' , 'T' , 'U' , 'V' , 'W' , 'X' ,
    	'Y' , 'Z' , '+' , '/'  ,
        };
	/**
	 * @param args
	 */
	public static void main2(String[] args) {
		System.out.println(CompressNumber(999999999999999999L,6)); 
		System.out.println(UnCompressNumber(CompressNumber(999999999999999999L,6)));
	}
	/**
	 * 把10进制的数字转换成64进制
	 * @param number
	 * @param shift
	 * @return
	 */
    private static String CompressNumber(long number, int shift) {
    	char[] buf = new char[64];
    	int charPos = 64;
    	int radix = 1 << shift;
    	long mask = radix - 1;
    	do {
    	    buf[--charPos] = digits[(int)(number & mask)];
    	    number >>>= shift;
    	} while (number != 0);
    	return new String(buf, charPos, (64 - charPos));
       }
    /**
     * 把64进制的字符串转换成10进制
     * @param decompStr
     * @return
     */
    private static long UnCompressNumber(String decompStr)
    {
    	long result=0;
    	for (int i =  decompStr.length()-1; i >=0; i--) {
    		if(i==decompStr.length()-1)
    		{
    			result+=getCharIndexNum(decompStr.charAt(i));
    			continue;
    		}
    		for (int j = 0; j < digits.length; j++) {
    			if(decompStr.charAt(i)==digits[j])
        		{
    				result+=((long)j)<<6*(decompStr.length()-1-i);
        		}
			}
		}
    	return result;
    }   
    /**
     * 
     * @param ch
     * @return
     */
    private static long getCharIndexNum(char ch)
    {
    	int num=((int)ch);
    	if(num>=48&&num<=57)
    	{
    		return num-48;
    	}
    	else if(num>=97&&num<=122)
    	{
    		return num-87;
    	}else if(num>=65&&num<=90)
    	{
    		return num-29;
    	}else if(num==43)
    	{
    		return 62;
    	}
    	else if (num == 47)
    	{
    		return 63;
		}
    	return 0;
    }
	 
	


}
