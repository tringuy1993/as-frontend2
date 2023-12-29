"use client";

import { Card } from "@/components/ui/card";
// import UserUpdate from "@/components/user-update";
import { UserAvatarFile } from "@/components/user-avatar";
import { UserUpdate } from "@/components/user-update";

export default function Profile() {
  return (
    <Card className="mt-4 flex flex-row items-center space-x-4 p-4 bg-transparent shadow-md rounded-lg">
      {/* Flex container with horizontal layout, centered items, spacing, padding, background, and shadow */}

      <div className="flex-shrink-0">
        {/* Container for the avatar to prevent it from stretching */}
        <UserAvatarFile />
      </div>

      <div className="flex-grow">
        {/* Container for the user update form, allowing it to take up remaining space */}
        <UserUpdate />
      </div>
    </Card>
  );
}
