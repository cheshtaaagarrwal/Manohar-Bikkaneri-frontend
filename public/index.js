
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDglr5HLdOstQJsiRQ01Nje1N90izaitqY",
    authDomain: "manohar-280dc.firebaseapp.com",
    databaseURL: "https://manohar-280dc.firebaseio.com",
    projectId: "manohar-280dc",
    storageBucket: "manohar-280dc.appspot.com",
    messagingSenderId: "402827788048",
    appId: "1:402827788048:web:3d4c0196603c950d856f95",
    measurementId: "G-B3CHT37CXM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.auth.Auth.Persistence.LOCAL;

firebase.auth().onAuthStateChanged(function(user){
  if(user)
  {
    alert("log in successful");
    document.querySelector('#log').style.display='none';
     document.querySelector('#btn-logout').style.display='block';
  }
});
 $("#btn-logout").click(function () {
  alert("logged out");
  document.querySelector('#log').style.display='block';
  document.querySelector('#btn-logout').style.display='none';
  firebase.auth().signOut();
});
$("#sign").click(function()
{
var email=$("#exampleInputEmail1").val();
var password=$("#exampleInputPassword1").val();

  //Create User with Email and Password
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
});


$("#btn-login").click(function()
{
var email=$("#exampleInputEmail").val();
var password=$("#exampleInputPassword").val();

if(email!=""&&password!=""){
    var result = firebase.auth().signInWithEmailAndPassword(email,password);
    result.catch(function(error)
    {
      var errorCode=error.code;
      var errorMessage=error.message;
      console.log(errorCode);
      console.log(errorMessage);
      window.alert("Message: "+ errorMessage);
    });
}
else{
  window.alert("Please fill out all fields.");
}
});

var rootRef=firebase.database().ref().child("products");
   
  rootRef.on("child_added",childSnap=>{
    // alert("hi");
    // snap.forEach(childSnap=>{
      var name=childSnap.child("name").val();
      var price=childSnap.child("price").val();
      var type=childSnap.child("type").val();
       var image=childSnap.child("image").val();
    
      if(type=="biscuit")
      {
          $("#biscuit").append(
            "<div class='col-md-3' style='display:inline-block; margin-bottom:20px'><div class='card ' ><img src='"+image+"' class='card-img-top' alt='image'><div class='card-body' >"
            +"<h5 style='text-align:center;text-transform:uppercase;'>"+name+
            "</h5>"+"<p class='card-text' style='inline-block' >"+price+"<i class='fas fa-cart-plus' href='#signup' data-toggle='modal' data-target='.log-sign' style='position:absolute;right:0; padding-right:10px;'>"+"</i>"+"</p>"+"</div></div></div>");

               }
      if(type=="sweets")
      {
          $("#sweets").append(
            "<div class='col-md-3' style='display:inline-block;margin-bottom:20px'><div class='card '  ><img src='..' class='card-img-top' alt='image'><div class='card-body' >"
            +"<h5 >"+name+
            "</h5>"+"<p class='card-text' style='display:inline;'>"+price+"</p>"+"</div></div></div>");
      }
    // });
    
  });

// contactus
var firstname,lastname,email,comment;
function ReadInput(){
  firstname=document.getElementById('fname').value;
  lastname=document.getElementById('lname').value;
  email=document.getElementById('email').value;
  comment=document.getElementById('comment').value;
}

 var contacts=firebase.database().ref().child("contacts");
document.querySelector("#submit").onclick=function(){
  
  ReadInput();

  var newcontact=contacts.push();
  firebase.database().ref('contacts/'+newcontact.key).set({
     firstname:firstname,
      lastname:lastname,
    email:email,
    comment:comment,
  });
  document.querySelector('.alert').style.display='block';
  setTimeout(function(){
    document.querySelector('.alert').style.display='none';
  },3000);
}

$("#btn-login").click(function()
  {
    var email=$("#exampleInputEmail").val();
    var password=$("#exampleInputPassword").val();

    if(email!=""&&password!=""){
        var result = firebase.auth().signInWithEmailAndPassword(email,password);
        result.catch(function(error)
        {
          var errorCode=error.code;
          var errorMessage=error.message;
          console.log(errorCode);
          console.log(errorMessage);
          window.alert("Message: "+ errorMessage);
        });
    }
    else{
      window.alert("Please fill out all fields.");
    }
  });

  
  firebase.auth().onAuthStateChanged(function(user){
    if(user)
    {
      window.location.href="index.html";
    }
  });

// function openmodel(){
//   $('#myModal').modal('show');
// }


