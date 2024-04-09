import './App.css';
import AppProvider from "./AppContext/Provider";
import Routes from "./routes";
import {BrowserRouter} from "react-router-dom";

function App() {

  return (
    <div>
      <AppProvider>
          <BrowserRouter>
              <Routes/>
          </BrowserRouter>
        </AppProvider>
    </div>
  );
}

export default App;
