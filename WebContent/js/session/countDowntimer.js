var sec = 10;   // set the seconds
var min = 00;   // set the minutes
var SD;


function setTimeForSession(){
	sec=10;
	min=00;
}


function countDown() {
   sec--;
  if (sec == -01) {
   sec = 59;
   min = min - 1; }
  else {
   min = min; }

if (sec<=9) { sec = "0" + sec; }

  time = (min<=9 ? "0" + min : min) + " min and " + sec + " sec ";

if (document.getElementById) { document.getElementById('theTime').innerHTML = time; }

SD=window.setTimeout("countDown();", 1000);
if (min == '00' && sec == '00') { sec = "00"; window.clearTimeout(SD); }
}

function clearTimeoutForSession(){
	window.clearTimeout(SD);
}