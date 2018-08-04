
var goBack=0,mobile_no=0

var config = {
  apiKey: "AIzaSyAhX8ibtX5_NjoWGvrFj_IDBDvlfTdBdbI",
  authDomain: "kiss-16325.firebaseapp.com",
  databaseURL: "https://kiss-16325.firebaseio.com",
  projectId: "kiss-16325",
  storageBucket: "kiss-16325.appspot.com",
  messagingSenderId: "118321990441"
};
firebase.initializeApp(config);

$(document).ready(function(){
  $(".sign").click(function(){
  	console.log('called')
  	var MobileNo=$("#mobileNo").val()
  	if($.trim(MobileNo).length>0) {
      $.ajax({
        type:'POST',
        url:'https://sokt.io/VPNWxQMz72kcjYWR9zuy/incident_alert-send_otp',
        crossorigin:true,
        data:{mobile:MobileNo},
        beforeSend:function() {
          appendMsg('Checking mobile no....Please Wait')
          $("#mobileNo").attr('disabled','disabled')
          $(".sign").attr('disabled','disabled')
        },
        success:function(data){
          $("#sign").removeAttr('disabled')
          if(data.success) {
            console.log(data.success)
             $(".mobile").hide()
            $(".otp").show()
            $(".mobile").val("")
            $(".sign").hide()
            $(".verify").show()
            mobile_no=MobileNo
            appendMsg('<center><b>OTP has been sent to your mobile number</b></center>')
            goBack=1
          }
          else {
            appendMsg('Unable to reach please try again')

          }
        }

      })
  	}
  })

    $(".verify").click(function() {
    	console.log('called 2nd time')
    	var otp=$("#otp").val()
    	if($.trim(otp).length==6) {
        $.ajax({
        url:'http://r.sokt.io/c/ex79ZE8qy4KDiW6j5Gir/incident_alert-verify_otp',
        data:{otp:otp,mobile:mobile_no},
        dataType:"json",
        beforeSend:function(){
          appendMsg('verifying OTP...')
        },
        success:function(data) {
          //console.log(data)
          if(data.success=='otp_verified') {
            if(mobile_no!=0) {
            appendMsg('Hoola:)')
            window.localStorage.setItem('mobile',mobile_no)
            window.location.href='index.html'
            window.FirebasePlugin.register();
          }
          else {
            appendMsg('<b>Incorrect OTP.Please try again<b>')
          }
          }
          console.log(data)
        }
      })
      };
  })
})
function appendMsg(text) {
	$(".message").empty()
  	$(".message").append(text)
}

function onBackKeyDown() {
if(goBack==1) {
	$(".mobile").show()
	$(".otp").hide()
	$(".mobile").val("")
	$(".sign").show()
	$(".verify").hide()
	appendMsg('You will get notification about all the things happening in Walkover and it\'s product')
} else {
        window.plugins.appMinimize.minimize();
}
}
 