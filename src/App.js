import Homepage from "./routes/home/home.component";
import { Routes,Route,Outlet } from "react-router";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/authentication/authentication.component";


const Shop=()=>{
  return(<h1>Hello world</h1>)
}

const App=()=> {
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
      {/* Index can't have child routes */}
      <Route index={true} element={<Homepage/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/auth" element={<SignIn/>}/>
      </Route>
    </Routes>
    )
}

export default App;
