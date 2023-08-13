import nc from 'next-connect';
import { NextRequest, NextResponse } from 'next/server';

import firebase_app from '@/firebase/config';
import {
  getFirestore,
  getDocs,
  collection,
  query,
  orderBy,
} from 'firebase/firestore';

const handler = nc();

handler.get(async (req, res) => {
  const db = getFirestore(firebase_app);

  const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

  // get messages
  try {
    const querySnapshot = await getDocs(q);
    const results = [];

    querySnapshot.forEach((doc) => {
      results.push({
        postId: doc.id,
        ...doc.data(),
      });
    });
    return res.json(results);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

export default handler;
