package com.jihua.auth.controller;

import java.util.Date;

import org.bson.Document;
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
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "authEn")
@Api(value = "手机端用户登录、注册")
public class EncryptLoginController extends PublicController{
	@ApiOperation(value = "信息员注册", notes = "信息员注册")
	@RequestMapping(value = "/registerMobile", method = RequestMethod.POST, produces = defaultProduces)
	public Document registerMobile(String parameters) {
		Document map = decryptDocument(parameters);
		MassUser bean = new MassUser();
		BeanUtil.document2Bean(map, bean);
		Document document = new Document();
		bean.setStartTime(new Date());
		bean.setUpdateTime(new Date());
		bean.setPassword(DES.encrypt(bean.getPassword()));
		bean.setStatus("未激活");
		document.append("result", true);//service.saveOneBean(bean));
		return document;
	}
	//DES.decrypt(bean.getString("citizenId"))/** 解密 **/
	//DES.encrypt(bean.getString("citizenId"))/** 加密 **/
	@ApiOperation(value = "信息员登录", notes = "信息员登录")
	@RequestMapping(value = "/loginMobile", method = RequestMethod.POST, produces = defaultProduces)
	public Document loginMobile(String parameters) {
		Document map = decryptDocument(parameters);
		Document document = new Document();
		if(map.containsKey("userName") && map.containsKey("password")){
			String userName = map.getString("userName");
			if(St.isEmpty(userName)) userName = "111111111111";
			String password = map.getString("password");
			if(St.isEmpty(password)) password = "111111111111";
			Document query = new Document();
			Document query1 = new Document();
			Common.queryEq(query1, "mobile", map.getString("userName"));
			Document query2 = new Document();
			Common.queryEq(query2, "loginName", map.getString("userName"));
			Document query0 = new Document();
			Common.queryOr(query0, query1,query2);
			Document query3 = new Document();
			Common.queryEq(query3, "password", DES.encrypt(map.getString("password")));
			Common.queryAnd(query, query0,query3);
			Document user = new Document();//service.findOne(query, MassUser.class);
			if(user!=null){
				user.put("id", user.get("_id").toString());
				user.remove("_id");
				user.remove("code");
				/*document.put("result", true);
				document.put("data", user);*/
				Document r = new Document();
				r.put("result", encryptDoc(user));
				return r;
			}else{
				document.append("result", false).append("errmsg", "登录名或密码错误！");
			}
			return document;
		}else{
			document.append("result", false).append("errmsg", "登录失败！");
			return document;
		}
	}
}
