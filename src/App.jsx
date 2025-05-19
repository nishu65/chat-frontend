import {useEffect} from "react";
import { useDispatch } from "react-redux";
import { getuserthunk } from "./components/store/user/user.thunk";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/authen/login';
import Signup from './pages/authen/Signup';
import Home from './pages/home/homepage';
import ProtectedRoute from './protectedroute/protected.route';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getuserthunk());
    })();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route  path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        {/* Add other routes as needed */}
      </Routes>
      <Toaster position="top-right"  />
    </Router>
  );
}

export default App;
