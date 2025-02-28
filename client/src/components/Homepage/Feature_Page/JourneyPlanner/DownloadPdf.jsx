// import React, { useEffect, useState } from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   PDFDownloadLink,
// } from "@react-pdf/renderer";

// const ItineraryDocument = ({ itinerary }) => (
//   <Document>
//     <Page style={styles.page}>
//       <Text style={styles.title}>
//         {itinerary?.itineraryName || "Itinerary"}
//       </Text>
//       <Text>
//         Created on:{" "}
//         {itinerary?.createdAt
//           ? new Date(itinerary.createdAt).toLocaleDateString()
//           : "N/A"}
//       </Text>
//       <View>
//         {itinerary?.places?.map((place, index) => (
//           <View key={index} style={styles.place}>
//             <Text style={styles.placeTitle}>
//               {place?.name || "Unnamed Place"}
//             </Text>
//             <Text>
//               <strong>Location:</strong> {place?.location || "N/A"}
//             </Text>
//             <Text>
//               <strong>Description:</strong> {place?.description || "N/A"}
//             </Text>
//             <Text>
//               <strong>Start Time:</strong> {place?.startTime || "N/A"}
//             </Text>
//             <Text>
//               <strong>End Time:</strong> {place?.endTime || "N/A"}
//             </Text>
//           </View>
//         ))}
//       </View>
//     </Page>
//   </Document>
// );

// const styles = StyleSheet.create({
//   page: { padding: 30 },
//   title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
//   place: { marginBottom: 15 },
//   placeTitle: { fontSize: 18, marginBottom: 5 },
// });

// const DownloadPdf = ({ iternary }) => {
//   const [miternary, setIternary] = useState({
//     iternaryName: "",
//     createdAt: "",
//     places: [],
//   });
//   useEffect(() => {
//     console.log(miternary);
//   }, [miternary]);
//   const [loading, setIsLoading] = useState(true);
//   useEffect(() => {
//     if (iternary) {
//       setIternary(iternary);
//       setIsLoading(false);
//     } else {
//       setIsLoading(true);
//     }
//   }, [iternary]);
//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <h2>{miternary?.iternaryName || "Unnamed Iternary"}</h2>
//           <p>
//             Created on:{" "}
//             {miternary?.createdAt
//               ? new Date(miternary.createdAt).toLocaleDateString()
//               : "N/A"}
//           </p>
//           <ul>
//             {miternary?.places?.map((place, index) => (
//               <li key={index}>
//                 <h4>{place.name || "Unnamed Place"}</h4>
//                 <p>
//                   <strong>Location:</strong> {place.location || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Description:</strong> {place.description || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Start Time:</strong> {place.startTime || "N/A"}
//                 </p>
//                 <p>
//                   <strong>End Time:</strong> {place.endTime || "N/A"}
//                 </p>
//                 {place.image_link && (
//                   <img
//                     src={place.image_link}
//                     alt={place.name || "Place Image"}
//                     style={{ maxWidth: "200px", borderRadius: "10px" }}
//                   />
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//       {/* Pdf download button */}
//       <PDFDownloadLink
//         document={
//           <ItineraryDocument itinerary={iternary} fileName="itinerary.pdf" />
//         }
//       >
//         {({ loading }) =>
//           loading ? (
//             <button disabled>Generating PDF...</button>
//           ) : (
//             <button>Download Itinerary as PDF</button>
//           )
//         }
//       </PDFDownloadLink>
//     </div>
//   );
// };

// export default DownloadPdf;

import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { useMediaQuery } from "@mui/material";

// const ItineraryDocument = ({ itinerary }) => (
//   <Document>
//     <Page style={styles.page}>
//       <Text style={styles.title}>
//         {itinerary?.itineraryName || "Itinerary"}
//       </Text>
//       <Text>
//         Created on:{" "}
//         {itinerary?.createdAt
//           ? new Date(itinerary.createdAt).toLocaleDateString()
//           : "N/A"}
//       </Text>
//       <View>
//         {itinerary?.places?.map((place, index) => (
//           <View key={index} style={styles.place}>
//             <Text style={styles.placeTitle}>
//               {place?.name || "Unnamed Place"}
//             </Text>
//             <Text>
//               <strong>Location:</strong> {place?.location || "N/A"}
//             </Text>
//             <Text>
//               <strong>Description:</strong> {place?.description || "N/A"}
//             </Text>
//             <Text>
//               <strong>Start Time:</strong> {place?.startTime || "N/A"}
//             </Text>
//             <Text>
//               <strong>End Time:</strong> {place?.endTime || "N/A"}
//             </Text>
//           </View>
//         ))}
//       </View>
//     </Page>
//   </Document>
// );

