var clear="images/clear.gif"; //path to clear.gif

function pngfix()
{
	var els = document.getElementsByTagName('*');
	var	ip = /\.png/i;
	var al = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"
	var i = els.length;
	var uels = new Array()
	var c = 0;

	while (i-- > 0){
		if (els[i].className.match(/unitPng/)) {
			uels[c] = els[i];
			c++;
		}
	}
	if (uels.length == 0) {
		pfx(els);		
	}
	else {
		pfx(uels);		
	}
	
	function pfx(els) {
		i = els.length;

		while(i-- > 0) {
			var el = els[i];
			var es = el.style;
			var elc = el.currentStyle;
			var elb = elc.backgroundImage;

			if (el.src && el.src.match(ip) && !es.filter) {
				es.height = el.height;
				es.width = el.width;
				es.filter = al + el.src + "',sizingMethod='crop')";
				el.src = clear;
			}
			else {
				if (elb.match(ip)) {
					var path = elb.split('"');
					var rep = (elc.backgroundRepeat=='no-repeat')?'crop':'scale';
					var elkids = el.getElementsByTagName('*');
					var j = elkids.length;

					es.filter = al + path[1] + "',sizingMethod='" + rep +"')";
					es.height = el.clientHeight + 'px';
					es.backgroundImage = 'none';

					if (j != 0) {
						if (elc.position != "absolute") {
							es.position='static';							
						}
						while (j-- > 0) {
							if (!elkids[j].style.position) {
								elkids[j].style.position = "relative";
							}
						}
					}
				}
			}
		}
	}
}
