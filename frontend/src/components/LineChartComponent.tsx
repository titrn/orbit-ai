import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineChartComponent: React.FC<{ data: any[] }> = ({ data }) => {
  console.log('LineChartComponent data:', data); // Debugging log

  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='time' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type='monotone' dataKey='altitude' stroke='#8884d8' activeDot={{ r: 8 }} />
      <Line type='monotone' dataKey='velocity' stroke='#82ca9d' />
    </LineChart>
  );
};

export default LineChartComponent;
