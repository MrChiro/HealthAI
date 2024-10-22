import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider, Button } from '@material-ui/core';
import { firestore, auth } from '../services/firebase';
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function PractitionerDashboard() {
  const [flaggedCases, setFlaggedCases] = useState([]);
  const [earnings, setEarnings] = useState({ thisMonth: 0, total: 0 });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchFlaggedCases();
        fetchEarnings(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchFlaggedCases = async () => {
    const casesRef = collection(firestore, 'flaggedCases');
    const q = query(casesRef, where('status', '==', 'pending'));
    const querySnapshot = await getDocs(q);
    const cases = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFlaggedCases(cases);
  };

  const fetchEarnings = async (uid) => {
    const earningsRef = doc(firestore, 'practitionerEarnings', uid);
    const docSnap = await getDoc(earningsRef);
    if (docSnap.exists()) {
      setEarnings(docSnap.data());
    }
  };

  const handleReview = async (caseId) => {
    // Update case status in Firestore
    const caseRef = doc(firestore, 'flaggedCases', caseId);
    await updateDoc(caseRef, { status: 'in-review' });
    // Refresh flagged cases
    fetchFlaggedCases();
  };

  // ... rest of the component remains the same
}

export default PractitionerDashboard;