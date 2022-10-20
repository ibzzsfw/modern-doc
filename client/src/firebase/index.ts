// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signOut,
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBuijq_pvDk5kBnKL__QOZPTCu_8Kagnbs',
  authDomain: 'moderndoc.firebaseapp.com',
  projectId: 'moderndoc',
  storageBucket: 'moderndoc.appspot.com',
  messagingSenderId: '904399854699',
  appId: '1:904399854699:web:9d492c9835ac5fe0cba52e',
  measurementId: 'G-JS60XNGLZS',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const loginWithGoogle = () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider).then((result) => {
    console.log(result)
  })
}

export const loginWithFacebook = () => {
  const auth = getAuth()
  const provider = new FacebookAuthProvider()
  signInWithPopup(auth, provider).then((result) => {
    console.log(result)
  })
}

export const loginWithGithub = () => {
  const auth = getAuth()
  const provider = new GithubAuthProvider()
  signInWithPopup(auth, provider).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })
}
