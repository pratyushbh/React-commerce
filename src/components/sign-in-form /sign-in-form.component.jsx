import { useState,useContext } from "react"
import FormInput from '../form-input/form-input.component'
import Button from "../button/button.component";
import { SignInWithGooglePopup,SignInUserWithEmailAndPassword,createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';
import { UserContext } from "../../contexts/user.context";

const defaultFormFields={
    email:'',
    password:'',
}
export const SignInForm=()=>{
    const [formFields,setFormFields]=useState(defaultFormFields);
    const {email,password}=formFields;
    const {setCurrentUser}=useContext(UserContext)
    const {setEmail}=useContext(UserContext)
    console.log(formFields);  
const resetFormFields=()=>{
    setFormFields(defaultFormFields);
}
const SignInUserWithGooglePopUp=async ()=>{
    const {user}=await SignInWithGooglePopup();
    setCurrentUser(user);
    setEmail(user.email);
    const userDocRef=await createUserDocFromAuth(user);
}
const handleSubmit=async (event)=>{
    event.preventDefault();

    try{
        const {user} = await SignInUserWithEmailAndPassword(email,password);
        setCurrentUser(user);
        setEmail(user.email);
        resetFormFields();
    }catch(error){
        if(error.code==="auth/wrong-password"){
            alert("Incorrect password for email");
        }
        else if(error.code==="auth/user-not-found"){
            alert("User not found");
        }
        else{
            console.log(error);
        }
    }
} 
    const handleChange=(event)=>{
         const {name,value}=event.target;
         setFormFields({...formFields,[name]:value}); 
    }
    return(
        <div className="sign-up-container">
            <h2>Already have a account?</h2>
            <h1>Sign In with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required/>
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required/>
                <div className="Button-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" onClick={SignInUserWithGooglePopUp} buttonType="google">Google Sign in</Button>
                </div>
            </form>
        </div>
    )
}