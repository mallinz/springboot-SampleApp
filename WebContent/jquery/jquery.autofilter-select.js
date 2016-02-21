
jQuery.fn.AutoFilterSelect=function(x){x=x||{};
var y={listMaxHeight:200,listItemHeight:20,triggerSelected:false,blankImageSrc:"images/s.gif",unselectedLiColor:"rgb(255, 255, 255)",selectedLiColor:"rgb(223, 232, 246)"};
x=jQuery.extend(x,y);return this.each(function(){
	var f=jQuery(this);
	//added code
	var title=f.attr('title');
	var disabled=f.attr('disabled');
	var width=f.attr('width');
   //rt(width);
	//alert(title);
	//alert(disabled);
	//added code : z073120 July 22 2011
	disabled = false;
	var g=f.wrap("<div>").hide().parent().addClass("combo");
	//alert(g.html());
	if(disabled==false)
		{var leftDiv=jQuery("<div>").addClass("disabledFalseLeft").appendTo(g);}
	else
		{var leftDiv=jQuery("<div>").addClass("disabledTrueLeft").appendTo(g);}

	if(disabled==false)
		{var h=jQuery("<input />").addClass("disabledFalsebg").appendTo(g).attr("autocomplete","off").attr("size","20").attr("value",title);}
	else
		{var h=jQuery("<input />").addClass("disabledTruebg").appendTo(g).attr("autocomplete","off").attr("size","20").attr("value",title);}
	//alert(g.html());
	if(disabled==true){h.attr("disabled","true");}//added code
	h.css({color:"grey"});
	if(disabled==false)
		{var j=jQuery("<img />").addClass("disabledFalseImg").appendTo(g).attr("src",x.blankImageSrc);}
	else
		{var j=jQuery("<img />").addClass("disabledTrueImg").appendTo(g).attr("src",x.blankImageSrc);}

	var k=jQuery("<ul />").appendTo(g).css({display:"none",maxHeight:x.listMaxHeight});
	f.children().each(function(){jQuery("<li />").appendTo(k).text(jQuery(this).text()).css({display:"block",height:x.listItemHeight})});
	var l=k.children();
	if(x.triggerSelected)
		{var m=f.attr("value");f.children().each(function(){var a=jQuery(this);if(a.attr("selected")==true){h.attr("value",a.text())}})}
		var n=function(){var b=$.trim(h.attr("value"));
	f.children().each(function(){var a=jQuery(this);if(a.text()==b){f.attr("value",a.attr("value"));f.trigger("change")}})};
	var o=function(){var a=0;l.each(function(){if("none"==this.style.display){++a}});return a};
	var p=function(){var a={};a.height=(l.get().length-o())*x.listItemHeight;if(a.height>x.listMaxHeight){a.overflowY="scroll"}else{a.overflowY="hidden"}			k.css(a)};
	p();
	
	if(disabled==false){ //added code
	j.bind("click",function(){if("block"==k.get()[0].style.display){k.css({display:"none"})}else{k.css({display:"block"});s()}
					//h.css({color:"black"});
					});
	}
   var q=function(){h.attr("value",jQuery(this).text());/* Commented code: July22 z073120 n();r();k.css({display:"none"}*);*/
        h.css({color:"black"});//added code
        };
	l.bind("click",q);

    //added code
	var defaultTxtRemoveFxn=function(){
		if(h.attr("value")==title){h.attr("value","");
				h.css({color:"black"});
				}
	}
	h.bind("focus",defaultTxtRemoveFxn);
	//added code
	var defaultTxtAddFxn=function(){
		//if(h.attr("value")==title){h.attr("value","")}
		if(!h.attr("value") || !h.attr("value").length) {
      		h.attr("value",title);
			h.css({color:"grey"});
         		}							
	}
	h.bind("blur",defaultTxtAddFxn);
	
	var r=function(){var b=h.attr("value");if(b){b=b.toLowerCase()}l.each(function(){var a=jQuery(this);if(a.text().toLowerCase().search(b)!=0){a.css			({display:"none"})}else{a.css({display:"block"})}});p()};
	h.bind("keyup",function(e){if((13==e.keyCode)||(40==e.keyCode)||(38==e.keyCode)){return}n();r();if(o()<l.get().length){k.css({display:"block"});s()}else{k.css({display:"none"})}});l.bind("mouseover",function(){l.css({backgroundColor:x.unselectedLiColor});jQuery(this).css({backgroundColor:x.selectedLiColor})});var s=function(){try{l.each(function(){if("block"==this.style.display){jQuery(this).trigger("mouseover");throw new Exception();}})}catch(e){}};var t=function(){var a=l.get();for(var i=0,len=a.length;i<len;++i){if(x.selectedLiColor==a[i].style.backgroundColor){return jQuery(a[i])}}return null};jQuery(document).bind("click",function(e){if((k.get()[0]==e.target)||(h.get()[0]==e.target)||(j.get()[0]==e.target)){h.get()[0].focus();return}k.css({display:"none"})});var u=function(){var b=0;try{l.each(function(){var a=jQuery(this);if(x.selectedLiColor==this.style.backgroundColor){b+=parseInt(a.height());throw new Exception();}b+=parseInt(a.height())})}catch(e){}var c=k.get()[0];b-=x.listMaxHeight;if(c.scrollTop<b){c.scrollTop+=b-c.scrollTop}};var v=function(){var a=t();if(!a){return}var b=a.next();while(b.get().length){if("block"==b.get()[0].style.display){l.css({backgroundColor:x.unselectedLiColor});b.css({backgroundColor:x.selectedLiColor});u();return}b=b.next()}};var w=function(){var a=t();if(!a){return}var b=a.prev();while(b.get().length){if("block"==b.get()[0].style.display){b.trigger("mouseover");var c=0;try{l.each(function(){c+=jQuery(this).height();if(x.selectedLiColor==this.style.backgroundColor){c-=jQuery(this).height();throw new Exception();}})}catch(e){}var d=k.get()[0];if(d.scrollTop>=c){d.scrollTop-=d.scrollTop-c}return}b=b.prev()}};h.bind("keypress",function(e){var a=undefined;if((13==e.keyCode)&&(a=t())){q.call(a)}if(40==e.keyCode){v()}if(38==e.keyCode){w()}})})};


	
$(document).ready(function() {
    	
	$('.autoSelect').AutoFilterSelect();
	//$('#autoFilterSelect1').AutoFilterSelect();

	
});

