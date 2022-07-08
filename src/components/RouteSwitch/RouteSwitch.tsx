import { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthStateObserver } from "../../hooks/useAuthStateObserver";
import { ProtectedRoute } from "./ProtectedRoute";
import { Header } from "../Header";
import { Loader } from "../Loader/Loader";
import { SignIn } from "../../pages/SignIn";
import { SignUp } from "../../pages/SignUp";
import { Overview } from "../../pages/Overview";
import { TaskCreate } from "../../pages/TaskCreate";
import { TaskUpdate } from "../../pages/TaskUpdate";

export const RouteSwitch = () => {
  const [user, isLoading] = useAuthStateObserver();

  return (
    <BrowserRouter>
      <Header isLoggedIn={!!user} isLoading={isLoading} />
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
