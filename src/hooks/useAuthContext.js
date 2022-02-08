import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be within AuthContextProvider");
  }
  return context;
}

export default useAuthContext;
