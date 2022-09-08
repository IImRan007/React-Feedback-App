import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeedbackList from "./components/FeedbackList";
import Header from "./components/Header";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import About from "./pages/About";
import AboutIconLink from "./components/AboutIconLink";
import { FeedbackProvider } from "./context/FeedbackContext";

const App = () => {
  return (
    <>
      <FeedbackProvider>
        <Header />
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <FeedbackForm />
                    <FeedbackStats />
                    <FeedbackList />
                  </>
                }
              ></Route>
              <Route path="/about" element={<About />} />
            </Routes>
            <AboutIconLink />
          </div>
        </BrowserRouter>
      </FeedbackProvider>
    </>
  );
};

export default App;
