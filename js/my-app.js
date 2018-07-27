var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  // ... other parameters
});

var mainView = app.views.create('.view-main');

var notificationClickToClose = app.notification.create({
  title: 'Walkover',
  titleRightText: new Date().getHours()+" : "+new Date().getMinutes(),
  subtitle: 'Reminder',
  text: 'We will remind you about a message',
  closeOnClick: true,
  closeTimeout: 3000
})

var clicked=0
  function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    // device APIs are available
    //
    function onDeviceReady() {
        // Register the event listener
        document.addEventListener("backbutton", onBackKeyDown, false);

        window.FirebasePlugin.getToken(function(token) {
    // save this server-side and use it to push notifications to this device
        uodateToken(token)
        //alert('Token '+token);

    }, function(error) {
        //alert('Error '+error);
    });

        window.FirebasePlugin.onTokenRefresh(function(token) {
    // save this server-side and use it to push notifications to this device
       updateToken(token)
    }, function(error) {
       // alert('Refresh Token error'+error);
    });

        window.FirebasePlugin.onNotificationOpen(function(notification) {
          alert(JSON.strngify(notification))
         // openTab('"'+notification.click_action+'"')
        //alert('Notification '+notification);
    }, function(error) {
        //alert('Not error '+error);
    });


        /*****************Local notification********/

      cordova.plugins.notification.local.hasPermission(function(granted){
      if(granted == true)
      {
        console.log('Granted')
      }
      else
      {
        cordova.plugins.notification.local.registerPermission(function(granted) {
            if(granted == true)
            {
              console.log('Granted')
            }
            else
            {
              alert('Denied')
              navigator.notification.alert("Reminder cannot be added because app doesn't have permission");
            }
        });
      }
    });

    }

    // Handle the back button
    //
    function onBackKeyDown() {
      if(clicked==0) {
        window.plugins.appMinimize.minimize();
      }
      else if(clicked==1 || clicked==2 || clicked==4) {
      $('.first_tab')[0].click()
        clicked=0
      }
      else if(clicked==3) {
      $('.second_tab')[0].click()  
        clicked==1
      }
    }

  function updateCount(val) {
    clicked=val
  }


  function updateToken(token) {
    var gcmKey=gcmRef.push({[my_number]:token,isActive:true}).key
    //console.log(gcmKey)
    gcmRef.child(my_number).set({gcmID:token,isActive:true})
    gcmRef.child(gcmKey).remove()
  }

  function schedule(id,title,message,time) {
    var sound='file://to-the-point.mp3'
    try {
        var time=new Date(time)
       cordova.plugins.notification.local.schedule({
        id: id,
        title: title,
        text: message,
        at: time,
        sound:sound,
        vibrate:true
    });
    } catch (error) {
      alert(error)
    } 
  }