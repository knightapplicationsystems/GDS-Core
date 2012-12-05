//iPad Only, for iPhone UI please go to /main_windows/iPad/audio.js for Android UI please go to /main_windows/android/audio.js or android/tablet/audio.js

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
win.backgroundImage = "/images/tablet/background.png";


btnRefresh = Ti.UI.createButton({
	image:'/images/arrow_circle_right.png',
	top:15,
	right:10,
	height:'25dp',
	width:'25dp',
	zIndex:20
})

btnRefresh.addEventListener('click', function(e){
	data = [];
	win.remove(tableview);
	//showIndicator();
	getNews();
});

win.add(btnRefresh);

//Bar image
win.barImage = '/images/tablet/header.png';

//Header & Navigation Bar Image Load (iPhone/iPod and iPad)
imgNav = Ti.UI.createLabel({
	top : 0,
	text : 'NEWS',
	height : '60dp',
	width : '768dp',
	left : 0,
	textAlign : 'center',
	color : 'black',
	backgroundImage : '/images/tablet/blank.png',
	font : {
		fontWeight : 'bold',
		fontStyle : 'Sans Serif',
		fontSize : 25
	}
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
			top : 30,
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
		top:60,
		height : 'auto',
		separatorColor : borders,
		backgroundColor : 'transparent'
	});

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
		top : 150,
		width:748,
		left : 10,
		color : 'White',
		font : {
			fontSize : 20,
			fontStyle : 'normal',
			fontWeight:'bold'
		},
		textAlign : 'center'
	});

	btnRetry = Titanium.UI.createButton({
		top : 300,
		left : 10,
		width : 748,
		height : 60,
		color : textColor,
		title : 'Retry',
		font : {
			fontSize : 20,
			fontFamily : 'Arial',
			fontWeight : 'bold'
		},
		backgroundImage : '/images/tablet/blank.png'

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

