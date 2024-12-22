/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import { success } from "../utility/toastMsg";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import auth from "../firebase/firebase.config";

import axios from "../hooks/useAxios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // create User
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //log in with google

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //logout
  const logout = () => {
    setLoading(true);
    success();
    return signOut(auth);
  };

  //update user profile

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  //use effect
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("CurrentUser -->", currentUser);
      setUser(currentUser);

      try {
        if (currentUser?.email) {
          const { data } = await axios.post("/jwt", {
            email: currentUser.email,
          });
          console.log("JWT Response -->", data);
        } else {
          await axios.get("/logout");
        }
      } catch (error) {
        console.error("Error during auth state change handling:", error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe; // Cleanup subscription
  }, []);

  const authInfo = {
    createNewUser,
    logout,
    login,
    loading,
    updateUserProfile,
    user,
    setUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
