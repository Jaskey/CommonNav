# CommonNav
构造页面通用的悬浮导航菜单

##Dependencies##
jQuery

##How to use##

	<link rel="stylesheet" type="text/css" href="yourpath/CommonNav.css" /><!--定义css-->
	<!--引入jQuery后，引入js-->
    <script src="yourpath/CommonNav.js"></script>

	<body>

		<!--在需要导航的模块中，1. 定义id, 2定义nav属性（显示于导航目录）-->	
		<div id="module1" nav="导航项1"></div>
		<div id="module2" nav="导航项2"></div>
		<div id="module3" nav="导航项3"></div>


	    $(function () {
			navbox();//直接调用
		}

	</body>



