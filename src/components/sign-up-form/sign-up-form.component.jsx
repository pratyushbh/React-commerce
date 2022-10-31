import { useState,useContext } from "react"
import FormInput from '../form-input/form-input.component'
import Button from "../button/button.component";
import { CreateAuthUserWithEmailAndPassword,createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss';
import { UserContext } from "../../contexts/user.context";

const defaultFormFields={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}
export const SignUpForm=()=>{
    const [formFields,setFormFields]=useState(defaultFormFields);
    const {displayName,email,password,confirmPassword}=formFields;
    const {setCurrentUser}=useContext(UserContext)
    console.log(formFields);  
const resetFormFields=()=>{
    setFormFields(defaultFormFields);
}
const handleSubmit=async (event)=>{
    event.preventDefault();
    if(password!==confirmPassword){
        alert("Password does not match");
        return;
    }

    try{
        const {user}= await CreateAuthUserWithEmailAndPassword(email,password);
        await createUserDocFromAuth(user,{displayName});
        setCurrentUser(user);
        resetFormFields();
    }catch(error){
        console.log("user creation halted becuz",error)
    }
} 
    const handleChange=(event)=>{
         const {name,value}=event.target;
         setFormFields({...formFields,[name]:value}); 
    }
    return(
        <div className="sign-up-container">
            <h2>Don't have a account?</h2>
            <h1>Sign Up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" onChange={handleChange} name="displayName" value={displayName} required/>
                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required/>
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required/>
                <FormInput label="Confirm Password" type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required/>
                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
}