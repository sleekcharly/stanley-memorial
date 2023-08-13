import firebase_app from '@/firebase/config';
import { getFirestore, doc, addDoc, collection } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export default async function addData(data) {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(db, 'messages'), { ...data });
  } catch (e) {
    console.error(e);
    error = e;
  }

  console.log('Document written with ID: ', result.id);

  return { result, error };
}
