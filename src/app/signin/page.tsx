import { signIn } from "@/lib/auth";
import React from "react";

export default function SignInPage() {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <form
        className="flex flex-col w-100 border-2 rounded-2xl py-8 px-6 shadow-2xl dark:bg-none dark:border-stone-600"
        action={async (formData) => {
          "use server";

          await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
          });
        }}
      >
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormInput name="email"></FormInput>
        <FormLabel htmlFor="password">Password</FormLabel>
        <FormInput name="password" type="password"></FormInput>
        <button
          className="w-1/3 bg-yellow-400 hover:bg-yellow-500 p-1 rounded-sm dark:text-black"
          type="submit"
        >
          Submit
        </button>
        {/* <div className="border-b-2 mt-4 dark:border-stone-600"></div> */}
      </form>
    </div>
  );
}

const FormLabel = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => {
  return (
    <label className="" htmlFor={htmlFor}>
      {children}
    </label>
  );
};
const FormInput = ({
  name,
  type,
  children,
}: {
  name: string;
  type?: string;
  children?: React.ReactNode;
}) => {
  return (
    <input
      className="border-2 border-black rounded-sm px-2 py-1 mb-4 outline-0 dark:bg-transparent dark:border-stone-700"
      name={name}
      type={type}
    >
      {children}
    </input>
  );
};
