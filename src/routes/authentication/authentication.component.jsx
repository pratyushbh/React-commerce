import {auth,createUserDocFromAuth} from '../../utils/firebase/firebase.utils'
import { useEffect } from 'react';
import './authentication.styles.scss';
import { getRedirectResult } from 'firebase/auth';
import { SignUpForm } from '../../components/sign-up-form/sign-up-form.component';
import { SignInForm } from '../../components/sign-in-form /sign-in-form.component';
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
    return(<div className='authencation-container'>
        <SignInForm/>
        <SignUpForm/>
    </div>)
}

export default SignIn;