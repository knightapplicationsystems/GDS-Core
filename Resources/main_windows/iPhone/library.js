//iPhone Only, for iPad UI please go to /main_windows/iPad/audio_ipad.js for Android UI please go to /main_windows/android/audio.js or /audioTablet.js

//Global Variables
var win;
var alertMessage;
var failureMessage;
var artist;
var actInd;
var activityWindow;
var activityBg;
var row;
var tableData = [];
var tableview;
var files;
var soundFile;
var sound;
var btnPlay;
var btnStop;
var imgNav;
var borders;
var textColor;
var btnPlay;
var player;
var btnLib;
var lblNoFiles;

//****************** UI Load **************************************
//Window Loading section
win = Titanium.UI.currentWindow;
Ti.API.warn('Library Page Load');
loadConfig();

//Read Config File
function loadConfig() {

	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'config/config.xml');
	//Ti.API.warn(file);
	var xmltext = file.read().text;
	//Ti.API.warn(xmltext);
	var doc = Ti.XML.parseString(xmltext);

	var artistElement = doc.documentElement.getElementsByTagName("artist");
	var styleElement = doc.documentElement.getElementsByTagName("colorScheme");

	for (var i = 0; i < artistElement.length; i++) {
		var item = artistElement.item(i);
		//Ti.API.warn(item);

		artist = item.getAttributes().getNamedItem("name").nodeValue;

	}

	for (var i = 0; i < styleElement.length; i++) {
		var item = styleElement.item(i);
		//Ti.API.warn(item);

		borders = item.getAttributes().getNamedItem("borderColor").nodeValue;
		textColor = item.getAttributes().getNamedItem("textColor").nodeValue;
		Ti.API.warn(textColor);

	}

}

//Nasty hack to remove back button
var emptyView = Titanium.UI.createView({});
win.leftNavButton = emptyView;

//Nav Image
imgNav = Ti.UI.createLabel({
	top : 0,
	text : 'DOWNLOAD LIBRARY',
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

win.add(imgNav);

win.barImage = '/images/header.png';

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

loadSaved();

function loadSaved() {
	var dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'scDownloads');

	Ti.API.warn('Dir is ' + dir.name);

	files = dir.getDirectoryListing();
	Ti.API.warn('Files are ' + files);
	
	try {
		if (files.toString() == null) {
			
		}
	}
	catch(e)
	{
		lblNoFiles = Titanium.UI.createLabel({
				text : 'You have no saved files',
				height : 'auto',
				top : 80,
				left : 5,
				width:300,
				color : 'White',
				font : {
					fontSize : 15,
					fontStyle : 'normal'
				},
				textAlign : 'center'
			});
			win.add(lblNoFiles);
			return;
	}
	
	for (var i in files) {

		Ti.API.warn('File is ' + files[i]);

		row = Ti.UI.createTableViewRow({
			height : 80,
			backgroundColor : 'transparent',
			hasChild : true,
			rightImage : '/images/android/arrow.png'
		});

		var trackName = files[i].toString();
		
		Ti.API.warn('TName= ' + trackName);



		trackName = trackName.replace(' , [object TiBlob]', '');

		var infoDesc = Ti.UI.createLabel({
			text : trackName,
			color : 'White',
			textAlign : 'left',
			left : 10,
			top : 25,
			height : 'auto',
			font : {
				fontWeight : 'bold',
				fontSize : '13dp'
			}
		});

		Ti.API.warn('Dir is ' + dir.name);
		row.add(infoDesc);

		tableData[i] = row;

	}

	tableview = Titanium.UI.createTableView({
		data : tableData,
		height : 280,
		top : 80,
		separatorColor : '#C9EE00',
		backgroundColor : 'transparent'
	});

	tableview.addEventListener('click', function(e) {

		var index = e.index;
		var section = e.section;
		var row = e.row;
		var rowdata = e.rowData;

		showPlay();

		soundFile = Titanium.Filesystem.getFile(dir.resolve(), files[e.index]);

		soundFile.nativePath

		player = Ti.Media.createSound({
			url : soundFile
		});

		Ti.API.warn('Sound is: ' + soundFile.nativePath);

		//springPlayer();

	});

	Titanium.UI.currentWindow.add(tableview);

}

function showPlay() {
	win.add(btnPlay);
}

btnPlay = Titanium.UI.createButton({
	top : 35,
	left : 10,
	width : 300,
	height : 40,
	color : textColor,
	title : 'Play',
	font : {
		fontSize : 15,
		fontFamily : 'Arial',
		fontWeight : 'bold'
	},
	backgroundImage : '/images/blank.png',
	zIndex : 2

});

btnPlay.addEventListener('click', function(e) {

	if (btnPlay.title == 'Play') {
		springPlayer();
		btnPlay.title = 'Pause';
	} else {
		btnPlay.title = 'Play';
		stopPlayer();
	}

});

function springPlayer() {

	player.play();

}

function stopPlayer() {

	player.pause();

}

btnLib = Titanium.UI.createButton({
	bottom : 5,
	left : 10,
	width : 300,
	height : 40,
	color : textColor,
	title : 'Streaming',
	font : {
		fontSize : 15,
		fontFamily : 'Arial',
		fontWeight : 'bold'
	},
	backgroundImage : '/images/blank.png',
	zIndex : 2

});

win.add(btnLib);

btnLib.addEventListener('click', function(e) {
	win.close();
})

