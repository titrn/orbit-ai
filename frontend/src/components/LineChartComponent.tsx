import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SimulationData {
  time: number;
  altitude: number;
  velocity: number;
}

const LineChartComponent: React.FC<{ data: SimulationData[] }> = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available.</p>;

  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='time' label='Time (s)' />
        <YAxis label='Altitude (m)'/>
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='altitude' stroke='#8884d8' name='Altitude (m)' />
        <Line type='monotone' dataKey='velocity' stroke='#82ca9d' name='Velocity (m/s)' />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
