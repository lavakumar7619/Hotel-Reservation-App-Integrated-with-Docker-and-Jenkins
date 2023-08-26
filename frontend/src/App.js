import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Hotels from "./pages/hotels/Hotels";
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect } from "react";
import NewHotel from "./pages/newhotel/NewHotel";
import NewRoom from "./pages/newroom/NewRoom";
import DashBoard from "./pages/dashboard/DashBoard"
import RoomsTable from "./pages/roomstabel/RoomsTable"
import Bookings from "./pages/bookings/Bookings"
import Error from "./pages/errorpage/Error";
import About from "./pages/about/About"
function App() {
 // const { user } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    const { user,token } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />
    }
    return children;
  };
  return (    
    <BrowserRouter>
    
      <Routes>
      <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
        />
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/type" element={<Hotels/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/admin/hotels" element={
          <ProtectedRoute>
            <NewHotel/>
          </ProtectedRoute> }/>
        <Route path="/admin/dash" element={
          <ProtectedRoute>
            <DashBoard/>
          </ProtectedRoute>}/>
        <Route path="/admin/room/:id" element={
          <ProtectedRoute>
            <NewRoom/>
          </ProtectedRoute>
        }/>
        <Route path="/admin/room/getrooms/:id" element={
          <ProtectedRoute>
            <RoomsTable/>
          </ProtectedRoute>
        }/>
        <Route path="/bookings" element={<Bookings/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
