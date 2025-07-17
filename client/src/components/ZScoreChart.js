import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';

const ZScoreChart = ({ data, district, studentZScore }) => {
  if (!data.length) return null;

  const chartData = data.map(row => ({
    name: `${row.course} (${row.university.replace(/_/g, ' ')})`,
    Cutoff: row.zScores[district],
  }));

  return (
    <div className="chart-container">
      <h3>Z-score Comparison</h3>
      <ResponsiveContainer width="100%" height={Math.max(300, chartData.length * 40)}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 40, right: 40 }}>
          <XAxis type="number" domain={['dataMin - 0.1', 'dataMax + 0.1']} />
          <YAxis type="category" dataKey="name" width={200} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Cutoff" fill="#8884d8" />
          <ReferenceLine
            x={studentZScore}
            stroke="green"
            strokeWidth={3}
            label={{
              value: 'Your Z-score',
              position: 'top',
              fill: 'green',
              fontWeight: 'bold',
              fontSize: 14,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ZScoreChart;