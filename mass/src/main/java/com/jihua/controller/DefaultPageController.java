package com.jihua.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 设置默认跳转页面，方便嵌入页面，避免通过网关连接websocket
 */
//@Controller
public class DefaultPageController {
	// 请先在yml中配置公网服务器ip（此项目只能部署在公网）
	/*
	 * @Value("${wswrtc.ip}") private String ip;
	 */
	/*
	 * @RequestMapping("/pageLogin/{loginName}") public ModelAndView
	 * index(@PathVariable("loginName")String loginName){ ModelAndView mav = new
	 * ModelAndView(INDEXS); mav.addObject("port", port); mav.addObject("ipaddress",
	 * ip); mav.addObject("loginName",loginName); return mav; }
	 */
	/*
	 * @RequestMapping("/") public ModelAndView index(){ ModelAndView mav = new
	 * ModelAndView("login");
	 * 
	 * mav.addObject("port", port); mav.addObject("ipaddress", ip);
	 * 
	 * return mav; }
	 */

}
