	var sessionActionTimeReset = 0;
    var showSessionConfirmTimeReset = 0;
	var expireTime = 0;
	var myObject= new Object();
	var sessionInvalidateURL;
	function timeCheck() {
		var currDate = new Date();
		var expireDate = new Date();
		if (resetFor == 'seconds') {
			expireDate.setSeconds(currDate.getSeconds() + sessionExpireSec);
		} else if (resetFor == 'minutes') {
			expireDate.setMinutes(currDate.getMinutes() + sessionExpireMin);
		}
		var timePhase;
		if(expireDate.getHours() > 11){
			timePhase = "PM";
		} else {
			timePhase = "AM";
		}
		expireTime = expireDate.getHours() + ':' + expireDate.getMinutes() + ':' + expireDate.getSeconds();
						//+ ' ' + timePhase;
		//return expireTime;
	}
   /* var panel;
    function displayPanel() {
        panel = new YAHOO.widget.Panel(
            "panel", // The element id
            {
                width: "480px", 
                fixedcenter: true, 
                close: false, 
                draggable: false, 
                zindex: 4,
                modal: true,
                visible: false
            }
        );
        panel.setBody(
            "Your session will expire at " + expireTime + " unless you say OK." +
            "<br/><br/><button id=\"ok\">OK</button>"
        );
        panel.render(document.body);
        panel.show();
        YAHOO.util.Event.addListener("ok", "click", reActivateSession);
    }*/
	var dialogActive;
	var sessionPopupWindow;
	var sessionWinFeatures = "location=no,menubar=no,scrollbars=no,status=no,titlebar=no,resizable=no,width=505,height=123,directories=no,scrollbars=no";
	var window_focus = true;
	window.onblur = function() { window_focus = false; }
	window.onfocus = function() { window_focus = true; }
	function showSessionConfirm() {
		dialogActive = true;
		timeCheck();
		if (document.getElementById("expireTime") != undefined) {
			document.getElementById("expireTime").innerHTML = expireTime;
		}
		//displayPanel();
		//var returnValue = window.showModalDialog("/vmm/sessionReset.do", "", "dialogHeight:600px; dialogLeft:200px; dialogWidth:600px; scroll:no; help:no;resizable:no; status:no;");
		if(window_focus)
		{
			displaySessionModal();
		}
		if (!window_focus) {
			//myObject.action="secure/sessionPopup.do";
			//sessionPopupWindow = window.open("../dialog.jsp", "SessionWindow", sessionWinFeatures);
			//sessionPopupWindow.moveTo(330,230);
			//sessionPopupWindow.focus();		
		}
		sessionActionTimeReset = clearTimeout(sessionActionTimeReset);
		showSessionConfirmTimeReset = clearTimeout(showSessionConfirmTimeReset);
		sessionActionTimeReset = setTimeout('sessionAction()',sessionExpireMs);
	}
	function sessionExpireTime() {
		timeCheck();
		if (document.getElementById("popupExpireTime") != undefined) {
			document.getElementById("popupExpireTime").innerHTML = expireTime;
		}
	}
	function sessionPopup() {
		//alert('111');
		if (undefined != window.opener) {
			window.opener.reActivateSession();
		}
	}
	function reActivateSession() {
		//panel.hide();
		//alert(sessionPopupWindow);
		//alert('reactivate');
		if (sessionPopupWindow != undefined && sessionPopupWindow.closed == false) {
			sessionPopupWindow.close();	
		}
		hideSessionModal();
		sessionActionTimeReset = clearTimeout(sessionActionTimeReset);
		showSessionConfirmTimeReset = clearTimeout(showSessionConfirmTimeReset);
		showSessionConfirmTimeReset = setTimeout('showSessionConfirm()',sessionWarn);
		dialogActive = false;
		var transaction = YAHOO.util.Connect.asyncRequest('POST', 'sessionReset.do', sessionCallback, null);
	}
	var sessionCallback =
	{   
  			  success: function(o){},
  			  failure: function(o){}
	}
	function sessionAction() {
		//alert(sessionPopupWindow);
		if (sessionPopupWindow != undefined && sessionPopupWindow.closed == false) {
			sessionPopupWindow.close();	
		}
		if (dialogActive) {
			callMenuAction(sessionInvalidateURL);
		}
	}
	function setInitialTimeOut(sessionMaxInterval) {
		calcSessionTimeOut(sessionMaxInterval);
		showSessionConfirmTimeReset = setTimeout('showSessionConfirm()',sessionWarn);
	}

	/*window.onbeforeunload = closeSessionPopup();*/

	/*function closeSessionPopup() {
	  //alert('111');
	  if (sessionPopupWindow && sessionPopupWindow.open && !sessionPopupWindow.closed) { 
		  sessionPopupWindow.close();
	  }
	  var iX = window.document.body.offsetWidth - window.event.clientX ;
	  var iY = window.event.clientY ;
	  if (iX <=30 && iY < 0 )
	  {
		  // this means the user clicked the X button, do whatever you want to do here
		  alert('123');
	  }
	}*/
	/*var iX = window.document.body.offsetWidth - window.event.clientX ;
	var iY = window.event.clientY ;

	if (iX <=30 && iY < 0 )
	{
	// this means the user clicked the X button, do whatever you want to do here
	}
		*/