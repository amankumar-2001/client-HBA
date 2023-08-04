import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import "antd/dist/antd.min.css";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen";
import Landingscreen from "./screens/Landingscreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" exact element={<Landingscreen />} />
          <Route path="/home" exact element={<Homescreen />} />
          <Route
            path="/book/:roomid/:fromdate/:todate"
            exact
            element={<Bookingscreen />}
          />
          <Route path="/login" exact element={<Loginscreen />} />
          <Route path="/register" exact element={<Registerscreen />} />
          <Route path="/profile" exact element={<Profilescreen />} />
          <Route path="/admin" exact element={<Adminscreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
