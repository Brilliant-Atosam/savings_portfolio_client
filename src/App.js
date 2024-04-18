import "./styles/common.css";
import "./styles/login.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import FallbackComponent from "./components/FallbackComponent";
import useApp from "./useApp";
import Feedback from "./components/Feedback";
import ConfirmDialog from "./components/ConfirmDialog";
import usePortfolio from "./hooks/usePortfolio";
import GoPremium from "./components/GoPremium";
import usePaystack from "./hooks/usePaystack";
function App() {
  const { user, handleSnackbar, snackbar, confirmData } = useApp();
  const { openSubscribeDialog, toggleSubscribeDialog } = usePaystack();
  const { deletePortfolio } = usePortfolio();
  const Login = lazy(() => import("./pages/Login"));
  const Homepage = lazy(() => import("./pages/Homepage"));
  const Dashboard = lazy(() => import("./pages/Dashboard"));
  const Create = lazy(() => import("./pages/Create"));
  const Loan = lazy(() => import("./pages/Loan"));
  const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
  const ResetPassword = lazy(() => import("./pages/ResetPassword"));
  const Settings = lazy(() => import("./pages/Settings"));
  const Expenses = lazy(() => import("./pages/Expenses"));
  const Contact = lazy(() => import("./pages/Contact"));
  const ExpensesDetails = lazy(() => import("./pages/ExpensesDetails"));
  const Exchange = lazy(() => import("./pages/Exchange"));
  const Policy = lazy(() => import("./pages/Policy"));
  const Subscription = lazy(() => import("./pages/Subscription"));
  const Budget = lazy(() => import("./pages/Budget"));
  const PartnersDashboard = lazy(() => import("./pages/PartnershipDashboard"));
  return (
    <>
      <GoPremium open={openSubscribeDialog} action={toggleSubscribeDialog} />
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
            path="/"
            element={
              <Suspense fallback={<FallbackComponent />}>
                {user ? <Dashboard /> : <Homepage />}
              </Suspense>
            }
          />
          <Route
            path="/partner"
            element={
              <Suspense fallback={<FallbackComponent />}>
                {user ? <PartnersDashboard /> : <Homepage />}
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<FallbackComponent />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<FallbackComponent />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/subscription"
            element={
              <Suspense fallback={<FallbackComponent />}>
                <Subscription />
              </Suspense>
            }
          />
          <Route
            path="/policy"
            element={
              <Suspense fallback={<FallbackComponent />}>
                <Policy />
              </Suspense>
            }
          />
          <Route
            path="/password/forgot"
            element={
              <Suspense fallback={<FallbackComponent />}>
                <ForgotPassword />
              </Suspense>
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
            path="/budget"
            element={
              user ? (
                <Suspense fallback={<FallbackComponent />}>
                  <Budget />
                </Suspense>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/expenses/details"
            element={
              user ? (
                <Suspense fallback={<FallbackComponent />}>
                  <ExpensesDetails />
                </Suspense>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/exchange"
            element={
              user ? (
                <Suspense fallback={<FallbackComponent />}>
                  <Exchange />
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
