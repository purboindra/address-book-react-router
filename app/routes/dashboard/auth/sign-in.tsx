import {
  data,
  Form,
  redirect,
  useNavigation,
  type MetaFunction,
} from "react-router";
import type { Route } from "./+types/sign-in";
import { Button } from "~/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const email = Cookies.get("email");
  const password = Cookies.get("password");

  if (email && password) {
    return redirect("/dashboard/products");
  }
}

export async function clientAction({ request }: Route.ActionArgs) {
  let response: Response;
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (email !== "johndoe@gmail.com" || password !== "password") {
      throw new Error("Invalid email or password");
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create a session

    Cookies.set("email", "aaron@mail.com");
    Cookies.set("password", "password");
    return redirect("/dashboard");
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, timestamp: Date.now() };
    }
    return { error: "An unknown error occurred" };
  }
}

export default function Login({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.timestamp) {
      toast.error(actionData?.error);
    }
  }, [actionData]);

  return (
    <div className="p-8 min-w-3/4 w-96">
      <h1 className="text-2xl">React Router v7 Auth: Login</h1>
      <Form method="post" className="mt-6 ">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row">
            <label className="min-w-24 ">Username:</label>
            <input className="flex-1" type="text" name="email" />
          </div>
          <div className="flex flex-row">
            <label className="min-w-24 ">Password:</label>
            <input className="flex-1" type="password" name="password" />
          </div>
          <div className="flex flex-row-reverse mt-4">
            <Button className="w-[124px]">
              {isSubmitting ? "Loading..." : "Login"}
            </Button>
          </div>
          {actionData?.error ? (
            <div className="flex flex-row">
              <p className="text-red-600 mt-4 ">{actionData?.error}</p>
            </div>
          ) : null}
        </div>
      </Form>
    </div>
  );
}
