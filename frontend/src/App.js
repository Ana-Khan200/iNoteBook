import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./context/notes/NoteState";
import { Routes, Route } from "react-router-dom";
import Alert from "./Components/Alert";
import AlertState from "./context/Alert/AlertState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <div className="App">
      <AlertState>
        <NoteState>
          <Navbar />
          <Alert />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="login" element={<Login />} />
              <Route exact path="about" element={<About />} />
              <Route exact path="signup" element={<Signup />} />
            </Routes>
          </div>
        </NoteState>
      </AlertState>
    </div>
  );
}

export default App;
