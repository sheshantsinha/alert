// Initialize Firebase
var my_number=window.localStorage.getItem('mobile'),update=false,totalMessage=0,updateTimeArray=[[],[]],intervalVar
  var config = {
    apiKey: "AIzaSyAhX8ibtX5_NjoWGvrFj_IDBDvlfTdBdbI",
    authDomain: "kiss-16325.firebaseapp.com",
    databaseURL: "https://kiss-16325.firebaseio.com",
    projectId: "kiss-16325",
    storageBucket: "kiss-16325.appspot.com",
    messagingSenderId: "118321990441"
  };
  firebase.initializeApp(config);

    var ref = firebase.database().ref('messages'); 
    var receiptRef = firebase.database().ref("number");
    var gcmRef = firebase.database().ref("gcmID");
    update_mobile_no()

    ref.on("value", function(snapshot){
    updateTimeArray=[[],[]]
    var ids=[]
    var data=JSON.stringify(snapshot.val(), null, 2);
    var obj=JSON.parse(data)

    $('.open').empty()
    $('.closed').empty()
    for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var val = obj[key];
 //   console.log(key,val['message']);

  //try {
    var number =val['toMobile']
   /* if(number.toLowerCase()=='all') {
        createList(key,val)
    } else {*/
        number=number.split(",") 
        isPresent=false
        for(var i=0;i<number.length;i++) {
          if(number[i]==my_number) {
            isPresent=true
            break
          }
        }
        if(isPresent) {
        createList(key,val)
        }
      
    //}
   // } catch (error) {
   //   console.log(error)
   // }
     // console.log(checkUsersPresence(key))
      ids.push(key)
      

      //console.log(present)
    }
  }
  try {
    clearInterval(intervalVar)
  } catch (error) {
    console.log(error)
  }
  intervalVar=setInterval(iterateLoop,60000)
  if(!update) {
  update_weight(ids)
  console.log(1)
  } else {
    setTimeout(function(){
      update_weight(ids)
      console.log(2)
    },2000)
  }
});

function createList(key,obj)
{
  var available=false
  if($('#'+key))
    {
    available=true
   // console.log(true)
    }
    var timeString=obj['Time']

    var tt=agoTime(timeString)
    str1='<li class="swipeout" id='+key+'>'+
      '<div class="swipeout-content">'+
        '<a href="#tab-3" class="item-link item-content tab-link" onclick=openTab(\"'+key+'\")>'+
          '<div class="item-inner">'+
            '<div class="item-title-row">'+
              '<div class="item-title">'+obj['Sender']+'</div>'+
              '<div class="item-after">'+tt+' ago</div>'+
            '</div>'+
            '<div class="item-subtitle">'+obj['title']+'</div>'+
            '<div class="item-text">'+
             obj['message'] 
            +'</div>'+
          '</div>'+
        '</a>'+
      '</div>'+
      '<div class="swipeout-actions-left" onclick=snoozeAlarm(\"'+key+'\")>'+
        '<a href="#" class="color-green swipeout-overswipe alert-reply">Click to Snooze</a>'+
      '</div>'+
    '</li>'

    updateTimeArray[0].push(key)
    updateTimeArray[1].push(timeString)
    /*if(avilable) {
      $('#'+key+' .item-title').empty()
      $('#'+key+' .item-title').append(obj[key]['title'])
    }*/
    if(obj['type']=='open')
    {
      
      $('.open').prepend(str1)
      if(obj['Badge']=='urgent') {
      //  $('#'+key).css('border','1px solid red')
       setAlarm(timeString,obj,key)  
      }
      if(!window.localStorage.getItem('readMessages')) {
       window.localStorage.setItem('readMessages',JSON.stringify({})) 
      } else {
        var list=JSON.parse(window.localStorage.getItem('readMessages'))
        if(!list[key]) {
          var txt=$('#'+key+' .item-title').text()
          str=txt+' <span style="color:red">(New)</span>'
          $('#'+key+' .item-title').empty()
          $('#'+key+' .item-title').append(str)
          console.log(str)
          list[key]={read:false}
        } else if(list[key].read==false) {
          var txt=$('#'+key+' .item-title').text()
          str=txt+' <span style="color:red">(New)</span>'
          $('#'+key+' .item-title').empty()
          $('#'+key+' .item-title').append(str)
          console.log(str)
        }
        window.localStorage.setItem('readMessages',JSON.stringify(list))
      }
    }
    else {
      $('.closed').prepend(str1)
      if(window.localStorage.getItem('readMessages')) {
      var list=JSON.parse(window.localStorage.getItem('readMessages'))
      if(list[key]) {
        delete list.key
      }
    }
    }
    console.log($('#'+key).attr('data'))
}

