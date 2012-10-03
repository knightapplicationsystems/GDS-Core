//iPhone Only, for iPad UI please go to /main_windows/iPad/audio_ipad.js for Android UI please go to /main_windows/android/audio.js or /audioTablet.js


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
win.backgroundImage = '/images/background.png'

//Bar image
win.barImage = '/images/header.png';

//iAd
adView = Titanium.UI.iOS.createAdView({
	width : 'auto',
	height : 50,
	bottom : 0
});
win.add(adView);

//Nav Bar
imgNav = Ti.UI.createLabel({
	top : 0,
	height : 50,
	left : 0,
	backgroundImage : '/images/email.png'
});

win.add(imgNav);

//Display Elements
lblRadio = Titanium.UI.createLabel({
	text : em1text1 + "\n" + em1text2,
	height : 'auto',
	top : 50,
	left : 10,
	color : 'White',
	font : {
		fontSize : 13,
		fontStyle : 'normal'
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
	top : 105,
	left : 10,
	color : 'White',
	font : {
		fontSize : 13,
		fontStyle : 'normal'
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
	top : 165,
	left : 10,
	color : 'White',
	font : {
		fontSize : 13,
		fontStyle : 'normal'
	},
	textAlign : 'left'
});

lblPromo.addEventListener('click', function(e) {
	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.toRecipients = [em3];
	emailDialog.open();
});

var lblFB = Titanium.UI.createLabel({
	top : 260,
	height : 'auto',
	left : 50,
	color : 'White',
	font : {
		fontSize : 13,
		fontStyle : 'normal'
	},
	text : "'Like' us on Facebook"

});

btnFB = Titanium.UI.createButton({
	top : 255,
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