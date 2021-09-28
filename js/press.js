/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50, multistr:true */
/* global pngfix:true, updateBackground:true, currentImage:true */
/* exported PressObject */
var PressObject = {
	currentReview: 0,
	lastReview: 24,
	reviews: [],
	
	initReviewArray: function() {
		"use strict";
		var i = 0;
	
		this.reviews[i++] = ["salomePg1","show"];        //0
		this.reviews[i++] = ["turandotPg1","show"];      //1
		this.reviews[i++] = ["turandotPg2","show"];
		this.reviews[i++] = ["toscaPg1","show"];         //3
		this.reviews[i++] = ["toscaPg2","show"];
		this.reviews[i++] = ["toscaPg3","show"];
		this.reviews[i++] = ["toscaPg4","show"];
		this.reviews[i++] = ["toscaPg5","show"];
		this.reviews[i++] = ["agathePg1","show"];        //8
		this.reviews[i++] = ["agathePg2","show"];
		this.reviews[i++] = ["magdaPg1","show"];         //10
		this.reviews[i++] = ["magdaPg2","show"];
		this.reviews[i++] = ["leonorePg1","show"];       //12
		this.reviews[i++] = ["leonorePg2","show"];
		this.reviews[i++] = ["leonorePg3","show"];
		this.reviews[i++] = ["sieglindePg1","show"];     //15
		this.reviews[i++] = ["vanessaPg1","show"];       //16
		this.reviews[i++] = ["womanPg1","show"];         //17
		this.reviews[i++] = ["womanPg2","show"];
		this.reviews[i++] = ["womanPg3","show"];
		this.reviews[i++] = ["santuzzaPg1","show"];      //20
		this.reviews[i++] = ["countessPg1","show"];      //21
		this.reviews[i++] = ["countessPg2","show"];
		this.reviews[i++] = ["balkisPg1","show"];        //23
		this.reviews[i++] = ["zemphiraPg1","show"];      //24
		
		this.lastReview = i-1;
		
		this.reviews[i++] = ["missJesselPg1","hide"];    //25
		this.reviews[i++] = ["adinaPg1","hide"];         //26
		this.reviews[i++] = ["violettaPg1","hide"];      //27
		this.reviews[i++] = ["femaleChorusPg1","hide"];  //28
		this.reviews[i++] = ["femaleChorusPg2","hide"];
		this.reviews[i++] = ["musettaPg1","hide"];       //30
	},
	
	onLoad: function() {
		"use strict";
		var self = this;
		
		if (typeof pngfix !== "undefined") { 
			pngfix();
		}

		this.initReviewArray();
		
		$("#nextButton").click(function() {
			self.loadNextReview();
			return false;
		});

		$("#prevButton").click(function() {
			self.loadPrevReview();
			return false;
		});


		updateBackground(currentImage);	

		$("#"+this.reviews[this.currentReview][0]).show();

		this.handlePageButtons();
	},
	
	onUnload: function() {
		"use strict";
		clearInterval(this.intervalTimer);		
	},
	
	loadReview: function(reviewNumber)	{
		"use strict";
		$("#"+this.reviews[this.currentReview][0]).hide();
		$("#"+this.reviews[reviewNumber][0]).show();
		this.currentReview = reviewNumber;
		this.handlePageButtons();
	},

	loadNextReview: function() {
		"use strict";
		var stop = false;
		$("#"+this.reviews[this.currentReview++][0]).hide();

		while (stop === false) { 	
			if (this.currentReview === this.reviews.length) {
				this.currentReview = 0;
				continue;
			}

			if (this.reviews[this.currentReview][1] === "show") {
				stop = true;
			}
			else {
				this.currentReview++;
			}
		}

		$("#"+this.reviews[this.currentReview][0]).show();

		this.handlePageButtons();
	},

	loadPrevReview: function() {
		"use strict";
		var stop = false;
		$("#"+this.reviews[this.currentReview--][0]).hide();

		while (stop === false) { 
			if (this.currentReview < 0) {
				this.currentReview = this.lastReview;
				continue;
			}

			if (this.reviews[this.currentReview][1] === "show") {
				stop = true;
			}
			else {
				this.currentReview--;
			}
		}

		$("#"+this.reviews[this.currentReview][0]).show();
		this.handlePageButtons();
	},

	handlePageButtons: function() {
		"use strict";
		$("#nextButton").css("display",(this.currentReview >= 0) && (this.currentReview < (this.reviews.length - 1)) ? "inline" : "none");
		$("#prevButton").css("display",(this.currentReview > 0) && (this.currentReview <= (this.reviews.length - 1)) ? "inline" : "none");
	}
};
