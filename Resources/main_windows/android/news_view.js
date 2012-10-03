//Android Only, for iPad UI please go to /main_windows/iPad/audio_ipad.js for iPhone UI please go to /main_windows/iPhone/audio.js or /audioTablet.js

//Local Variables
var win;
var webView;
var actInd;




win = Titanium.UI.currentWindow;

//Activity Indicator

actInd = Ti.UI.createActivityIndicator({
	message : 'Loading...',
	color : 'white',
	height : 60,
	width : 'auto'
});
win.add(actInd);
 
actInd.show();
webView = Titanium.UI.createWebView({
	url:win.linkURL,
	height:'auto',
	top:0
	});

webView.addEventListener('load',function(e)
{
	actInd.hide();
});

win.add(webView);