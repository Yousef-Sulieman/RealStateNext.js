import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import React, { useEffect } from "react";

function ConnectUserToConex() {
  const { user } = useUser();
  const updateUsr = useMutation(api.users.updateUser);
  useEffect(() => {
    if (!user) {
      return;
    }
    const syncUser = async () => {
      try {
        await updateUsr({
          userId: user.id,
          name: user?.firstName ?? "Unknown",
          email:
            user?.primaryEmailAddress?.emailAddress ?? "no-email@example.com",
        });
      } catch (error) {
        console.log("Error syncing user", error);
      }
    };
    syncUser();
  }, [user, updateUsr]);

  return null;
}

export default ConnectUserToConex;
