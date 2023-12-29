import { storage } from "@/app/authentication/firebase1";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";

import Image from "next/image";
import { useAuth } from "@/app/authentication/context";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

export function UserAvatarFile() {
  const [file, setFile] = useState(null);
  const { tenant } = useAuth();
  const [loading, setLoading] = useState(false);
  const [photoURL, setphotoURL] = useState<
    string | null | ArrayBuffer | undefined
  >("https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg");
  const [perc, setPerc] = useState(0);
  useEffect(() => {
    setphotoURL(tenant?.photoURL);
  }, [tenant]);
  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setphotoURL(reader.result); // Update the preview image
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  function handleSetPhoto() {
    if (!file) return;

    setLoading(true);
    const storageRef = ref(storage, `avatars/${tenant?.id}.png`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress, state changes, etc.
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setPerc(progress);
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.error(error);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Update the user's photoURL in your database or authentication system
          setLoading(false);
        });
      },
    );
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {/* {tenant && !isAuthLoading && ( */}
      <Image
        onError={(e) => console.error(e.target.id)}
        // onLoad={(e) => console.log(e.target)}
        src={photoURL} // Add a default image URL if photoURL is null
        alt="Avatar Image"
        width={500}
        height={500}
        style={{ borderRadius: "10%", border: "1px solid #fff" }}
      />
      {/* )} */}
      <Label htmlFor="avatar_picture">Picture</Label>
      <Input id="avatar_picture" type="file" onChange={handleFileChange} />
      {loading && <Progress value={perc} />}
      <Button disabled={loading || !file} onClick={handleSetPhoto}>
        Update Avatar
      </Button>
    </div>
  );
}
