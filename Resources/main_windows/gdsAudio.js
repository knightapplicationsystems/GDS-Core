/**
 * @author Justin Howard - GDS 1.0 01/July/2012 - Knight Application Systems
 */


var win;
var actInd;
var activityWindow;
var activityBg;
var row;
var tableData = [];
var tableview;
var sound;
var alertMessage;
var fStripped;
var actInd;
var adView;
var lblUnableToConnect;
var btnRetry;
var failureMessage;
var imgNav;
//Soundcloud Client ID 7a0984726d0eefbb310771c4c02116a8


//Window Loading section
win = Titanium.UI.currentWindow;
win.backgroundImage = '../images/background.png'






//Ti.App.currentService.stop();
Ti.Media.defaultAudioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;

alertMessage = Titanium.UI.createAlertDialog({
	title: 'Alert',
	message: 'Alert Message'
});

failureMessage = Titanium.UI.createAlertDialog({
	title: 'Alert',
	message: 'Alert Message'
});




//Activity Indicator
function showIndicator() {
	actInd = Ti.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		message:'Please Wait..',
		color: 'white',
		height:60,
		width:'auto'
	});

	activityWindow = Ti.UI.createWindow({
		width: 200,
		height: 100
	});

	activityBg = Ti.UI.createView({
		backgroundColor: "#000000",
		opacity: 0.8,
		borderRadius: 10
	});

	activityWindow.add(activityBg);
	activityWindow.add(actInd);
	activityWindow.open();
	actInd.show();
}

function hideIndicator() {
	activityWindow.close();
}

callService();
if (Titanium.Platform.name == 'android') {
	win.title = 'Shows';
}
else
{
	win.barImage = '../images/GDS_APP_HEADER.png';
		if (Ti.Platform.osname == 'ipad') {
		win.barImage = '../images/gds_iPad_HEADER.png';

	}
	adView = Titanium.UI.iOS.createAdView({
	 width: 'auto',
	 height: 50,
	 bottom:0
	});
	win.add(adView);
	if (Ti.Platform.osname == 'ipad') {
		
		imgNav = Ti.UI.createLabel({
			top : 0,
			height : 50,
			left : 0,
			backgroundImage : '../images/gds_iPad_shows.png'
		});
	}
else
{
	imgNav = Ti.UI.createLabel({
		top:0,
		height:50,
		left:0,
		backgroundImage:'../images/NAV_Header_SHOWS.png'
	});
}

	
	win.add(imgNav);

}



function callService()
{
	if (Titanium.Platform.name == 'android') {
		
	}
	else
	{
		showIndicator();
	}
	
	var xhr = Titanium.Network.createHTTPClient();
	
	xhr.onload = serviceResponse;
	
	xhr.onerror = function() {
		hideIndicator();
		Titanium.API.info('Am I dead yet?');
			//hideIndicator();

			Ti.API.info("Error in webserver");

			failureMessage.message = "Unable to connect to Soundcloud, Please try again later (For best results use a 3G or WiFi connection)";
			failureMessage.show();

			lblUnableToConnect = Titanium.UI.createLabel({
			text:'Sorry we are unable to connect you to Soundcloud at this time, please try again later',
			height:'auto',
			top: 80,
			left:10,
			color:'White',
			font: {
				fontSize:15,
				fontStyle:'normal'
			},
			textAlign:'left'
		});
				if (Titanium.Platform.name == 'android') {
					btnRetry = Titanium.UI.createButton({
					top:200,
					left:10,
					width:300,
					height:40,
					color:'black',
					text:'Retry',
					font: {
						fontSize:'30dp',
						fontFamily:'Arial',
						fontWeight:'bold'
					}
		
				});
			}

		btnRetry = Titanium.UI.createButtonBar({
			top:170,
			left:10,
			width:300,
			height:40,
			labels:['Retry'],
			style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
			font: {
				fontSize:15,
				fontFamily:'Arial',
				fontWeight:'bold'
			}

		});

		win.add(btnRetry, lblUnableToConnect);

		btnRetry.addEventListener('click', function(e)
		{
				Titanium.API.info('FIred');

				if (lblUnableToConnect.visible = true)
				{
					Titanium.API.info('Idiot');
					lblUnableToConnect.visible = false;
				}
				if (btnRetry.visible = true)
				{
					Titanium.API.info('Idiot2');
					btnRetry.visible = false;
				}

			callService();
		});

			//return;
	}
	
	//var url = 'https://api.soundcloud.com/tracks?client_id=7a0984726d0eefbb310771c4c02116a8';
	var url = 'https://api.soundcloud.com/users/globaldancesession/tracks.json?client_id=7a0984726d0eefbb310771c4c02116a8';
	
	xhr.open("GET", url);
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.send();
}

