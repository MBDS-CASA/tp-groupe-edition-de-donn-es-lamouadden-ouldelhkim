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
import StudentManager from "./components/pages/etudiants/StudentManager";
import NoteManager from "./components/pages/Note/NoteManager";
import CourseManager from "./components/pages/courses/CourseManager";

// Composant Home
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
            {/* On passe data à NoteManager si on veut l'utiliser */}
            <Route path="/notes" element={<NoteManager data={data} />} />
            <Route path="/etudiants" element={<StudentManager data={data} />} />
            <Route path="/matieres" element={<CourseManager data={data} />} />
            <Route path="/apropos" element={<Apropos />} />
            {/* Redirection des routes inconnues vers la page d'accueil */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
