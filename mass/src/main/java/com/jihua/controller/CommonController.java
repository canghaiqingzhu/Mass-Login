package com.jihua.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@Controller
public class CommonController extends PublicController {
	

	@RequestMapping(value = "/")
	public String login() {
		return "login";
	}

	@RequestMapping(value = "/register")
	public String register() {
		return "register";
	}
	

	/******************** 
	@RequestMapping(value = "/majorcaseslist")
	public String majorcaseslist(PublicBean publicBean) {
		request.setAttribute("publicBean", publicBean);
		return "communal.jsp?includePage=intergrated/majorcases/list";
	}
	 ***************************/
	
	/** 500页面 **/
	@RequestMapping(value = "/error500")
	public String showError() {
		return "500";
	}

	/** 404页面 **/
	@RequestMapping(value = "/error404")
	public String error404() {
		return "404";
	}
}