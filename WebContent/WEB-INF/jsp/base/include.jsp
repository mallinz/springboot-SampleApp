
<!-- Contains taglib's used in the application  -->
<%@ taglib prefix="form" uri="/WEB-INF/taglib/spring-form.tld"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib prefix="spring" uri="/WEB-INF/taglib/spring.tld"%>

<c:set var="contextPath" value="<%=request.getContextPath()%>" />

<!--  Consists of all the common css files -->
<link rel="stylesheet" href="${contextPath}/css/screen.css" type="text/css">
<link rel="stylesheet" href="${contextPath}/css/dropdown.css" type="text/css" />
<link rel="stylesheet" href="${contextPath}/css/jquery-min.10.2.2.css" type="text/css" />

<script type='text/javascript' src='<%= org.webjars.AssetLocator.getWebJarPath("jquery.min.js") %>'></script>

<!--  JQueryUI files -->
<script src="${contextPath}/jquery/jquery-ui.js" type="text/javascript"></script>
<script src="${contextPath}/jquery/jquery.ui.mouse.js" type="text/javascript"></script>
<script src="${contextPath}/jquery/jquery.ui.position.js" type="text/javascript"></script>
<script src="${contextPath}/jquery/jquery.ui.widget.js" type="text/javascript"></script>
<script src="${contextPath}/jquery/jquery.jstree.js" type="text/javascript"></script>
<script src="${contextPath}/jquery/jquery-min-10.2.js" type="text/javascript"></script>

<!--  
<script src="${contextPath}/jquery/jquery.tree.checkbox.js" type="text/javascript"></script>    
-->

<!--  Target UI Standard files -->
<script src="${contextPath}/js/main.js" type="text/javascript"></script>
<script src="${contextPath}/js/common.js" type="text/javascript"></script>
<script src="${contextPath}/js/custom-form-elements.js" type="text/javascript"></script>
