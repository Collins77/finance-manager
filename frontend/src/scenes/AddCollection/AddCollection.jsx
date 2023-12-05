import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useNavigate } from 'react-router-dom';

const AddCollection = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amount: "",
        date: "",
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
          await axios.post(`${server}amount/add-amount`, formData); 
    
          // Reset the form after successful submission
          setFormData({
            amount: "",
            date: "",
          });

            // window.location.reload();
            navigate('/collections');
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
            <Header title="Submit Daily Collection" subtitle="Declare your daily collection" />
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          >
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="date"
              label="Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" mt="20px">
            <Button type="submit" color="primary" variant="contained">
              Add Collection
            </Button>
          </Box>
        </form>
    </Box>
    )
}

export default AddCollection;
