import axios from 'axios';

export async function downloadEstimatePDF({ estimateId, token }) {
  const url = `/api/pdf/estimate/${estimateId}`;
  const res = await axios.post(url, {}, {
    responseType: 'blob',
    headers: { Authorization: `Bearer ${token}` },
  });
  // Descargar el PDF
  const blob = new Blob([res.data], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'estimacion-proyecto.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
