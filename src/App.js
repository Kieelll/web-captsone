import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import View from "./pages/view/View";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import { useContext } from "react";
import Schedule from "./pages/Schedule/Schedule";
import  Inventory  from "./pages/inventory/Inventory";
import Chats from "./pages/Chats/Chats";
import AdminAccount from "./pages/Admin/AdminAccount";
import Post from "./pages/Post/Post"
import Location from "./pages/Location/Location";
import Transaction from "./pages/Transaction/Transaction";
import Based from "./pages/based/Based";
import Stocks from "./pages/Stocks/Stocks";

function App() {

  return (
    <div className= "app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path= "Location" element= {<Location/>}/>
            <Route path="Post" element= {<Post/>}/>
            <Route path="Schedule" element={<Schedule />} />
            <Route path="AdminAccount" element={<AdminAccount/>}/>
            <Route path = "Chats" element = {<Chats/>} />
            <Route path="Transaction" element = {<Transaction/>} />
            <Route path="stocks" element = {<Stocks/>} />
            
            <Route path="Inventory" element = {<Inventory/>} />
            <Route path="View" element={<View />} />
            <Route path="login" element={<Login />} />
            <Route path="Users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              
              
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;