function serviceResponse()
{

	Ti.API.info(this.responseText);
	
	var info;
	
	info = JSON.parse(this.responseText);
	
	Ti.API.warn(info);
	
	for (var i in info)
	{
		row = Ti.UI.createTableViewRow({
			height:36,
			backgroundColor:'transparent',
			hasChild : true,
			rightImage:'../images/Arrow.png'
		});
		
			if(Ti.Platform.osname == 'ipad'){
		row.height = 80;
		
	}
		
		var preStrippedText;
		preStrippedText = info[i].title;
		var strippedText = preStrippedText.replace ('Global Dance Session', '');
		fStripped = strippedText.replace (' on','');
		

	if (Titanium.Platform.name == 'android') {
		row.height = 80;
		var infoDesc = Ti.UI.createLabel({
			text: fStripped,
			color: 'White',
			textAlign:'left',
			left:10,
			top:8,
			height:'auto',
			font: {
				fontWeight:'bold',
				fontSize:'13dp'
			}
		});
	}
	
	
		else
		if (Ti.Platform.osname == 'ipad') {
			var infoDesc = Ti.UI.createLabel({
				text : fStripped,
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

		}

	
	else
	{
			var infoDesc = Ti.UI.createLabel({
			text: fStripped,
			color: 'White',
			textAlign:'left',
			left:10,
			top:8,
			height:18,
			font: {
				fontWeight:'bold',
				fontSize:13
			}
		});


	}
	

	
		Ti.API.warn(info[i].title);
		row.add(infoDesc);

		tableData[i] = row;
		

	}
	
	tableview = Titanium.UI.createTableView({
		data:tableData,
		height:280,
		separatorColor:'#C9EE00',
		backgroundColor:'transparent'
	});
		if(Ti.Platform.osname == 'ipad'){
		tableview.height = 770;
		tableview.top = 70;
	}
	else
	{
		tableview.top =31;
	}
	if (Titanium.Platform.name == 'android') {
		tableview.top = 0;
		tableview.height = 'auto';
	}
	else{
		hideIndicator();
	}
	
	tableview.addEventListener('click', function(e) {
		
		var index = e.index;
		var section = e.section;
		var row = e.row;
		var rowdata = e.rowData;
		
		
		var audioPlayer = Titanium.UI.createWindow({
			url:'gdsAudioPlayer.js'
		});
		
		
		var nonSecURL = info[e.index].stream_url;
		nonSecURL = nonSecURL.replace('https:', 'http:');
		Ti.API.warn('This is the URL ' + nonSecURL);
		if (Titanium.Platform.name == 'android') {
			var scUrl = nonSecURL;
		}
		else
		{
			var scUrl = info[e.index].stream_url;
		
		}
		
		
		audioPlayer.scURL = scUrl;
		audioPlayer.trackTitle = info[e.index].title;
		Ti.API.warn('Null Desc' +  info[e.index].description);
		if (info[e.index].description == "")
		{
			Ti.API.warn('Null Desc' +  info[e.index].description);
			audioPlayer.trackDesc = 'GDS - Show';
		}
		else
		{audioPlayer.trackDesc = info[e.index].description;
			}
		
		audioPlayer.trackDuration = info[e.index].duration;
		
		Titanium.UI.currentTab.open(audioPlayer, {
			animated:true
		});

		
	});
	
	Titanium.UI.currentWindow.add(tableview);
	
}



























