import { RequestError } from "octokit";
import useAuthStore from "../../store/auth";

export function checkAuthError(err: RequestError) {
  if (err.status === 401) {
    alert("Authentication error. Please log in again.");
  }
  if (err.status === 403) {
    alert(
      "You are not authorized to perform this action. Please add Live Feedback app to this repository."
    );
    useAuthStore.getState().openAppInstallWindow();
  }
}
