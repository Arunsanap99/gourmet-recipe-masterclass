/**
 * TastyNest - Firebase Cloud Integration & Authentication Service
 * Connected to Firebase Project: vibecart-146fe
 */

const firebaseConfig = {
  apiKey: "AIzaSyAyDuqUnYDdd4di_Rw2RzBLT3gh813wD2E",
  authDomain: "vibecart-146fe.firebaseapp.com",
  projectId: "vibecart-146fe",
  storageBucket: "vibecart-146fe.firebasestorage.app",
  messagingSenderId: "879031445851",
  appId: "1:879031445851:web:7cd605c114ed6e03b5d27e",
  measurementId: "G-4RPHZP2CE9"
};

const TastyFirebase = (() => {
  let app = null;
  let auth = null;
  let db = null;
  let isInitialized = false;
  let currentUser = null;
  let syncListeners = [];

  function init() {
    try {
      if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
          app = firebase.initializeApp(firebaseConfig);
        } else {
          app = firebase.app();
        }
        auth = firebase.auth();
        db = firebase.firestore();
        isInitialized = true;
        console.log("🔥 Firebase initialized successfully for TastyNest!");

        // Set up real-time auth listener
        auth.onAuthStateChanged(handleAuthStateChanged);
      } else {
        console.warn("⚠️ Firebase SDK not loaded in browser.");
      }
    } catch (err) {
      console.error("Firebase init error:", err);
    }
  }

  function handleAuthStateChanged(user) {
    currentUser = user;
    notifySyncListeners('auth_changed', user);
    
    if (user) {
      console.log("👤 User authenticated:", user.email);
      // Auto-fetch cloud documents
      loadUserDataFromCloud(user.uid);
    } else {
      console.log("👤 No authenticated user, running in local storage mode.");
    }
  }

  // Auth Operations
  async function registerWithEmail(name, email, password) {
    if (!auth) throw new Error("Firebase Auth is not ready.");
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Update display name
    await user.updateProfile({
      displayName: name || email.split('@')[0],
      photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    });

    // Create user profile in Firestore
    if (db) {
      await db.collection('users').doc(user.uid).set({
        name: name,
        email: email,
        photoURL: user.photoURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        preferences: {
          diet: "all",
          spiceLevel: "medium",
          notifications: true
        }
      }, { merge: true });
    }

    return user;
  }

  async function loginWithEmail(email, password) {
    if (!auth) throw new Error("Firebase Auth is not ready.");
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  }

  async function loginWithGoogle() {
    if (!auth) throw new Error("Firebase Auth is not ready.");
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    const user = result.user;

    // Ensure Firestore profile exists
    if (db && user) {
      await db.collection('users').doc(user.uid).set({
        name: user.displayName || user.email.split('@')[0],
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }

    return user;
  }

  async function sendPasswordReset(email) {
    if (!auth) throw new Error("Firebase Auth is not ready.");
    await auth.sendPasswordResetEmail(email);
  }

  async function logout() {
    if (!auth) return;
    await auth.signOut();
  }

  // Firestore Cloud Database Sync Operations
  async function loadUserDataFromCloud(uid) {
    if (!db || !uid) return;
    try {
      // 1. Load Favorites
      const favDoc = await db.collection('users').doc(uid).collection('userData').doc('favorites').get();
      if (favDoc.exists && favDoc.data().items) {
        notifySyncListeners('favorites_loaded', favDoc.data().items);
      }

      // 2. Load Shopping List
      const shopDoc = await db.collection('users').doc(uid).collection('userData').doc('shoppingList').get();
      if (shopDoc.exists && shopDoc.data().items) {
        notifySyncListeners('shopping_loaded', shopDoc.data().items);
      }

      // 3. Load Meal Plan
      const mealDoc = await db.collection('users').doc(uid).collection('userData').doc('mealPlan').get();
      if (mealDoc.exists && mealDoc.data().plan) {
        notifySyncListeners('mealplan_loaded', mealDoc.data().plan);
      }

      // 4. Load Custom Recipes
      const customSnapshot = await db.collection('recipes').where('authorUid', '==', uid).get();
      if (!customSnapshot.empty) {
        const recipes = [];
        customSnapshot.forEach(doc => recipes.push({ id: doc.id, ...doc.data() }));
        notifySyncListeners('custom_recipes_loaded', recipes);
      }
    } catch (err) {
      console.warn("Could not load cloud data:", err);
    }
  }

  async function saveFavoritesToCloud(favoritesList) {
    if (!db || !currentUser) return;
    try {
      await db.collection('users').doc(currentUser.uid).collection('userData').doc('favorites').set({
        items: favoritesList,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log("☁️ Favorites synced to Firestore");
    } catch (err) {
      console.warn("Failed to sync favorites to cloud:", err);
    }
  }

  async function saveShoppingListToCloud(shoppingList) {
    if (!db || !currentUser) return;
    try {
      await db.collection('users').doc(currentUser.uid).collection('userData').doc('shoppingList').set({
        items: shoppingList,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log("☁️ Shopping list synced to Firestore");
    } catch (err) {
      console.warn("Failed to sync shopping list to cloud:", err);
    }
  }

  async function saveMealPlanToCloud(mealPlan) {
    if (!db || !currentUser) return;
    try {
      await db.collection('users').doc(currentUser.uid).collection('userData').doc('mealPlan').set({
        plan: mealPlan,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log("☁️ Meal Plan synced to Firestore");
    } catch (err) {
      console.warn("Failed to sync meal plan to cloud:", err);
    }
  }

  async function saveRecipeToFirestore(recipeData) {
    if (!db) throw new Error("Firestore is not available.");
    const payload = {
      ...recipeData,
      authorUid: currentUser ? currentUser.uid : "anonymous",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    const docRef = await db.collection('recipes').add(payload);
    return docRef.id;
  }

  async function fetchCommunityRecipes() {
    if (!db) return [];
    try {
      const snap = await db.collection('recipes').orderBy('createdAt', 'desc').limit(20).get();
      const list = [];
      snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      return list;
    } catch (err) {
      console.warn("Could not fetch community recipes:", err);
      return [];
    }
  }

  function addSyncListener(fn) {
    syncListeners.push(fn);
  }

  function notifySyncListeners(event, data) {
    syncListeners.forEach(fn => {
      try { fn(event, data); } catch (e) { console.error(e); }
    });
  }

  async function saveUserProfileToCloud(profileData) {
    if (!db || !currentUser) return;
    try {
      await db.collection('users').doc(currentUser.uid).set({
        name: profileData.name,
        title: profileData.title,
        bio: profileData.bio,
        avatar: profileData.avatar,
        dietaryPreferences: profileData.dietaryPreferences,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      console.log("☁️ User profile synced to Firestore");
    } catch (err) {
      console.warn("Failed to sync profile to cloud:", err);
    }
  }

  return {
    init,
    isReady: () => isInitialized,
    getUser: () => currentUser,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    sendPasswordReset,
    logout,
    saveFavoritesToCloud,
    saveShoppingListToCloud,
    saveMealPlanToCloud,
    saveUserProfileToCloud,
    saveRecipeToFirestore,
    fetchCommunityRecipes,
    addSyncListener
  };
})();

// Auto-initialize when document loads
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    TastyFirebase.init();
  });
}
