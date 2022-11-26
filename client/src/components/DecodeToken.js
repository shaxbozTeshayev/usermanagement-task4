import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";

export default function DecodeToken() {
  const { user } = useSelector((state) => state);
  return user ? jwtDecode(user) : null;
}
