var MediaObject = {
	mediaNames		: [],
	nextClip		: 0,
	audioPlayer		: null,
	ytPlayer		: [],
	ytPlayerReady 	: [false,false],
	numbVideoPlayers: 2
};


MediaObject.buttonFunctions = function() {
	"use strict";

	$("a.mediaButton").each(function(index) {
		$(this).unbind("click");
		$(this).click(function() {

			MediaObject.nextClip = index;
			
			var isAudioPlaying = function() {
				return !MediaObject.audioPlayer.paused && !MediaObject.audioPlayer.ended && 0 < MediaObject.audioPlayer.currentTime;
			};
			
			var isVideoPlaying = function(player) {
				var retValue = false;
				var ytPlayerState = false;
				
				if (MediaObject.ytPlayerReady[player] === true) {
					ytPlayerState = MediaObject.ytPlayer[player].getPlayerState();
					retValue =  ytPlayerState !== -1 && ytPlayerState !== 0 && ytPlayerState !== 2;
				}					
				
				return retValue;
			};
			
			var startVideoPlayer = function(player) {
				MediaObject.ytPlayer[player].seekTo(0);
				MediaObject.ytPlayer[player].setVolume(MediaObject.mediaNames[MediaObject.nextClip][1]);
				MediaObject.ytPlayer[player].playVideo();
			};

			var startAudioPlayer = function() {
				MediaObject.audioPlayer.src = "audio/" + MediaObject.mediaNames[MediaObject.nextClip][0];
				MediaObject.audioPlayer.volume = MediaObject.mediaNames[MediaObject.nextClip][1]/100;
				MediaObject.audioPlayer.load();
				MediaObject.audioPlayer.play();
			};
		
			if (isAudioPlaying() === true) {
				MediaObject.audioPlayer.pause();
			}

			for (var i = 0;i < MediaObject.numbVideoPlayers;i++) {
				if (isVideoPlaying(i) === true) {
					MediaObject.ytPlayer[i].pauseVideo();
				}				
			}

			if (MediaObject.mediaNames[MediaObject.nextClip][0].indexOf("youtube") !== -1) {
				var player = parseInt(MediaObject.mediaNames[MediaObject.nextClip][0].substring(7)) - 1;
				var playerDiv;
				for (i = 0;i < MediaObject.numbVideoPlayers;i++) {
					playerDiv = "#DivYouTube" + (i+1);
					if (i !== player) {
						$(playerDiv).hide();
					}
					else {
						$(playerDiv).show();
					}
				}
				$("#DivInnerMediaPlayer").hide();
				if (MediaObject.ytPlayerReady[player] !== false) {
					startVideoPlayer(player);
				}
				else {
					//player finishes loading only when visible in FireFox and IE
					//This gives it time to load since it starts out hidden
					var timerId = setInterval(
						function() {
							if (MediaObject.ytPlayerReady[player] === true) {
								clearInterval(timerId);
								startVideoPlayer(player);
							}
						},
						100);
				}
			}
			else {
				$("div.youtube").hide();
				$("#DivInnerMediaPlayer").show();

				startAudioPlayer();
			}
		});
	});
	
	$("img.img-thumbnail").each(function(index) {
		$(this).unbind("click");
		$(this).click(function() {
			updateBackground(index+1);
		});
	});	
};

MediaObject.onLoad = function() {
	"use strict";

	var i = 0;
	
	if (typeof pngfix !== "undefined") { 
		pngfix();
	}

	if ($.browser.chrome) {
		$("#audioPlayer").css("border","none");
	}
		

	updateBackground(currentImage);	
   
	MediaObject.mediaNames[i++]  = ["youtube2",75,"show"];
	MediaObject.mediaNames[i++]  = ["Vissi d'arte.mp3",50,"show"];
	MediaObject.mediaNames[i++]  = ["youtube1",75,"show"];
	MediaObject.mediaNames[i++]  = ["Dich, teure Halle.mp3",50,"show"];
	MediaObject.mediaNames[i++]  = ["Die Walkure Excerpt1.mp3",50,"show"];
	MediaObject.mediaNames[i++]  = ["Die Walkure Excerpt2.mp3",50,"show"];
	MediaObject.mediaNames[i++]  = ["Voi lo sapete.mp3",50,"show"];
	MediaObject.mediaNames[i++]  = ["It's time to go, my love.mp3",50,"hide"];
	MediaObject.mediaNames[i++]  = ["Old man, fearful man.mp3",50,"show"];
	MediaObject.mediaNames[i++]  = ["Or sai chi l'onore.mp3",15,"hide"];
	MediaObject.mediaNames[i++]  = ["Non mi dir.mp3",25,"hide"];
	MediaObject.mediaNames[i++]  = ["Dove sono.mp3",50,"hide"];
	MediaObject.mediaNames[i++]  = ["Porgi amor.mp3",50,"hide"];
	MediaObject.mediaNames[i++]  = ["Tosca Act 2.mp3",50,"show"];
	MediaObject.mediaNames[i++]  = ["Il tuo sangue.mp3",50,"show"];
	MediaObject.mediaNames[i++]  = ["Embroidery Aria.mp3",50,"hide"];
	
	MediaObject.audioPlayer = document.getElementById("audioPlayer");
	MediaObject.buttonFunctions();

};

MediaObject.onUnload = function() {
	"use strict";
	clearInterval(intervalTimer);
	
};

MediaObject.onPlayerReady1 = function() {
	"use strict";
	MediaObject.ytPlayerReady[0] = true;
};

MediaObject.onPlayerReady2 = function() {
	"use strict";
	MediaObject.ytPlayerReady[1] = true;
};

function onYouTubeIframeAPIReady() {
	"use strict";
	MediaObject.ytPlayer[0] = new YT.Player('youtubeplayer1', {
	  height: '315',
	  width: '524',
	  videoId: 'vAeYvTWbhA8',
	  events: {	'onReady': MediaObject.onPlayerReady1 }
	});
	MediaObject.ytPlayer[1] = new YT.Player('youtubeplayer2', {
	  height: '315',
	  width: '524',
	  videoId: 'EHckD7jpX1A',
	  events: {	'onReady': MediaObject.onPlayerReady2 }
	});
}
