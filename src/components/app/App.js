import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHeader } from "../appHeader/AppHeader";
import { HomePage } from "../pages/HomePage";
import { ComicsPage } from "../pages/ComicsPage";
import { Page404 } from "../pages/404";
import { SingleComicPage } from "../pages/SinglComicPage";

import decoration from "../../resources/img/vision.png";

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/comicsList" element={<ComicsPage />} />
            <Route path="/comics/:comicId" element={<SingleComicPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    </Router>
  );
};

export default App;