function openTab(id) {
  //console.log(id)
  str1=$('#'+id+' .item-text').text()
  str2=$('#'+id+' .item-title').text()
  str3=$('#'+id+' .item-after').text()
  str5=$('#'+id+' .item-subtitle').text()
  $('#'+id+' .item-title span').empty()
  $('#tab-3').empty()
  try {
  var list=JSON.parse(window.localStorage.getItem('readMessages'))
  list[id].read=true
  window.localStorage.setItem('readMessages',JSON.stringify(list))
  } catch(error) {
    console.log(error)
  }
  //console.log(str1)
  //$('a .clickme')[0].click()
  str6='<b>'+str2+'</b>- '+str5
//console.log(str6)
  str4='<div class="card">'+
  '<div class="card-header"><b>'+str5+'</b></div>'+
  '<div class="card-content card-content-padding">'+str1+'</div>'+
  '<div class="card-footer">'+str3+'</div>'+
'</div>'
  $('#tab-3').prepend(str4)
  if(clicked==0) {
  clicked=2
  } else {
    clicked=3
  }

  //cordova.plugin.notification.local.cancel("my-notification");
  notification=JSON.parse(window.localStorage.getItem('notification'))
  alarmString=JSON.parse(window.localStorage.getItem('alarmString'))
  if(notification[id]) {
    cordova.plugin.notification.local.cancel(parseInt(notification[id]))
  }
  if(alarmString[id]) {
    cordova.plugin.notification.local.cancel(parseInt(alarmString[id])) 
    alarmString[id].cancel=true
    window.localStorage.setItem('alarmString',JSON.stringify(alarmString))
  }
  }

function update_weight(ids) {
  //console.log(ids)
  update=true
  receiptRef.once('value').then(function(snapshot2) {
      data2=JSON.stringify(snapshot2.val(), null, 2);
      obj2=JSON.parse(data2)
      for(var key2 in obj2) {
        present=false
        for(var key3 in obj2[key2]) {
          if(obj2[key2][key3]==my_number) {
            present=true
            //console.log(present,key3)
            break
          }
        }
        if(present==false) {
          var upData=receiptRef.child(key2).push(my_number)
        }
      }
    });
}

function agoTime(tt) {
var sec=new Date().getTime()/1000-new Date(tt).getTime()/1000
var time_array=['seconds','minutes','hours','Days','Month','Year']
var k=sec
for(var i=0;i<time_array.length;i++) {
if(i<3) {
  if(k/60 <1) {
    return Math.floor(k)+' '+time_array[i]
    break
  } else {
    k=k/60
  }
}
else if(i==3) {
  if(k/24 <1) {
    return Math.floor(k)+' '+time_array[i]
    break
  } else {
    k=k/24
  }
}
else if(i==4) {
  if(k/30 <1) {
    return Math.Floor(k)+' '+time_array[i]
    break
  } else {
    k=k/30
  }
}
else if(i==5) {
  if(k/12 <1) {
    return Math.Floor(k)+' '+time_array[i]
    break
  } else {
    k=k/12
  }
}
}
}

function update_mobile_no(no) {
  var Mobileref = firebase.database().ref('mobile'); 
  Mobileref.once('value').then(function(mobile) {
    data3=JSON.stringify(mobile.val(), null, 2);
    obj3=JSON.parse(data3)
    present=false
    for(var no_key2 in obj3) {
      //console.log(no_key2)
      if(obj3[no_key2]==my_number) {

        present=true
        break
      }
    }
    if(present==false) {
      no_key=Mobileref.push(my_number).key;
      Mobileref.child(no_key).set(my_number)
    }
  })

}


function setAlarm(time,obj,key) {
 // alert('setAlarm')
 var notificationTime=parseInt(obj['urgentTime'])*60*1000
 var criticalTime=parseInt(obj['criticalTime'])*60*1000
 var msgTime=new Date(obj['Time']).getTime()
 var currentTime=new Date().getTime()
 //console.log(notificationTime,criticalTime,msgTime)

if(notificationTime != NaN & msgTime!=NaN & currentTime<=(msgTime+notificationTime)) {
  setNotification(msgTime+notificationTime,obj['title'],obj['Sender'],key)
  //setNotification(notificationTime,obj['title'],obj['Sender'],key)
}
else {
/*  alert('Current Time '+currentTime)
  alert('Msg Time '+parseInt(msgTime))
  alert('Notification Time '+notificationTime)*/
  k=currentTime-(notificationTime+msgTime)
  //alert('K '+k)
}
if(criticalTime != NaN & currentTime<=(msgTime+criticalTime)) {
  setCriticalNotification(msgTime+criticalTime,obj['title'],obj['Sender'],key)
}
}

