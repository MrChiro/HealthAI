import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { firestore, auth } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
        fetchChatHistory(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    const userRef = doc(firestore, 'users', uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data());
    }
  };

  const fetchChatHistory = async (uid) => {
    const chatRef = doc(firestore, 'chats', uid);
    const docSnap = await getDoc(chatRef);
    if (docSnap.exists()) {
      setChatHistory(docSnap.data().messages.slice(-5)); // Get last 5 messages
    }
  };

  // ... rest of the component remains the same
}

export default UserDashboard;