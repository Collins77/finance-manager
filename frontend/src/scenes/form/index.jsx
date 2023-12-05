import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataTeam } from "../../data/mockData";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";
import WithdrawButton from "../../components/WithdrawButton";
import ActionsDropdown from "../../components/ActionsDropdown";

const Accounts = () => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { getAccounts, accounts, loading, error } = useGlobalContext();

  useEffect(() => {
    getAccounts();
  }, [getAccounts]);
  // console.log(amounts)

  if(loading) {
    return <h2>Loading....</h2>
  }

  if(error) {
    return <h2>Error...</h2>
  }
  
  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "title",
      headerName: "Title",
      flex: 0.5,
      // maxWidth: '200px',
      cellClassName: "name-column--cell",
    },
    {
      field: "bank",
      headerName: "Bank",
      // type: "",
      flex: 0.5,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "percentage",
      headerName: "Percentage",
      // type: "",
      flex: 0.5,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "balance",
      headerName: "Balance",
      // type: "",
      flex: 0.5,
      headerAlign: "left",
      align: "left",
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      renderCell: (params) => (
        // <WithdrawButton accountId={params.row.id} />
        <ActionsDropdown accountId={params.row.id} />
      ),
    },
    
  ];
  // const getRowId = (row) => row._id;
 const row = []
 accounts &&
    accounts.forEach((item) => {
      row.push({
        id: item._id,
        title: item.title,
        bank: item.bank,
        percentage: item.percentage,
        balance: item.balance,
      });
    });

  return (
    <Box m="20px">
      <Header title="Accounts" subtitle="Manage your accounts" />
      <Box display="flex" justifyContent="flex-end" mb="10px">
        <Link to="/add-account">
          <Button variant="contained" color="primary">
            Add Account
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
        <DataGrid rows={row} columns={columns} />
      </Box>
    </Box>
  );
};

export default Accounts;
