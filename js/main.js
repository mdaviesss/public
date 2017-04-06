jQuery(document).ready(function($){
	//toggle 3d navigation
	$('.cd-3d-nav-trigger').on('click', function(){
		toggle3dBlock(!$('.cd-header').hasClass('nav-is-visible'));
	});

	//select a new item from the 3d navigation
	$('.cd-3d-nav').on('click', 'a', function(){
		var selected = $(this);
		selected.parent('li').addClass('cd-selected').siblings('li').removeClass('cd-selected');
		updateSelectedNav('close');
	});

	$(window).on('resize', function(){
		window.requestAnimationFrame(updateSelectedNav);
	});

	function toggle3dBlock(addOrRemove) {
		if(typeof(addOrRemove)==='undefined') addOrRemove = true;	
		$('.cd-header').toggleClass('nav-is-visible', addOrRemove);
		$('.cd-3d-nav-container').toggleClass('nav-is-visible', addOrRemove);
		$('main').toggleClass('nav-is-visible', addOrRemove).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			//fix marker position when opening the menu (after a window resize)
			addOrRemove && updateSelectedNav();
		});
	}

	//this function update the .cd-marker position
	function updateSelectedNav(type) {
		var selectedItem = $('.cd-selected'),
			selectedItemPosition = selectedItem.index() + 1, 
			leftPosition = selectedItem.offset().left,
			backgroundColor = selectedItem.data('color'),
			marker = $('.cd-marker');

		marker.removeClassPrefix('color').addClass('color-'+ selectedItemPosition).css({
			'left': leftPosition,
		});
		if( type == 'close') {
			marker.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				toggle3dBlock(false);
			});
		}
	}

	$.fn.removeClassPrefix = function(prefix) {
	    this.each(function(i, el) {
	        var classes = el.className.split(" ").filter(function(c) {
	            return c.lastIndexOf(prefix, 0) !== 0;
	        });
	        el.className = $.trim(classes.join(" "));
	    });
	    return this;
	};
});

$(function() {

// This allows to switch between login and register with a transition
    $('#login-form-link').click(function(e) { 
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});

// Firebase
(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDRy3KJzbrs58cn4rrXz7C0WF1iddWDUl4",
    authDomain: "tourbus-162117.firebaseapp.com",
    databaseURL: "https://tourbus-162117.firebaseio.com",
    projectId: "tourbus-162117",
    storageBucket: "tourbus-162117.appspot.com",
    messagingSenderId: "46851514150"
  };
  firebase.initializeApp(config);

// Fields of user entry
  var txtUsername = document.getElementById('username');
  var txtEmail = document.getElementById('email');
  var txtPassword = document.getElementById('password');
  var btnLogin = document.getElementById('login-submit');
  var btnRegister = document.getElementById('register-submit');
  // var txtLogout = document.getElementById('txtLogout');

  $( "#btnLogin" ).click(function() {
  	var email = txtEmail.value;
  	var password = txtPassword.value;
  	var auth = firebase.auth();

  	var promise = auth.signInWithEmailAndPassword(email, pass);
  	promise.catch(e => console.log(e.message));
  });

  $( "#btnRegister" ).click(function() {
  	//TODO: check for real email!!!!
  	var email = txtEmail.value;
  	var password = txtPassword.value;
  	var auth = firebase.auth();

  	var promise = auth.createUserWithEmailAndPassword(email, pass);
  	promise.catch(e => console.log(e.message));
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
  	if(firebaseUser) {
  		console.log(firebaseUser);
  	} else {
  		console.log('not logged in'); // If task is tried that is not authorized unless logged in
  	}

  });

}());

jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.location = $(this).data("href");
    });
});


