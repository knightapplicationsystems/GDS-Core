//Android Only, for iPad UI please go to /main_windows/iPad/audio_ipad.js for iPhone UI please go to /main_windows/iPhone/audio.js or /audioTablet.js

//Local Variables
var win;
var webView;
var twitter;
var imgNav;
var actInd;


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

//AdMob
try {

	var Admob = require('ti.admob');
	var adMobView = Admob.createView({
		publisherId : "a15021686c99134",
		testing : false, // default is false
		//top: 10, //optional
		//left: 0, // optional
		//right: 0, // optional
		bottom : 0, // optional
		adBackgroundColor : "FF8855", // optional
		backgroundColorTop : "738000", //optional - Gradient background color at top
		borderColor : "#000000", // optional - Border color
		textColor : "#000000", // optional - Text color
		urlColor : "#00FF00", // optional - URL color
		linkColor : "#0000FF",
		height : '75dp',
		width : '480dp'//optional -  Link text color
		//primaryTextColor: "blue", // deprecated -- now maps to textColor
		//secondaryTextColor: "green" // deprecated -- now maps to linkColor

	});
	win.add(adMobView);
	//AdMobView.requestTestAd();
	//listener for adNotReceived
	adMobView.addEventListener(Admob.AD_NOT_RECEIVED, function() {
		//alert("ad not received");
		Ti.API.info("ad not received");
		try {

		} catch (e) {
			adMobView.requestAd();
		}

	});
} catch(e) {

}

//Activity Indicator

actInd = Ti.UI.createActivityIndicator({
	message : 'Please Wait..',
	color : 'white',
	height : 60,
	width : 'auto'
});
win.add(actInd);
actInd.show();

//Background Image
win.backgroundImage = "/images/background.png";



 
webView = Titanium.UI.createWebView({
	url:'https://twitter.com/' + twitter,
	top:'0dp',
	height:'410dp'


});

webView.addEventListener('load',function(e)
{
	actInd.hide();
});

win.add(webView);