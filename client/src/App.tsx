import "./App.css";
import Home from "./components/templates/Home/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="app">
      <h1>My Tasks</h1>
      <Home />
      <Toaster />
    </div>
  );
}

export default App;
