// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBVYNSOxJmmfCmtx1Sd7FLy4Rwxx7Jk3ps',
  authDomain: 'moderndoc-6ea6d.firebaseapp.com',
  projectId: 'moderndoc-6ea6d',
  storageBucket: 'moderndoc-6ea6d.appspot.com',
  messagingSenderId: '593768057754',
  appId: '1:593768057754:web:108af48568641215128823',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

/**
 * Store file in firebase storage
 * @param path path to store file e.g. 'images/','files/
 * @param file - File object
 * @returns url of file
 */
const uploadFile = async (path: string, file: any): Promise<string> => {
  const storage = getStorage(app)
  const storageRef = ref(storage, path)
  let snapshot = await uploadBytes(storageRef, file)
  let url = await getDownloadURL(snapshot.ref)
  return url
}

const phoneLogin = async (phoneNumber: string) => {
  console.log(phoneNumber)
  const auth = getAuth()
  const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
  const confirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    appVerifier
  )
  return confirmationResult
}

const validateOTP = async (otp: string, confirmationResult: any) => {
  const credential = await confirmationResult.confirm(otp)
  return credential
}

export { uploadFile, phoneLogin, validateOTP }
