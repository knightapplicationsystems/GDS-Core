//iPhone Only, for iPad UI please go to /main_windows/iPad/audio_ipad.js for Android UI please go to /main_windows/android/audio.js or /audioTablet.jss

//Local Variables
var win;
var webView;
var actInd;
var activityWindow;
var activityBg;




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
	url:'http://www.youtube.com/embed/' + win.linkURL + '?autoplay=1&autohide=1&cc_load_policy=0&color=white&controls=0&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0',
	height:'auto',
	width:'auto',
	touchEnabled: true
	});

webView.addEventListener('load',function(e)
{
	actInd.hide();
    var pageTitle = webView.evalJS("document.title"); 
    win.title = pageTitle;
 
});



win.add(webView);