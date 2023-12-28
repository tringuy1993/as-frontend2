"use client";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { PiIcon } from "lucide-react";
import { db } from "@/app/authentication/firebase1";
import { useAuth } from "@/app/authentication/context";
import { AccountForm } from "./forms/form-account";
// import { useNavigate } from "react-router-dom";

const UserUpdate = () => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const [accountFormData, setAccountFormData] = useState({});
  const { tenant } = useAuth();

  const handleAccountFormSubmit = (formData) => {
    console.log(formData);
    setAccountFormData(formData);
    handleUpdateProfile(formData);
    // Additional logic for handling account form data
  };

  const handleUpdateProfile = async (e) => {
    // e.preventDefault();
    // console.log("HandleUpdateProfile", e);
    // console.log(tenant);
    try {
      await setDoc(doc(db, "users", tenant?.id), {
        ...e,
        timeStamp: serverTimestamp(),
      });
      //   navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          //   setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        },
      );
    };
    file && uploadFile();
  }, [file]);

  //   console.log(data);

  return (
    <AccountForm
      //   handleUpdateProfile={handleUpdateProfile}
      onFormSubmit={handleAccountFormSubmit}
    />
  );
};

export default UserUpdate;
