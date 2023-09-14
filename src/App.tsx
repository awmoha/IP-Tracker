// import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import { collection, addDoc } from "firebase/firestore";
// import { firestore } from "./firebase";

// function App() {
//   const [inputValue, setInputValue] = useState(""); // Tillståndsvariabel för att lagra användarinput

//   const handleChange = (e: any) => {
//     setInputValue(e.target.value);
//   };

//   const handleSave = async () => {
//     try {
//       const docRef = await addDoc(collection(firestore, "IP-adress"), {
//         value: inputValue, // Spara användarens input som en egenskap i dokumentet
//         timestamp: new Date().toISOString(),
//       });
//       setInputValue(""); // Återställ inputfältet efter att data har sparats
//     } catch (error) {
//       console.error("Fel vid lagring av data:", error);
//     }
//   };

//   // Exempel på hur du kan hämta IP-adressen i JavaScript
//   const getIPAddress = async () => {
//     const response = await fetch("https://api64.ipify.org?format=json");
//     const data = await response.json();
//     const ipAddress = data.ip;
//     console.log("IP-adress:", ipAddress);

//     // Skicka IP-adressen till Firebase eller en annan lagringsplats
//   };

//   // Exempel på hur du kan lagra IP-adressen i Firebase Firestore
//   // const db = firebase.firestore();
//   // db.collection('scanned-ips').add({
//   //   ipAddress: ipAddress,
//   //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//   // });

//   return (
//     <div className="App">
//       {/* Inputfält för användarinput */}
//       <input
//         type="text"
//         placeholder="Ange namn eller IP-adress"
//         value={inputValue}
//         onChange={getIPAddress}
//       />

//       {/* Knapp för att spara */}
//       <button onClick={handleSave}>Spara</button>

//       {/* Övrig kod */}
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "./firebase";

function App() {
  const [inputValue, setInputValue] = useState(""); // Tillståndsvariabel för att lagra användarinput

  const handleChange = (e : any) => {
    setInputValue(e.target.value);
  };

  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(firestore, "IP-adress"), {
        value: inputValue, // Spara användarens input som en egenskap i dokumentet
        timestamp: new Date().toISOString(),
      });
      setInputValue(""); // Återställ inputfältet efter att data har sparats
    } catch (error) {
      console.error("Fel vid lagring av data:", error);
    }
  };

  useEffect(() => {
    // När komponenten laddas, hämta IP-adressen och spara den i Firebase
    const getIPAddress = async () => {
      try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        const ipAddress = data.ip;
        console.log("IP-adress:", ipAddress);

        // Skicka IP-adressen till Firebase eller en annan lagringsplats
        const docRef = await addDoc(collection(firestore, "IP-adress"), {
          value: ipAddress, // Spara IP-adressen som en egenskap i dokumentet
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Fel vid hämtning av IP-adress:", error);
      }
    };

    getIPAddress();
  }, []);

  return (
    <div className="App">
      {/* Inputfält för användarinput */}
      <input
        type="text"
        placeholder="Ange namn eller IP-adress"
        value={inputValue}
        onChange={handleChange}
      />

      {/* Knapp för att spara */}
      <button onClick={handleSave}>Spara</button>

      {/* Övrig kod */}
    </div>
  );
}

export default App;

