
var goBack=0,mobile_no=0
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
/*    $(".mobile").hide()
    $(".otp").show()*/
  })

  $(".verify").click(function() {
  	console.log('called 2nd time')
  	var otp=$("#otp").val()
  	if($.trim(otp).length==6) {
  		$.ajax({
  			url:'https://kiss-16325.firebaseio.com/number/-LIAyA203FK1A_xa4fpB.json',
  			dataType:"json",
  			beforeSend:function(){
  				appendMsg('verifying OTP...')
  			},
  			success:function(data) {
  	/*			if(data.success) {
  					if(mobile_no!=0) {
  					appendMsg('Come with us:)')
  					//window.localStorage.setItem('mobile',mobile_no)
  					//window.location.href='index.html'
  					console.log(data)


  				}
  				else {
  					appendMsg('<b>Incorrect OTP.Please try again<b>')
  				}
  				}*/
  				console.log(data)
  			}
  		})
  	}
  })
})
function appendMsg(text) {
	$(".message").empty()
  	$(".message").append(text)
}


function onLoad() {
		app.preloader.show()
        document.addEventListener("deviceready", onDeviceReady, false);
        var number=window.localStorage.getItem('mobile')
        var login=window.localStorage.getItem('login')
        console.log(number)
        if(number != null) {
        	window.location.href='index.html'
        }
    }
function onDeviceReady() {
    // Register the event listener
    document.addEventListener("backbutton", onBackKeyDown, false);
}

// Handle the back button
//
function onBackKeyDown() {
if(goBack==1) {
	$(".mobile").show()
	$(".otp").hide()
	$(".mobile").val("")
	$(".sign").show()
	$(".verify").hide()
	appendMsg('You will get notification about all the things happening in Walkover and it\'s product')
}
}