<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<meta name="keywords" content="" />
	<meta name="description" content="" /> 
	<link rel="shortcut icon" href="/images/favicon.ico" >
	<link rel="stylesheet" type="text/css" href="/css/main/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css">
	<link rel="stylesheet" type="text/css" href="/css/login/style.css">
	<title>登录</title>
	<style type="text/css">  	
	.rnav{
		position:fixed;
		top:5%;
		right:5%;
		width:auto;
		height:60px;
		z-index:99;
	}
	.navitem{
		margin:5px;
		width:50px;
		height:50px;
		font-size:6px;
		text-align:center;
		cursor:pointer;
		border-radius:10px;
		box-shadow:8px 9px 8px 0 rgba(0, 0, 0, 0.2), 20px 18px 20px 0 rgba(0, 0, 0, 0.19);
	}
	.navitem:hover{
		background:grey;
		color:white;
	}
	</style>
</head>
<body>
	<div class="main-body colcen">
		<div class="rnav rowcen">
			<div class="navitem clocen">
				<img src="images/fangcode.png"/>
				<div>APP下载</div>		
			</div>
			<div class="navitem clocen">
				<img src="images/register.png"/>
				<div>用户注册</div>		
			</div>
		</div>

		<div class="main-title metallicLuster">一体化公众登录平台</div>
		<div class="login-div-register rowcen">
			<img src="images/leftimg.jpg" />
			<div class="wrap-login100">
				<form class="login100-form validate-form" action="auth/login" method="post">
					<!-- <div class="login-to-register">
						<img src="images/imgxmarkxright.png" onclick="showRegister()"/>
						<a href="javascript:showRegister();" class="txt2" style="font-size: 12px;">注册</a>
					</div>  -->
					<span class="login100-form-title p-b-30">登录</span>
					<div class="wrap-input100 validate-input m-b-23" data-validate="请输入用户名">
						<input class="input100" type="text" name="username" placeholder="请输入用户名" autocomplete="off">
						<span class="focus-input100" data-symbol="&#xf206;"></span>
					</div>
					<div class="wrap-input100 validate-input m-b-23" data-validate="请输入密码">
						<input class="input100" type="password" name="password" placeholder="请输入密码">
						<span class="focus-input100" data-symbol="&#xf190;"></span>
					</div>
					<div style="margin: 0 auto;margin-top: 23px;">
						<div class="verify-wrap" id="verify-wrap"></div>
					</div>
					<div class="text-right p-t-8 p-b-31">
						<a href="javascript:">忘记密码？</a>
					</div>
					<div class="container-login100-form-btn" style="margin-top: 23px;">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn">登  录</button>
						</div>
					</div>
				</form>
			</div>
			<div class="wrap-register100">
				<form class="register100-form validate-form">
				<!--  action="auth/register" method="post" -->
					<div class="register-back-login" onclick="showLogin()">
						<a href="javascript:showLogin();" class="txt2" style="font-size: 12px;">登录</a>
						<img src="images/imgxmarkxleft.png" />
					</div> 
					
					<span class="register100-form-title p-b-10">注册</span>
				
					<div class="wrap-input100 validate-input m-b-10" data-validate="请输入用户名">
						<input class="input100" type="text" name="username" placeholder="请输入用户名" autocomplete="off">
						<span class="focus-input100" data-symbol="&#xf206;"></span>
					</div>
			
					<div class="wrap-input100 validate-input m-b-10" data-validate="请输入手机号">
						<input class="input100" type="text" name="phone" placeholder="请输入手机号">
						<span class="focus-input100" data-symbol="&#xf2cc"></span>
					</div>
					
					<div class="wrap-input100 validate-input m-b-10" data-validate="请输入密码">
						<input class="input100" type="password" name="password" placeholder="请输入密码">
						<span class="focus-input100" data-symbol="&#xf190;"></span>
					</div> 
					
					<div class="wrap-input100 validate-input" data-validate="请再次输入密码">
						<input class="input100" type="password" name="pass" placeholder="请再次输入密码">
						<span class="focus-input100" data-symbol="&#xf190;"></span>
					</div>
			
					<div class="text-left p-t-8 p-b-31">
						<label>
							<input type="checkbox" name="agreement" style="position: relative;top:2px;">
							&nbsp;
							<a href="javascript:showAgreement();">《注册协议》</a>
						</label>
					</div>
			
					<div class="container-register100-form-btn">
						<div class="wrap-register100-form-btn">
							<div class="register100-form-bgbtn" style="min-height:50px;"></div>
							<button class="register100-form-btn">注册</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="main-end">
			建议使用360浏览器极速模式、chrome谷歌浏览器或IE9.0以上浏览器访问达到最佳效果
		</div>
	</div>
</body>
<script src="/js/public/jquery/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="js/login/jq-slideVerify.js"></script> 
<script type="text/javascript" src="js/login/login.js"></script> 
</html>