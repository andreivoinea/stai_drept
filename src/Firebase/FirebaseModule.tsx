import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, User  } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes  } from "firebase/storage";

const firebaseConfig =  {
    apiKey: "AIzaSyCd3rGs6ULa_fTg8FrFnvPQSblxTf1ZMtc",
  authDomain: "stai-drept-test.firebaseapp.com",
  projectId: "stai-drept-test",
  storageBucket: "stai-drept-test.appspot.com",
  messagingSenderId: "221850077313",
  appId: "1:221850077313:web:6a43918fcc5775ce02e580",
  measurementId: "G-NN95DTVV1K"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export function CreateEmail(email:string, password:string){
createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;

  console.log("userCreds")
  console.log(user);
  // ...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;

  console.log("Error " + errorCode + ": " + errorMessage);
});
}

export function LoginEmail(email:string, password:string, callback:React.Dispatch<React.SetStateAction<User|undefined>>){
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("userCreds")
    console.log(user);

    callback(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log("Error " + errorCode + ": " + errorMessage);
  });  
}

const pdfMetadata ={
  contentType: 'application/pdf',
};

export function UploadToUser(studentId:string,file:File){

  let storageRef = ref(storage, studentId + '/antrenament.pdf');

  let uploadTask = uploadBytes(storageRef,file);
}

export function DownloadWorkout(studentId:string){

  let pathReference = ref(storage, studentId + '/antrenament.pdf');

  getDownloadURL(pathReference)
  .then((url)=>{
    
    window.open(url);

  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        console.log("object no exist");
        break;
      case 'storage/unauthorized':
        console.log("storage/unauthorized");
        break;
      case 'storage/canceled':
        console.log("storage/canceled");
        break;

      // ...

      case 'storage/unknown':
        console.log("storage/unknown");
        break;
    }
  });
}