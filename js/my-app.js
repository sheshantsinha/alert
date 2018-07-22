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
  ],
  // ... other parameters
});

var mainView = app.views.create('.view-main');


var clicked=0
  function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    // device APIs are available
    //
    function onDeviceReady() {
        // Register the event listener
        document.addEventListener("backbutton", onBackKeyDown, false);
    }

    // Handle the back button
    //
    function onBackKeyDown() {
      if(clicked != 0) {
        app.addView('#tab-1')
        clicked=0
      } else {
        window.plugins.appMinimize.minimize();
      }
    }

  function updateCount(val) {
    clicked=val
  }