import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD1URY-aGv3_EstRlVbUBVCLhKGAlQCqWM",
    authDomain: "crwn-clothing-db-36dec.firebaseapp.com",
    projectId: "crwn-clothing-db-36dec",
    storageBucket: "crwn-clothing-db-36dec.appspot.com",
    messagingSenderId: "906379879308",
    appId: "1:906379879308:web:f7b8d34f9ccc6c6f0f2ca9"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
      prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  // Section 10 module 122 Storing to firestoreDb
  // writebatch method needed for successful write transaction(s) 
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);

    });

    await batch.commit();
    // console.log('Done');
  }

  // Section 10 module 124 read data to be used in products

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        accumulator[title.toLowerCase()] = items;
        return accumulator;
    },{})

    return categoryMap;
  }

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation ={}) => {

    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
               displayName, 
               email,
               createdAt,
               ...additionalInformation 
            });

        } catch(error){
            console.log('Error creating user', error)
        }
    }
    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);
  }
  
  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => {

      onAuthStateChanged(auth, callback)
    }