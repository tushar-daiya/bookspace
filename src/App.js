import Header from "./components/Header";
import Cards from "./components/Cards";
import AddBook from "./components/AddBook";
import ViewProfile from "./components/ViewProfile";
import { Route, Routes } from "react-router-dom";
import Detail from "./components/Detail";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { createContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '@smastrom/react-rating/style.css'

const Appstate = createContext();
const UserContext =createContext(null);
function App() {
  const auth=getAuth();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth,(user)=>{
    if(user){
      setLogin(true);
      setUser(user);
  
    }
    else{
      setLogin(false);
      setUser(null);
  
    }
  })

  
  

  return (
    <Appstate.Provider value={{ login,  setLogin  }}>
      <UserContext.Provider value={{user,setUser}}>
      <div className="App relative">
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/viewprofile" element={<ViewProfile />} />
        </Routes>
      </div>
      </UserContext.Provider>
    </Appstate.Provider>
  );
}

export default App;
export { Appstate };
export {UserContext};
