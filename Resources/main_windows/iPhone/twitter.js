//iPhone Only, for iPad UI please go to /main_windows/iPad/audio_ipad.js for Android UI please go to /main_windows/android/audio.js or /audioTablet.js

//Local Variables
var win;
var webView;
var twitter;
var imgNav;
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
 
//Bar image
win.barImage = '/images/header.png'; 

//Background Image
win.backgroundImage = "/images/background.png";


//Nav Image
imgNav = Ti.UI.createLabel({
	top : 0,
	height : '30dp',
	width : '320dp',
	left : 0,
	textAlign : 'center',
	color : 'white',
	backgroundImage : '/images/twitter.png'
});

win.add(imgNav);
 
webView = Titanium.UI.createWebView({
	url:'https://twitter.com/' + twitter,
	top:'30dp',
	height:'auto'


});



showIndicator();

webView.addEventListener('load',function(e)
{
	hideIndicator();
 
});





win.add(webView);