import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const DEFAULT_COLORS = ['#a78bfa', '#f472b6', '#34d399', '#fbbf24'];

export default function EstimateBreakdownChart({ breakdown, colors = DEFAULT_COLORS }) {
  if (!breakdown || typeof breakdown !== 'object') return null;
  
  // Validate required properties
  const requiredProps = ['base', 'features', 'complexity', 'timeline'];
  if (!requiredProps.every(p => breakdown[p] !== undefined)) return null;

  const data = [
    { name: 'Base', value: breakdown.base },
    { name: 'Características', value: breakdown.features },
    { name: 'Complejidad', value: breakdown.complexity * 100 }, // visual
    { name: 'Timeline', value: breakdown.timeline * 100 }, // visual
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
