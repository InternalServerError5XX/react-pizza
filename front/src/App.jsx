import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import "./scss/app.scss";

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
