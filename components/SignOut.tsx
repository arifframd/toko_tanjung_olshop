import { signOut } from "@/auth";
import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const SignOut = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button className="bg-red-500 hover:bg-red-400" type="submit">
          <span className="max-sm:hidden">Logout</span>
          <LogOut className="size-6 text-white sm:hidden" />
        </Button>
      </form>
    </>
  );
};

export default SignOut;
