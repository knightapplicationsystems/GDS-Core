//iPad Only, for iPhone UI please go to /main_windows/iPad/audio.js for Android UI please go to /main_windows/android/audio.js or android/tablet/audio.js


var win;
var lblRadio;
var lblEvents;
var lblPromo;
var adView;
var db;
var btnNowPlaying;
var btnFB;
var btnTwit;
var fb;
var em1text1;
var em1text2;
var em1;
var em2text1;
var em2text2;
var em2;
var em3text1;
var em3text2;
var em3;

//Window Loading section
win = Titanium.UI.currentWindow;

loadConfig();
Ti.API.warn('Email Page Load');

//Read Config File
function loadConfig() {

	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'config/config.xml');
	//Ti.API.warn(file);
	var xmltext = file.read().text;
	//Ti.API.warn(xmltext);
	var doc = Ti.XML.parseString(xmltext);

	var fbElement = doc.documentElement.getElementsByTagName("facebook");
	var em1Element = doc.documentElement.getElementsByTagName("email1");
	var em2Element = doc.documentElement.getElementsByTagName("email2");
	var em3Element = doc.documentElement.getElementsByTagName("email3");

	for (var i = 0; i < fbElement.length; i++) {
		var item = fbElement.item(i);
		//Ti.API.warn(item);

		fb = item.getAttributes().getNamedItem("username").nodeValue;

	}

	for (var i = 0; i < em1Element.length; i++) {
		var item = em1Element.item(i);
		//Ti.API.warn(item);

		em1text1 = item.getAttributes().getNamedItem("text1").nodeValue;
		em1text2 = item.getAttributes().getNamedItem("text2").nodeValue;
		em1 = item.getAttributes().getNamedItem("address").nodeValue;

	}

	for (var i = 0; i < em2Element.length; i++) {
		var item = em2Element.item(i);
		//Ti.API.warn(item);

		em2text1 = item.getAttributes().getNamedItem("text1").nodeValue;
		em2text2 = item.getAttributes().getNamedItem("text2").nodeValue;
		em2 = item.getAttributes().getNamedItem("address").nodeValue;

	}

	for (var i = 0; i < em3Element.length; i++) {
		var item = em3Element.item(i);
		//Ti.API.warn(item);

		em3text1 = item.getAttributes().getNamedItem("text1").nodeValue;
		em3text2 = item.getAttributes().getNamedItem("text2").nodeValue;
		em3 = item.getAttributes().getNamedItem("address").nodeValue;

	}

}

//Background image
win.backgroundImage = '/images/android/background.png'

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


//Display Elements
lblRadio = Titanium.UI.createLabel({
	text : em1text1 + "\n" + em1text2,
	height : 'auto',
	top : 80,
	left : 10,
	color : 'White',
	font : {
		fontSize : 20,
		fontStyle : 'normal',
		fontWeight: 'bold'
	},
	textAlign : 'left'
});

lblRadio.addEventListener('click', function(e) {
	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.toRecipients = [em1];
	emailDialog.open();
});

lblEvents = Titanium.UI.createLabel({
	text : em2text1 + "\n" + em2text2,
	height : 'auto',
	top : 230,
	left : 10,
	color : 'White',
	font : {
		fontSize : 20,
		fontStyle : 'normal',
		fontWeight: 'bold'
	},
	textAlign : 'left'
});

lblEvents.addEventListener('click', function(e) {
	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.toRecipients = [em2];
	emailDialog.open();
});

lblPromo = Titanium.UI.createLabel({
	text : em3text1 + "\n" + em3text2,
	height : 'auto',
	top : 380,
	left : 10,
	color : 'White',
	font : {
		fontSize : 20,
		fontStyle : 'normal',
		fontWeight: 'bold'
	},
	textAlign : 'left'
});

lblPromo.addEventListener('click', function(e) {
	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.toRecipients = [em3];
	emailDialog.open();
});

var lblFB = Titanium.UI.createLabel({
	top : 580,
	height : 'auto',
	left : 50,
	color : 'White',
	font : {
		fontSize : 18,
		fontStyle : 'normal'
	},
	text : "'Like' us on Facebook"

});

btnFB = Titanium.UI.createButton({
	top : 580,
	height : 27,
	width : 27,
	left : 10,
	backgroundImage : '/images/fb.png'

});

btnFB.addEventListener('click', function(e) {

	var viewFB = Titanium.UI.createWindow({
		url : 'news_view.js'
	});

	viewFB.linkURL = 'http://www.facebook.com/' + fb;

	Titanium.UI.currentTab.open(viewFB, {
		animated : true
	});

});

win.add(lblRadio);
win.add(lblEvents);
win.add(lblPromo);
win.add(btnFB);
win.add(lblFB);