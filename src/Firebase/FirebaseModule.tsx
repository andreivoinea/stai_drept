import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, User  } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc, getDocs } from "firebase/firestore";
import { StorageReference, getDownloadURL, getStorage, listAll, ref, uploadBytes  } from "firebase/storage";

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
  WriteFirestore("users/"+user.email,{email:user.email,uid:user.uid,role:"client"});
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

export async function GetAllFilesStorage(path:string):Promise<StorageReference[]>{
  const listRef = ref(storage, path);

  var allFiles:StorageReference[] = [];

  const listRes = await listAll(listRef);

  if(listRes.prefixes.length == 0){
    return [];
  }

  let promises:Promise<StorageReference[]>[] = [];

  console.log("prefix",listRes.prefixes);

  listRes.prefixes.forEach((folderRef) => {
    promises.push(GetAllFilesStorage(path + folderRef.name + "/"));
  });

  let results = await Promise.all(promises);
  results.forEach((result)=>{
    allFiles = allFiles.concat(result);
  });
  allFiles = allFiles.concat(listRes.items);

  if(allFiles.length == 0)
  return listRes.prefixes;

  
  return allFiles;
}

export async function WriteFirestore(path:string, data:any){
  const docRef = doc(db, path);
  await setDoc(docRef, data);
}

export async function GetAllUsers(){
  const usersRef = collection(db, "users");
  const usersSnap = await getDocs(usersRef);
  const users = usersSnap.docs.map(doc => doc.data());
  return users;
}

export async function GetAllSeries(){
  const seriesRef = collection(db, "series");
  const seriesSnap = await getDocs(seriesRef);
  const series = seriesSnap.docs.map(doc => doc.data());
  return series;
}

export async function GetItems(serie:string){
  const itemsRef = collection(db,"series",serie,"items");
  const itemsSnap = await getDocs(itemsRef);
  const items = itemsSnap.docs.map(doc => doc.data());
  return items;
}