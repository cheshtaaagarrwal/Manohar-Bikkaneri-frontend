
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


var rootRef=firebase.database().ref().child("products");
   
  rootRef.on("child_added",childSnap=>{
    // alert("hi");
    // snap.forEach(childSnap=>{
      var name=childSnap.child("name").val();
      var price=childSnap.child("price").val();
      var type=childSnap.child("type").val();
       var image=childSnap.child("image").val();
    
      if(type=="cake")
      {
          $("#cakes").append(
            "<div class='col-md-3' style='display:inline-block'><div class='card ' ><img src='"+image+"' class='card-img-top' alt='image'><div class='card-body' >"
            +"<h5 style='text-align:center;text-transform:uppercase;'>"+name+
            "</h5>"+"<p class='card-text' style='inline-block' >"+price+"<i class='fas fa-cart-plus' style='position:absolute;right:0; padding-right:10px;'>"+"</i>"+"</p>"+"</div></div></div>");

               }
      if(type=="beverage")
      {
          $("#beverage").append(
            "<div class='col-md-3' style='display:inline-block'><div class='card '  ><img src='..' class='card-img-top' alt='image'><div class='card-body' >"
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
document.getElementById("submit").onclick=function(){
  
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
  },2000);
}


