import { useEffect, useReducer, useState } from "react";
import { fireStore, timestamp } from "../firebase/config";

let initialState = {
  data: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { ...state, isPending: true };
    case "DATA_IS_ADDED":
      return {
        data: action.payload,
        isPending: false,
        error: false,
        success: true,
      };
    case "DATA_DELETED":
      return { isPending: false, error: null, data: null, success: true };
    case "ERROR":
      return {
        data: null,
        isPending: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

function useFirestore(collection) {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //to change the state only if the component is mounted
  const dispatchIfNotCancelledFunction = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // collection reference
  const ref = fireStore.collection(collection);

  //adding data
  const addData = async (data) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedData = await ref.add({ ...data, createdAt });
      dispatchIfNotCancelledFunction({
        type: "DATA_IS_ADDED",
        payload: addedData,
      });
    } catch (error) {
      dispatchIfNotCancelledFunction({ type: "ERROR", payload: error.message });
    }
  };

  // deleting data
  const deleteData = async (id) => {
    dispatch({ isPending: true });
    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelledFunction({ type: "DATA_DELETED" });
    } catch (error) {
      console.log(error);
      dispatchIfNotCancelledFunction({
        type: "ERROR",
        payload: "could not complete the request to delete",
      });
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { addData, deleteData, response };
}

export default useFirestore;
