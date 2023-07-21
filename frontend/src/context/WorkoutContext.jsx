import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (prevState, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...prevState.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: prevState.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return prevState;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
