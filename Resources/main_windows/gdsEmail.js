/**
 * @author Justin Howard - GDS 1.0 01/July/2012 - Knight Application Systems
 */

var win;
var lblRadio;
var lblEvents;
var lblPromo;
var adView;
var db;
var btnNowPlaying;
var btnFB;
var btnTwit;
var fbLogin;

//Window Loading section
win = Titanium.UI.currentWindow;
win.backgroundImage = '../images/background.png'
if (Titanium.Platform.name == 'android') {
	try {
		win.title = 'News';
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
			height:'75dp',
			width:'480dp'//optional -  Link text color
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
} else {
	btnNowPlaying = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.PLAY,
		height : 40,
		top : 160,
		right : 10
	});

	win.addEventListener('focus', function() {
		checkPlaying();
	});
	function checkPlaying() {
		db = Titanium.Database.open('global');
		var checkPlayback = db.execute('SELECT * FROM playing');

		if (checkPlayback.field(1) == 'Yes') {
			Ti.API.warn('I am here WHY!!!');
			var tabGroup = Titanium.UI.currentTabGroup;

			win.rightNavButton = btnNowPlaying;
			btnNowPlaying.addEventListener('click', function(e) {
				tabGroup.tabs[1].active = true;
			});

		}
		if (checkPlayback.field(1) == 'No') {
			Ti.API.warn('Nothing is playing so I should be vanished');
			win.setRightNavButton(null);

		}
		db.close();
	}

}
if (Titanium.Platform.name == 'android') {
	isAndroid = true;
	Ti.API.info('Is this cheese?');
	win.title = 'Email Us';
} else {

	if (Ti.Platform.osname == 'ipad') {
		win.barImage = '../images/gds_iPad_HEADER.png';

	} else {
		win.barImage = '../images/GDS_APP_HEADER.png';
	}
	adView = Titanium.UI.iOS.createAdView({
		width : 'auto',
		height : 50,
		bottom : 0
	});
	win.add(adView);
	if (Ti.Platform.osname == 'ipad') {

		imgNav = Ti.UI.createLabel({
			top : 0,
			height : 50,
			left : 0,
			backgroundImage : '../images/gds_iPad_emailus.png'
		});
	} else {
		imgNav = Ti.UI.createLabel({
			top : 0,
			height : 50,
			left : 0,
			backgroundImage : '../images/NAV_Header_EMAIL.png'
		});
	}

	win.add(imgNav);
}

if (Ti.Platform.osname == 'ipad') {
	lblRadio = Titanium.UI.createLabel({
		text : 'RADIO STATIONS \nWant to air GDS on your frequency? ',
		height : 'auto',
		top : 80,
		left : 10,
		color : 'White',
		font : {
			fontSize : 20,
			fontStyle : 'normal'
		},
		textAlign : 'left'
	});
} 
else if (Ti.Platform.name == 'android')
{
	lblRadio = Titanium.UI.createLabel({
		text : 'RADIO STATIONS \nWant to air GDS on your frequency? ',
		height : 'auto',
		top : 50,
		left : 10,
		color : 'White',
		font : {
			fontSize : '18dp',
			fontStyle : 'normal'
		},
		textAlign : 'left'
	});
}

