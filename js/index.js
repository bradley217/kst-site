/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50, multistr:true */
/* global pngfix:false, updateBackground:false, headerImages:false, currentImage:true, twttr:false */
/* exported IndexObject */
var IndexObject = {
	intervalTimer: 0,

	onLoad: function() {
		"use strict";
		var imgHeadShot = new Image();
		var imageName;
		
		imgHeadShot.src = "images/HS1-030711-small.jpg";

		if (typeof pngfix !== "undefined") { 
			pngfix();
		}
	
		twttr.ready(function (twttr) {
			twttr.events.bind("rendered", function() {
				var height = $(".col-2").height();
				$(".col-1").height(height);
			});					
		});

		if ($.browser.chrome /*|| $.browser.edge*/) {
			if ($.browser.chrome) {
				$(".smallAudioPlayer").css("height","32px").css("width","216px").css("border","none").css("margin","2px 0 0 15px");
			}
			setTimeout(function() {
				var height = $(".col-2").height();
				$(".col-1").height(height);
			},500);
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