const ItineraryDocument = ({ itinerary }) => (
  <Document style={styles.main}>
    <Page style={styles.page}>
      <View style={styles.top}>
        <Text style={styles.title}>
          {itinerary?.iternaryName }
        </Text>
        <Text style={styles.date}>
          Created on:{" "}
          {itinerary?.createdAt
            ? new Date(itinerary.createdAt).toLocaleDateString()
            : "N/A"}
        </Text>
      </View>
      <View style={styles.list}>
        {itinerary?.places?.map((place, index) => (
          <View key={index} style={styles.place}>
            <View style={styles.top2}>
              <Text style={styles.num}>{index+1}</Text>
            <Text style={styles.placeTitle}>
              {place?.name || "Unnamed Place"}
            </Text>
            </View>
            <Text>
              Location: {place?.location || "N/A"}
            </Text>
            <Text>
              Description:{place?.description || "N/A"}
            </Text>
            <Text>
              Start Time: {place?.startTime || "N/A"}
            </Text>
            <Text>
              End Time: {place?.endTime || "N/A"}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  page: {
    padding: 30,
    paddingBottom:10,
    width: "40vw",
    height: "100",
    display: "flex",
    flexDirection: "column",
    borderStyle:"solid",
    borderWidth:"2px",
    borderColor:"black",
    
    fontWeight:"bold"
  },
  top: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    backgroundColor: "#93c5fd",
    width: "100%",
    fontWeight:"bold",
    borderBottomColor:"gray",
    borderBottomWidth:"2px"
  },

  place: { 
      marginBottom: 15,
     display: "flex",
      flexDirection: "column",
    backgroundColor:"#cbd5e1",
    margin:"3px",
    padding:"10px",
    fontWeight:"bold"
    },
  date: {
    display: "block",
    backgroundColor: "#fef9c3",
    width: "50%",
    textAlign: "center",
    marginBottom:"3px"
  },
  top2: {
    display: "flex",
    flexDirection: "row",  // Corrected this line
    alignItems: "center",  // Ensures vertical alignment
  },
  num:{
    backgroundColor:"#000a03",
    width:"25px",
    height:"25px",
    color:"white",
    borderRadius:"160px",
    textAlign:"center",
    paddingTop:"2px",
    marginRight:"12px"
  },
  placeTitle: { fontSize: 18,
     marginBottom: 5 ,
     backgroundColor:"#94a3b8",
     padding:"3px"
    },
  list: {
    display: "flex",
    flexDirection: "column",
  },

  
});
const sampleIternary = {
  iternaryName: "My Dream Vacation",
  createdAt: "2025-01-15T10:00:00Z",
  places: [
    {
      name: "Eiffel Tower",
      location: "Paris, France",
      description: "The iconic iron lattice tower in Paris.",
      startTime: "9:00 AM",
      endTime: "12:00 PM",
      image_link:
        "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
    },
    {
      name: "Colosseum",
      location: "Rome, Italy",
      description: "An ancient amphitheater in the heart of Rome.",
      startTime: "2:00 PM",
      endTime: "5:00 PM",
      image_link:
        "https://upload.wikimedia.org/wikipedia/commons/d/d5/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg",
    },
    {
      name: "Santorini Beaches",
      location: "Santorini, Greece",
      description: "Beautiful beaches with white and blue architecture.",
      startTime: "10:00 AM",
      endTime: "3:00 PM",
      image_link:
        "https://upload.wikimedia.org/wikipedia/commons/5/57/Santorini_sunset.jpg",
    },
  ],
};

// const DownloadPdf = ({ iternary }) => {
//   const [miternary, setIternary] = useState(sampleIternary);
//   useEffect(() => {
//     console.log(miternary);
//   }, [miternary]);
//   const [loading, setIsLoading] = useState(true);
//   useEffect(() => {
//     if (iternary) {
//       setIternary(iternary);
//       setIsLoading(false);
//     } else {
//       setIsLoading(true);
//     }
//   }, [iternary]);
//   return (
//     <div>
//       {!loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <div className="bg-red-500 text-center">
//             <h2>{miternary?.iternaryName || "Unnamed Iternary"}</h2>
//             <p>
//               Created on:{" "}
//               {miternary?.createdAt
//                 ? new Date(miternary.createdAt).toLocaleDateString()
//                 : "N/A"}
//             </p>
//             <ul>
//               {miternary?.places?.map((place, index) => (
//                 <li key={index}>
//                   <h4>{place.name || "Unnamed Place"}</h4>
//                   <p>
//                     <strong>Location:</strong> {place.location || "N/A"}
//                   </p>
//                   <p>
//                     <strong>Description:</strong> {place.description || "N/A"}
//                   </p>
//                   <p>
//                     <strong>Start Time:</strong> {place.startTime || "N/A"}
//                   </p>
//                   <p>
//                     <strong>End Time:</strong> {place.endTime || "N/A"}
//                   </p>
//                   {place.image_link && (
//                     <img
//                       src={place.image_link}
//                       alt={place.name || "Place Image"}
//                       style={{ maxWidth: "200px", borderRadius: "10px" }}
//                     />
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       )}
//       {/* Pdf download button */}
//       <div className="text-center">
//       <PDFDownloadLink
//         document={
//           <ItineraryDocument itinerary={iternary} fileName="itinerary.pdf" />
//         }
//       >
//         {({ loading }) =>
//           loading ? (
//             <button disabled>Generating PDF...</button>
//           ) : (
//             <button>Download Itinerary as PDF</button>
//           )
//         }
//       </PDFDownloadLink>
//       </div>
//     </div>
//   );
// };