function setNotification(time,title,sender,key) {
 // console.log(key)
  var notificationId=0,notification={}
  if(!window.localStorage.getItem('notificationId')) {
    notificationId=1
  }
  else {
    notificationId=parseInt(window.localStorage.getItem('notificationId'))
    notification=JSON.parse(window.localStorage.getItem('notification'))
    notificationId++
  }
  /*console.log(notification)
  console.log(notificationId)*/
  if(!notification[key]) {
  notification[key]=notificationId
  window.localStorage.setItem('notification',JSON.stringify(notification))
  window.localStorage.setItem('notificationId',notificationId)
  schedule(notificationId,title,sender,time)
  //console.log(title)
  }
}

function setCriticalNotification(time,title,sender,key) {
a1=new Date(time).getHours()
b=new Date(time).getMinutes()
c=new Date(time).getSeconds()

var alarmId=10000,alarmString={}
  if(!window.localStorage.getItem('alarmId')) {
    alarmId=10001
  }
  else {
    alarmId=parseInt(window.localStorage.getItem('alarmId'))
    alarmString=JSON.parse(window.localStorage.getItem('alarmString'))
    alarmId++
  }
  /*console.log(notification)
  console.log(notificationId)*/
  if(!alarmString[key]) {
  alarmString[key]={id:alarmId,cancel:false}
  window.localStorage.setItem('alarmString',JSON.stringify(alarmString))
  window.localStorage.setItem('alarmId',alarmId)
  //console.log(title)
  }

try {
/*  window.wakeuptimer.wakeup( successCallback,  
   errorCallback, 
   // a list of alarms to set
   {
        alarms : [{
            type : 'onetime',
            time :{hour : a1, minute : b},
            extra : {id1:alarmId, title1:title,message:sender}, 
            message :b
       }] 
   }
);*/
  Alarmschedule(alarmId,title,sender,time)
  } catch(error) {
    alert(error)
  }
}

var successCallback = function(result) {
    //alarmString=JSON.parse(window.localStorage.getItem('alarmString'))
     if (result.type==='wakeup') {
           $(".fourth_tab")[0].click()
           clicked=4
           dateTime=new Date().getHours()+" : "+new Date().getMinutes()
           notificationClickToClose.open();
    } 
    //Alarmschedule()
  };

  var errorCallback = function(result) {
    alert(result)
  };  

function Alarmschedule(id,title,sender,time) {
    var sound='file://pingpong.mp3'
    try {
        var time=new Date(time)
       cordova.plugins.notification.local.schedule({
        id: id,
        title: "Alarm",
        text: sender+"- "+title,
        at: time,
        sound:sound,
        vibrate:true
    });
    } catch (error) {
      alert(error)
    } 
  }



function snoozeAlarm(key) {
 /* var ss=prompt("Enter time in seconds.")
  if(parseInt(ss)==NaN) {
    ss=60
  } else {
    ss=parseInt(ss)
  }
  var sec=((new Date().getTime()/1000)+ss)*1000
  h1=new Date(sec).getHours()
  m1=new Date(sec).getMinutes()
  s1=new Date(sec).getSeconds()*/
 try {
/*  window.wakeuptimer.wakeup( successCallback1,
    errorCallback1,
    {
        alarms : [{
            type : 'onetime',
            time :{hour : h1, minute : m1+1,second:s1},
            extra : {message:"Hello This is a snoozed message" },
            message : key,
           // action : this.get('action')
        }]
    }
 );*/
   dateTime=new Date().getHours()+" : "+new Date().getMinutes()
   notificationClickToClose.open();
  } catch(error) {
    alert(error)
  }
}
/*
var successCallback1 = function(result) {
    //alarmString=JSON.parse(window.localStorage.getItem('alarmString'))
    clicked=4
    snoozeSchedule()
    $(".fourth_tab")[0].click()
  };

  var errorCallback1 = function(result) {
    alert('Error ',result)
  };  */


/*  function snoozeSchedule() {

    var sound='file://pingpong.mp3'
    try {
        var time=new Date()
        cordova.plugins.notification.local.schedule({
        id: 1000000,
        title: "We are reminding you for a message once again",
        text: "Snoozed message",
        at: time,
        sound:sound,
        vibrate:true
    });
    } catch (error) {
      alert(error)
    } 
  }*/

  function iterateLoop() {
    uta=updateTimeArray
    for(var i=0;i<uta[0].length;i++) {
      var tt=agoTime(uta[1][i])
      $("#"+uta[0][i]+' .item-after').empty()
      $("#"+uta[0][i]+' .item-after').text(tt+' ago')
    }
  }