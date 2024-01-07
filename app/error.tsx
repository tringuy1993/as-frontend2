"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  const handleRefresh = () => {
    // Refresh the page
    window.location.reload();
    reset();
  };
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <Button
        className=""
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          handleRefresh
        }
      >
        Try again
      </Button>
    </main>
  );
}
