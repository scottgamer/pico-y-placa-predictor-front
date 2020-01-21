import React from "react";
import "./App.css";

import MainNavigation from "../src/components/Navigation/MainNavigation";
import MainPage from "./pages/Main/Main";

function App() {
  return (
    <div className="App">
      <MainNavigation />
      <main className="main-content">
        <MainPage />
      </main>
    </div>
  );
}

export default App;
