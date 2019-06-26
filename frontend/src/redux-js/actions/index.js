import { LOGIN } from "../constants/action-types";
export function loginUser(payload) {
  return { type: LOGIN, payload };
}