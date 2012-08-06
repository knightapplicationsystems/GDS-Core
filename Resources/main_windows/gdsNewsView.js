/**
 * @author Justin Howard - GDS 1.0 01/July/2012 - Knight Application Systems
 */

var win;
var str;
var lblDescription;
var scrollView;
var btnNowPlaying;

//Window Loading section
win = Titanium.UI.currentWindow;
win.backgroundImage = '../images/background.png'

win.title = 'NEWS';
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

			db.close();
		}
		if (checkPlayback.field(1) == 'No') {
			Ti.API.warn('Nothing is playing so I should be vanished');
			win.setRightNavButton(null);

		}
	}

}
scrollView = Titanium.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	top : 0,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true
});

Ti.API.warn(win.newDescription);

str = win.newDescription;
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

lblDescription = Titanium.UI.createLabel({
	top : -15,
	left : 10,
	height : 'auto',
	width : 'auto',
	text : str,
	color : 'White'
});

scrollView.add(lblDescription);
win.add(scrollView);

