import React from 'react'
import Chart from './Chart';

export default function ShowCharts() {

const chartComponents = [];

  for (let i = 1; i <=10; i++) {
    chartComponents.push(<Chart key={i} id={i} />);
  }

  return (
    <div>
        {chartComponents}
    </div>
  )
}
