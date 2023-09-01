import React, { useState } from 'react';
import { backendUrl } from './backendUrl';
import { useNavigate } from 'react-router-dom';


const DataInputForm = () => {

    const initialFormData = {
        dataPoint1: { timestamp: '', value: '' },
        dataPoint2: { timestamp: '', value: '' },
        dataPoint3: { timestamp: '', value: '' },
        dataPoint4: { timestamp: '', value: '' },
        dataPoint5: { timestamp: '', value: '' },
        dataPoint6: { timestamp: '', value: '' },
        dataPoint7: { timestamp: '', value: '' },
        dataPoint8: { timestamp: '', value: '' },
        dataPoint9: { timestamp: '', value: '' },
        dataPoint10: { timestamp: '', value: '' }
    }
  const [formData, setFormData] = useState(initialFormData);
    const navigate = useNavigate();

  const handleChange = (event, dataPointKey) => {
    const { name, value } = event.target;

    if (name === 'timestamp') {
        const currentTime = new Date().toISOString().split('T')[0];
        if (value > currentTime) {
          return; // Don't update state for future dates
        }
      }
  
      // Validate value to ensure it's a number
      if (name === 'value' && isNaN(value)) {
        return; // Don't update state for non-numeric values
      }

    setFormData((prevData) => ({
      ...prevData,
      [dataPointKey]: { ...prevData[dataPointKey], [name]: value },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    // You can send this formData to your API endpoint for insertion
    try{
        const response = await fetch(`${backendUrl}/adddatapoint`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            setFormData(initialFormData);
            console.log('Data sent to backend successfully');
          } else {
            console.error('Error sending data to backend');
          }
    }catch(error){
        console.error('Error in form submission:', error);
    }
  };

  return (
    <div>
      <h2>Data Input Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((dataPointKey) => (
          <div key={dataPointKey}>
            <h3>Data Point {dataPointKey.substring(9)}</h3>
            <label>
              Timestamp:
              <input
                type="date"
                name="timestamp"
                value={formData[dataPointKey].timestamp}
                onChange={(e) => handleChange(e, dataPointKey)}
                max={new Date().toISOString().split('.')[0]}
                required
              />
            </label>
            <label>
              Value:
              <input
                type="number"
                name="value"
                value={formData[dataPointKey].value}
                onChange={(e) => handleChange(e, dataPointKey)}
                required
              />
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

      <button onClick={()=>navigate('/charts')}>Show Charts</button>
    </div>
  );
};

export default DataInputForm;