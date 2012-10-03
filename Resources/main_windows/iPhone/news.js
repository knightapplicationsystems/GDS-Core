//iPhone Only, for iPad UI please go to /main_windows/iPad/audio_ipad.js for Android UI please go to /main_windows/android/audio.js or /audioTablet.js

var win;
var data = [];
var news;
var row;
var rssItems = [];
var failureMessage;
var btnRetry;
var lblUnableToConnect;
var actInd;
var adView;
var btnNowPlaying;
var imgNav;
var borders;
var textColor;
var lblUnableToConnect;
var btnRetry;

//****************** UI Load **************************************
//Window Loading section
win = Titanium.UI.currentWindow;
loadConfig();
Ti.API.warn('News Page Load');

//Read Config File
function loadConfig() {

	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'config/config.xml');
	//Ti.API.warn(file);
	var xmltext = file.read().text;
	//Ti.API.warn(xmltext);
	var doc = Ti.XML.parseString(xmltext);

	var newsElement = doc.documentElement.getElementsByTagName("feed");
	var styleElement = doc.documentElement.getElementsByTagName("colorScheme");

	for (var i = 0; i < newsElement.length; i++) {
		var item = newsElement.item(i);
		//Ti.API.warn(item);

		news = item.getAttributes().getNamedItem("url").nodeValue;

	}

	for (var i = 0; i < styleElement.length; i++) {
		var item = styleElement.item(i);
		//Ti.API.warn(item);

		borders = item.getAttributes().getNamedItem("borderColor").nodeValue;
		textColor = item.getAttributes().getNamedItem("textColor").nodeValue;

	}
}

//Window Loading section

//Background Image
win.backgroundImage = "/images/background.png";

//Load Advert View
adView = Titanium.UI.iOS.createAdView({
	width : 'auto',
	height : 50,
	bottom : 0,
	zIndex : 10
});
win.add(adView);

//Bar image
win.barImage = '/images/header.png';

//Nav Image
imgNav = Ti.UI.createLabel({
	top : 0,
	height : '30dp',
	width : '320dp',
	left : 0,
	textAlign : 'center',
	color : 'white',
	backgroundImage : '/images/news.png'
});

win.add(imgNav);

getNews();

function getNews() {

	var xhr = Ti.Network.createHTTPClient();
	Titanium.API.info(news);
	xhr.open("GET", news);
	xhr.onload = serviceResponse;
	xhr.onerror = serviceError;

	xhr.send();
}

function serviceResponse() {

	var doc = this.responseXML.documentElement;

	var items = doc.getElementsByTagName("item");
	var x = 0;
	Ti.API.warn(this.responseXML.documentElement);
	Ti.API.warn("Received document response with " + items.length + " items");
	Ti.API.warn(items);

	for (var c = 0; c < items.length; c++) {

		Ti.API.warn("Processing Item " + c);

		var row = Ti.UI.createTableViewRow({
			height : 80,
			backgroundColor : 'transparent',
			hasChild : true,
			rightImage : '/images/arrow.png'
		});

		Ti.API.warn("Created Table Row");

		var item = items.item(c);

		var rss = {
			title : item.getElementsByTagName("title").item(0).text,
			description : item.getElementsByTagName("description").item(0).text,
			link : item.getElementsByTagName("link").item(0).text
		};

		Ti.API.warn("Created RSS Object: " + rss);

		rssItems[c] = rss;

		Ti.API.warn("Captured Item Description: " + rss.description);

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

		Ti.API.warn("Created Table Row Label");

		row.add(label);

		data[x++] = row;

		Ti.API.warn("Finished loop for item " + c);
	}

	var tableview = Titanium.UI.createTableView({
		data : data,

		height : 280,
		separatorColor : borders,
		backgroundColor : 'transparent'
	});

	tableview.top = 31;

	Titanium.UI.currentWindow.add(tableview);

	Ti.API.warn("All added to window. Rss items array as " + rssItems.length + " items in it");

	tableview.addEventListener('click', function(e) {

		Ti.API.warn("Listener Index Clicked: " + e.index);

		var newsDetail = Titanium.UI.createWindow({
			url : 'news_view.js'
		});

		var newsDetailUrl = rssItems[e.index].link;

		//newsDetail.newDescription = rssItems[e.index].content;

		newsDetail.linkURL = newsDetailUrl;

		Titanium.UI.currentTab.open(newsDetail, {
			animated : true
		});

	});
}

//This is called if we can't get the host response
function serviceError() {
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
		backgroundImage:'/images/blank.png'

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
