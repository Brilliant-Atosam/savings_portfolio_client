import { useContext } from "react";
import {AppContext} from "./AppContext";
const useApp = () => {
  const context = useContext(AppContext);
  return context;
};

export default useApp;
