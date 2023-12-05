import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useNavigate } from 'react-router-dom';

const AddAccount = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        bank: "",
        percentage: "",
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Make a request to your server to save the amount and date
          await axios.post(`${server}account/add-account`, formData); 
    
          // Reset the form after successful submission
          setFormData({
            title: "",
            bank: "",
            percentage: "",
          });

            // window.location.reload();
            navigate('/form');
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      };
    
      return (
        <Box
        mx="auto"
        maxWidth="800px"
        >
        <form onSubmit={handleSubmit}>
        <Header title="Create an Account" subtitle="Add Accounts for deductions" />
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Bank"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Do not include the percent sign"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              required
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" mt="20px">
            <Button type="submit" color="primary" variant="contained">
              Add Account
            </Button>
          </Box>
        </form>
    </Box>
    )
}

export default AddAccount;
