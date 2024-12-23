import React ,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import cities from '../cities.json'
const Site = () => {
  const params=useParams();
  const {id}=params;
  const [site, setSite] = useState(null);

  useEffect(() => {
    // Find the site with the matching ID
    console.log(id)
    const foundSite = cities.find((site) => site.sr_no === id);
    setSite(foundSite); // Update state with the found site
  }, [id]);

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
