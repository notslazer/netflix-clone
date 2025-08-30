import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7AGaq1mq3vNQQ4-uvt5K1cjKZOscnW90",
  authDomain: "netflix-clone-6fb9a.firebaseapp.com",
  projectId: "netflix-clone-6fb9a",
  storageBucket: "netflix-clone-6fb9a.firebasestorage.app",
  messagingSenderId: "90037985379",
  appId: "1:90037985379:web:f4fa09b9b6331f4fc2d856"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            });
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, signup, login, logout };