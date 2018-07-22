// Initialize Firebase
var my_number=20
  var config = {
    apiKey: "AIzaSyAhX8ibtX5_NjoWGvrFj_IDBDvlfTdBdbI",
    authDomain: "kiss-16325.firebaseapp.com",
    databaseURL: "https://kiss-16325.firebaseio.com",
    projectId: "kiss-16325",
    storageBucket: "kiss-16325.appspot.com",
    messagingSenderId: "118321990441"
  };
  firebase.initializeApp(config);

  var ref = firebase.database().ref('/messages'); 
   var receiptRef = firebase.database().ref("/number");                          
  ref.on("value", function(snapshot){
    var ids=[]
    var data=JSON.stringify(snapshot.val(), null, 2);
    var obj=JSON.parse(data)
    //console.log(obj)
   
  //  document.getElementById('data').innerHTML = data
  $('.open').empty()
  $('.closed').empty()
    for (var key in obj) {
      console.log(obj[key])
    if (obj.hasOwnProperty(key)) {
      var val = obj[key];
      console.log(key,val['message']);
      createList(key,val)
     // console.log(checkUsersPresence(key))
      ids.push(key)
      

      //console.log(present)
    }
  }
  update_weight(ids)
});

function createList(key,obj)
{
  var avilable=false
  if($('#'+key))
    {
    avilable=true
   // console.log(true)
    }
    var timeString=obj['Time']
    var tt=agoTIme(timeString)
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
      '<div class="swipeout-actions-left">'+
        '<a href="#" class="color-green swipeout-overswipe alert-reply">Snooze</a>'+
      '</div>'+
    '</li>'
    /*if(avilable) {
      $('#'+key+' .item-title').empty()
      $('#'+key+' .item-title').append(obj[key]['title'])
    }*/
    if(obj['type']=='open')
    {
      
      if(obj['badge']=='urgent') {
        $('#'+key).css('border','1px solid red')
      }
      $('.open').prepend(str1)
    }
    else {
      $('.closed').prepend(str1)
    }
}

function openTab(id) {
  console.log(id)
  str1=$('#'+id+' .item-text').text()
  str2=$('#'+id+' .item-title').text()
  str3=$('#'+id+' .item-after').text()
  str5=$('#'+id+' .item-subtitle').text()
  $('#tab-3').empty()
  //console.log(str1)
  //$('a .clickme')[0].click()
str6='<b>'+str2+'</b>- '+str5
console.log(str6)
  str4='<div class="card">'+
  '<div class="card-header"><b>'+str5+'</b></div>'+
  '<div class="card-content card-content-padding">'+str1+'</div>'+
  '<div class="card-footer">'+str3+'</div>'+
'</div>'
  $('#tab-3').prepend(str4)
}

function update_weight(ids) {
  console.log(ids)
  receiptRef.once('value').then(function(snapshot2) {
      data2=JSON.stringify(snapshot2.val(), null, 2);
      obj2=JSON.parse(data2)
      for(var key2 in obj2) {
        present=false
        for(var key3 in obj2[key2]) {
          if(obj2[key2][key3]==my_number) {
            present=true
            console.log(present,key3)
            break
          }
        }
        if(present==false) {
          var upData=receiptRef.child(key2).push(my_number)
        }
      }
    });
}

function agoTIme(tt) {
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
  if(k/60 <1) {
    return Math.floor(k)+' '+time_array[i]
    break
  } else {
    k=k/24
  }
}
else if(i==4) {
  if(k/60 <1) {
    return Math.Floor(k)+' '+time_array[i]
    break
  } else {
    k=k/30
  }
}
else if(i==5) {
  if(k/60 <1) {
    return Math.Floor(k)+' '+time_array[i]
    break
  } else {
    k=k/12
  }
}
}
}