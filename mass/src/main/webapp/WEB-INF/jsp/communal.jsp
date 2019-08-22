<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.jihua.attr.GlobalConfigure"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<base href="<%=GlobalConfigure.BASEPATH%>" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta charset="UTF-8">
<meta name="renderer" content="webkit">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="js/public/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="js/public/layer/skin/layer.css">
<link rel="stylesheet" href="css/main/communal.css">
<link rel="stylesheet" href="js/public/bootstrap/3.3.7/css/bootstrap-switch.min.css">
<script src="js/public/jquery/jquery-3.1.1.min.js"></script>
<script src="js/public/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="js/public/layer/layer.js"></script>
<script src="js/public/public/publicFunc.js"></script>
<script src="js/public/bootstrap/3.3.7/js/bootstrap-switch.min.js"></script>
<script src="js/main/showMenu.js"></script>
</head>
<body>
  <ol class="breadcrumb" id="showMenu" style="margin-bottom: 0; font-size: 12px; text-align: right; background-color: inherit;">
  </ol>
  <jsp:include page="${param.includePage}" flush="true"></jsp:include>
</body>
</html>