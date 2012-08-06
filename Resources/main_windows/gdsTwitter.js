/**
 * @author Justin Howard - GDS 1.0 01/July/2012 - Knight Application Systems
 */

var win;
var row;
var tableData = [];
var tableview;
var failureMessage;
var btnRetry;
var lblUnableToConnect;
var actInd;
var adView;
var btnNowPlaying;
var db;
var imgNav;

//Window Loading section
win = Titanium.UI.currentWindow;
win.backgroundImage = '../images/background.png'

failureMessage = Titanium.UI.createAlertDialog({
	title : 'Alert',
	message : 'Alert Message'
});
if (Titanium.Platform.name == 'android') {
} else {
	db = Titanium.Database.open('global');

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
//Activity Indicator
function showIndicator() {
	actInd = Ti.UI.createActivityIndicator({
		style : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		message : 'Please Wait..',
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

function getTweets() {
	if (Titanium.Platform.name == 'android') {

	} else {
		showIndicator();
	}

	var data = [];

	var xhr = Ti.Network.createHTTPClient();

	xhr.onload = serviceResponse;

	xhr.onerror = function() {
		hideIndicator();
		Titanium.API.info('Am I dead yet?');
		//hideIndicator();

		Ti.API.info("Error in webserver");

		failureMessage.message = "Unable to connect to Twitter, Please try again later (For best results use a 3G or WiFi connection)";
		failureMessage.show();

		lblUnableToConnect = Titanium.UI.createLabel({
			text : 'Sorry we are unable to connect you to twitter at this time, please try again later',
			height : 'auto',
			top : 80,
			left : 10,
			color : 'White',
			font : {
				fontSize : 15,
				fontStyle : 'normal'
			},
			textAlign : 'left'
		});
		if (Titanium.Platform.name == 'android') {
			btnRetry = Titanium.UI.createButton({
				top : 200,
				left : 10,
				width : 300,
				height : 40,
				color : 'black',
				text : 'Retry',
				font : {
					fontSize : '30dp',
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}

			});
		}

		btnRetry = Titanium.UI.createButtonBar({
			top : 170,
			left : 10,
			width : 300,
			height : 40,
			labels : ['Retry'],
			style : Titanium.UI.iPhone.SystemButtonStyle.BAR,
			font : {
				fontSize : 15,
				fontFamily : 'Arial',
				fontWeight : 'bold'
			}

		});

		win.add(btnRetry, lblUnableToConnect);

		btnRetry.addEventListener('click', function(e) {
			Titanium.API.info('FIred');

			if (lblUnableToConnect.visible = true) {
				Titanium.API.info('Idiot');
				lblUnableToConnect.visible = false;
			}
			if (btnRetry.visible = true) {
				Titanium.API.info('Idiot2');
				btnRetry.visible = false;
			}
			//url = env + "/api/venues?loc=" + geoLat + "," + geoLong + "&limit=" + 50;
			getTweets();
		});

		//return;
	}

	xhr.timeout = 1000000;
	xhr.open("GET", "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=@GlobalDanceSess");
	xhr.send();

}

function serviceResponse() {
	Ti.API.info(this.responseText);

	var tweets;

	tweets = JSON.parse(this.responseText);

	Ti.API.warn(tweets);

	for (var i in tweets) {
		row = Ti.UI.createTableViewRow({
			height : 36,
			backgroundColor : 'transparent',
			selectedBackgroundColor : '#dddddd',
			hasChild : true,
			rightImage : '../images/Arrow.png'
		});

		if (Ti.Platform.osname == 'ipad') {
			row.height = 80;

		}

		if (Titanium.Platform.name == 'android') {
			row.height = 80;
			var tweetText = Ti.UI.createLabel({
				text : tweets[i].text,
				color : 'White',
				textAlign : 'left',
				left : 10,
				top : 8,
				height : 'auto',
				font : {
					fontWeight : 'bold',
					fontSize : '13dp'
				}
			});
		} else if (Ti.Platform.osname == 'ipad') {
			var tweetText = Ti.UI.createLabel({
				text : tweets[i].text,
				color : 'White',
				textAlign : 'left',
				left : 10,
				top : 8,
				height : 'auto',
				font : {
					fontWeight : 'bold',
					fontSize : 20
				}
			});

		} else {
			var tweetText = Ti.UI.createLabel({
				text : tweets[i].text,
				color : 'White',
				textAlign : 'left',
				left : 10,
				top : 8,
				height : 18,
				font : {
					fontWeight : 'bold',
					fontSize : 13
				}
			});

		}

		Ti.API.warn(tweets[i].text);
		row.add(tweetText);

		tableData[i] = row;

	}

	tableview = Titanium.UI.createTableView({
		data : tableData,
		height : 280,
		separatorColor : '#C9EE00',
		backgroundColor : 'transparent'
	});
	if (Ti.Platform.osname == 'ipad') {
		tableview.height = 770;
		tableview.top = 70;
	} else {
		tableview.top = 31;
	}
	if (Titanium.Platform.name == 'android') {
		tableview.top = 5;
		tableview.height = 'auto';
	} else {
		hideIndicator();
	}

	Titanium.UI.currentWindow.add(tableview);

	tableview.addEventListener('click', function(e) {

		var index = e.index;
		var section = e.section;
		var row = e.row;
		var rowdata = e.rowData;

		var viewTweets = Titanium.UI.createWindow({
			url : 'gdsViewTweet.js'
		});

		viewTweets.tweet = tweets[e.index].text;
		viewTweets.desc = tweets[e.index].user.description;

		Titanium.UI.currentTab.open(viewTweets, {
			animated : true
		});

	});

}

getTweets();
if (Titanium.Platform.name == 'android') {

} else {

	if (Ti.Platform.osname == 'ipad') {
		win.barImage = '../images/gds_iPad_HEADER.png';

	} else {
		win.barImage = '../images/GDS_APP_HEADER.png';
	}
	adView = Titanium.UI.iOS.createAdView({
		width : 'auto',
		height : 50,
		bottom : 0,
		zIndex : 20
	});
	win.add(adView);
	if (Ti.Platform.osname == 'ipad') {

		imgNav = Ti.UI.createLabel({
			top : 0,
			height : 50,
			left : 0,
			backgroundImage : '../images/gds_iPad_twitter.png'
		});
	} else {
		imgNav = Ti.UI.createLabel({
			top : 0,
			height : 50,
			left : 0,
			backgroundImage : '../images/NAV_Header_TWITTER.png'
		});
	}

	win.add(imgNav);
	// create and add toolbar

}

