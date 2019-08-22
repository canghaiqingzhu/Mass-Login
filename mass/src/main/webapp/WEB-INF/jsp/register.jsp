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
	<title>注册</title>
	<style type="text/css">  	
	
	</style>
</head>
<body>
	<div class="main-r-body">
		<div class="main-title metallicLuster">一体化公众登录平台&nbsp;&nbsp;·&nbsp;&nbsp;注册&nbsp;</div>
		<form class="register100-form validate-form">
			<span class="register100-form-title p-b-10">注册</span>
		
			<div class="wrap-input100 validate-input m-b-10" data-validate="请输入用户名">
				<span class="label-input100">用户名</span>
				<input class="input100" type="text" name="realName" placeholder="请输入用户名" autocomplete="off">
				<span class="focus-input100" data-symbol="&#xf206;"></span>
			</div>
	
			<div class="wrap-input100 validate-input m-b-10 sexdiv" data-validate="请选择性别">
				<span class="label-input100">性别</span>
				<div class="input100 RadioStyle leftdi">
					<input type="radio" name="sex" id="sexNan" checked value="男"/>
					<label for="sexNan">男</label>
					<input type="radio" name="sex" id="sexNv" value="女"/>
					<label for="sexNv">女</label>
				</div>
				<span class="focus-input100" data-symbol="&#XF211;"></span>
			</div>
			
			<div class="wrap-input100 validate-input m-b-10" data-validate="请输入手机号">
				<span class="label-input100">手机号</span>
				<input class="input100" type="text" name="mobile" placeholder="请输入手机号">
				<span class="focus-input100" data-symbol="&#xf2cc"></span>
			</div>
			
			<div class="wrap-input100 validate-input m-b-10" data-validate="请输入密码">
				<span class="label-input100">密码</span>
				<input class="input100" type="password" name="password" placeholder="请输入密码">
				<span class="focus-input100" data-symbol="&#xf190;"></span>
			</div> 
			
			<div class="wrap-input100 validate-input" data-validate="请再次输入密码">
				<span class="label-input100">重复密码</span>
				<input class="input100" type="password" name="pass" placeholder="请再次输入密码">
				<span class="focus-input100" data-symbol="&#xf190;"></span>
			</div>
	
			<div class="wrap-input100 validate-input" data-validate="请输入推荐码">
				<span class="label-input100">推荐码</span>
				<input class="input100" type="text" name="code" placeholder="请输入推荐码">
				<span class="focus-input100" data-symbol="&#XF256;"></span>
			</div>
			
			<div class="wrap-input100 validate-input" data-validate="请输入社区名">
				<span class="label-input100">社区名</span>
				<input class="input100" type="text" name="community" placeholder="请输入社区名">
				<span class="focus-input100" data-symbol="&#XF133;"></span>
			</div>
			
			<div class="wrap-input100 validate-input" data-validate="请输入常住地址">
				<span class="label-input100">常住地址</span>
				<input class="input100" type="text" name="address" placeholder="请输入常住地址">
				<span class="focus-input100" data-symbol="&#XF175;"></span>
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
					<div class="register100-form-bgbtn"></div>
					<div class="register100-form-btn">注册</div>
				</div>
			</div>
		</form>
	</div>
</body>
<script src="/js/public/jquery/jquery-3.2.1.min.js"></script>
	<script>
$(function(){
	var input = $('.register100-form .validate-input .input100');
	$(".register100-form-btn").click(function(){
		var check = true;
		$.each(input,function(i,item){ 
			//console.log(i, item); 
			//alert($(item).attr("name"))
			if(check && $(item).attr("name") != undefined && validate(item) == false){
				showValidate(item);
				check = false;
			}else{
				hideValidate(item);
			}
		}); 
	});
	
});
function validate (input) {
    if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
    if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        return false;
    	}
    }else {
    	if($(input).val().trim() == ''){
            return false;
        }
    }
}

function showValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass('alert-validate');
}
	</script>
</html>