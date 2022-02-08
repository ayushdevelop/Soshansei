import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import { firebaseAuth } from "../firebase/config";

function useLogout() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      //loging user out
      await firebaseAuth.signOut();

      dispatch({ type: "LOGOUT" });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(null);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
}

export default useLogout;
