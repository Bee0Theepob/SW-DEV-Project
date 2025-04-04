import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ViewRental from "./pages/appointment/ViewRental";
import ProviderList from "./pages/provider/ProviderList";
import Register from "./pages/Register";
import UserManagement from "./pages/user/UserManagement";
function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/providerList' element={<ProviderList />}></Route>
            <Route path='/viewRental' element={<ViewRental />}></Route>
            <Route path='/userManagement' element={<UserManagement />}></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}
export default App;
