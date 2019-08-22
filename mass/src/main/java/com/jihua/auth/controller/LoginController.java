package com.jihua.auth.controller;

import java.util.Date;

import org.bson.Document;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.common.util.BeanUtil;
import com.common.util.Common;
import com.common.util.DES;
import com.common.util.St;
import com.jihua.auth.bean.MassUser;
import com.jihua.controller.PublicController;

import io.swagger.annotations.Api;
import springfox.documentation.annotations.ApiIgnore;

@Controller
@RequestMapping(value = "auth")
@Api(value = "pc端用户登录、注册")
public class LoginController extends PublicController{
	/** 系统登录 **/
	@ApiIgnore
	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = defaultProduces)
	public String login(String username, String password) {
		System.out.println("---------login >>------------"+username+"-----------"+password+"--------");
//			if(St.isEmpty(userName)) userName = "111111111111";
//			if(St.isEmpty(password)) password = "111111111111";
//			Document query = new Document();
//			Document query1 = new Document();
//			Common.queryEq(query1, "mobile", userName);
//			Document query2 = new Document();
//			Common.queryEq(query2, "loginName", userName);
//			Document query0 = new Document();
//			Common.queryOr(query0, query1,query2);
//			Document query3 = new Document();
//			Common.queryEq(query3, "password", DES.encrypt(password));
//			Common.queryAnd(query, query0,query3);
//			Document user = null;//service.findOne(query, MassUser.class);
//			if(user!=null){
//				user.put("id", user.get("_id").toString());
//				user.remove("_id");
//				user.remove("code");
//				/*document.put("result", true);
//				document.put("data", user);*/
//				Document r = new Document();
//				r.put("result", encryptDoc(user));
//				return r;
//			}else{
//				document.append("result", false).append("errmsg", "登录名或密码错误！");
//			}
		//return "dashboard";//这是由模板引擎解析，然后拼串
	    //return "forward:/dashboard.html";//这是转发
	    //return "redirect:/main.html";//这是重定向
//		转发：request.getRequestDispatcher("/jsp/result.jsp").forward(request, response);
//		重定向：response.sendRedirect(request.getContextPath()+"/jsp/result.jsp");
			return "redirect:/index.jsp?token=1234567890";
	}
	/** 系统注册 **/
	@ApiIgnore
	@RequestMapping(value = "/register", method = RequestMethod.POST, produces = defaultProduces)
	public Document register(MassUser bean) {
		System.out.println("---------login >>-------------------------------"+bean);
		Document document = new Document();
//		bean.setStartTime(new Date());
//		bean.setUpdateTime(new Date());
//		bean.setPassword(DES.encrypt(bean.getPassword()));
//		bean.setStatus("未激活");
//		document.append("result", true);//service.saveOneBean(bean));
		
		
		
		return document;
	}
}
