//iPhone Only, for iPad UI please go to /main_windows/iPad/audio_ipad.js for Android UI please go to /main_windows/android/audio.js or /audioTablet.js

//Global Variables
var win;
var source;
var soundcloudUsername;
var soundcloudClientID;
var displayOption;
var artist;
var alertMessage;
var failureMessage;
var actInd;
var activityWindow;
var activityBg;
var imgNav;
var url;
var coverFlow;
var images = [];
var trackTitle;
var lblTrackTitle;
var sound;
var streamURL;
var trackDesc;
var trackID;
var borders;
var textColor;
var lblUnableToConnect;
var btnRetry;
var btnRefresh;
var dlURL;
var btnLib;
var id;

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

//Background Image
win.backgroundImage = "/images/background.png";

//Background Audio
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
		opacity : 0.8,
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

//Header & Navigation Bar Image Load (iPhone/iPod and iPad)
//Nav Image
imgNav = Ti.UI.createLabel({
	top : 0,
	text : 'SHOWS',
	height : '30dp',
	width : '320dp',
	left : 0,
	textAlign : 'center',
	color : textColor,
	backgroundImage : '/images/blank.png',
	font : {
		fontStyle : 'Sans Serif',
		fontSize : 20
	}
});
win.barImage = '/images/header.png';

btnRefresh = Ti.UI.createButton({
	image : '/images/arrow_circle_right.png',
	top : 3,
	right : 10,
	height : '25dp',
	width : '25dp',
	zIndex : 20
})

btnRefresh.addEventListener('click', function(e) {
	images = [];
	lblTrackTitle.text = '';
	win.remove(coverFlow);
	//showIndicator();
	callService();
});

win.add(btnRefresh);

//************ The above completes the UI load **********************

//Load Show Data
//Determine if the source is Soundcloud or Official
if (source == 'soundcloud') {
	url = 'https://api.soundcloud.com/users/' + soundcloudUsername + '/tracks.json?client_id=' + soundcloudClientID;
	callService();
}

lblTrackTitle = Ti.UI.createLabel({
	color : 'White',
	textAlign : 'center',
	left : 10,
	top : '75dp',
	height : 18,
	width : 300,
	font : {
		fontWeight : 'bold',
		fontSize : 13
	}
});

win.add(lblTrackTitle);

//Service fires off the XHR request to the relevant host
function callService() {
	showIndicator();
	var xhr = Titanium.Network.createHTTPClient();

	xhr.onload = serviceResponse;

	xhr.onerror = serviceError;

	xhr.open("GET", url);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send();
}

//Service Response deals with the returned response from the Host
function serviceResponse() {
	//'https://api.soundcloud.com/users/globaldancesession/tracks.json?client_id=7a0984726d0eefbb310771c4c02116a8'
	var hostResp;

	hostResp = JSON.parse(this.responseText);
	//var i = 0; i < 12; i++

	for (var i in hostResp) {
		//for (var i = 0; i < 12; i++) {

		var str = hostResp[i].artwork_url;

		var diffImage = str.replace('large', 't500x500');

		Ti.API.warn(diffImage);

		var name = diffImage;

		images[i] = {
			image : name,
			width : 155,
			height : 155
		};

	}

	coverFlow = Ti.UI.iOS.createCoverFlowView({
		images : images,
		top : '31dp'
	});

	hideIndicator();

	coverFlow.addEventListener('change', function(e) {

		trackTitle = hostResp[e.index].title;
		trackID = hostResp[e.index].id;

		var preStrippedText;
		preStrippedText = trackTitle;
		var strippedText = preStrippedText.replace('Global Dance Session', '');
		fStripped = strippedText.replace(' on', '');

		lblTrackTitle.text = fStripped;

	});

	coverFlow.addEventListener('click', function(e) {
		trackTitle = hostResp[e.index].title;
		streamURL = hostResp[e.index].stream_url;
		trackDesc = hostResp[e.index].description;
		dlURL = hostResp[e.index].download_url;
		showTrackList();
		Ti.API.warn(streamURL);
	});

	win.add(coverFlow);

}

function springPlayer() {

	sound = Ti.Media.createVideoPlayer({
		mediaControlStyle : Titanium.Media.VIDEO_CONTROL_DEFAULT,
		fullscreen : false,
		height : '20dp',
		top : '55dp',
		allowBackground : true
	});

	sound.url = streamURL + '?client_id=' + soundcloudClientID;

	sound.autoplay = true;

	win.add(sound);
}

