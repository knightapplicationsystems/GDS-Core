

var win;
var lblTrackName;
var lblTrackDesc;
var alertMessage;
var pbStream;
var btnBack;
var arePlaying = false;
var scrollView;
var sound;
var fStripped;
var btnPlay;
var btnStop;
var db;

//Window Loading section
win = Titanium.UI.currentWindow;
win.backgroundImage = '/images/background.png'
Ti.Media.defaultAudioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;

win.title = 'SHOW';

alertMessage = Titanium.UI.createAlertDialog({
	title : 'GDS',
	message : 'Alert Message'
});

scrollView = Titanium.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	top : 0,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true
});
if (win.trackTitle == null) {
	win.trackTitle = 'GDS';
}
var preStrippedText;
preStrippedText = win.trackTitle;
var strippedText = preStrippedText.replace('Global Dance Session', '');
fStripped = strippedText.replace(' on', '');
var moreStripped = fStripped.replace(' ', '');

var str = win.trackTitle;
str = str.replace(/<br>/gi, "\n");
str = str.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1) ");
str = str.replace(/<(?:.|\s)*?>/g, "");
str = str.replace(/\&amp;/g, '&');
str = str.replace(/\#/g, '');
str = str.replace(/&8216/g, '');
str = str.replace(/&8217/g, '');
str = str.replace(/&8211/g, '');
str = str.replace(/&8221/g, '');
str = str.replace(/;/g, '');

if (win.trackDesc == null) {
	win.trackDesc = 'GDS - Show';
}

var strDesc = win.trackDesc;
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

lblTrackDesc = Titanium.UI.createLabel({
	top : '110dp',
	left : 10,
	height : 'auto',
	width : 'auto',
	text : strDesc,
	font : {
		fontSize : '13dp',
		fontFamily : 'Arial',
	},
	color : 'White'
});

sound = Ti.Media.createAudioPlayer({
	url : win.scURL + '?client_id=7a0984726d0eefbb310771c4c02116a8',
	allowBackground : true
});

btnPlay = Titanium.UI.createButton({
	top : 10,
	left : 10,
	backgroundImage : '/images/blank.png',
	title:'Play',
	height : '60dp',
	width : '300dp'
});
scrollView.add(btnPlay);

sound.autoplay = false;

if (Titanium.Platform.name == 'android') {

	btnPlay.addEventListener('click', function(e) {
		if (sound.playing) {
			btnPlay.title = 'Pause';
			sound.pause();
		} else {
			alertMessage.message = 'Do not hit Back button unless you want to stop playback';
			alertMessage.ok = 'Ok';
			alertMessage.show();
			sound.start();
		}
	});
}

scrollView.add(lblTrackDesc);

win.addEventListener('close', function(e) {
	if (Ti.Platform.osname === 'android') {
		sound.release();
	}
});

win.add(scrollView); 