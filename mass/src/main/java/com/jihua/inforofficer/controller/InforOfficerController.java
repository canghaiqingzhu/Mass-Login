//package com.jihua.inforofficer.controller;
//
//import java.util.List;
//import org.bson.Document;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RestController;
//import com.common.util.Common;
//import com.common.util.DES;
//import com.common.util.St;
//import com.jihua.auth.bean.MassUser;
//import com.jihua.controller.PublicController;
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiOperation;
///***
// * 信息员
// * @author dell
// *
// */
//@Api(value = "信息员主要数据项服务类")
//@RestController
//@RequestMapping("/infoff")
//public class InforOfficerController extends PublicController{
//	
//	@ApiOperation(value = "信息员向警员发送消息", notes = "信息员向警员发送消息")
//	@RequestMapping(value = "/saveMessage", method = RequestMethod.POST, produces = defaultProduces)
//	public Document saveMessage(String parameters) {
//		Document map = decryptDocument(parameters);
//		Document resultMap = new Document();
//		System.out.println("-----saveMessage----->>>"+map);
//		return resultMap;
//	}
//	
//	@ApiOperation(value = "手机号检验", notes = "手机号检验")
//	@RequestMapping(value = "/checkMobile", method = RequestMethod.POST, produces = defaultProduces)
//	public Document checkMobile(String parameters) {
//		Document map = decryptDocument(parameters);
//		Document resultMap = new Document();
//		boolean result = true;
//		String id = map.getString("id");
//		String mobile = map.getString("mobile");
//		if(St.notEmpty(id) || St.notEmpty(mobile))
//			result = restService.personSelectCountByMobile(id, mobile);
//		resultMap.put("result", result);
//		return resultMap;
//	}
//	@ApiOperation(value = "获取信息员信息", notes = "获取信息员信息")
//	@RequestMapping(value = "/getInfuser", method = RequestMethod.POST, produces = defaultProduces)
//	public Document getInfuser(String parameters) {
//		Document map = decryptDocument(parameters);
//		String id = map.getString("id");
//		if(St.isEmpty(id)){
//			return new Document().append("result", false).append("errmsg", "id为空！");
//		}
//		Document inf = service.findOneById(id, MassUser.class);
//		if(inf == null){
//			return new Document().append("result", false).append("errmsg", "无该用户！");
//		}else{
//			inf.put("id", inf.get("_id").toString());
//			inf.remove("_id");
//			Document r = new Document();
//			r.put("result", encryptDoc(inf));
//			inf.remove("password");
//			return r;
//		}
//	}
//	@ApiOperation(value = "信息员修改密码", notes = "信息员修改密码")
//	@RequestMapping(value = "/updatePwd", method = RequestMethod.POST, produces = defaultProduces)
//	public Document updatePwd(String parameters) {
//		Document map = decryptDocument(parameters);
//		String id = map.getString("id");
//		if(St.isEmpty(id)){
//			return new Document().append("result", false).append("errmsg", "id为空！");
//		}
//		String oldpwd = DES.encrypt(map.getString("oldpwd"));
//		String newpwd = DES.encrypt(map.getString("newpwd"));
//		MassUser inf = service.findOneBeanById(id, MassUser.class);
//		if(inf == null){
//			return new Document().append("result", false).append("errmsg", "无该用户！");
//		}else{
//			if(oldpwd.equals(inf.getPassword())){
//				inf.setPassword(newpwd);
//				return new Document().append("result", service.updateOneBeanById(inf));
//			}else{
//				return new Document().append("result", false).append("errmsg", "旧密码输入不正确！");
//			}
//		}
//	}
//	@ApiOperation(value = "推荐码检验", notes = "推荐码检验")
//	@RequestMapping(value = "/checkCode", method = RequestMethod.POST, produces = defaultProduces)
//	public Document checkCode(String parameters) {
//		Document map = decryptDocument(parameters);
//		Document resultMap = new Document();
//		boolean result = false;
//		String code = map.getString("code");
//		if(St.notEmpty(code)){
//			
//		}
//		resultMap.put("result", result);
//		return resultMap;
//	}
//	
//	@ApiOperation(value = "获取下属信息员", notes = "获取下属信息员")
//	@RequestMapping(value = "/getInforOffList", method = RequestMethod.POST, produces = defaultProduces)
//	public Document getInforOffList(String parameters) {
//		Document map = decryptDocument(parameters);
//		Document resultMap = new Document();
//		if(map.containsKey("code")){
//			Document query = new Document();
//			Common.queryEq(query, "code", map.getString("code"));
//			Document orderBy = new Document("updateTime", -1);
//			Document keys = Common.queryKeys("realName", "sex", "mobile", "address", "status");
//			List<Document> list = service.searchQueryOrderKeys(query, orderBy, keys, MassUser.class);
//			for (Document doc : list) {
//				String id = doc.get("_id").toString();
//				doc.put("id", id);
//			}
//			resultMap.put("result", true);
//			resultMap.put("data", list);
//			Document r = new Document();
//			r.put("result", encryptDoc(resultMap));
//			return r;
//		}else{
//			resultMap.put("result", false);
//			resultMap.put("errmsg", "邀请码为空！");
//			return resultMap;
//		}
//	}
//	
//	
//	
//}
