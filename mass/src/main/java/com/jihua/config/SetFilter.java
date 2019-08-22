package com.jihua.config;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.boot.jackson.JsonObjectSerializer;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
/***
 * 跟我学springboot（二十五）springboot-过滤器之拦截不需要走过滤器的链接使用方法
 * 		https://blog.csdn.net/a303549861/article/details/82902234
 * spring boot 配置Filter过滤器
 * 		https://blog.csdn.net/mzh1992/article/details/53895613
    *  在spring boot中使用@WebFilter配置filter（包括排除URL）
 * 		https://blog.csdn.net/amanicspater/article/details/74267444
 * Spring Boot获取前端页面参数的几种方式总结
 * 		https://blog.csdn.net/a532672728/article/details/78057218
 * SpringBoot中处理的转发与重定向
 * 		https://blog.csdn.net/yubin1285570923/article/details/83796003
 * 
 * 
 * @author dell
 *
 */
@Configuration
@WebFilter(urlPatterns = "/*")
@Order(value = 1)
public class SetFilter  implements Filter{
	private static final Set<String> ALLOWED_PATHS = Collections.unmodifiableSet(new HashSet<>(
            Arrays.asList("","/favicon.ico","/error500","/error404","/register")));//,"/js/*","/css/*","/fonts/*","/images/*", "/auth/login",  "/auth/register""/logout",
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        //System.out.println("init-----------filter");
    }
 
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        String path = request.getRequestURI().substring(request.getContextPath().length()).replaceAll("[/]+$", "");
        boolean allowedPath = ALLOWED_PATHS.contains(path);
        if(!allowedPath &&(
		/*
		 * path.startsWith("css/") || path.startsWith("fonts/") ||
		 * path.startsWith("js/") || path.startsWith("auth/") ||
		 * path.startsWith("images/") || path.startsWith("WEB-INF/jsp/") ||
		 */
        		path.startsWith("/css/") ||path.startsWith("/fonts/") ||
        		path.startsWith("/js/") || path.startsWith("/auth/") ||
        		path.startsWith("/images/") || path.startsWith("/WEB-INF/jsp/"))) {
        	allowedPath = true;
        }
        if (allowedPath) {//System.out.println("这里是不需要处理的url进入的方法               >>"+path);
            chain.doFilter(req, res);
        }else {System.out.println("这里是需要处理的url进入的方法               >>"+path);
        	boolean isDeal = false;
        	Map<String, String[]> ParameterMap = request.getParameterMap();
        	//System.out.println("参数列表ParameterMap为：  >>"+JSONObject.valueToString(ParameterMap));
        	Enumeration<String> names = request.getParameterNames();
        	showParas("getParameterNames",names);
        	while(names.hasMoreElements()){
    			String name = names.nextElement();
    			System.out.println(name+"__"+request.getParameter("timing"));
    		}
        	
        	
        	
        	if(isDeal) {
        		chain.doFilter(req, res);
        	}else {
        		request.getRequestDispatcher("/error500").forward(request, response);
        	}
        }
    }
    private void showParas(String str,Enumeration<String> strs) {
    	System.out.print("参数列表"+str+"为：  >>\t");
    	while(strs.hasMoreElements()){
			String name = strs.nextElement();
			System.out.print(name+"\t");
		}
		System.out.println();
    }
    @Override
    public void destroy() {
        //System.out.println("destroy----------filter");
    }

}
