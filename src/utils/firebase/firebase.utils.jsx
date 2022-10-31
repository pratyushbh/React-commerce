import { initializeApp } from 'firebase/app';
import {getAuth,GoogleAuthProvider,signInWithRedirect,signInWithPopup,createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore,getDoc,doc,setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAr_ElsqLZqEeuzySilkhAki5MrwPJMiMY",
    authDomain: "react-commerce-a653f.firebaseapp.com",
    projectId: "react-commerce-a653f",
    storageBucket: "react-commerce-a653f.appspot.com",
    messagingSenderId: "550732529584",
    appId: "1:550732529584:web:9ecf02331c16aa1f09a075"
  };

const app = initializeApp(firebaseConfig);

const provider= new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth=getAuth();
export const SignInWithGooglePopup=()=>signInWithPopup(auth,provider);
export const SignInWithGoogleRedirect=()=>signInWithRedirect(auth,provider);
export const db=getFirestore();

export const createUserDocFromAuth= async (userAuth,additionalInformation={})=>{
  if(!userAuth) return;
  const userDocRef=doc(db,'users',userAuth.uid);
  const userSnapShot= await getDoc(userDocRef);
  if(!userSnapShot.exists()){
    const {displayName,email}=userAuth;
    const createdAt=new Date();
    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    }catch(error){
      console.log('error creating the user',error.mesage);
    }
  }
  return userDocRef;
}

export const CreateAuthUserWithEmailAndPassword=async (email,password)=>{
  if(!email||!password) return;
  return  await createUserWithEmailAndPassword(auth,email,password);
}
