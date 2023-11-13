import { FC } from "react";
import { useAppSelector } from "../../Store/hooks";
import { Navigate } from "react-router-dom";

interface protectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: FC<protectedRouteProps> = ({ children }) => {
  const { authUser } = useAppSelector((state) => state.auth);

  if (authUser === null && localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

// export const ProtectedLoginRoute: FC<protectedRouteProps> = ({ children }) => {
//   const { authUser } = useAppSelector((state) => state.auth);

//   if (authUser == null && localStorage.getItem("token") == null) {
//     return children;
//   } else {
//     return <Navigate to="/" />;
//   }
// };

export default ProtectedRoute;
