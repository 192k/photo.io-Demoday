
function getInputValue(id) {
  return document.getElementById(id).value;
}

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBN8-giEnsqD5DU1-su9cYGn7l5q_NPy1g",
    authDomain: "photo-47280.firebaseapp.com",
    databaseURL: "https://photo-47280.firebaseio.com",
    projectId: "photo-47280",
    storageBucket: "",
    messagingSenderId: "466661144866"
  };

  firebase.initializeApp(config);

  
  // function send() {

  //   var storage = firebase.storage();

  //   var file = document.getElementById("file_button").files[0];
  //     console.log(file);

  //   var storageRef = firebase.storage().ref();
    
  //   var thisRef = storageRef.child(file.name);

  //   thisRef.put(file).then(function(snapshot) {
  //     console.log('Uploaded a blob or file!');
  // });

  //   //get request to get URL for uploaded file
  //   thisRef.getDownloadURL().then(function(url) {
  //   console.log(url);
  //   })

  // }

  //criar usuario
  function criarUsuario() {
    var email = getInputValue('email_in');
    var password = getInputValue('password_in');

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
        return user.updateProfile({
        displayName: getInputValue('name')});
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  //Logar USUARIO
  function logarUsuario() {
    var email = getInputValue('email_log');
    password = getInputValue('password_log');
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

        var errorCode = error.code;
        var errorMessage = error.message;

        alert('Erro: ' + errorMessage);

      });

    function alerta() {
      var email = document.getElementById('cd-email');
      alert(`Um email de confirmação foi enviado para: ${email}`);

    }

   firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          textName = document.getElementById('name_user_log');
          var user = firebase.auth().currentUser;
          if (user != null){
          var displayName = user.displayName;
          textName.innerHTML = displayName;
          }
        } else {
          // User is signed out.
          // ...
        }

      });

    }

    function logout(){
      firebase.auth().signOut();
    }

    function writeUserData(uid, name, email, photoUrl, numero) {
      var user = firebase.auth().currentUser;

      let email = getInputValue('email_in');
      let name = getInputValue('name');
      let uid = user.uid;
      let numero = getInputValue('number');
      let categoria = getInputValue('categorias');


      firebase.database().ref(categoria + '/users/' + uid).set({
        name: name,
        email: email,
        uid: uid,
        numero: numero
      });
    }
