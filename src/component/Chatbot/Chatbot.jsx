import React, { useState } from 'react';
import axios from 'axios';
import ChatbotStyles from "./Chatbot.module.css";

export default function Chatbot() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = async () => {
    // Update chat history with user input
    setChatHistory([...chatHistory, { role: 'user', text: userInput }]);

    // Make a request to the OpenAI GPT API
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: userInput,
          max_tokens: 150,
          n: 1,
          stop: null,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY',
          },
        }
      );

      const chatbotResponse = response.data.choices[0].text;

      // Update chat history with chatbot response
      setChatHistory([...chatHistory, { role: 'chatbot', text: chatbotResponse }]);

      // Clear user input
      setUserInput('');
    } catch (error) {
      console.error('Error communicating with the OpenAI GPT API:', error);
    }
  };

  return (
    <div className={ChatbotStyles.chatbotContainer}>
      <div className={ChatbotStyles.chatHistory}>
        {chatHistory.map((message, index) => (
          <div key={index} className={message.role === 'user' ? ChatbotStyles.userMessage : ChatbotStyles.chatbotMessage}>
            {message.text}
          </div>
        ))}
      </div>
      <div className={ChatbotStyles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleInputChange}
        />
        <button className={ChatbotStyles.chatbotBtn} onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}