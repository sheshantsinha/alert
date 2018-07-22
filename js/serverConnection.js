function register() {
	alert('clicked')
	        try {

            if (window.FirebasePlugin == null) {

                alert("FCMPlugin is null")

                return;

            }

             window.FirebasePlugin.getToken(function (token) {

                //”token” received from FCM server.

                //It will get automatically registered in you device.No extra code is needed.

                 alert(token);

                document.getElementById("txtGCMId").value = token;

            });

           } 

catch (e) {

            alert(e);

           }

   }


function onMsg() {
	// body...

     try {

        window.FirebasePlugin.onNotificationOpen(function (data) {

         alert(JSON.stringify(data));

        });

    } catch (e) {

        alert(e);

    }
}