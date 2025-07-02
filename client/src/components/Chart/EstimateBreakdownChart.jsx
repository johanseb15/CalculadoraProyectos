// Chart for estimate breakdown
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#a78bfa', '#f472b6', '#facc15', '#34d399'];

const EstimateBreakdownChart = ({ estimatedCost }) => {
  if (!estimatedCost) return null;
  const data = [
    { name: 'Base', value: estimatedCost.breakdown.base },
    { name: 'Características', value: estimatedCost.breakdown.features },
    { name: 'Complejidad', value: Math.round((estimatedCost.breakdown.complexity-1)*100) },
    { name: 'Timeline', value: Math.round((estimatedCost.breakdown.timeline-1)*100) },
  ];
  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default EstimateBreakdownChart;
