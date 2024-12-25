import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import { getRandomItem as getRandomItemFromUtils } from "./utils/trie_data";
import ItemDisplay from "./components/ItemDisplay";
import Nav from "./components/Nav";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Apropos from "./components/pages/Apropos";
import Matieres from "./components/pages/Matieres";
import Notes from "./components/pages/Notes";
import Etudiants from "./components/pages/etudiants/Etudiants";
import StudentManager from "./components/pages/etudiants/StudentManager";

// Home component moved outside App to avoid re-creation
const Home = ({ randomItem, onGetRandomItem }) => (
  <>
    <MainContent />
    <button onClick={onGetRandomItem}>Get Random Item</button>
    {randomItem && <ItemDisplay item={randomItem} />}
  </>
);

function App() {
  const [data, setData] = useState([]);
  const [randomItem, setRandomItem] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => setData(jsonData))
      .catch((error) =>
        console.error("Erreur lors du chargement des données:", error)
      );
  }, []);

  const handleGetRandomItem = () => {
    if (data.length > 0) {
      const selectedItem = getRandomItemFromUtils(data);
      setRandomItem(selectedItem);
    }
  };

  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Nav />
        <Header />

        <div style={{ flex: 1, padding: "16px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  randomItem={randomItem}
                  onGetRandomItem={handleGetRandomItem}
                />
              }
            />
            <Route path="/notes" element={<Notes data={data} />} />
            <Route path="/etudiants" element={<StudentManager data={data} />} />
            <Route path="/matieres" element={<Matieres data={data} />} />
            <Route path="/apropos" element={<Apropos />} />
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
