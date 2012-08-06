/**
 * @author Justin Howard - GDS 1.0 01/July/2012 - Knight Application Systems
 */

var win;

var lblDescription;
var lblTweet;
var scrollView;
var btnNowPlaying;

//Window Loading section
win = Titanium.UI.currentWindow;
win.backgroundImage = '../images/background.png'

win.title = 'TWEET';

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

lblTweet = Titanium.UI.createLabel({
	top : 10,
	left : 10,
	height : 'auto',
	width : 'auto',
	text : win.tweet,
	color : 'White'
});

lblDescription = Titanium.UI.createLabel({
	top : 130,
	left : 10,
	height : 'auto',
	width : 'auto',
	text : win.desc,
	color : 'White',
	font : {
		fontStyle : 'italic'
	}
});

scrollView.add(lblTweet);
scrollView.add(lblDescription);
win.add(scrollView);
