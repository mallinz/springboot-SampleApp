var sessionWarn = 0;// Warning for Session Expire.
var sessionExpireMin_Ms = 300000; // 5 minutes = 300000 milliseconds.
var sessionExpireSec_Ms = 10000; // 10 seconds = 10000 milliseconds.
var sessionExpireMs = 0;

var sessionExpireMin = 5; // 5 minutes.
var sessionExpireSec = 15; // 10 seconds.
var sessionIntervalSec = 0;
var sessionIntervalMilliSec = 0;
var resetFor = "seconds";
//var resetFor = "minutes";
function calcSessionTimeOut(sessionIntervalSeconds) {
	sessionIntervalSec = sessionIntervalSeconds;
	if (sessionIntervalSec != undefined) {
		if (resetFor == 'seconds') {
			// sessionIntervalSeconds = 60 seconds (1 minutes)
			// sessionIntervalMilliSec = 60000 milliseconds.
			sessionIntervalMilliSec = sessionIntervalSec * 1000;
			if (sessionIntervalMilliSec != 0) {
				// sessionExpireSec_Ms = 10000; (10 seconds = 10000 milliseconds.)
				if (sessionIntervalMilliSec > sessionExpireSec_Ms) {
					sessionWarn = sessionIntervalMilliSec - sessionExpireSec_Ms;
				}
			}
			sessionExpireMs = sessionExpireSec_Ms;
		} else if (resetFor == 'minutes') {
			// sessionIntervalSeconds = 1800 seconds (30 minutes)
			// sessionIntervalMilliSec = 1800000 milliseconds.
			sessionIntervalMilliSec = sessionIntervalSec * 1000; 
			if (sessionIntervalMilliSec != 0) {
				// sessionExpireMin_Ms = 300000; (5 minutes = 300000 milliseconds.)
				if (sessionIntervalMilliSec > sessionExpireMin_Ms) {
					sessionWarn = sessionIntervalMilliSec - sessionExpireMin_Ms;
				}
			}
			sessionExpireMs = sessionExpireMin_Ms;
		}
	}
}
function getNewSubmitForm()
{
	var submitForm = document.createElement("FORM");
	document.body.appendChild(submitForm);
	submitForm.method = "POST";
	return submitForm;
}

function callMenuAction(action)
{
	var menuForm=getNewSubmitForm();
	menuForm.action= action;
	menuForm.submit();
}
