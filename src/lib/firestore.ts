import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCfPSra6DxKmZynCojVyQ2iXzRIdngg4v4',
  authDomain: 'iedereen-flandrien-df433.firebaseapp.com',
  projectId: 'iedereen-flandrien-df433',
  storageBucket: 'iedereen-flandrien-df433.appspot.com',
  messagingSenderId: '1024627167958',
  appId: '1:1024627167958:web:9614da33d87148a21e2f77',
  measurementId: 'G-JRJ38HX4QE',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function getFireStoreCollection(collectionId: string) {
  const querySnapshot = await getDocs(collection(db, collectionId))
  const items: any[] = []
  querySnapshot.forEach((doc) => {
    items.push(doc.data())
  })
  return items
}

export async function getFireStoreDocument(
  collectionId: string,
  docId: string
) {
  return {}
}

export async function setFireStoreDocument(
  collectionId: string,
  docId: string,
  document: any
) {
  const docRef = doc(db, collectionId, docId)
  await setDoc(docRef, document, { merge: true })
}
