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


var $$ = Dom7;

// Create full-layout notification
var notificationFull = app.notification.create({
  icon: '<i class="icon demo-icon">7</i>',
  title: 'Framework7',
  titleRightText: 'now',
  subtitle: 'This is a subtitle',
  text: 'This is a simple notification message',
  closeTimeout: 3000,
});

var mainView = app.views.create('.view-main');


  function onLoad() {
        var number=window.localStorage.getItem('mobile')
        var login=window.localStorage.getItem('login')
        console.log(number)
        if(number != null) {
          window.location.href='index.html'
        } else {
           document.addEventListener("deviceready", onDeviceReady, false);
        }
    }

    // device APIs are available
    //
    function onDeviceReady() {
        // Register the event listener
        document.addEventListener("backbutton", onBackKeyDown, false);
    }

    // Handle the back button
    //
