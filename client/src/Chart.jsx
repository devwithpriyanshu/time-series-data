import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import React, { useEffect, useState } from 'react'
import { backendUrl } from './backendUrl';

export default function Charts({id}) {

    const [dataPointArray, setDataPointArray] = useState([]);
   

    const getDataPoint = async ()=>{
        const response= await fetch(`${backendUrl}/datapoint/${id}`)
        const dataPoints = await response.json();
        setDataPointArray(dataPoints);
        console.log(dataPoints);
    }

    useEffect(()=>{
        
        getDataPoint();
        // eslint-disable-next-line
        
    },[])


  return (
    <div>Chart {id}
        <LineChart width={600} height={350} data={dataPointArray}
            margin={{top: 20}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey='timestamp'/>
                <YAxis/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={`Data Point${id}`} stroke="#8884d8" activeDot={{ r: 8 }}
                />
                
            </LineChart>
    </div>
  )
}
