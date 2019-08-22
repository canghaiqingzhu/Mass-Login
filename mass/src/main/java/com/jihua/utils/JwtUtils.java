package com.jihua.utils;

import java.util.Calendar;
import java.util.Date;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.google.common.collect.Maps;
/**
 * 实现基于JWT的Token登录验证功能
 * 	https://blog.51cto.com/13981400/2345529
 * JWTToken超时刷新策略
 * 	https://blog.csdn.net/qq394829044/article/details/82763936
 * 
 * 
 * @author tianl
 *
 */
public class JwtUtils {

	 
    /**服务器私钥
     * token秘钥，请勿泄露，请勿随便修改 backups:JKKLJOoasdlfj
     * 别人篡改数据，但是签名的密匙是在服务器存储，密匙不同，生成的sign也不同。
     * 所以根据sign的不同就可以知道是否篡改了数据。
     */
    private static final String SECRET = "JKKLJOoasdlfj";
 
 
    /**
     * JWT生成Token.<br/>
     * <p>
     * JWT构成: header, payload, signature
     *
     * @param userId 登录成功后用户userId, 参数userId不可传空
     */
    public static String createToken(String userId) throws Exception {
        Date iatDate = new Date();
        // expire time
        Calendar nowTime = Calendar.getInstance();
        //token 过期时间: 10天
        nowTime.add(Calendar.DATE, 10);
        //获得10天后的时间戳
        Date expiresDate = nowTime.getTime();
        // header(头部)，头部信息主要包括（参数的类型--JWT,签名的算法--HS256）
        Map<String, Object> header = Maps.newHashMap();
        //加密算法
        header.put("alg", "HS256");
        //类型
        header.put("typ", "JWT");
        String token = JWT.create().withHeader(header)
                // payload 存放的信息  iss jwt签发者
        		.withIssuer("签发者")
                .withClaim("iss", "Service")
                .withSubject("用户")//主题，科目
                //接受该JWT的一方
                .withClaim("aud", "APP").withClaim("userId", userId)
                // sign time 开始时间
                .withIssuedAt(iatDate)
                // expire time 到期时间
                .withExpiresAt(expiresDate)
                // signature 签名
                // final Algorithm signer = Algorithm.HMAC256(secret);//生成签名
                .sign(Algorithm.HMAC256(SECRET));
 
        return token;
    }
 
    /**
     * 解密Token
     *
     * @param token
     * @return
     * @throws Exception
     */
    public static Map<String, Claim> verifyToken(String token) {
        DecodedJWT jwt = null;
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET)).build();
            jwt = verifier.verify(token);
        } catch (Exception e) {
            System.out.println("验证失败");
        }
        return jwt.getClaims();
    }
    /**
     * 解析验证token
     * @param token 加密后的token字符串
     * @return
     */
    public static Boolean isToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT jwt = verifier.verify(token);
            return true;
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("校验失败");
        }
        return false;
    }


    /**
     * 根据Token获取user_id
     *
     * @param token
     * @return user_id
     */
    public static String getAppUID(String token) {
        Map<String, Claim> claims = verifyToken(token);
        Claim user_id_claim = claims.get("userId");
        if (null == user_id_claim || StringUtils.isEmpty(user_id_claim.asString())) {
            // token 校验失败, 抛出Token验证非法异常
        }
        assert user_id_claim != null;
        return String.valueOf(user_id_claim.asString());
    }
 
    public static void main(String[] args) throws Exception {
        String token = createToken("sssss");
        System.out.println(token);
        Map map = verifyToken(token);
        System.out.println(map);
        String uuid = getAppUID(token);
        System.out.println(uuid);
 
    }
    
    /**
     * JWTToken刷新生命周期
     * 1、登录成功后将用户的JWT生成的Token作为k、v存储到cache缓存里面(这时候k、v值一样)
     * 2、当该用户在次请求时，通过JWTFilter层层校验之后会进入到doGetAuthenticationInfo进行身份验证
     * 3、当该用户这次请求JWTToken值还在生命周期内，则会通过重新PUT的方式k、v都为Token值，缓存中的token值生命周期时间重新计算(这时候k、v值一样)
     * 4、当该用户这次请求jwt生成的token值已经超时，但该token对应cache中的k还是存在，则表示该用户一直在操作只是JWT的token失效了，程序会给token对应的k映射的v值重新生成JWTToken并覆盖v值，该缓存生命周期重新计算
     * 5、当该用户这次请求jwt在生成的token值已经超时，并在cache中不存在对应的k，则表示该用户账户空闲超时，返回用户信息已失效，请重新登录。
     * 6、每次当返回为true情况下，都会给Response的Header中设置Authorization，该Authorization映射的v为cache对应的v值。
     * 7、注：当前端接收到Response的Header中的Authorization值会存储起来，作为以后请求token使用
     * @param userName
     * @param passWord
     * @return
     */
    /*public boolean jwtTokenRefresh(String userName,String passWord){
   	 HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
   	 HttpServletResponse response = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getResponse();
   	 String token = httpServletRequest.getHeader(Constants.TOKEN);
   	 String cacheTokenKey = String.valueOf(EhcacheUtils.getInstance().get("matedataManagement", token));
   	 System.out.println(cacheTokenKey == null);
   	 if(!StringUtils.isEmpty(cacheTokenKey) && !cacheTokenKey.equals("null")){
   		if (!JWTUtil.verify(token, userName, passWord)) {
   		   String newAuthorization=JWTUtil.sign(userName, passWord);
   		   EhcacheUtils.getInstance().put("matedataManagement", cacheTokenKey, newAuthorization, JWTUtil.getExpireTime()/1000);
        }else {
           EhcacheUtils.getInstance().put("matedataManagement", cacheTokenKey, cacheTokenKey,JWTUtil.getExpireTime()/1000);
        }
   		response.setHeader("Authorization", String.valueOf(EhcacheUtils.getInstance().get("matedataManagement", cacheTokenKey)));
   		return true;
   	 } 
   	 return false;
   }*/

}
