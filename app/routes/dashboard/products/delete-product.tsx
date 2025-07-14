import { redirect, data } from "react-router";
import type { Route } from "./+types/delete-product";

export async function action({ params }: Route.ActionArgs) {
  const response = await fetch(`https://dummyjson.com/products/${params.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let errors = {};

  const responseData = await response.json();

  if (!response.ok) {
    errors = { message: responseData.message || "Unexpected Error" };
  }

  console.log("errors", errors);

  if (Object.keys(errors).length > 0) return errors;

  return redirect("/dashboard/products");
}
