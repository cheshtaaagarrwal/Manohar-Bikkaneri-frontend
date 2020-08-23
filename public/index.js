
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

 $("#btn-logout").click(function () {
  alert("logged out");
  document.querySelector('#log').style.display='block';
  document.querySelector('#btn-logout').style.display='none';
  firebase.auth().signOut();
});


 var users=firebase.database().ref().child("users");
$("#sign").click(function()
{
var email=$("#exampleInputEmail1").val();
var password=$("#exampleInputPassword1").val();
var name=$("#name").val();
var re_pass=$("#repeat-pass").val();
  //Create User with Email and Password
  if(password == re_pass)
  {
     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    window.alert("Message: "+ errorMessage);
    });
     var newuser=users.push();
    firebase.database().ref('users/'+newuser.key).set({
       username:email,
       password:password,
       name:name,
      //  mycart: {
      //   "pro1":"hello"
      //   },
    });
    
  }
  else{
    alert("passwords do not match");
  }
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

// adding cart
// var currentkey;
// function check(key){
//   firebase.auth().onAuthStateChanged(function(user){
//       if(!user)
//       {
//         alert("please login");
//       }
//       else{
//        var curruser = firebase.auth().currentUser;
//        curremail=user.email;
//        firebase.database().ref('users').on('value',snap=>{
//           snap.forEach(childsnap=>{
//             var cem=childsnap.child("username").val();
//             if(cem==curremail)
//             {
//                currentkey=childsnap.key;
//                firebase.database().ref('users/'+currentkey+'/mycart/'+key).set({
//                   key:key,
//                 });
//             }
//           });

//        });
  //       firebase.database().ref('products/' + key).on('value', snapshot => {
  //         var name=snapshot.val().name;
  //         var price=snapshot.val().price;
  //         alert("1 "+name+" added");
          
  //       });

  //     }
  //   });
  // }

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
            "</h5>"+"<p class='card-text' style='inline-block' >"+price+"<i class='fas fa-cart-plus add-to-cart' onclick=addproduct('"+childSnap.key+"') style='position:absolute;right:0; padding-right:10px;'>"+"</i>"+"</p>"+"</div></div></div>");

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
  var pname,pprice;
 // function addproduct(key){
 //   firebase.database().ref('products/' + key).on('value', snapshot => {
 //           pname=snapshot.val().name;
 //           pprice=snapshot.val().price;
 //  });
    // var cartRow=document.creatElement('div');
    // cartRow.classList.add('cart-row');
    // var cartItems=document.getElementByClassName('cart-items')[0]
 //    alert("added");
 //    document.getElementByClassName("product-details").innerText = "hihcddsic";
 // }

// contactus
var firstname,lastname,email,comment;
function ReadInput(){
  firstname=document.getElementById('fname').value;
  lastname=document.getElementById('lname').value;
  email=document.getElementById('email').value;
  comment=document.getElementById('comment').value;
}

 var contacts=firebase.database().ref().child("contacts");
$("#submit").click(function(){
  
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
});

// $("#btn-login").click(function()
//   {
//     var email=$("#exampleInputEmail").val();
//     var password=$("#exampleInputPassword").val();

//     if(email!=""&&password!=""){
//         var result = firebase.auth().signInWithEmailAndPassword(email,password);
//         result.catch(function(error)
//         {
//           var errorCode=error.code;
//           var errorMessage=error.message;
//           console.log(errorCode);
//           console.log(errorMessage);
//           window.alert("Message: "+ errorMessage);
//         });
//     }
//     else{
//       window.alert("Please fill out all fields.");
//     }
//   }

// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];
  
  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
  
  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(name, price, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
function addproduct(key){
  
  firebase.database().ref('products/' + key).on('value', snapshot => {
           pname=snapshot.val().name;
           pprice=snapshot.val().price;
  });
  shoppingCart.addItemToCart(pname, pprice, 1);
  displayCart();
}

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for(var i in cartArray) {
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>" 
      + "<td>(" + cartArray[i].price + ")</td>"
      + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
      + " = " 
      + "<td>" + cartArray[i].total + "</td>" 
      +  "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

// $('.show-cart').on("click", ".delete-item", function(event) {
//   var name = $(this).data('name')
//   shoppingCart.removeItemFromCartAll(name);
//   displayCart();
// })


// -1
// $('.show-cart').on("click", ".minus-item", function(event) {
//   var name = $(this).data('name')
//   shoppingCart.removeItemFromCart(name);
//   displayCart();
// })
// +1
// $('.show-cart').on("click", ".plus-item", function(event) {
//   var name = $(this).data('name')
//   shoppingCart.addItemToCart(name);
//   displayCart();
// })

// Item count input
// $('.show-cart').on("change", ".item-count", function(event) {
//    var name = $(this).data('name');
//    var count = Number($(this).val());
//   shoppingCart.setCountForItem(name, count);
//   displayCart();
// });

displayCart();






