
<c:set var="sessionHolder" value="${sessionScope['scopedTarget.sessionHolder']}"></c:set>

<script type="text/javascript">

function billGeneration()
{
	document.forms[0].action = "/bill/estimate.do";
	document.forms[0].method = "post";
	document.forms[0].submit();
}

function totalSales()
{
	document.forms[0].action = "/bill/totalSales.do";
	document.forms[0].method = "post";
	document.forms[0].submit();
}

</script>

<!-- <div class="logo"></div> -->
 <div class="headercls">
 
 <ul class="topnav">
				<li style="width: 80pt"><a href="javascript:billGeneration();"
					class="topnav" style="text-decoration: none;">bill generation</a></li>
				<li style="MARGIN-LEFT: 10pt; width: 70pt;"><a href="javascript:totalSales();" class="topnav"
					style="text-decoration: none;">total sales</a>&nbsp;</li>
	</ul>
	
 
<div class="logout">
						Welcome <c:out value="${sessionHolder.userName}"/> | 
							<a style="cursor: pointer;" onclick="return confirmLogout();"> Logout</a> 
				</div> 
</div><!-- header -->                   
          	