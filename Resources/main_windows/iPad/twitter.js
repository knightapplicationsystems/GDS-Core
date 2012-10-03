//iPad Only, for iPhone UI please go to /main_windows/iPad/audio.js for Android UI please go to /main_windows/android/audio.js or android/tablet/audio.js

//Local Variables
var win;
var webView;
var twitter;
var imgNav;
var actInd;
var activityWindow;
var activityBg;


win = Titanium.UI.currentWindow;

loadConfig();
Ti.API.warn('Twitter Page Load');

//Read Config File
function loadConfig() {

	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'config/config.xml');
	//Ti.API.warn(file);
	var xmltext = file.read().text;
	//Ti.API.warn(xmltext);
	var doc = Ti.XML.parseString(xmltext);

	var twitterElement = doc.documentElement.getElementsByTagName("twitter");

	for (var i = 0; i < twitterElement.length; i++) {
		var item = twitterElement.item(i);
		//Ti.API.warn(item);

		twitter = item.getAttributes().getNamedItem("username").nodeValue;

	}
}

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
 
//Bar image
win.barImage = '/images/tablet/header.png'; 

//Background Image
win.backgroundImage = "/images/tablet/background.png";

//Load Advert View
var adView = Titanium.UI.iOS.createAdView({
	width : 'auto',
	height : 50,
	bottom : 0,
	zIndex : 10
});

//Nav Image
imgNav = Ti.UI.createLabel({
	top : 0,
	height : 50,
	left : 0,
	backgroundImage : '/images/tablet/twitter.png'
});

win.add(imgNav);
 
webView = Titanium.UI.createWebView({
	url:'https://twitter.com/' + twitter,
	top:'72dp',
	height:'780dp'


});

showIndicator();

webView.addEventListener('load',function(e)
{
	hideIndicator();
 
});



win.add(adView);
win.add(webView);