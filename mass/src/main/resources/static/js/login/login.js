(function ($) {
    "use strict";

	var SlideVerifyPlug = window.slideVerifyPlug;
	//verify-wrap
	var slideVerify = new SlideVerifyPlug('#verify-wrap',{
	    initText:'请拖动滑块到最右端完成验证',
	    sucessText:'验证通过',
	});
	$('.login-to-register').hover(function(){
		// 鼠标移入时添加hover类
		//$(this).children("img").addClass('move-to-right');
		$(this).children("img").css({"transform":"translate3d(65px, 0px, 0px)","transition":"transform 0.5s linear 0s"});
	}, function() {
		// 鼠标移出时移出hover类
		$(this).children("img").css({"transform":"translate3d(0px, 0px, 0px)","transition":"transform 0.5s linear 0s"});
	});
	$('.register-back-login').hover(function(){
		// 鼠标移入时添加hover类
		//$(this).children("img").addClass('move-to-right');
		$(this).children("img").css({"transform":"translate3d(-65px, 0px, 0px)","transition":"transform 0.5s linear 0s"});
	}, function() {
		// 鼠标移出时移出hover类//.parent()
		$(this).children("img").css({"transform":"translate3d(0px, 0px, 0px)","transition":"transform 0.5s linear 0s"});
	});
 /*==================================================================
[ Focus input ]*/
$('.input100').each(function(){
$(this).on('blur', function(){
    if($(this).val().trim() != "") {
        $(this).addClass('has-val');
    }
    else {
        $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
[ Validate ]*/
    
    $(".register100-form-btn").on('click',function(){
    	alert();
    });
   $(".login100-form").on('submit',function(){
	   var input = $('.login100-form .validate-input .input100');
	   var check = true;
	   for(var i=0; i<input.length; i++) {
	        if(validate(input[i]) == false){
	            showValidate(input[i]);
	            check=false;
	            slideVerify.resetVerify();
	        }
	    }
	   if(check){
		   check = slideVerify.slideFinishState;
		   if(!check){
			   alert("请先滑动认证！");
		   }
	    }
	   return check;
   });
/*var input = $('.validate-input .input100');

$('.validate-form').on('submit',function(){
    var check = true;
    var $username = $('login100-form input[name="username"]');
    if(validate($username[i]) == false){
        showValidate($username[i]);
        check=false;
    }
    var $password = $('login100-form input[name="password"]');
    if(check && validate($password[i]) == false){
        showValidate($password[i]);
        check=false;
    }
//    for(var i=0; i<input.length; i++) {
//        if(validate(input[i]) == false){
//            showValidate(input[i]);
//            check=false;
//        }
//    }
    alert(check);
    if(check){
    	check = slideVerify2.slideFinishState;
    }
    alert(check);
    if(!check){
    	slideVerify2.resetVerify();//重置滑动验证
    }
    return check;
});


$('.validate-form .input100').each(function(){
    $(this).focus(function(){
       hideValidate(this);
    });
});*/
function loginToMass(){
	alert();
	return false;
}
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
    
})(jQuery);

function showRegister(){
	$(".wrap-register100").show();
	$(".wrap-login100").hide();
}
function showLogin(){
	$(".wrap-register100").hide();
	$(".wrap-login100").show();
}

function showAgreement(){
	$('input[name="agreement"]').attr('checked',"true");
}