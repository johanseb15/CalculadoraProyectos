import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#a78bfa', '#f472b6', '#34d399', '#fbbf24'];

export default function EstimateBreakdownChart({ breakdown }) {
  if (!breakdown) return null;
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
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
