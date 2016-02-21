<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>

<head> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<%@ include file="include.jsp"%>        
<c:set var="pageId" scope="request"><decorator:getProperty property="meta.pageId"/></c:set>
<title><decorator:title default="Billing Application" /></title> 
</head>    
     
<body>   
	 <div id="wrapper">        	 
    <%@include	file="../navigation/header.jsp" %>     
       
        <div id="page_content">
        	<%-- <div class="menus">
                <%@include	file="../navigation/menu.jsp"%>
            </div><!--menus--> --%>
            <decorator:body />
        </div><!--page_content-->        
    </div><!--wrapper--> 
    <div id="footer">
        <%@include	file="../navigation/footer.jsp"%>
    </div><!--footer-->
</body>
</html>

