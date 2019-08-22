package com.jihua.auth.bean;

import java.util.Date;

import org.bson.types.ObjectId;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MassUser {
	/** 用户角色id **/
	private ObjectId _id;
	/** 用户名称 **/
	private String realName;
	/** 登录名 **/
	private String loginName;
	/** 登录名 **/
	private Integer loginNameInt;
	/** 密码 **/
	private String password;
	/** 性别 **/
	private String sex;
	/** 手机号码 **/
	private String mobile;
	/** 地址 **/
	private String address;
	/** 角色 **/
	private String roleId;
	/** 用户状态 **/
	private String status;
	/** 更新时间 **/
	private Date startTime;
	/** 更新时间 **/
	private Date updateTime;
	/** 更新时间 **/
	private Date endTime;
	/** 邀请码 **/
	private String code;
	/** 社区 **/
	private String community;
}
