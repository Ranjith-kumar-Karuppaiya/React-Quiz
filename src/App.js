import "./App.css";
import Login from "./components/login";
import Result from "./components/Result";
import Question from "./components/Question";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Login />} />
       
          <Route path="/" element={<Layout />}>
            <Route path="/quiz" element={<Question />} />
            <Route path="/result" element={<Result />} />
          </Route>

      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
