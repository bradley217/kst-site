/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50, multistr:true */
/* global pngfix:true, updateBackground:true, headerImages:true, currentImage:true */
/* exported ContactsObject */
var ContactsObject = {
	intervalTimer: 0,
	onLoad: function() {
		"use strict";
		var imageName;

		if (typeof pngfix !== "undefined") { 
			pngfix();
		}

		$("#submitButton").click(function() {
			$("#contactForm").submit();
		});

		$("#clearButton").click(function() {
			$("#contactForm").reset();
		});

		imageName = "url(images/header/" + headerImages[currentImage][0] + ".jpg)";
		$("#row-2").css("backgroundImage",imageName);
		document.getElementById("DivMainPhotoCredit").firstChild.nodeValue =  headerImages[currentImage][1];
		this.intervalTimer = setInterval(updateBackground,20000);
	},
	
	onUnLoad: function() {
		"use strict";
		clearInterval(this.intervalTimer);
	},
};
