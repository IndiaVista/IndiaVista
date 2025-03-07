import { useParams } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { apiConnector } from '../../../../services/apiConnector';
import { calendarEndpoints } from '../../../../services/apis';

const DateInfo = () => {
  const { date } = useParams(); 
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    CALENDAR_API,
  } = calendarEndpoints

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const url = `${CALENDAR_API}?date=${date}`;
        const response = await apiConnector("GET", url);
        // `/events?date=${date}`
        // console.log(response.data)
        // console.log(eventData)
        if (response.data) {
          setEventData(response.data.data);
        } 
        else {
          setError('Event not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching event data');
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [date]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-10">
      {eventData && eventData.event ? (
        <div>
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Event Details</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 mb-3"><strong className="font-bold">Event:</strong> {eventData.event}</p>
            <p className="text-lg text-gray-700 mb-3"><strong className="font-bold">Type:</strong> {eventData.type}</p>
            <p className="text-lg text-gray-700 mb-3"><strong className="font-bold">Extras:</strong> {eventData.extras}</p>
            <p className="text-lg text-gray-700 mb-3"><strong className="font-bold">Region:</strong> {eventData.region}</p>
            <p className="text-lg text-gray-700 mb-3"><strong className="font-bold">Religion:</strong> {eventData.religion}</p>
            <p className="text-lg text-gray-700 mb-3"><strong className="font-bold">Festive Type:</strong> {eventData.festive_type}</p>
            <p className="text-lg text-gray-700 mb-3"><strong className="font-bold">Description:</strong> {eventData.description}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl text-gray-600">No event found for this date.</p>
      )}
    </div>
  );
  
};

export default DateInfo;