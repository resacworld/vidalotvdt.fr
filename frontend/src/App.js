import { Context } from "./store/index"
import WhoIAm from "./components/WhoIAm"
import PaperCv from "./components/PaperCv"
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useContext } from "react";

function App() {
  const [ state, dispatch ] = useContext(Context)
  console.log(state)
  
  return (
      <div className={state.darkTheme?"dark":""}>
        <Router hashType="noslash">
          <Routes>
            <Route path="/" element={<WhoIAm />} />
            <Route path="/papercv" element={<PaperCv />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
