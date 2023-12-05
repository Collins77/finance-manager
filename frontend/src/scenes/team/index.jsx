import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";

const Collections = () => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { getAmounts, amounts, loading, error } = useGlobalContext();
  const deductions = [
    { name: 'Rent', percentage: 0.15 }, // Example: 15% for Rent
    { name: 'Salaries', percentage: 0.3 }, // Example: 15% for Rent
    { name: 'Assets', percentage: 0.1 }, // Example: 15% for Rent
    { name: 'Marketing', percentage: 0.15 }, // Example: 15% for Rent
    { name: 'Operation', percentage: 0.05 }, // Example: 15% for Rent
    { name: 'Personal', percentage: 0.15 }, // Example: 15% for Rent
    { name: 'Growth Fund', percentage: 0.05 }, // Example: 15% for Rent
    { name: 'Contingency', percentage: 0.05 }, // Example: 15% for Rent
    // Add other deductions as needed
  ];

  useEffect(() => {
    getAmounts();
  }, [getAmounts]);
  // console.log(amounts)

  if(loading) {
    return <h2>Loading....</h2>
  }

  if(error) {
    return <h2>Error...</h2>
  }
  const deductionsColumns = deductions.map((deduction) => ({
    field: deduction.name.toLowerCase().replace(' ', '_'), // Use lowercase and replace spaces with underscores
    headerName: `${deduction.name} Deduction`,
    type: 'number',
    flex: 0.5,
    headerAlign: 'left',
    align: 'left',
  }));
  
  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "date",
      headerName: "Date",
      flex: 0.5,
      // filterable: true,
      // maxWidth: '200px',
      cellClassName: "name-column--cell",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 0.5,
      headerAlign: "left",
      align: "left",
    },

    ...deductionsColumns,
    
  ];
  // const getRowId = (row) => row._id;
//  const row = []
//  amounts &&
//     amounts.forEach((item) => {
//       row.push({
//         id: item._id,
//         amount: item.amount,
//         date: item.date,
//       });
//     });

const rows = amounts.map((item) => {
  const deductionRow = deductions.reduce((acc, deduction) => {
    const deductedAmount = item.amount * deduction.percentage;
    return {
      ...acc,
      [deduction.name.toLowerCase().replace(' ', '_')]: deductedAmount,
    };
  }, {});

  return {
    id: item._id,
    amount: item.amount,
    date: item.date,
    ...deductionRow,
  };
});

  return (
    <Box m="20px">
      <Header title="Collections" subtitle="Manage your collections" />
      <Box display="flex" justifyContent="flex-end" mb="20px">
        <Link to="/add-collection">
          <Button variant="contained" color="primary">
            Add Daily Collection
          </Button>
        </Link>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} slots={{ toolbar: GridToolbar }} />
      </Box>
    </Box>
  );
};

export default Collections;
