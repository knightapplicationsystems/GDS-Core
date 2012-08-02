/**
 * @author Justin Howard - GDS 1.0 01/July/2012 - Knight Application Systems
 */

var win;
var data = [];
var row;
var rssItems = [];
var failureMessage;
var btnRetry;
var lblUnableToConnect;
var actInd;
var adView;
var btnNowPlaying;
var imgNav;

//Window Loading section
win = Titanium.UI.currentWindow;
win.backgroundImage = '../images/background.png'

//Create DB
var db;
//DB Load Events
db = Titanium.Database.open('global');
Ti.API.warn('DB OPEN');
db.execute('CREATE TABLE IF NOT EXISTS playing (ID,isPlaying)');
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

failureMessage = Titanium.UI.createAlertDialog({
	title : 'Alert',
	message : 'Alert Message'
});

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

getNews();
if (Titanium.Platform.name == 'android') {
	win.title = 'News';
} else {

	if (Ti.Platform.osname == 'ipad') {
		win.barImage = '../images/gds_iPad_HEADER.png';

	}
	else
	{
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
			backgroundImage : '../images/gds_iPad_news.png'
		});
	}
else
{
	imgNav = Ti.UI.createLabel({
		top : 0,
		height : 50,
		left : 0,
		backgroundImage : '../images/NAV_Header_NEWS.png'
	});
}
	

	win.add(imgNav);

}

function getNews() {
	if (Titanium.Platform.name == 'android') {

	} else {
		showIndicator();
	}
	var xhr = Ti.Network.createHTTPClient();

	xhr.open("GET", "http://www.globaldancesession.com/rss/");
	xhr.onload = serviceResponse;

	xhr.onerror = function() {
		if (Titanium.Platform.name == 'android') {

		} else {
			hideIndicator();
		}

		Titanium.API.info('Am I dead yet?');
		//hideIndicator();

		Ti.API.info("Error in webserver");

		failureMessage.message = "Unable to connect to News Feed, Please try again later (For best results use a 3G or WiFi connection)";
		failureMessage.show();

		lblUnableToConnect = Titanium.UI.createLabel({
			text : 'Sorry we are unable to connect you to the news at this time, please try again later',
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
					fontSize : 30,
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}

			});
		} else {
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
		}
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

			getNews();
		});

		//return;
	}
	xhr.send();
}

function serviceResponse() {

	var doc = this.responseXML.documentElement;
	var items = doc.getElementsByTagName("item");
	var x = 0;

	Ti.API.warn("Received document response with " + items.length + " items");

	for (var c = 0; c < items.length; c++) {

		Ti.API.warn("Processing Item " + c);

		var row = Ti.UI.createTableViewRow({
			height : 80,
			backgroundColor : 'transparent',
			hasChild : true,
			rightImage : '../images/Arrow.png'
		});

		if (Ti.Platform.osname == 'ipad') {
			row.height = 80;

		}

		Ti.API.warn("Created Table Row");

		var item = items.item(c);

		var rss = {
			title : item.getElementsByTagName("title").item(0).text,
			description : item.getElementsByTagName("description").item(0).text
		};

		Ti.API.warn("Created RSS Object: " + rss);

		rssItems[c] = rss;

		Ti.API.warn("Captured Item Description: " + rss.description);

		if (Titanium.Platform.name == 'android') {
			row.height = 'auto';
			var label = Ti.UI.createLabel({
				text : rss.title,
				color : 'White',
				textAlign : 'left',
				left : 10,
				top : 8,
				height : 'auto',
				font : {
					fontWeight : 'bold',
					fontSize : 25
				}
			});
		} else if (Ti.Platform.osname == 'ipad') {
				var label = Ti.UI.createLabel({
				text : rss.title,
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
			var label = Ti.UI.createLabel({
				text : rss.title,
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

		Ti.API.warn("Created Table Row Label");

		row.add(label);

		data[x++] = row;

		Ti.API.warn("Finished loop for item " + c);
	}

	var tableview = Titanium.UI.createTableView({
		data : data,
		
		height : 280,
		separatorColor : '#C9EE00',
		backgroundColor : 'transparent'
	});
	if (Ti.Platform.osname == 'ipad') {
		
		tableview.height = 770;
		tableview.top = 70;

	}
	else
	{
		tableview.top = 31;
	}
	if (Titanium.Platform.name == 'android') {
		tableview.top = 0;
	} else {
		hideIndicator();
	}

	Titanium.UI.currentWindow.add(tableview);

	Ti.API.warn("All added to window. Rss items array as " + rssItems.length + " items in it");

	tableview.addEventListener('click', function(e) {

		Ti.API.warn("Listener Index Clicked: " + e.index);

		var newsDetail = Titanium.UI.createWindow({
			url : 'gdsNewsView.js'
		});

		newsDetail.newDescription = rssItems[e.index].description;
		Ti.API.warn(rssItems[e.index].description);

		Titanium.UI.currentTab.open(newsDetail, {
			animated : true
		});

	});
}

