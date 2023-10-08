// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   GoogleAuthProvider,
// } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAK53gEP6MQ4ctlY7vSiFbE0UUKgb29zF8",
//   authDomain: "traka-a32ec.firebaseapp.com",
//   projectId: "traka-a32ec",
//   storageBucket: "traka-a32ec.appspot.com",
//   //   messagingSenderId: "556440169916",
//   //   appId: "1:556440169916:web:24cd14377c7e4c2956cfb9",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// console.log(auth);

// function authSignInWithGoogle() {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       console.log("Signed in with Google");
//     })
//     .catch((error) => {
//       console.error(error.message);
//     });
// }

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     showLoggedInView();
//   } else {
//     showLoggedOutView();
//   }
// });

// function authSignOut() {
//   signOut(auth)
//     .then(() => {
//       showLoggedOutView();
//     })
//     .catch((error) => {
//       console.error(error.message);
//     });
// }

// function authSignInWithEmail() {
//   const email = emailInputEl.value;
//   const password = passwordInputEl.value;

//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       showLoggedInView();
//       clearAuthFields();
//     })
//     .catch((error) => {
//       console.error(error.message);
//     });
// }

// function authCreateAccountWithEmail() {
//   const email = emailInputEl.value;
//   const password = passwordInputEl.value;

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       showLoggedInView();
//       clearAuthFields();
//     })
//     .catch((error) => {
//       console.error(error.message);
//     });
// }
