var win;
var actInd;
var row;
var soundcloudUsername;
var soundcloudClientID;
var displayOption;
var artist;
var tableData = [];
var tableview;
var sound;
var alertMessage;
var fStripped;
var adView;
var lblUnableToConnect;
var btnRetry;
var failureMessage;
var imgNav;
var url;

//Window Loading section
win = Titanium.UI.currentWindow;

//****************** UI Load **************************************
//Window Loading section
win = Titanium.UI.currentWindow;
loadConfig();
Ti.API.warn('Audio Page Load');

//Read Config File
function loadConfig() {

	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'config/config.xml');
	//Ti.API.warn(file);
	var xmltext = file.read().text;
	//Ti.API.warn(xmltext);
	var doc = Ti.XML.parseString(xmltext);

	var soundcloudElement = doc.documentElement.getElementsByTagName("soundcloud");
	var artistElement = doc.documentElement.getElementsByTagName("artist");
	var sourceElement = doc.documentElement.getElementsByTagName("audioSource");
	var styleElement = doc.documentElement.getElementsByTagName("colorScheme");

	for (var i = 0; i < artistElement.length; i++) {
		var item = artistElement.item(i);
		//Ti.API.warn(item);

		artist = item.getAttributes().getNamedItem("name").nodeValue;

	}

	for (var i = 0; i < sourceElement.length; i++) {
		var item = sourceElement.item(i);
		//Ti.API.warn(item);

		source = item.getAttributes().getNamedItem("source").nodeValue;
		displayOption = item.getAttributes().getNamedItem("displayOption").nodeValue;

	}

	for (var i = 0; i < soundcloudElement.length; i++) {
		var item = soundcloudElement.item(i);
		//Ti.API.warn(item);

		soundcloudUsername = item.getAttributes().getNamedItem("username").nodeValue;
		soundcloudClientID = item.getAttributes().getNamedItem("clientID").nodeValue;

	}

	for (var i = 0; i < styleElement.length; i++) {
		var item = styleElement.item(i);
		//Ti.API.warn(item);

		borders = item.getAttributes().getNamedItem("borderColor").nodeValue;
		textColor = item.getAttributes().getNamedItem("textColor").nodeValue;
		Ti.API.warn(textColor);

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

win.backgroundImage = '/images/android/background.png'

//Ti.App.currentService.stop();
Ti.Media.defaultAudioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;

//Alert and Failure Message templates
alertMessage = Titanium.UI.createAlertDialog({
	title : artist,
	message : 'Alert Message'
});

failureMessage = Titanium.UI.createAlertDialog({
	title : artist,
	message : 'Alert Message'
});

//Activity Indicator

actInd = Ti.UI.createActivityIndicator({
	message : 'Loading...',
	color : 'white',
	height : 60,
	width : 'auto'
});
win.add(actInd);

//Load Show Data
//Determine if the source is Soundcloud or Official
if (source == 'soundcloud') {
	url = 'https://api.soundcloud.com/users/' + soundcloudUsername + '/tracks.json?client_id=' + soundcloudClientID;
	callService();
}

win.title = 'Shows';

function callService() {

	actInd.show();

	var xhr = Titanium.Network.createHTTPClient();

	xhr.onload = serviceResponse;

	xhr.onerror = serviceError;

	xhr.open("GET", url);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send();
}

function serviceResponse() {
	
	Ti.API.info(this.responseText);

	var info;

	info = JSON.parse(this.responseText);

	Ti.API.warn(info);

	for (var i in info) {
		row = Ti.UI.createTableViewRow({
			height : 80,
			backgroundColor : 'transparent',
			hasChild : true,
			rightImage : '/images/android/arrow.png'
		});

		var preStrippedText;
		preStrippedText = info[i].title;
		var strippedText = preStrippedText.replace('Global Dance Session', '');
		fStripped = strippedText.replace(' on', '');

		var infoDesc = Ti.UI.createLabel({
			text : fStripped,
			color : 'White',
			textAlign : 'left',
			left : 65,
			top : 25,
			height : 'auto',
			font : {
				fontWeight : 'bold',
				fontSize : '13dp'
			}
		});

		var image = Ti.UI.createImageView({
			image : info[i].artwork_url,
			height : 50,
			width : 50,
			top : 15,
			left : 10
		});

		Ti.API.warn(info[i].title);
		row.add(infoDesc);
		row.add(image);

		tableData[i] = row;

	}

	tableview = Titanium.UI.createTableView({
		data : tableData,
		height : 280,
		separatorColor : '#C9EE00',
		backgroundColor : 'transparent'
	});

	tableview.top = 0;
	tableview.height = '400dp';

	tableview.addEventListener('click', function(e) {

		var index = e.index;
		var section = e.section;
		var row = e.row;
		var rowdata = e.rowData;

		var audioPlayer = Titanium.UI.createWindow({
			url : 'audio_player.js'
		});

		var nonSecURL = info[e.index].stream_url;
		nonSecURL = nonSecURL.replace('https:', 'http:');
		Ti.API.warn('This is the URL ' + nonSecURL);
		if (Titanium.Platform.name == 'android') {
			var scUrl = nonSecURL;
		} else {
			var scUrl = info[e.index].stream_url;

		}

		audioPlayer.scURL = scUrl;
		audioPlayer.trackTitle = info[e.index].title;
		Ti.API.warn('Null Desc' + info[e.index].description);
		if (info[e.index].description == "") {
			Ti.API.warn('Null Desc' + info[e.index].description);
			audioPlayer.trackDesc = 'GDS - Show';
		} else {
			audioPlayer.trackDesc = info[e.index].description;
		}

		audioPlayer.trackDuration = info[e.index].duration;

		Titanium.UI.currentTab.open(audioPlayer, {
			animated : true
		});

	});
	actInd.hide();
	Titanium.UI.currentWindow.add(tableview);

}

//This is called if we can't get the host response
function serviceError() {
	hideIndicator();
	failureMessage.message = "Unable to connect to " + source + ", Please try again later (For best results use a 3G or WiFi connection)";
	failureMessage.show();

	lblUnableToConnect = Titanium.UI.createLabel({
		text : 'Sorry we are unable to connect you to ' + source + ' at this time, please try again later',
		height : 'auto',
		top : 150,
		width : 748,
		left : 10,
		color : 'White',
		font : {
			fontSize : 20,
			fontStyle : 'normal',
			fontWeight : 'bold'
		},
		textAlign : 'center'
	});

	btnRetry = Titanium.UI.createButton({
		top : 200,
		left : 10,
		width : 300,
		height : 40,
		color : textColor,
		title : 'Retry',
		font : {
			fontSize : 30,
			fontFamily : 'Arial',
			fontWeight : 'bold'
		},
		backgroundImage : '/images/android/blank.png'

	});

	win.add(btnRetry, lblUnableToConnect);

	btnRetry.addEventListener('click', function(e) {

		if (lblUnableToConnect.visible = true) {
			lblUnableToConnect.visible = false;
		}
		if (btnRetry.visible = true) {
			btnRetry.visible = false;
		}

		callService();
	});

}
