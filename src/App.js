import "./styles/common.css";
import "./styles/login.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import FallbackComponent from "./components/FallbackComponent";
import useApp from "./useApp";
import AddPortfolioDialog from "./components/AddPortfolioDialog";
import Feedback from "./components/Feedback";
import ConfirmDialog from "./components/ConfirmDialog";
import usePortfolio from "./hooks/usePortfolio";
function App() {
  const { user, showPortfolioDialog, handleSnackbar, snackbar, confirmData } =
    useApp();
  const { deletePortfolio } = usePortfolio();
  const Login = lazy(() => import("./pages/Login"));
  const Dashboard = lazy(() => import("./pages/Dashboard"));
  const Create = lazy(() => import("./pages/Create"));
  const Loan = lazy(() => import("./pages/Loan"));
  const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
  const ResetPassword = lazy(() => import("./pages/ResetPassword"));
  const Settings = lazy(() => import("./pages/Settings"));
  const Expenses = lazy(() => import("./pages/Expenses"));
  return (
    <>
      <AddPortfolioDialog open={showPortfolioDialog} />
      <ConfirmDialog action={deletePortfolio} open={confirmData.open} />
      <Feedback
        open={snackbar.open}
        message={snackbar.feedback}
        severity={snackbar.severity}
        close={() => handleSnackbar("", "info")}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Suspense fallback={<FallbackComponent />}>
                  <Login />
                </Suspense>
              )
            }
          />
          <Route
            path="/password/forgot"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Suspense fallback={<FallbackComponent />}>
                  <ForgotPassword />
                </Suspense>
              )
            }
          />
          <Route
            path="/settings"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Suspense fallback={<FallbackComponent />}>
                  <Settings />
                </Suspense>
              )
            }
          />
          <Route
            path="/password/reset"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Suspense fallback={<FallbackComponent />}>
                  <ResetPassword />
                </Suspense>
              )
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<FallbackComponent />}>
                <Create />
              </Suspense>
            }
          />

          <Route
            path="/"
            element={
              user ? (
                <Suspense fallback={<FallbackComponent />}>
                  <Dashboard />
                </Suspense>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/loan"
            element={
              user ? (
                <Suspense fallback={<FallbackComponent />}>
                  <Loan />
                </Suspense>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/expenses"
            element={
              user ? (
                <Suspense fallback={<FallbackComponent />}>
                  <Expenses />
                </Suspense>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
