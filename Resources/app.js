// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('Black');

// create tab group
var tabGroup = Titanium.UI.createTabGroup(
		{
			barColor:'Black'
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



var winAudio = Titanium.UI.createWindow({  
	url:'main_windows/gdsAudio.js'
});
var tab1 = Titanium.UI.createTab({  
    icon:'gds_listen_2.png',
    title:'Shows',
    window:winAudio
});

var winNews = Titanium.UI.createWindow({  
	url:'main_windows/gdsNews.js'
});
var tab2 = Titanium.UI.createTab({  
    icon:'gds_rss.png',
    title:'News',
    window:winNews
});

var winTwitter = Titanium.UI.createWindow({  
	url:'main_windows/gdsTwitter.js'
});
var tab3 = Titanium.UI.createTab({  
    icon:'gds_twitter.png',
    title:'Twitter',
    window:winTwitter
});

var winEmail = Titanium.UI.createWindow({  
	url:'main_windows/gdsEmail.js'
});
var tab4 = Titanium.UI.createTab({  
    icon:'gds_email.png',
    title:'Email Us',
    window:winEmail
});

if (Titanium.Platform.name == 'android') {
	tab1.icon = '/images/gds_listen_2.png';
	tab2.icon = '/images/gds_rss.png';
	tab3.icon = '/images/gds_twitter.png';
	tab4.icon = '/images/gds_email.png';
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
