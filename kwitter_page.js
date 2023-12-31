
var firebaseConfig = {
   apiKey: "AIzaSyC0vPf6ATFMBw3JLlh__O7IVtZxUsluqRE",
   authDomain: "kwitter-a563c.firebaseapp.com",
   databaseURL: "https://kwitter-a563c-default-rtdb.firebaseio.com",
   projectId: "kwitter-a563c",
   storageBucket: "kwitter-a563c.appspot.com",
   messagingSenderId: "925627349402",
   appId: "1:925627349402:web:b92e6d2e3719df776ba223"
 };
 
firebase.initializeApp(firebaseConfig);

 user_name = localStorage.getItem("user_name");
 room_name = localStorage.getItem("room_name");

    function send()
    {

          msg = document.getElementById("msg").value;
         firebase.database().ref(room_name).push({
            name : user_name,
            message : msg,
            like : 0
         });
        document.getElementById("msg").value = "";

    }

 
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

  console.log(firebase_message_id);
  console.log(message_data);
   name = message_data['name'];
   message = message_data['message'];
   like = message_data['like'];
   dislike = message_data['dislike'];
   name_tag = "<h4>"+ name +"<img class = 'user_tick' src='tick.png'></h4>";
   message_tag = "<h4 class = 'message_h4'"+ message +"</h4>";
   like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick = 'updateLike(this.id)'>";
   span_tag = "<span class ='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";
   dislike_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+dislike+" onclick = 'updateDislike(this.id)'>";
   span_with_tag = "<span class ='glyphicon glyphicon-thumbs-down'>Dislike: "+dislike+"</span></button><hr>";


   row = name_tag + message_tag + like_button + span_tag + dislike_button + span_with_tag;
   document.getElementById("output").innerHTML += row; 

      } });  }); }
getData();

function updateLike(message_id)
{

  console.log("clicked on like button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updatedLikes = Number(likes) + 1;
  console.log(updatedLikes);

  firebase.database().ref(room_name).child(message_id).update({
   like : updatedLikes
  });

}

function updateDislike(message_id)
{

  console.log("clicked on dislike button - " + message_id);
  button_id = message_id;
  dislikes = document.getElementById(button_id).value;
  updatedDislikes = Number(dislikes) + 1;
  console.log(updateddislikes);

  firebase.database().ref(room_name).child(message_id).update({
   dislike : updateddislikes
  });

}

function logout()
{

   localStorage.removeItem("user_name");
   localStorage.removeItem("room_name");
   window.location = "index.html";

}