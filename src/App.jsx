import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddarticleForm from "./pages/AddarticleForm";
import store from "./store";
import Navbar from "./components/Navbar";
import Subnavbar from "./components/Subnavbar";
import About from "./pages/About";
import ViewArticle from "./pages/ViewArticle";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Subnavbar />
          <div className="pt-[118px]">
            <Routes>
              {/* <Route path='/' element={<Home />} /> */}
              <Route path='/addarticle' element={<AddarticleForm />} />
              <Route path='/about' element={<About />} />
              <Route path='/blogger/:id' element={<ViewArticle />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
