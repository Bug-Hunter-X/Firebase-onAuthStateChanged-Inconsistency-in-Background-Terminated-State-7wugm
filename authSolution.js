```javascript
// authSolution.js
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

const updateUI = (user) => {
  // Update UI based on user's authentication status
  // ...
};

const checkLocalState = async () => {
  const storedUser = localStorage.getItem('firebaseUser');
  if(storedUser) {
    const parsedUser = JSON.parse(storedUser);
    updateUI(parsedUser);
  }
};

checkLocalState(); // initial UI check

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    localStorage.setItem('firebaseUser', JSON.stringify(user));
    updateUI(user);
  } else {
    // User is signed out
    localStorage.removeItem('firebaseUser');
    updateUI(null);
  }
});
```