import { Fragment,useContext } from "react";
import { Routes,Route,Outlet } from "react-router";
import { Link } from "react-router-dom";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import './navigation.styles.scss'
import { SignOut } from "../../utils/firebase/firebase.utils";

const Navigation=()=>{
    const {currentUser,setCurrentUser}=useContext(UserContext);
    const Signout=async()=>{
      await SignOut()
      setCurrentUser(null);
    }
    return(
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                 <CrwnLogo className="logo"/>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">Shop</Link>
                {currentUser?(
                  <span onClick={()=>Signout()} className="nav-link">SignOut</span>
                ):(
                  <Link className="nav-link" to="/auth">SignIn</Link>
                )}
            </div>
        </div>
      <Outlet/>
    </Fragment>)
  }

export default Navigation;