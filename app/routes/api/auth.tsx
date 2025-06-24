import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { auth } from "~/lib/auth";

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("loader triggered");
  return auth.handler(request);
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("action triggered");
  return auth.handler(request);
}
