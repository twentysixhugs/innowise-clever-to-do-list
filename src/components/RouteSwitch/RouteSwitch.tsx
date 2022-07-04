import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Header } from "../Header";
import { Loader } from "../Loader/Loader";

const Overview = lazy(() => import("../../pages/Overview"));
const SignIn = lazy(() => import("../../pages/SignIn"));
const SignUp = lazy(() => import("../../pages/SignUp"));
const TaskCreate = lazy(() => import("../../pages/TaskCreate"));
const TaskUpdate = lazy(() => import("../../pages/TaskUpdate"));

export const RouteSwitch = ({ user }: { user: boolean }) => {
  // Пока нет сервисов firebase, пробрасываю через пропсы
  return (
    <BrowserRouter>
      <Header isLoggedIn={!!user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute hasPermission={user} navigateTo="/signin" />
            }
          >
            <Route path="/" element={<Overview />} />
          </Route>
          <Route
            path="/new"
            element={
              <ProtectedRoute hasPermission={user} navigateTo="/signin" />
            }
          >
            <Route path="/new" element={<TaskCreate />} />
          </Route>
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute hasPermission={user} navigateTo="/signin" />
            }
          >
            <Route path="/edit/:id" element={<TaskUpdate />} />
          </Route>

          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
