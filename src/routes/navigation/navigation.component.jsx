import { Fragment } from "react";
import { Routes,Route,Outlet } from "react-router";
import { Link } from "react-router-dom";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.styles.scss'

const Navigation=()=>{
    return(
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                 <CrwnLogo className="logo"/>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">Shop</Link>
                <Link className="nav-link" to="/SignIn">SignIn</Link>
            </div>
        </div>
      <Outlet/>
    </Fragment>)
  }

export default Navigation;