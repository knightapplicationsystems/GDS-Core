/**
 * @author Justin Howard - GDS 1.0 01/July/2012 - Knight Application Systems
 */


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
var db;



//Window Loading section
win = Titanium.UI.currentWindow;
win.backgroundImage = '../images/background.png'
Ti.Media.defaultAudioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;


win.title = 'SHOW';

alertMessage = Titanium.UI.createAlertDialog({
	title: 'Alert',
	message: 'Alert Message',
	buttonNames: ['No', 'Yes']
});

db = Titanium.Database.open('global');

var checkPlayback = db.execute('SELECT * FROM playing');
if (checkPlayback.field(1) == null)
{
	db.execute("INSERT INTO playing (ID,isPlaying) VALUES (1,'Yes')");
}
if (checkPlayback.field(1) == 'No')
{
	Ti.API.warn (checkPlayback.field(1));
	db.execute("UPDATE playing SET isPlaying = 'Yes' WHERE ID=1");
	db.close();
}
else if (checkPlayback.field(1) == 'Yes')
{
	Ti.API.warn (checkPlayback.field(1));
	db.execute("UPDATE playing SET isPlaying = 'No' WHERE ID=1");
	db.execute("UPDATE playing SET isPlaying = 'Yes' WHERE ID=1");
	db.close();
}



scrollView = Titanium.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	top : 0,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true
});
if (win.trackTitle == null)
{
	win.trackTitle = 'GDS';
}
var preStrippedText;
preStrippedText = win.trackTitle;
var strippedText = preStrippedText.replace ('Global Dance Session', '');
fStripped = strippedText.replace (' on','');
var moreStripped = fStripped.replace(' ', '');

var str= win.trackTitle;
str=str.replace(/<br>/gi, "\n");
str=str.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1) ");
str=str.replace(/<(?:.|\s)*?>/g, "");
str= str.replace(/\&amp;/g,'&');
str= str.replace(/\#/g,'');
str= str.replace(/&8216/g,'');
str= str.replace(/&8217/g,'');
str= str.replace(/&8211/g,'');
str= str.replace(/&8221/g,'');
str= str.replace(/;/g,'');


if (Ti.Platform.osname == 'ipad') {

	lblTrackName = Titanium.UI.createLabel({
	top:0,
	left:0,
	height:44,
	width:768,
	textAlign:5,
	text:str,
	backgroundImage : '../images/gds_iPad_blankgreen.png',
	color:'Black',
	font: {
		fontSize:18,
		fontFamily:'Arial',
			}
});
	}
else
{
lblTrackName = Titanium.UI.createLabel({
	top:0,
	left:0,
	height:30,
	width:320,
	textAlign:5,
	text:str,
	backgroundImage:'../images/NAV_Header_BLANK.png',
	color:'Black',
	font: {
		fontSize:13,
		fontFamily:'Arial',
			}
});
}

if (win.trackDesc == null)
{
	win.trackDesc = 'GDS - Show';
}

var strDesc= win.trackDesc;
strDesc=strDesc.replace(/<br>/gi, "\n");
strDesc=strDesc.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1) ");
strDesc=strDesc.replace(/<(?:.|\s)*?>/g, "");
strDesc= strDesc.replace(/\&amp;/g,'&');
strDesc= strDesc.replace(/\#/g,'');
strDesc= strDesc.replace(/&8216/g,'');
strDesc= strDesc.replace(/&8217/g,'');
strDesc= strDesc.replace(/&8211/g,'');
strDesc= strDesc.replace(/&8221/g,'');
strDesc= strDesc.replace(/&13/g,'');
strDesc= strDesc.replace(/;/g,'');


lblTrackDesc = Titanium.UI.createLabel({
	top:110,
	left:10,
	height:'auto',
	width:'auto',
	text:strDesc,
	font: {
		fontSize:13,
		fontFamily:'Arial',
		},
	color:'White'
});




Ti.API.warn (win.trackTitle);
sound = Ti.Media.createVideoPlayer({
	mediaControlStyle:Titanium.Media.VIDEO_CONTROL_DEFAULT,
	fullscreen:false,
	height:20,
	top:50,
	allowBackground:true
});


if (Titanium.Platform.name == 'android') {
	var lblTap =  Titanium.UI.createLabel({
	top:150,
	left:10,
	height:'auto',
	width:'auto',
	text:'Tap above to open player',
	color:'White'
});
	win.add(lblTap);
	
			lblTrackName.top = 220;
			lblTrackDesc.top = 310;
			sound.top=0;
			sound.visible = true;
			sound.show();
}
	//sound = Ti.Media.createAudioPlayer();
sound.url = win.scURL + '?client_id=7a0984726d0eefbb310771c4c02116a8';

sound.autoplay = false;	



win.addEventListener('close',function(e){
	db = Titanium.Database.open('global');
	db.execute("UPDATE playing SET ID = 1 WHERE ID=1");
	db.execute("UPDATE playing SET isPlaying = 'No' WHERE ID=1");
	db.close();
});

scrollView.add(sound);
scrollView.add(lblTrackName);
scrollView.add(lblTrackDesc);

btnBack = Titanium.UI.createButton({title:'Back'});
win.leftNavButton = btnBack;
Ti.API.warn(sound.playing);
if (sound.playing == 0)
{
	
}
else
{
	arePlaying = true;
}
btnBack.addEventListener('click', function(e) {
    alertMessage.message ='Closing this window will stop playback, are you sure you want to go back?';
    alertMessage.show();
    if (arePlaying = true)
    {
    alertMessage.addEventListener('click', function (e) {
			if (e.index == 0) {
				
			} else 
			{
				win.close();
			}
		});
		}
		else
		{
			win.close();
		}
});

win.add(scrollView);


















