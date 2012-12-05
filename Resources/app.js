// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('Black');

// create tab group
var tabGroup = Titanium.UI.createTabGroup({
	barColor : 'Black'
});
/*
if (!Ti.Network.online) {
var networkError = Titanium.UI.createAlertDialog({
title: 'GDS',
message: 'You must have a WiFi or Celluar Network Connection to use this app'

});
networkError.show();
}
*/
//
// create base UI tab and root window
//

var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'config/config.xml');
//Ti.API.warn(file);
var xmltext = file.read().text;
//Ti.API.warn(xmltext);
var doc = Ti.XML.parseString(xmltext);

var tabAudio = doc.documentElement.getElementsByTagName("tabNameAudio");

for (var i = 0; i < tabAudio.length; i++) {
	var item = tabAudio.item(i);
	//Ti.API.warn(item);

	audioTab = item.getAttributes().getNamedItem("tabAudio").nodeValue;

}

if (Titanium.Platform.osname == 'ipad') {
	var winAudio = Titanium.UI.createWindow({
		url : 'main_windows/iPad/audio.js'
	});
	var winNews = Titanium.UI.createWindow({
		url : 'main_windows/iPad/news.js'
	});
	var winYoutube = Titanium.UI.createWindow({
		url : 'main_windows/iPad/youtube.js'
	});
	var winMore = Titanium.UI.createWindow({
		url : 'main_windows/iPad/more.js'
	});

} else {
	var winAudio = Titanium.UI.createWindow({
		url : 'main_windows/iPhone/audio.js'
	});
	var winNews = Titanium.UI.createWindow({
		url : 'main_windows/iPhone/news.js'
	});
	var winYoutube = Titanium.UI.createWindow({
		url : 'main_windows/iPhone/youtube.js'
	});
	var winMore = Titanium.UI.createWindow({
		url : 'main_windows/iPhone/more.js'
	});
}

if (Titanium.Platform.name == 'android')
{
	var winAudio = Titanium.UI.createWindow({
		url : 'main_windows/android/audio.js'
	});
	var winNews = Titanium.UI.createWindow({
		url : 'main_windows/android/news.js'
	});
	var winYoutube = Titanium.UI.createWindow({
		url : 'main_windows/android/youtube.js'
	});
	var winMore = Titanium.UI.createWindow({
		url : 'main_windows/android/more.js'
	});
}

var tab1 = Titanium.UI.createTab({
	icon : 'listen.png',
	title : audioTab,
	window : winAudio
});

var tab2 = Titanium.UI.createTab({
	icon : 'rss.png',
	title : 'News',
	window : winNews
});

var tab3 = Titanium.UI.createTab({
	icon : 'youtube.png',
	title : 'YouTube',
	window : winYoutube
});

var tab4 = Titanium.UI.createTab({
	icon : 'more.png',
	title : 'More',
	window : winMore
});

//Tab Icons
if (Titanium.Platform.name == 'android') {
	tab1.icon = '/images/android/listen.png';
	tab2.icon = '/images/android/rss.png';
	tab3.icon = '/images/android/youtube.png';
	tab4.icon = '/images/android/more.png';
}


Ti.Media.defaultAudioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;

//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);

// open tab group
tabGroup.open();
