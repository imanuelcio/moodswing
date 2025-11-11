import Cookies from "js-cookie";

export function getAuthToken() {
  return Cookies.get("token"); // baca cookie "token"
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthToken());
}
