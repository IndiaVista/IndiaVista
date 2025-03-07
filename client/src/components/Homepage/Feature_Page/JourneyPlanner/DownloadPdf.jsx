import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, PDFDownloadLink } from "@react-pdf/renderer";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../assets/Loaders/Preview.json";
import styles from "./stylingOfPDF";
import loaderAnimation2 from "../../../../assets/Loaders/Download.json";

// Create PDF Document
const ItineraryDocument = ({ itinerary }) => (
  <Document style={styles.main}>
    <Page style={styles.page}>
      <View style={styles.top}>
        <Text style={styles.title}>{itinerary?.iternaryName}</Text>
        <Text style={styles.date}>
          Created on: {itinerary?.createdAt ? new Date(itinerary.createdAt).toLocaleDateString("en-GB") : "N/A"}
        </Text>
      </View>
      <View style={styles.list}>
        {itinerary?.places?.map((place, index) => (
          <View key={index} style={styles.place}>
            <View style={styles.top2}>
              <Text style={styles.num}>{index + 1}</Text>
              <Text style={styles.placeTitle}>{place?.name || "Unnamed Place"}</Text>
            </View>
            <Text>Location: {place?.location || "N/A"}</Text>
            <Text>Description: {place?.description || "N/A"}</Text>
            <Text>Start Time: {place?.startTime || "N/A"}</Text>
            <Text>End Time: {place?.endTime || "N/A"}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Preview Component
const DownloadPdf = ({ iternary }) => {
  const [miternary, setIternary] = useState({ iternaryName: "", createdAt: "", places: [] });
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (iternary) {
      setIsLoading(true);
      // setTimeout(() => {
      //   setIternary(iternary);
      //   setIsLoading(false);
      // }, 3500); // Simulate loading time before preview
        setIternary(iternary);
        setIsLoading(false);
    }
  }, [iternary]);

  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center">
          <Lottie animationData={loaderAnimation} style={{ width: 150, height: 150 }} />
          <p className="text-gray-400 font-medium mb-3">Loading preview...</p>
        </div>
      ) : (
        <>
          <div className="m-4 flex flex-col items-center w-full">
            <div className="bg-white text-center border-black border-2 rounded-xl p-6 flex flex-col items-center">
              <h2 className="text-4xl font-bold bg-blue-300 border-b-4 p-1">
                {miternary?.iternaryName || "Unnamed Itinerary"}
              </h2>
              <p className="m-3 bg-yellow-100">
                Created on: {miternary?.createdAt ? new Date(miternary.createdAt).toLocaleDateString("en-GB") : "N/A"}
              </p>
              <div className="w-100 h-1 border-b-4 border-black rounded-3xl"></div>

              <ul className="block">
                {miternary?.places?.map((place, index) => (
                  <li key={index}>
                    <div className="flex flex-col items-start m-4 bg-slate-300 p-4">
                      <div className="flex">
                        <div className="bg-black text-white w-8 h-8 rounded-3xl text-center mr-4 flex justify-center items-center">
                          {index + 1}
                        </div>
                        <h4 className="bg-slate-400 p-2">{place.name || "Unnamed Place"}</h4>
                      </div>
                      <p><strong>Location:</strong> {place.location || "N/A"}</p>
                      <p><strong>Description:</strong> {place.description || "N/A"}</p>
                      <p><strong>Start Time:</strong> {place.startTime || "N/A"}</p>
                      <p><strong>End Time:</strong> {place.endTime || "N/A"}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      {/* Pdf download button */}
      <div className="text-center">
        <PDFDownloadLink document={<ItineraryDocument itinerary={iternary} />} fileName="itinerary.pdf">
          {({ loading }) =>
            loading ? (
              <div className="flex flex-col items-center">
                
                <button disabled className="mt-2 bg-gray-500 p-2 text-white font-semibold rounded-lg shadow-sm flex">
                  <p>Generating PDF...</p>
                  <Lottie animationData={loaderAnimation2} style={{ width: 32, height: 32 }} />
                </button>
              </div>
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
