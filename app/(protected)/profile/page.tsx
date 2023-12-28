"use client";

import { Auth, upload } from "@/app/authentication/firebase1";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/app/authentication/context";
import { Card } from "@/components/ui/card";
import { AccountForm } from "@/components/forms/form-account";
import UserUpdate from "@/components/user-update";

export default function Profile() {
  const { tenant, isAuthLoading } = useAuth();
  const currentUser = Auth.currentUser;
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(tenant?.photoURL);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }
  function handleClick() {
    upload(photo, currentUser, setLoading);
  }

  useEffect(() => {
    if (tenant?.photoUrl) {
      setPhotoURL(tenant?.photoUrl);
    }
  }, [tenant]);

  return (
    <div className="fields">
      <input type="file" onChange={handleChange} />
      <button disabled={loading || !photo} onClick={handleClick}>
        Upload
      </button>
      {tenant && !isAuthLoading && (
        <Image
          src={photoURL}
          alt="Avatar Image"
          width={500}
          height={500}
          className="avatar"
        />
      )}
      {/* <UserUpdate inputs={userInputs} title={"Update User"} /> */}
      <Card>
        <UserUpdate />
      </Card>
    </div>
  );
}
