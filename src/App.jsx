import { useEffect, useState } from "react";
import { BASE_URL } from "../config.js";
import { Link } from "react-router-dom";
import "./App.scss";

function App() {
  const [data, setData] = useState([]);
  const fetchRecipe = async () => {
    const response = await fetch(BASE_URL, {
      cache: "no-store",
      method: "GET",
    }).then((response) => response.json());
    setData(response); //title, date, image, ingredients, steps
  };
  useEffect(() => {
    fetchRecipe();
  }, []);
  return (
    <div className="App">
      <div className="container">
        <div className="heading">
          <h2>Recipes</h2>
          <Link to="/add">Add Recipe</Link>
        </div>
        <div className="card-container">
          {data.map((item) => {
            return (
              <div className="card">
                <img src={item.image} alt="" />
                <div className="content">
                  <div className="title">{item.title}</div>
                  <div className="date">{item.date.slice(0, 10)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
