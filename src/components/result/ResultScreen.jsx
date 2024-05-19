import { React } from "react";
import "./ResultScreen.css";
import CardResult from "../cards/CardResult";
import MenuBar from "../menubar/MenuBar";
import { useLocation } from "react-router-dom";

export default function ResultScreen() {

  const location = useLocation();
  const data = location.state.data;

  return (
    <div>
      <MenuBar></MenuBar>
      <header className="header--container">
        <h1 className="title">Home Service</h1>
      </header>

      <div className="subtitle">
        <h1>Resultados</h1>
      </div>

      <div className="result--information">
        {Array.isArray(data) &&
          data.map((value) => (
            <CardResult
              key={value.id}
              id={value.id}
              name={value.name}
              profession={value.profession}
              city={value.city}
              city2={value.city2}
              phoneNumber={value.phone_number}
              description={value.description}
            ></CardResult>
          ))}
      </div>
    </div>
  );
}
