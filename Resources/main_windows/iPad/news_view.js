//iPad Only, for iPhone UI please go to /main_windows/iPad/audio.js for Android UI please go to /main_windows/android/audio.js or android/tablet/audio.js

//Local Variables
var win;
var webView;

var actInd;
var activityWindow;
var activityBg;



win = Titanium.UI.currentWindow;

//Activity Indicator
function showIndicator() {
	actInd = Ti.UI.createActivityIndicator({
		style : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		message : 'Loading...',
		color : 'white',
		height : 60,
		width : 'auto'
	});

	activityWindow = Ti.UI.createWindow({
		width : 200,
		height : 100
	});

	activityBg = Ti.UI.createView({
		backgroundColor : "#000000",
		opacity : 0.9,
		borderRadius : 10
	});

	activityWindow.add(activityBg);
	activityWindow.add(actInd);
	activityWindow.open();
	actInd.show();
}

function hideIndicator() {
	activityWindow.close();
}
 
 
webView = Titanium.UI.createWebView({url:win.linkURL});
showIndicator();
webView.addEventListener('load',function(e)
{
	hideIndicator();
    var pageTitle = webView.evalJS("document.title"); 
    win.title = pageTitle;
 
});



win.add(webView);