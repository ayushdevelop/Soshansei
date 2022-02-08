import { useState, useEffect } from "react";
import { firebaseAuth } from "../firebase/config";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      //signup user
      const res = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res.user);

      if (!res) {
        throw new Error("could not complete signup");
      }

      // adding display name to user
      await res.user.updateProfile({ displayName });

      // logging in the user
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};

export default useSignup;
