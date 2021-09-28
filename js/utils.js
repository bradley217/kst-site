var headerImg1 = ["header-img1","Copyright \u00A9 Richard Termine"];
var headerImg2 = ["header-img2",""];
var headerImg3 = ["header-img3","Copyright \u00A9 Carol Rosegg"];
var headerImg4 = ["header-img4",""];
var headerImages = ["",headerImg1,headerImg2,headerImg3,headerImg4];

var currentImage = 1;
var intervalTimer;

function getBaseURL()
{
	"use strict";
	var pathname, index1, index2, baseLocalUrl, retValue;
	
    var url = location.href;  // entire url including querystring - also: window.location.href;
    var baseURL = url.substring(0, url.indexOf('/', 14));


    if (baseURL.indexOf('http://localhost') !== -1) {
        // Base Url for localhost
        url = location.href;  // window.location.href;
        pathname = location.pathname;  // window.location.pathname;
        index1 = url.indexOf(pathname);
        index2 = url.indexOf("/", index1 + 1);
        baseLocalUrl = url.substr(0, index2);

        retValue = baseLocalUrl + "/";
    }
    else {
        // Root Url for domain name
        retValue = baseURL + "/";
    }

	return retValue;
}

function getBrowser()
{
	"use strict";
	var browserName = navigator.userAgent;
	// We have to check for Opera first because
	// at the beginning of the userAgent variable
	// Opera claims it is MSIE. 
	
	if (browserName.indexOf("Opera") !== -1) { 
		browserName = "Opera";
	}
	else if (browserName.indexOf("Firefox") !== -1) {
		browserName = "Firefox";
	}
	else if (browserName.indexOf("MSIE") !== -1) {
		browserName = "MSIE";
	}
	else if (browserName.indexOf("Netscape") !== -1) {
		browserName = "Netscape";
	}
	else if (browserName.indexOf("Safari") !== -1) {
		browserName = "Safari";
	}
	
	return browserName;

}

function loadWindowsMediaPlayer(media,divName,playerName,width,height,volume,autoStart)
{
	"use strict";
	var divRef = document.getElementById(divName);
	
	divRef.innerHTML = '<object id="'+playerName+'"' + 
		'classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6"' +
		'codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701"' +
		'standby="Loading Microsoft® Windows® Media Player components..."' +
		'type="application/x-oleobject" width="'+width+'" height="'+height+'">' +
		'<param name="url" value="'+media+'">' +
		'<param name="volume" value="'+volume+'">' +
		'<param name="autoStart" value="'+autoStart+'">' +
		'<embed id="'+playerName+'" type="application/x-mplayer2" src="'+media+'"' +
		'classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6"' +
		'pluginspage="http://www.microsoft.com/Windows/MediaPlayer/"' +
		'type="application/x-mplayer2"' +'url="'+media+'"' +
		'volume="'+volume+'"' +
		'autostart="'+autoStart+'"'	+
		'width="'+width+'" height="'+height+'">' +
		'<\/embed>'	+
		'<\/object>';
}

function updateBackground(imageNumber)
{
	"use strict";
	var imageName;

	if (intervalTimer !== undefined) {
		clearInterval(intervalTimer);
	}
	
	if (imageNumber !== undefined) {
		currentImage = imageNumber;
	}
	else {
		currentImage = (currentImage === 4) ? 1 : currentImage + 1;
	}

	imageName = "url(images/header/" + headerImages[currentImage][0] + ".jpg)";
	$("#row-2").fadeTo(1600,0,function() {
		$("#row-2").css("backgroundImage",imageName);
		document.getElementById("DivMainPhotoCredit").firstChild.nodeValue =  headerImages[currentImage][1];
		$("#row-2").fadeTo(1600,1,function() {
			intervalTimer = setInterval(updateBackground,20000);
		});
	});
}

