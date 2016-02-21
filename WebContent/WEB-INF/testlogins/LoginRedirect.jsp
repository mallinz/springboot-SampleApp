<%@ taglib prefix="form" uri="/WEB-INF/taglib/spring-form.tld"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script type="text/javascript" language="javascript">
	function submitForm()
	{
		document.LoginRedirect.submit();
	}
</script>

<form:form name="LoginRedirect" id="LoginRedirect" action="/sample/hello.do">
	<input type="hidden" name="First-Name" value="Navin" />
</form:form>

<script language="javascript" type="text/javascript">
	submitForm();
</script>