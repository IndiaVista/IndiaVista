import React ,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
// import cities from '../cities.json'
import { apiConnector } from '../../../../../services/apiConnector';
import { endpoints } from '../../../../../services/apis';

const{
  MAP_GET_SITE
}=endpoints
const Site = () => {
  const params=useParams();
  const {sr_no}=params;
  const [site, setSite] = useState(null);

  useEffect(() => {
    const fetchdata=async()=>{
      try {
        // console.log("I am in site"+sr_no)
        // const response = await apiConnector("GET", MAP_GET_SITE.replace(":sr_no", sr_no));
        const response = await apiConnector("GET", MAP_GET_SITE,null,null,{sr_no});
        console.log("me:"+response.data.data)
        setSite(response.data.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchdata();
    
  }, [sr_no]);

  if (!site) {
    return <div>Site not found!</div>;
  }
  return (
    <div>
      <h1>{site.name}</h1>
      <p>{site.fulldesc}</p>
      <p>Location: {site.location}</p>
      <img src={site.image_link} alt="" />
    </div>
  )
}

export default Site
