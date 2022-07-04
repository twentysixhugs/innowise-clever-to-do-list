import { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Header } from "../Header";
import { Loader } from "../Loader/Loader";
import { useAuthStateObserver } from "../../hooks/useAuthStateObserver";

const Overview = lazy(() => import("../../pages/Overview"));
const SignIn = lazy(() => import("../../pages/SignIn"));
const SignUp = lazy(() => import("../../pages/SignUp"));
const TaskCreate = lazy(() => import("../../pages/TaskCreate"));
const TaskUpdate = lazy(() => import("../../pages/TaskUpdate"));

export const RouteSwitch = () => {
  const [user, isLoading] = useAuthStateObserver();

  return (
    <BrowserRouter>
      <Header isLoggedIn={!!user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                hasPermission={!!user}
                navigateTo="/signin"
                isLoading={isLoading}
              />
            }
          >
            <Route path="/" element={<Overview />} />
          </Route>
          <Route
            path="/new"
            element={
              <ProtectedRoute
                hasPermission={!!user}
                navigateTo="/signin"
                isLoading={isLoading}
              />
            }
          >
            <Route path="/new" element={<TaskCreate />} />
          </Route>
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute
                hasPermission={!!user}
                navigateTo="/signin"
                isLoading={isLoading}
              />
            }
          >
            <Route path="/edit/:id" element={<TaskUpdate />} />
          </Route>
          <Route
            path="/signup"
            element={
              <ProtectedRoute
                hasPermission={!user}
                navigateTo="/"
                isLoading={isLoading}
              />
            }
          >
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route
            path="/signin"
            element={
              <ProtectedRoute
                hasPermission={!user}
                navigateTo="/"
                isLoading={isLoading}
              />
            }
          >
            <Route path="/signin" element={<SignIn />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
