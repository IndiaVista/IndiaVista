import { StyleSheet } from "@react-pdf/renderer";

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

export default styles