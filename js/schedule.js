/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50, multistr:true */
/* global pngfix:true, updateBackground:true, headerImages:true, currentImage:true */
/* exported ScheduleObject */
var ScheduleObject = {
	intervalTimer: 0,
	
	onLoad: function(){
		"use strict";
		var imageName;

		$("#upcomingEvents").show();
		$("#previousEvents").hide();
		$("#navPrevious").css("color","darkgray"); 

		$("#navUpcoming").click(function() { 
			$("#previousEvents").hide(); $("#upcomingEvents").show(); $("#navPrevious").css("color","darkgray"); $("#navUpcoming").css("color","white");
		});
		$("#navPrevious").click(function() { 
			$("#upcomingEvents").hide(); $("#previousEvents").show(); $("#navUpcoming").css("color","darkgray"); $("#navPrevious").css("color","white");
		});

		if (typeof pngfix !== "undefined") { 
			pngfix();
		}

		imageName = "url(images/header/" + headerImages[currentImage][0] + ".jpg)";
		$("#row-2").css("backgroundImage",imageName);
		document.getElementById("DivMainPhotoCredit").firstChild.nodeValue =  headerImages[currentImage][1];
		this.intervalTimer = setInterval(updateBackground,20000);
	},

	onUnload: function() {
		"use strict";
		clearInterval(this.intervalTimer);
	}

};


