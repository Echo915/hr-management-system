import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const Table = ({ data, columns }) => {
  const [ searchTerm, setSearchTerm] = useState('');
  const [ theme, setTheme] = useState('');

  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = (e) => setTheme(e.matches ? 'dark' : 'light');

    // Set initial theme
    updateTheme(match);

    // Listen for changes
    match.addEventListener('change', updateTheme);

    }, []);


  // Filter the data by checking if any column matches the search term
  const filteredData = data != null ? data.filter((item) =>
    columns.some((col) => {
      const value = 
        typeof col.selector === 'function'
          ? col.selector(item)
          : item[col.selector];

      return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    })
  ) : '';

  // Custom styles for DataTable
    const customStyles = {
        headCells: {
            style: {
            fontWeight: 'bold',
            fontSize: '16px',  
            },
        },
        rows: {
            style: {
            '&:hover': {
                backgroundColor: '#D82F5A',
                color: 'white',     
            },
            },
        },
    };



  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <DataTable
        className="bg-light rounded"
        theme={theme}
        columns={columns}
        data={filteredData}
        pagination
        striped
        customStyles={customStyles}
      />
    </>
  );
};

export default Table;
