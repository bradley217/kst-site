var MediaObject = {
	haveqt		: false,
	browser		: getBrowser(),
	mediaNames	: [],
	nextClip	: 0,
};

var ytplayer;

MediaObject.buttonFunctions = function() {

	startPlayer = function() {
		if (ytplayer == null) {
			ytplayer = document.getElementById('myytplayer');
		}
		ytplayer.seekTo(0);
		ytplayer.setVolume(MediaObject.mediaNames[MediaObject.nextClip][1]);
		ytplayer.playVideo();
	};
	
	startMediaPlayer = function() {
		var clipURL = "audio/" + MediaObject.mediaNames[MediaObject.nextClip][0];
		MediaPlayer.URL = clipURL;
		MediaPlayer.Settings.volume = MediaObject.mediaNames[MediaObject.nextClip][1];
		MediaPlayer.controls.play();
	};
	
	reloadMediaPlayer = function() {
		MediaPlayer.SetURL(MediaObject.mediaNames[MediaObject.nextClip][0]);
		MediaPlayer.SetVolume(MediaObject.mediaNames[MediaObject.nextClip][1]);
		MediaPlayer.Play();
	};

	startNextClip = function() {
		if (MediaObject.mediaNames[MediaObject.nextClip][0] == "youtube") {
			$("DivInnerMediaPlayer").hide();
			$("DivYouTube").show();
			if ((browser == "MSIE") || (browser == "Netscape")) {
				if ((typeof MediaPlayer != "undefined") && (typeof MediaPlayer.controls != "undefined")) {
					MediaPlayer.controls.stop();
				}
			}
			setTimeout(startPlayer,1000);
		}
		else if ((browser == "MSIE") || (browser == "Netscape")) {
			if ((typeof MediaObject.ytplayer != "undefined") && (typeof MediaObject.ytplayer.pauseVideo != "undefined")) {
				ytplayer.pauseVideo();
			}
			if ($("DivInnerMediaPlayer").css("display") != "block") { 
				$("DivYouTube").hide();
				$("DivInnerMediaPlayer").show();
		
				setTimeout(startMediaPlayer,500);
			}
			else {
				var clipURL = "audio/" + MediaObject.mediaNames[MediaObject.nextClip][0];
				MediaPlayer.URL = clipURL;
				MediaPlayer.controls.play();
				MediaPlayer.Settings.volume = MediaObject.mediaNames[MediaObject.nextClip][1];
			}
		}
		else {
			if ($("DivInnerMediaPlayer").css("display") != "block") { 
				$("DivYouTube").hide();
				$("DivInnerMediaPlayer").show();
		
				setTimeout(reloadMediaPlayer,500);
			}
			else {
				MediaPlayer.Stop();
				MediaPlayer.SetURL(MediaObject.mediaNames[MediaObject.nextClip][0]);
				MediaPlayer.SetVolume(MediaObject.mediaNames[MediaObject.nextClip][1]);
				MediaPlayer.Play();
			}
		}
	};
			
	$("#nextButton").unbind("click");
	$("#nextButton").click(function() {
			MediaObject.nextClip++;
			if (MediaObject.nextClip == 12) {
				MediaObject.nextClip = 0;
			}
			startNextClip();
	});

	$("#prevButton").unbind("click");
	$("#prevButton").click(function() {
			if (MediaObject.nextClip == 0) {
				MediaObject.nextClip = 12;
			}
			MediaObject.nextClip--;
			startNextClip();
	});
	
}

MediaObject.onLoad = function() {

    var params = { allowScriptAccess: "always", bgcolor: '#D5DDB3',  };
    var atts = { id: "myytplayer" };
    swfobject.embedSWF("http://www.youtube.com/v/vAeYvTWbhA8?enablejsapi=1&playerapiid=ytplayer&version=3","DivInnerYouTube", "480", "390", "8", null, null, params, atts);

	MediaObject.mediaNames[0] = ["Vissi d'arte.mp3",50,"show"];
	MediaObject.mediaNames[1] = ["youtube",75,"show"];
	MediaObject.mediaNames[2] = ["Voi lo sapete.mp3",50,"show"];
	MediaObject.mediaNames[3] = ["It's time to go, my love.mp3",50,"hide"];
	MediaObject.mediaNames[4] = ["Old man, fearful man.mp3",50,"show"];
	MediaObject.mediaNames[5] = ["Or sai chi l'onore.mp3",15,"hide"];
	MediaObject.mediaNames[6] = ["Non mi dir.mp3",25,"hide"];
	MediaObject.mediaNames[7] = ["Dove sono.mp3",50,"hide"];
	MediaObject.mediaNames[8] = ["Porgi amor.mp3",50,"hide"];
	MediaObject.mediaNames[9] = ["Tosca Act 2.mp3",50,"show"];
	MediaObject.mediaNames[10] = ["Il tuo sangue.mp3",50,"show"];
	MediaObject.mediaNames[11] = ["Embroidery Aria.mp3",50,"hide"];

	MediaObject.buttonFunctions();
			
}

MediaObject.onUnload = function() {}