// export default DownloadPdf;

const DownloadPdf = ({ iternary }) => {
  const [miternary, setIternary] = useState({
    iternaryName: "",
    createdAt: "",
    places: [],
  });
  useEffect(() => {
    console.log(miternary.data);
  }, [miternary]);
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    if (iternary) {
      setIternary(iternary);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [iternary]);
  return (
    <div  >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="m-4 flex flex-col items-center w-full">
            <div
              className="bg-white text-center border-black border-2 rounded-xl
              p-6 flex flex-col items-center "
            >
              <div>
                <h2 className="text-4xl font-bold bg-blue-300 border-b-4 p-1">
                  {miternary?.iternaryName || "Unnamed Iternary"}
                </h2>
                <p className="m-3 bg-yellow-100">
                  Created on:{" "}
                  {miternary?.createdAt
                    ? new Date(miternary.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
                <div className="w-100 h-1 border-b-4 border-black rounded-3xl"></div>
              </div>

              <div className="flex flex-col flex-wrap items-center">
                <ul className="block">
                  {miternary?.places?.map((place, index) => (
                    <li key={index}>
                      <div className="flex flex-col  items-start m-4 bg-slate-300 p-4">
                        <div className="flex ">
                          <div className="bg-black text-white w-8 h-8 rounded-3xl text-center mr-4 flex flex-col justify-center items-center">
                            {index + 1}
                          </div>
                          <h4 className="bg-slate-400 p-2 ">
                            {place.name || "Unnamed Place"}
                          </h4>
                        </div>
                        <p>
                          <strong>Location:</strong> {place.location || "N/A"}
                        </p>
                        <p>
                          <strong>Description:</strong>{" "}
                          {place.description || "N/A"}
                        </p>
                        <p>
                          <strong>Start Time:</strong>{" "}
                          {place.startTime || "N/A"}
                        </p>
                        <p>
                          <strong>End Time:</strong> {place.endTime || "N/A"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Pdf download button */}
      <div className="text-center">
        <PDFDownloadLink
          document={
            <ItineraryDocument itinerary={iternary} fileName="itinerary.pdf" />
          }
        >
          {({ loading }) =>
            loading ? (
              <button disabled>Generating PDF...</button>
            ) : (
              <button className="bg-blue-500 p-2 text-black font-semibold border-blue-600 rounded-lg shadow-sm">
                Download Itinerary as PDF
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export { DownloadPdf, ItineraryDocument };
