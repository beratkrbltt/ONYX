import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import GameDetail from "./components/GameDetail";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [genre, setGenreState] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const setGenre = (value: string | null) => {
    setGenreState(value);
    setSearch("");
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Loading />

        <Navbar
          onMenuClick={() => setIsSidebarOpen(true)}
          search={search}
          setSearch={setSearch}
        />

        <div className="app-layout">
          <Sidebar
            genre={genre}
            setGenre={setGenre}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    genre={genre}
                    setGenre={setGenre}
                    search={search}
                    setSearch={setSearch}
                  />
                }
              />

              <Route path="/games/:id" element={<GameDetail />} />
            </Routes>

            <Footer />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;