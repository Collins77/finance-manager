import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Collections from "./scenes/team";
import AddCollection from "./scenes/AddCollection/AddCollection";
import AddAccount from "./scenes/AddAccount/AddAccount";
import WithdrawForm from "./scenes/WithdrawForm/WithdrawForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Withdrawals from "./scenes/withdrawals";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/add-collection" element={<AddCollection />} />
              <Route path="/add-account" element={<AddAccount />} />
              <Route path="/withdraw/:id" element={<WithdrawForm />} />
              <Route path="/withdrawals" element={<Withdrawals />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>    
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </BrowserRouter>
    </ColorModeContext.Provider>
  );
}

export default App;
