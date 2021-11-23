import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import db from "./firebase";
import { collection, onSnapshot } from "@firebase/firestore";
import cat1 from "./cat/frame1.png";
import cat2 from "./cat/frame2.png";

function Vibes(props) {
  var rows = [];
  //console.log(props.vibes);
  for (var i = 0; i < props.vibes; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    rows.push("( ＾◡＾)っ ♡元気♡ ✨ ");
  }
  return <p>{rows}</p>;
}

function App() {
  const [info, setInfo] = useState([]);
  const [isClick, setIsClick] = useState(false);
  const [vibes, setVibes] = useState(0);

  useEffect(() => {
    onSnapshot(collection(db, "person"), (snapshot) => {
      //setInfo(snapshot.docs.map((doc) => doc.data()));
      // console.log(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const clicks = () => {
    setIsClick(true);
    setVibes(vibes + 1);
  };
  useEffect(() => {
    setTimeout(function () {
      setIsClick(false);
    }, 100);
  });
  return (
    <div className="App">
      <header className="App-header">
        <div className="content">
          <h3>Sending good vibes and health</h3>
          <div className="st" onClick={clicks}>
            <img src={isClick ? cat2 : cat1}></img>
          </div>
          <p>{vibes} Vibes sent</p>
          <hr />
        </div>
        <div className="Vibes">
          <Vibes vibes={vibes}></Vibes>
        </div>
      </header>
    </div>
  );
}

export default App;
