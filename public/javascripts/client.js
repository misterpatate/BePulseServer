var INTERVAL = 4000;

$(function() {
  setInterval(function(){ checkPush(); }, INTERVAL);
});

var priorpush

checkPush = function(){
  $.ajax({
    type: 'get',
    url: '/lastpush',
    success: function (data) {
    	// console.log("Data Loaded: " + data );
    	if (data != priorpush) {
      		spawnNotification(data,"images/logo.png","Nouveau Défi !");
      		priorpush = data;
	      	}
	    }
	})
}


function setpush() {
	var defi = document.getElementById('titre').value
	// var data = {defi : defi};
  $.ajax({
    type: 'put',
    url: '/setpush',
    data: {nom : defi}

	}).done(function(msg){

		// console.log("Data pushed result: " + msg  );
	})
    

    // console.log("Data pushed: " + defi );

}



function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = spawnNotification(document.getElementById('titre').value, "images/logo.png","Nouveau Défi !");
    // var notification = new Notification("Nouveau Défi! : "+document.getElementById('titre').value);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}Notification.requestPermission().then(function(result) {
  // console.log(result);
});


function spawnNotification(theBody,theIcon,theTitle) {
  var options = {
      body: theBody,
      icon: theIcon
  }
  var n = new Notification(theTitle,options);
}


