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
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
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
