
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
 username = localStorage.getItem("user_name");
 document.getElementById("user_name").innerHTML = "welcome " + username;

function addRoom()
{


 room_name = document.getElementById("room_name").value;
 
 firebase.database().ref("/").child(room_name).update({
 
  purpose : "adding room name"

 })  ;

   localStorage.setItem("room_name", room_name);

   window.location = "kwitter_pageroom.html";
};


function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("Room name - " + Room_names);
      row = "<div class= 'room_name' id = "+Room_names+" onclick= 'redirectToRoomName(this.id)' >#"+ Room_names+"</div><br>";
      document.getElementById("output").innerHTML += row;
      });});}
getData();

function redirectToRoomName()
{

   console.log(name);
 localStorage.setItem("room_name", name);
 window.location = "kwitter_pageroom.html"



}


function logout()
{

   localStorage.removeItem("user_name");
   localStorage.removeItem("room_name");
   window.location = "index.html";

}