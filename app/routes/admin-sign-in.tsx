import React from "react";
import SignInForm from "~/components/dashboard/sign-in-form";

function AdminSignIn() {
  return (
    <main className="max-w-5xl mx-auto items-center bg-red-300 py-8 flex">
      <SignInForm />
    </main>
  );
}

export default AdminSignIn;
