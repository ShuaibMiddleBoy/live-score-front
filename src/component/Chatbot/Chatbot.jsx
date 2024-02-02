import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // New state for selected image
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      event.target.value = null; // Reset the file input field
    }
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') {
      return;
    }

    const userMessage = { role: 'user', text: userInput };
    const newChatHistory = [...chatHistory, userMessage];
    setChatHistory(newChatHistory);

    const formData = new FormData();
    formData.append('prompt', userInput);
    
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}chatbots/generate-content`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const chatbotResponse = response.data.content;
      const chatbotMessage = { role: 'chatbot', text: chatbotResponse };

      const updatedChatHistory = [...newChatHistory, chatbotMessage];
      setChatHistory(updatedChatHistory);

      // Clear the user input field
      setUserInput('');
      setSelectedImage(null); 

    } catch (error) {
      console.error('Error communicating with the server:', error);
    }
  };

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Paper elevation={3} style={{ borderRadius: '10px', marginTop: '20px', marginBottom: '20px' }}>
            <div style={{ padding: '5px' }}>
              <div>
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                      marginBottom: '8px',
                    }}
                  >
                    <div
                      style={{
                        color: message.role === 'user' ? 'white' : 'black',
                        backgroundColor: message.role === 'user' ? '#aaa' : 'rgb(244 244 244)',
                        padding: '10px',
                        borderRadius: '10px',
                      }}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <label htmlFor="fileInput">
                  <IconButton component="span">
                    <AttachFileIcon />
                  </IconButton>
                </label>
                <TextField
                  fullWidth
                  placeholder="Type your message..."
                  variant="outlined"
                  value={userInput}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleSendMessage}>
                        <SendIcon />
                      </IconButton>
                    ),
                  }}
                />
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chatbot;