function showTrackList() {
	var t = Titanium.UI.create2DMatrix();
	t = t.scale(0);

	var w = Titanium.UI.createWindow({
		backgroundColor : 'black',
		borderWidth : 5,
		borderColor : borders,
		height : 400,
		width : 320,
		borderRadius : 10,
		opacity : 0.95,
		transform : t
	});

	// create first transform to go beyond normal size
	var t1 = Titanium.UI.create2DMatrix();
	t1 = t1.scale(1.1);
	var a = Titanium.UI.createAnimation();
	a.transform = t1;
	a.duration = 200;

	// when this animation completes, scale to normal size
	a.addEventListener('complete', function() {
		Titanium.API.info('here in complete');
		var t2 = Titanium.UI.create2DMatrix();
		t2 = t2.scale(1.0);
		w.animate({
			transform : t2,
			duration : 200
		});

	});
	//Strip out any HTML
	var strDesc = trackDesc;
	strDesc = strDesc.replace(/<br>/gi, "\n");
	strDesc = strDesc.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1) ");
	strDesc = strDesc.replace(/<(?:.|\s)*?>/g, "");
	strDesc = strDesc.replace(/\&amp;/g, '&');
	strDesc = strDesc.replace(/\#/g, '');
	strDesc = strDesc.replace(/&8216/g, '');
	strDesc = strDesc.replace(/&8217/g, '');
	strDesc = strDesc.replace(/&8211/g, '');
	strDesc = strDesc.replace(/&8221/g, '');
	strDesc = strDesc.replace(/&13/g, '');
	strDesc = strDesc.replace(/;/g, '');

	//These elements go on the pop up window
	var scrollView = Titanium.UI.createScrollView({
		top : '0dp',
		height : 'auto'
	});

	var lblTrackDesc = Titanium.UI.createLabel({
		top : '46dp',
		left : 10,
		height : 'auto',
		width : '300dp',
		text : strDesc,
		font : {
			fontSize : '13dp',
			fontFamily : 'Arial',
		},
		color : 'White'
	});

	var b = Titanium.UI.createButton({
		title : 'Done',
		height : 30,
		top : '8dp',
		width : 90,
		right : 10,
		backgroundColor : 'black',
		color : 'black'
	});

	var download = Titanium.UI.createButton({
		title : 'Download',
		height : 30,
		top : '8dp',
		width : 90,
		left : 115,
		backgroundColor : 'black',
		color : 'black'
	});

	var play = Titanium.UI.createButton({
		title : 'Stream',
		height : 30,
		top : '8dp',
		width : 90,
		left : 10,
		backgroundColor : 'black',
		color : 'black'
	});

	scrollView.add(lblTrackDesc);
	scrollView.add(play);
	//scrollView.add(download);
	scrollView.add(b);
	w.add(scrollView);

	play.addEventListener('click', function(e) {
		springPlayer();
	});

	b.addEventListener('click', function() {
		var t3 = Titanium.UI.create2DMatrix();
		t3 = t3.scale(0);

		w.close({
			transform : t3,
			duration : 300
		});

	});

	download.addEventListener('click', function(e) {

		alertMessage.message = 'Downloading, please wait, do not close this screen';
		alertMessage.buttonNames = [];
		alertMessage.show();

		var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'scDownloads');

		newDir.createDirectory();

		id = fStripped;

		var dlXhr = Titanium.Network.createHTTPClient({

		});

		dlXhr.onload = function() {

			var file = Ti.Filesystem.getFile(newDir.resolve(), id + '.mp3');

			Ti.API.warn('file is: ' + file);

			Ti.API.warn('RespData is: ' + this.responseData);

			file.createFile();

			

			Ti.API.warn(dlXhr.status);

			if (dlXhr.status == 200) {
				try {
					file.write(this.responseData);
					alertMessage.hide();
					var t3 = Titanium.UI.create2DMatrix();
					t3 = t3.scale(0);

					w.close({
						transform : t3,
						duration : 300
					});

					switchToLib();
				} catch (e) {

				}

			}

		}

		dlXhr.onerror = function(e) {
			Ti.API.warn(e.error);
			Ti.API.debug(e.error);
			Ti.API.warn('JSON ERROR= ' + JSON.stringify(e));
			Ti.API.warn('Client Status=' + dlXhr.status);
			if (dlXhr.status == 403) {
				alertMessage.hide();

				alertMessage.message('Sorry unable to download file - 403 Error');
				alertMessage.show();

			}
			alertMessage.message = 'Sorry this file is not available to download';
			alertMessage.show();
		}
		//dlXhr.onerror = serviceError;

		//var encUri = Titanium.Network.encodeURIComponent(dlURL);
		var encUri = Titanium.Network.encodeURIComponent(trackTitle + '.mp3');

		dlXhr.open('GET', 'http://www.globaldancesession.com/GDS_APP_ARCHIVES/' + encUri);
		//dlXhr.open('GET', dlURL + '?client_id=' + soundcloudClientID);
		//Ti.API.warn(dlURL + '?client_id=' + soundcloudClientID);
		Ti.API.warn('http://www.globaldancesession.com/GDS_APP_ARCHIVES/' + encUri);
		dlXhr.setRequestHeader('Content-Type', 'application/json');
		dlXhr.setTimeout([500000]);
		dlXhr.send();

		Ti.API.warn('newdir ' + newDir);

		//switchToLib();

	});

	w.open(a);

}

//This is called if we can't get the host response
function serviceError() {

	hideIndicator();

	failureMessage.message = "Unable to connect to " + source + ", Please try again later (For best results use a 3G or WiFi connection)";
	failureMessage.show();

	lblUnableToConnect = Titanium.UI.createLabel({
		text : 'Sorry we are unable to connect you to ' + source + ' at this time, please try again later',
		height : 'auto',
		top : 80,
		left : 10,
		color : 'White',
		font : {
			fontSize : 15,
			fontStyle : 'normal'
		},
		textAlign : 'center'
	});

	btnRetry = Titanium.UI.createButton({
		top : 170,
		left : 10,
		width : 300,
		height : 40,
		color : textColor,
		title : 'Retry',
		font : {
			fontSize : 15,
			fontFamily : 'Arial',
			fontWeight : 'bold'
		},
		backgroundImage : '/images/blank.png'

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

btnLib = Titanium.UI.createButton({
	bottom : 10,
	left : 10,
	width : 300,
	height : 40,
	color : textColor,
	title : 'Download Library',
	font : {
		fontSize : 15,
		fontFamily : 'Arial',
		fontWeight : 'bold'
	},
	backgroundImage : '/images/blank.png',
	zIndex : 2

});

//win.add(btnLib);

btnLib.addEventListener('click', function(e) {
	switchToLib();
})
function switchToLib() {
	var lib = Titanium.UI.createWindow({
		url : 'library.js'
	});

	Titanium.UI.currentTab.open(lib, {
		transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
	});

}

//Add elements to Window
win.add(imgNav);

