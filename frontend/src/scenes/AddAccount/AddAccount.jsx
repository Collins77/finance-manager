import { Box, Button, CircularProgress, TextField } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddAccount = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        bank: "",
        percentage: "",
      });
    const [loading, setLoading] = useState(false);
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // try {
        //   // Make a request to your server to save the amount and date
        //   await axios.post(`${server}account/add-account`, formData); 
    
        //   // Reset the form after successful submission
        //   setFormData({
        //     title: "",
        //     bank: "",
        //     percentage: "",
        //   });

        //     // window.location.reload();
        //     navigate('/form');
        // } catch (error) {
        //   console.error("Error submitting form:", error);
        // }
        try {
          setLoading(true);
    
          // Validate input (example: check if percentage is a valid number)
          const parsedPercentage = parseFloat(formData.percentage);
          if (isNaN(parsedPercentage) || parsedPercentage < 0 || parsedPercentage > 100) {
            // Handle invalid input (e.g., show an error message)
            console.error("Invalid percentage input");
            return;
          }
    
          // Make a request to your server to save the account details
          await axios.post(`${server}account/add-account`, formData);
    
          // Reset the form after successful submission
          setFormData({
            title: "",
            bank: "",
            percentage: "",
          });
    
          // Navigate to the desired location
          navigate('/form');
          toast.success('Account added successfully!');
        } catch (error) {
          if (error.response) {
            toast.error(`Error: ${error.response.data.error}`);
          } else {
            toast.error('An unexpected error occurred.');
          }
        } finally {
          setLoading(false);
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "Add Account"}
            </Button>
          </Box>
        </form>
    </Box>
    )
}

export default AddAccount;
