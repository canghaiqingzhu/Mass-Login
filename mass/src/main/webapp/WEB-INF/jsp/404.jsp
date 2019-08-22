<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isErrorPage="true"%>
<%@ page import="com.jihua.attr.GlobalConfigure"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <base href="<%=GlobalConfigure.BASEPATH%>" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>404错误</title>
    <link rel="stylesheet" href="css/error/style.css">
    <script src="js/public/jquery/jquery-3.1.1.min.js"></script>
    <!-- <script src="js/main/error.js"></script> -->
  </head>
  <body>
    <img class="find" src="images/404.png">
    <div class="btnbox-404">
      <div class="button1-404"><a href="javascript:void(0);" onclick="returnHome()">返回系统首页</a></div>
      <div class="button2-404"><a href="javascript:void(0);" onclick="returnPrevious()">返回上一页</a></div>
      <div class="clearfix"></div>
    </div>
  </body>
</html>