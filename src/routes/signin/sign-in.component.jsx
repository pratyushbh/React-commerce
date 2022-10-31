import {auth,SignInWithGooglePopup,SignInWithGoogleRedirect,createUserDocFromAuth} from '../../utils/firebase/firebase.utils'
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { SignUpForm } from '../../components/sign-up-form/sign-up-form.component';
const SignIn=()=>{
    // useEffect(async ()=>{
    //     const response=await getRedirectResult(auth);
    //     console.log(response);
    // },[])
    useEffect(()=>{
        async function f(){
        const response=await getRedirectResult(auth);
        if(response){
            const userDocRef=await createUserDocFromAuth(response.user);
        }
        console.log(response);
        }
        f();
    },[])
    const logGoogleUser=async ()=>{
        const {user}=await SignInWithGooglePopup();
        const userDocRef=await createUserDocFromAuth(user);
    }
    return(<div>
        <h1>Sign In</h1>
        <button onClick={()=>{logGoogleUser()}}>
            Sign In with google Popup
        </button>
        <button onClick={SignInWithGoogleRedirect}>
            Sign In with google Redirect
        </button>
        <SignUpForm/>
    </div>)
}

export default SignIn;