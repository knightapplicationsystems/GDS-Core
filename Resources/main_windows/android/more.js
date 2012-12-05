//iPhone Only, for iPad UI please go to /main_windows/iPad/more.js for Android UI please go to /main_windows/android/more.js

//Global Variables
var win;
var borders;
var textColor;
var option1;
var option2;
var option3;
var btnOption1;
var lblOption1;
var btnOption2;
var lblOption2;
var btnOption3;
var lblOption3;
var imgNav;
var opt1Link;
var opt2Link;
var opt3Link;
var opt1Img;
var opt2Img;
var opt3Img;

//****************** UI Load **************************************
//Window Loading section
win = Titanium.UI.currentWindow;
loadConfig();
Ti.API.warn('More Page Load');

//Read Config File
function loadConfig() {

	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'config/config.xml');
	//Ti.API.warn(file);
	var xmltext = file.read().text;
	//Ti.API.warn(xmltext);
	var doc = Ti.XML.parseString(xmltext);

	var styleElement = doc.documentElement.getElementsByTagName("colorScheme");
	var tabOptions = doc.documentElement.getElementsByTagName("moreTab");
	var fbElement = doc.documentElement.getElementsByTagName("facebook");

	for (var i = 0; i < styleElement.length; i++) {
		var item = styleElement.item(i);
		//Ti.API.warn(item);

		borders = item.getAttributes().getNamedItem("borderColor").nodeValue;
		textColor = item.getAttributes().getNamedItem("textColor").nodeValue;

	}

	for (var i = 0; i < tabOptions.length; i++) {
		var item = tabOptions.item(i);
		//Ti.API.warn(item);

		option1 = item.getAttributes().getNamedItem("option1").nodeValue;
		opt1Link = item.getAttributes().getNamedItem("option1Link").nodeValue;
		opt1Img = item.getAttributes().getNamedItem("option1Img").nodeValue;
		option2 = item.getAttributes().getNamedItem("option2").nodeValue;
		opt2Link = item.getAttributes().getNamedItem("option2Link").nodeValue;
		opt2Img = item.getAttributes().getNamedItem("option2Img").nodeValue;
		option3 = item.getAttributes().getNamedItem("option3").nodeValue;
		opt3Link = item.getAttributes().getNamedItem("option3Link").nodeValue;
		opt3Img = item.getAttributes().getNamedItem("option3Img").nodeValue;

	}

}

//Background Image
win.backgroundImage = "/images/background.png";

//Background Audio
Ti.Media.defaultAudioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;



btnOption1 = Titanium.UI.createButton({
	top : '50dp',
	left : '10dp',
	height : '57dp',
	width : '57dp',
	backgroundImage:opt1Img
});

lblOption1 = Ti.UI.createLabel({
	top : '112dp',
	left : '13dp',
	height : 'auto',
	width : '50dp',
	text : option1,
	textAlign : 'center',
	color : 'white',
	font : {
		fontStyle : 'Sans Serif',
		fontSize : '10dp'
	}
});

btnOption2 = Titanium.UI.createButton({
	top : '50dp',
	left : '90dp',
	height : '57dp',
	width : '57dp',
	backgroundImage:opt2Img
});

lblOption2 = Ti.UI.createLabel({
	top : '112dp',
	left : '93dp',
	height : 'auto',
	width : '50dp',
	text : option2,
	textAlign : 'center',
	color : 'white',
	font : {
		fontStyle : 'Sans Serif',
		fontSize : '10dp'
	}
});

btnOption3 = Titanium.UI.createButton({
	top : '50dp',
	left : '170dp',
	height : '57dp',
	width : '57dp',
	backgroundImage:opt3Img
});

lblOption3 = Ti.UI.createLabel({
	top : '112dp',
	left : '173dp',
	height : 'auto',
	width : '50dp',
	text : option3,
	textAlign : 'center',
	color : 'white',
	font : {
		fontStyle : 'Sans Serif',
		fontSize : '10dp'
	}
});

//Button event listeners
btnOption1.addEventListener('click', function(e) {
	var newsDetail = Titanium.UI.createWindow({
		url : 'news_view.js'
	});

	newsDetail.linkURL = opt1Link;

	Titanium.UI.currentTab.open(newsDetail, {
		animated : true
	});
});
btnOption2.addEventListener('click', function(e) {
	var newsDetail = Titanium.UI.createWindow({
		url : 'news_view.js'
	});

	newsDetail.linkURL = opt2Link;

	Titanium.UI.currentTab.open(newsDetail, {
		animated : true
	});
});
btnOption3.addEventListener('click', function(e) {
	var email = Titanium.UI.createWindow({
		url : 'email.js'
	});

	Titanium.UI.currentTab.open(email, {
		animated : true
	});
});

win.add(btnOption1);
win.add(lblOption1);
win.add(btnOption2);
win.add(lblOption2);
win.add(btnOption3);
win.add(lblOption3);
