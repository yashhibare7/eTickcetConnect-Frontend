import React from 'react';

const ExportBTN = ({ data }) => {
  const downloadCSV = () => {
    const csvContent = convertArrayToCSV(data);

    const blob = new Blob([csvContent], { type: 'text/csv' });

    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = 'output_data.csv';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const convertArrayToCSV = (data) => {
    if (data.length === 0) {
      return '';
    }

    const header = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).join(','));
    return `${header}\n${rows.join('\n')}`;
  };

  return (
    <a className='BTN2'>

    <button onClick={downloadCSV}>
      Download CSV
    </button>
    </a>
  );
};

export default ExportBTN;
