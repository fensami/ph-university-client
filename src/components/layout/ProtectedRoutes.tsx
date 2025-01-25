import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};
const ProtectedRoutes = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  if (role != undefined && role != user?.role) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (!token) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
};

export default ProtectedRoutes;
