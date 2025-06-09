// import { createStackNavigator } from '@react-navigation/stack';
// import 'react-native-gesture-handler';
// import SportsButtons from '../Screens/SportsButtons';
// import SportsScreen from '../Screens/SportsScreen';
// import Reservation from './Reservation';

// type RootStackParamList = {
//   Home: undefined;
//   Sport: { sport: string; backgroundColor: string };
//   Reservation: { terrain: { id: number; name: string; sport: string; address: string } };
// };

// const Stack = createStackNavigator<RootStackParamList>();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Home" component={SportsButtons} />
//       <Stack.Screen name="Sport" component={SportsScreen} />
//       <Stack.Screen name="Reservation" component={Reservation} />
//     </Stack.Navigator>
//   );
// }
// index.tsx (ou app/(tabs)/index.tsx)

// import React, { useEffect, useState } from "react";
// import cong from "../../configuration"; // Assure-toi que c'est bien un export par défaut
// import { getDatabase, ref, onValue } from "firebase/database";

// // Définir le type des données attendues
// type Item = string; // ici c’est un simple tableau de strings, adapte si tu as des objets

// function App() {
//   // Typage explicite du state : tableau de string
//   const [data, setData] = useState<Item[]>([]);

//   useEffect(() => {
//     const database = getDatabase(cong);
//     const collectionRef = ref(database, "your_collection");

//     const fetchData = () => {
//       onValue(collectionRef, (snapshot) => {
//         const dataItem = snapshot.val();

//         if (dataItem) {
//           // dataItem est probablement un objet, on extrait ses valeurs en tableau
//           const displayItem: Item[] = Object.values(dataItem);
//           setData(displayItem);
//         } else {
//           setData([]);
//         }
//       });
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '10px' }}>
//       <h1>Data from database:</h1>
//       <ul>
//         {data.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;



// import React, { useEffect, useState } from "react";
// import cong from "../../configuration"; // Assure-toi que c'est bien un export par défaut
// import { getDatabase, ref, onValue } from "firebase/database";

// type Item = {
//   Nom: string;
//   Adresse: string;
//   Téléphone: string;
//   Email: string;
//   Type: string;
//   Arrondissement: string;
//   Catégorie: string;
//   Équipements: string;
// };

// function App() {
//   const [data, setData] = useState<Item[]>([]);

//   useEffect(() => {
//     const database = getDatabase(cong);
//     const collectionRef = ref(database, "/"); // Remplace par le bon chemin

//     const fetchData = () => {
//       onValue(collectionRef, (snapshot) => {
//         const dataItem = snapshot.val();

//         if (dataItem) {
//           const displayItem: Item[] = Object.values(dataItem);
//           setData(displayItem);
//         } else {
//           setData([]);
//         }
//       });
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '10px' }}>
//       <h1>Liste des lieux :</h1>
//       <ul>
//         {data.map((item, index) => (
//           <li key={index} style={{ marginBottom: 20, borderBottom: '1px solid #444', paddingBottom: 10 }}>
//             <h2>{item.Nom}</h2>
//             <p><strong>Adresse :</strong> {item.Adresse}</p>
//             <p><strong>Téléphone :</strong> {item.Téléphone || "N/A"}</p>
//             <p><strong>Email :</strong> {item.Email || "N/A"}</p>
//             <p><strong>Type :</strong> {item.Type}</p>
//             <p><strong>Arrondissement :</strong> {item.Arrondissement}</p>
//             <p><strong>Catégorie :</strong> {item.Catégorie}</p>
//             <p><strong>Équipements :</strong> {item.Équipements}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from "react";
// import cong from "../../configuration";
// import { getDatabase, ref, onValue } from "firebase/database";

// type Item = {
//   Nom: string;
//   Adresse: string;
//   Téléphone: string;
//   Email: string;
//   Type: string;
//   Arrondissement: string;
//   Catégorie: string;
//   Équipements: string;
//   imageUrl?: string; // optionnel
// };

// function App() {
//   const [data, setData] = useState<Item[]>([]);

//   useEffect(() => {
//     const database = getDatabase(cong);
//     const collectionRef = ref(database, "/");

//     onValue(collectionRef, (snapshot) => {
//       const dataItem = snapshot.val();
//       if (dataItem) {
//         const displayItem: Item[] = Object.values(dataItem);
//         setData(displayItem);
//       } else {
//         setData([]);
//       }
//     });
//   }, []);

//   // Fonction click pour chaque vignette
//   const handleClick = (item: Item) => {
//     alert(`Tu as cliqué sur : ${item.Nom}`);
//     // Ou redirige vers une page détail, etc.
//   };

//   return (
//     <div style={{ backgroundColor: "#111", color: "white", minHeight: "100vh", padding: "20px" }}>
//       <h1>Liste des lieux :</h1>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
//         {data.map((item, index) => (
//           <div
//             key={index}
//             onClick={() => handleClick(item)}
//             style={{
//               cursor: "pointer",
//               backgroundColor: "#222",
//               borderRadius: 10,
//               width: 250,
//               padding: 15,
//               boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
//               transition: "transform 0.2s",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//             onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//           >
//             <img
//               src={item.imageUrl || "https://via.placeholder.com/250x150?text=No+Image"}
//               alt={item.Nom}
//               style={{ width: "100%", borderRadius: "8px", marginBottom: "10px", objectFit: "cover", height: "150px" }}
//             />
//             <h2 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>{item.Nom}</h2>
//             <p style={{ fontSize: "0.9rem" }}><strong>Adresse :</strong> {item.Adresse}</p>
//             <p style={{ fontSize: "0.9rem" }}><strong>Type :</strong> {item.Type}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;



