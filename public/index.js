
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
      // var image=childSnap.child("image").val();
    
      if(type=="cake")
      {
          $("#cakes").append(
            "<div class='col-md-3' style='display:inline-block'><div class='card '  ><img src='' class='card-img-top' alt='image'><div class='card-body' >"
            +"<h5 >"+name+
            "</h5>"+"<p class='card-text' style='display:inline;'>"+price+"</p>"+"</div></div></div>");

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




