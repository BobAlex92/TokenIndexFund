import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const TrendChart = ({ data }) => {
  return (
    <LineChart
      width={600} // Adjust width as needed
      height={300} // Adjust height as needed
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <defs>
        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff0000" stopOpacity={1} /> {/* Red */}
          <stop offset="100%" stopColor="#00ff00" stopOpacity={1} /> {/* Green */}
        </linearGradient>
      </defs>
      <Line
        type="monotone"
        dataKey="price"
        stroke="url(#colorPrice)" // Using the gradient
        strokeWidth={2}
        dot={false}
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default TrendChart;