// import React, { useEffect, useState } from "react";
// import cong from "../../configuration";
// import { getDatabase, ref, onValue } from "firebase/database";

// type Item = {
//   Nom: string;
//   Adresse: string;
//   Téléphone?: string;
//   Email?: string;
//   Type: string;
//   Arrondissement?: string;
//   Catégorie: string;
//   Équipements?: string;
//   imageUrl?: string;
// };

// function App() {
//   const [data, setData] = useState<Item[]>([]);
//   const [expandedCards, setExpandedCards] = useState<number[]>([]);

//   useEffect(() => {
//     const database = getDatabase(cong);
//     const collectionRef = ref(database, "/");

//     onValue(collectionRef, (snapshot) => {
//       const dataItem = snapshot.val();
//       if (dataItem) {
//         const displayItem: Item[] = Object.values(dataItem);
//         setData(displayItem);
//       } else {
//         setData([]);
//       }
//     });
//   }, []);

//   const toggleCard = (index: number) => {
//     setExpandedCards((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

//   return (
//     <div style={{ backgroundColor: "#111", color: "white", minHeight: "100vh", padding: "20px" }}>
//       <h1 style={{ marginBottom: "20px" }}>Lieux enregistrés :</h1>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
//         {data.map((item, index) => {
//           const isExpanded = expandedCards.includes(index);
//           return (
//             <div
//               key={index}
//               style={{
//                 backgroundColor: "#222",
//                 borderRadius: 10,
//                 width: 300,
//                 padding: 15,
//                 boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
//                 transition: "transform 0.2s",
//               }}
//             >
//               <img
//                 src={item.imageUrl || "https://via.placeholder.com/300x160?text=Pas+d'image"}
//                 alt={item.Nom}
//                 style={{
//                   width: "100%",
//                   height: "160px",
//                   objectFit: "cover",
//                   borderRadius: "8px",
//                   marginBottom: "10px",
//                 }}
//               />
//               <h2 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>{item.Nom}</h2>
//               <p><strong>Adresse :</strong> {item.Adresse}</p>
//               <p><strong>Type :</strong> {item.Type}</p>
//               <p><strong>Catégorie :</strong> {item.Catégorie}</p>

//               {isExpanded && (
//                 <>
//                   <p><strong>Arrondissement :</strong> {item.Arrondissement || "N/A"}</p>
//                   <p><strong>Téléphone :</strong> {item.Téléphone || "N/A"}</p>
//                   <p><strong>Email :</strong> {item.Email || "N/A"}</p>
//                   <p><strong>Équipements :</strong> {item.Équipements || "N/A"}</p>
//                 </>
//               )}

//               <button
//                 onClick={() => toggleCard(index)}
//                 style={{
//                   marginTop: 10,
//                   padding: "8px 12px",
//                   borderRadius: 6,
//                   backgroundColor: "#444",
//                   color: "white",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 {isExpanded ? "Voir moins" : "Voir plus"}
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import cong from "../../configuration";
import { getDatabase, ref, onValue } from "firebase/database";

type Item = {
  Nom: string;
  Adresse: string;
  Téléphone?: string;
  Email?: string;
  Type: string;
  Arrondissement?: string;
  Catégorie: string;
  Équipements?: string;
  imageUrl?: string;
};

function App() {
  const [data, setData] = useState<Item[]>([]);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  useEffect(() => {
    const database = getDatabase(cong);
    const collectionRef = ref(database, "/");

    onValue(collectionRef, (snapshot) => {
      const dataItem = snapshot.val();
      if (dataItem) {
        const displayItem: Item[] = Object.values(dataItem);
        setData(displayItem);
      } else {
        setData([]);
      }
    });
  }, []);

  const toggleCard = (index: number) => {
    setExpandedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div style={{ backgroundColor: "#111", color: "white", height: "100vh", padding: "20px", boxSizing: "border-box" }}>
      <h1 style={{ marginBottom: "20px" }}>Lieux enregistrés :</h1>

      <div
        style={{
          height: "85vh",
          overflowY: "auto",
          paddingRight: "10px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
          {data.map((item, index) => {
            const isExpanded = expandedCards.includes(index);
            return (
              <div
                key={index}
                style={{
                  backgroundColor: "#222",
                  borderRadius: 10,
                  width: 300,
                  padding: 15,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={item.imageUrl || "https://via.placeholder.com/300x160?text=Pas+d'image"}
                  alt={item.Nom}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <h2 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>{item.Nom}</h2>
                <p><strong>Adresse :</strong> {item.Adresse}</p>
                <p><strong>Type :</strong> {item.Type}</p>
                <p><strong>Catégorie :</strong> {item.Catégorie}</p>

                {isExpanded && (
                  <>
                    <p><strong>Arrondissement :</strong> {item.Arrondissement || "N/A"}</p>
                    <p><strong>Téléphone :</strong> {item.Téléphone || "N/A"}</p>
                    <p><strong>Email :</strong> {item.Email || "N/A"}</p>
                    <p><strong>Équipements :</strong> {item.Équipements || "N/A"}</p>
                  </>
                )}

                <button
                  onClick={() => toggleCard(index)}
                  style={{
                    marginTop: 10,
                    padding: "8px 12px",
                    borderRadius: 6,
                    backgroundColor: "#444",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {isExpanded ? "Voir moins" : "Voir plus"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
