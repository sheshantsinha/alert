
var goBack=0,mobile_no=0

var config = {
  apiKey: "AIzaSyAhX8ibtX5_NjoWGvrFj_IDBDvlfTdBdbI",
  authDomain: "database_domain_url.com",
  databaseURL: "https://database_url.firebaseio.com",
  projectId: "16325",
  storageBucket: "xyz-16325.appspot.com",
  messagingSenderId: "1234567890"
};
firebase.initializeApp(config);

$(document).ready(function(){
  $(".sign").click(function(){
  	console.log('called')
  	var MobileNo=$("#mobileNo").val()
    var countryCode=$('#sel option:selected').val().toString();
    MobileNo=countryCode+MobileNo
    console.log(MobileNo)
  	if($.trim(MobileNo).length>0) {
     sendOtp(MobileNo,0)
  	}
  })

    $(".verify").click(function() {
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
          } else {
            appendMsg('<b>Incorrect OTP.Please try again<b>')
            $("#otp").val("")
          }
          console.log(data)
        }
      })
      };
  })
    $('.resend').click(function(){
      sendOtp(mobile_no,0)
      appendMsg('Re-sending OTP')
    })

    $('.revoice').click(function(){
      sendOtp(mobile_no,1)
      appendMsg('Generating voice call')
    })

    $('.backToFront').click(function(){
      onBackKeyDown()

    })

})
function appendMsg(text) {
	$(".message").empty()
  	$(".message").append(text)
}

function onBackKeyDown() {
if(goBack==1) {
	$(".mobile").show()
  $(".ccode").show()
	$(".otp").hide()
	$(".mobile").val("")
	$(".sign").show()
	$(".verify").hide()
  $(".resend").hide()
  $(".backToFront").hide()
  $('.revoice').hide()
	appendMsg('')
  goBack=0
} else {
        window.plugins.appMinimize.minimize();
}
}
 
function sendOtp(MobileNo,type) {
  if(type==0) {
    url='https://sokt.io/VPNWxQMz72kcjYWR9zuy/incident_alert-send_otp'
  } else {
    url='https://sokt.io/43x4fngNuFwvEoAt7Cfu/incident_alert-send_voice_otp'
  }

        $.ajax({
        type:'POST',
        url:url,
        crossorigin:true,
        data:{mobile:MobileNo},
        beforeSend:function() {
          appendMsg('Sending OTP....Please Wait')
          $("#mobileNo").attr('disabled','disabled')
          $(".sign").attr('disabled','disabled')
        },
        success:function(data){
          $(".sign").removeAttr('disabled')
          $("#mobileNo").removeAttr('disabled','disabled')
          if(data.success) {
            console.log(data.success)
            mobile_no=MobileNo
            $(".mobile").hide()
            $(".ccode").hide()
            $(".otp").show()
            $(".mobile").val("")
            $(".sign").hide()
            $(".verify").show()
            $(".resend").show()
            $(".backToFront").show()
            $('.revoice').show()
            appendMsg('<center><b>OTP has been sent to your mobile number.</b></center>')
            console.log(mobile_no)
            goBack=1
          }
          else {
            appendMsg('Unable to reach please try again')

          }
        }

      })
}
