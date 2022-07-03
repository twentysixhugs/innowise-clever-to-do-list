import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Overview } from "../../pages/Overview";
import { SignIn } from "../../pages/SignIn";
import { SignUp } from "../../pages/SignUp";
import { TaskCreate } from "../../pages/TaskCreate";
import { TaskUpdate } from "../../pages/TaskUpdate";
import { Header } from "../Header";

export const RouteSwitch = ({ user }: { user: boolean }) => {
  // Пока нет сервисов firebase, пробрасываю через пропсы
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute hasPermission={user} navigateTo="/signin" />}
        >
          <Route path="/" element={<Overview />} />
        </Route>
        <Route
          path="/new"
          element={<ProtectedRoute hasPermission={user} navigateTo="/signin" />}
        >
          <Route path="/new" element={<TaskCreate />} />
        </Route>
        <Route
          path="/edit/:id"
          element={<ProtectedRoute hasPermission={user} navigateTo="/signin" />}
        >
          <Route path="/edit/:id" element={<TaskUpdate />} />
        </Route>

        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
