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

const ItineraryDocument = ({ itinerary }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>
        {itinerary?.itineraryName || "Itinerary"}
      </Text>
      <Text>
        Created on:{" "}
        {itinerary?.createdAt
          ? new Date(itinerary.createdAt).toLocaleDateString()
          : "N/A"}
      </Text>
      <View>
        {itinerary?.places?.map((place, index) => (
          <View key={index} style={styles.place}>
            <Text style={styles.placeTitle}>
              {place?.name || "Unnamed Place"}
            </Text>
            <Text>
              <strong>Location:</strong> {place?.location || "N/A"}
            </Text>
            <Text>
              <strong>Description:</strong> {place?.description || "N/A"}
            </Text>
            <Text>
              <strong>Start Time:</strong> {place?.startTime || "N/A"}
            </Text>
            <Text>
              <strong>End Time:</strong> {place?.endTime || "N/A"}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

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

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  place: { marginBottom: 15 },
  placeTitle: { fontSize: 18, marginBottom: 5 },
});

const DownloadPdf = ({ iternary }) => {
  const [miternary, setIternary] = useState(sampleIternary);
  useEffect(() => {
    console.log(miternary);
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
    <div>
      {!loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{miternary?.iternaryName || "Unnamed Iternary"}</h2>
          <p>
            Created on:{" "}
            {miternary?.createdAt
              ? new Date(miternary.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
          <ul>
            {miternary?.places?.map((place, index) => (
              <li key={index}>
                <h4>{place.name || "Unnamed Place"}</h4>
                <p>
                  <strong>Location:</strong> {place.location || "N/A"}
                </p>
                <p>
                  <strong>Description:</strong> {place.description || "N/A"}
                </p>
                <p>
                  <strong>Start Time:</strong> {place.startTime || "N/A"}
                </p>
                <p>
                  <strong>End Time:</strong> {place.endTime || "N/A"}
                </p>
                {place.image_link && (
                  <img
                    src={place.image_link}
                    alt={place.name || "Place Image"}
                    style={{ maxWidth: "200px", borderRadius: "10px" }}
                  />
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      {/* Pdf download button */}
      <PDFDownloadLink
        document={
          <ItineraryDocument itinerary={iternary} fileName="itinerary.pdf" />
        }
      >
        {({ loading }) =>
          loading ? (
            <button disabled>Generating PDF...</button>
          ) : (
            <button>Download Itinerary as PDF</button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default DownloadPdf;
