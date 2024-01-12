"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/app/authentication/firebase1";
import { useAuth } from "@/app/authentication/context";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { FormControl, FormLabel } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormUserMaster } from "./forms/form-user-master";
import { UUID } from "crypto";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

const accountFormSchema = z.object({
  userName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    })
    .optional(),
  phoneNumber: z.string().optional(),
  language: z
    .string({
      required_error: "Please select a language.",
    })
    .optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  userName: "",
  phoneNumber: "",
  language: "en",
};

const accountINFO = [
  {
    name: "userName",
    label: "User Name",
    placeHolder: "User name",
    description: "Display on your profile",
    inputType: null,
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeHolder: "+1(999)-999-9999",
    description: null,
    inputType: null,
  },
];

const fetchUserData = async (tenantId: UUID) => {
  try {
    const docRef = doc(db, "users", tenantId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
  }
};

export function UserUpdate() {
  // console.log(defaultValues);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });
  const { tenant } = useAuth();
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);

  const handleAccountFormSubmit = async (formData: AccountFormValues) => {
    // Additional logic for handling account form data
    setLoadingUpdateProfile(true);
    try {
      await setDoc(doc(db, "users", tenant?.id), {
        ...formData,
        timeStamp: serverTimestamp(),
      });
      setLoadingUpdateProfile(false);
      //   navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };
  // const [initialData, setInitialData] = useState({}); // State to hold the fetched data

  useEffect(() => {
    const fetchData = async () => {
      if (tenant?.id) {
        try {
          const data = await fetchUserData(tenant.id);
          const { timeStamp, ...dataWithoutTimeStamp } = data;
          // setInitialData(dataWithoutTimeStamp);
          form.reset(dataWithoutTimeStamp); // Reset form values with fetched data
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [tenant]);

  const handleSubmit = form.handleSubmit((data) => {
    handleAccountFormSubmit(data); // This includes both main form fields and language
  });

  return (
    <>
      <FormUserMaster
        formArrayFields={accountINFO}
        form={form}
        onSubmit={handleSubmit}
        submitButtonName="Update Account"
        // className="space-y-4" // Add spacing between elements
      >
        <div className="flex flex-col space-y-4">
          <FormLabel>Language</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={`w-48 justify-between ${
                    !form.watch("language") ? "text-gray-400" : ""
                  }`} // Updated class names for width and text color
                >
                  {form.watch("language")
                    ? languages.find(
                        (lang) => lang.value === form.watch("language"),
                      )?.label
                    : "Select language"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0">
              <Command>
                <CommandInput placeholder="Search language..." />
                <CommandEmpty>No language found.</CommandEmpty>
                <CommandGroup>
                  {languages.map((language) => (
                    <CommandItem
                      value={language.label}
                      key={language.value}
                      onSelect={() => form.setValue("language", language.value)}
                    >
                      <div
                        key={language.value}
                        className="flex items-center cursor-pointer"
                        onClick={() =>
                          form.setValue("language", language.value)
                        }
                      >
                        <CheckIcon
                          className={`mr-2 h-4 w-4 ${
                            language.value === form.getValues("language")
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                        {language.label}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Button type="submit" disabled={loadingUpdateProfile}>
          Update Profile
        </Button>
      </FormUserMaster>
    </>
  );
}
