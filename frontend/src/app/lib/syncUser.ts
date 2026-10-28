
import { auth } from "./firebase";

export async function syncUserWithBackend() {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No authenticated Firebase user found.");
  }

  const idToken = await currentUser.getIdToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/sync`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Could not synchronize your account with the backend.");
  }

  return response.json();
}
