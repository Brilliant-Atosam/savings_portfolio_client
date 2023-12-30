import { createContext, useState } from "react";
import usePortfolio from "./hooks/usePortfolio";
import useSave from "./hooks/useSave";
import Util from "./utils/util";
import useBorrow from "./hooks/useBorrow";
import useFeedback from "./hooks/useFeedback";
const AppContext = createContext();
const AppProvider = ({ children }) => {
  // utilities
  const { confirmData, setConfirmData, colors } = Util();
  // loading
  const [loading, setLoading] = useState(false);
  const handleLoader = () => setLoading((prev) => !prev);
  const {
    showPortfolioDialog,
    handlePortfolioDialog,
    newPortfolio,
    handleUpdatePortfolioDialog,
  } = usePortfolio();
  const { showSaveDialog, handleSaveDialog, handleSave } = useSave();
  const { openBorrowDialog, handleOpenBorrowDialog } = useBorrow();
  const { handleSnackbar, snackbar } = useFeedback();
  let user = JSON.parse(window.localStorage.getItem("user"));
  let savingsList = JSON.parse(window.localStorage.getItem("savings")) || [];
  let expensesList = JSON.parse(window.localStorage.getItem("expenses")) || [];
  return (
    <AppContext.Provider
      value={{
        user,
        handlePortfolioDialog,
        showPortfolioDialog,
        showSaveDialog,
        handleSaveDialog,
        handleSave,
        savingsList,
        confirmData,
        setConfirmData,
        openBorrowDialog,
        handleOpenBorrowDialog,
        newPortfolio,
        handleUpdatePortfolioDialog,
        snackbar,
        handleSnackbar,
        colors,
        handleLoader,
        loading,
        expensesList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export { AppProvider, AppContext };
