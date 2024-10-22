import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { sendMessageToBotpress } from '../services/botpress';
import { firestore, auth } from '../services/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        loadChatHistory(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadChatHistory = async (uid) => {
    const chatRef = doc(firestore, 'chats', uid);
    const docSnap = await getDoc(chatRef);
    if (docSnap.exists()) {
      setMessages(docSnap.data().messages);
    }
  };

  const handleSend = async () => {
    if (input.trim() && userId) {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);

      try {
        const botResponse = await sendMessageToBotpress(input);
        const botMessage = { text: botResponse.responses[0].text, sender: 'bot' };
        const updatedMessages = [...messages, userMessage, botMessage];
        setMessages(updatedMessages);

        // Save to Firebase
        const chatRef = doc(firestore, 'chats', userId);
        await setDoc(chatRef, { messages: updatedMessages }, { merge: true });

      } catch (error) {
        console.error('Error sending message to Botpress:', error);
      }

      setInput('');
    }
  };

  // ... rest of the component remains the same
}

export default ChatInterface;