else {
	lblRadio = Titanium.UI.createLabel({
		text : 'RADIO STATIONS \nWant to air GDS on your frequency? ',
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
}

lblRadio.addEventListener('click', function(e) {
	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.toRecipients = ['radio@globaldancesession.com'];
	emailDialog.open();
});
if (Ti.Platform.osname == 'ipad') {
	lblEvents = Titanium.UI.createLabel({
		text : 'EVENTS \nWant to put on a GDS event at your venue? ',
		height : 'auto',
		top : 230,
		left : 10,
		color : 'White',
		font : {
			fontSize : 20,
			fontStyle : 'normal'
		},
		textAlign : 'left'
	});
} 
else if (Ti.Platform.name == 'android')
{
	lblEvents = Titanium.UI.createLabel({
		text : 'EVENTS \nWant to put on a GDS event at your venue? ',
		height : 'auto',
		top : 65,
		left : 10,
		color : 'White',
		font : {
			fontSize : '18dp',
			fontStyle : 'normal'
		},
		textAlign : 'left'
	});
}

else {
	lblEvents = Titanium.UI.createLabel({
		text : 'EVENTS \nWant to put on a GDS event at your venue? ',
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
}
lblEvents.addEventListener('click', function(e) {
	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.toRecipients = ['events@globaldancesession.com'];
	emailDialog.open();
});
if (Ti.Platform.osname == 'ipad') {
	lblPromo = Titanium.UI.createLabel({
		text : 'PROMOS \nWant us to consider your tracks for GDS? (No attachments, just links please)',
		height : 'auto',
		top : 380,
		left : 10,
		color : 'White',
		font : {
			fontSize : 20,
			fontStyle : 'normal'
		},
		textAlign : 'left'
	});
} 
else if (Ti.Platform.name == 'android')
{
		lblPromo = Titanium.UI.createLabel({
		text : 'PROMOS \nWant us to consider your tracks for GDS? (No attachments, just links please)',
		height : 'auto',
		top : 80,
		left : 10,
		color : 'White',
		font : {
			fontSize : '18dp',
			fontStyle : 'normal'
		},
		textAlign : 'left'
	});
}

else {
	lblPromo = Titanium.UI.createLabel({
		text : 'PROMOS \nWant us to consider your tracks for GDS? (No attachments, just links please)',
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
}
lblPromo.addEventListener('click', function(e) {
	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.toRecipients = ['promo@globaldancesession.com'];
	emailDialog.open();
});

var lblFB = Titanium.UI.createLabel({
	top : 230,
	height : 'auto',
	left : 50,
	color : 'White',
	font : {
		fontSize : 13,
		fontStyle : 'normal'
	},
	text : 'Like us on Facebook'

});

btnFB = Titanium.UI.createButton({
	top : 225,
	height : 27,
	width : 27,
	left : 10,
	backgroundImage : '../images/fb_.png'

});

/*
 fbLogin = Titanium.Facebook.createLoginButton({
 'style':'wide',
 'apikey':'149e793a30b220f5466bbc4282b4e9b6',
 'secret':'f754ce3d1e6450ade6dd5fd6a42091b5',
 top:225,
 left:5
 });
 Titanium.Facebook.appid = '201157783235797';

 */

btnFB.addEventListener('click', function(e) {

	/*
	 var webView = Titanium.UI.createWindow({
	 url : 'gdsWebView.js'
	 });
	 webView.parsedURI = 'http://www.facebook.com/globaldance';

	 Titanium.UI.currentTab.open(webView, {
	 animated : true
	 });
	 */
	Titanium.Platform.openURL('http://www.facebook.com/globaldance');

});
if (Ti.Platform.osname == 'ipad') {
	btnTwit = Titanium.UI.createButton({
		top : 530,
		height : 27,
		width : 27,
		left : 10,
		backgroundImage : '../images/twit_.png'

	});
	var lblTwit = Titanium.UI.createLabel({
		top : 535,
		height : 'auto',
		left : 50,
		color : 'White',
		font : {
			fontSize : 20,
			fontStyle : 'normal'
		},
		text : 'Follow us on Twitter'

	});
} else {
	btnTwit = Titanium.UI.createButton({
		top : 250,
		height : 27,
		width : 27,
		left : 10,
		backgroundImage : '../images/twit_.png'

	});
	
	if (Titanium.Platform.name == 'android') {
			var lblTwit = Titanium.UI.createLabel({
			top : 255,
			height : 'auto',
			left : 50,
			color : 'White',
			font : {
				fontSize : '13dp',
				fontStyle : 'normal'
			},
			text : 'Follow us on Twitter'
	
		});
	}
	else
	{
		var lblTwit = Titanium.UI.createLabel({
			top : 255,
			height : 'auto',
			left : 50,
			color : 'White',
			font : {
				fontSize : 13,
				fontStyle : 'normal'
			},
			text : 'Follow us on Twitter'
	
		});
	}
}

btnTwit.addEventListener('click', function(e) {

	/*
	 var webView = Titanium.UI.createWindow({
	 url:'gdsWebView.js'
	 });
	 webView.parsedURI = 'http://www.twitter.com/globaldancesess';

	 Titanium.UI.currentTab.open(webView, {
	 animated:true
	 });
	 */
	Titanium.Platform.openURL('http://www.twitter.com/globaldancesess');

});

if (Titanium.Platform.name == 'android') {

	lblEvents.top = '115dp';

	lblPromo.top = '205dp';

	lblTwit.top='312dp';
	btnTwit.top='315dp';
}

win.add(lblRadio);
win.add(lblEvents);
win.add(lblPromo);
//win.add(btnFB);
win.add(btnTwit);
win.add(lblTwit);
//win.add(lblFB);
//win.add(fbLogin);

