import {
  Form,
  Link,
  redirect,
  useActionData,
  useFetcher,
  useNavigate,
  useNavigation,
} from "react-router";
import type { Route } from "./+types/product-detail";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { BASE_URL } from "~/lib/utils";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id");

  const _action = formData.get("_action");
  const isUpdate = _action === "update";

  const title = formData.get("title");

  let response: Response;

  if (isUpdate) {
    response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const data = await response.json();

  if (!response.ok) {
    return {
      message: data.message || "Unexpected Error",
      data: null,
      timestamp: Date.now(),
    };
  }

  return redirect("/dashboard/products");
}

export async function loader({ params }: Route.LoaderArgs) {
  const productId = params.id;
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      message: data.message || "Unexpected Error",
      data: null,
    };
  }

  return {
    message: data.message || "Success",
    data: data,
  };
}

export function meta({ params }: { params: any }) {
  const productId = params.id;

  return [
    { title: `Product Details - ${productId}` },
    { name: "description", content: `This is the product ${productId}` },
  ];
}

export default function ProductDetail({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const { message, data, timestamp } = actionData || {};
  const isSubmitting =
    navigation.state === "submitting" &&
    navigation?.formData?.get("_action") === "delete";
  const isSubmittingUpdate =
    navigation.state === "submitting" &&
    navigation?.formData?.get("_action") === "update";

  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [timestamp]);

  if (loaderData.data === null) {
    return (
      <div className="mx-auto h-screen w-full max-w-5xl items-center justify-center flex">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-5xl w-full h-screen mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">{loaderData.data.title}</h1>
      <h3 className="text-xl font-normal mb-6">
        {loaderData.data.description}
      </h3>

      <div className="flex w-full gap-4">
        {/* DELETE BUTTON */}
        <Form
          method="delete"
          onSubmit={(event) => {
            const response = confirm(
              "Please confirm you want to delete this record."
            );
            if (!response) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="id" value={loaderData.data.id} />
          <button
            disabled={isSubmitting}
            type="submit"
            className="hover:cursor-pointer"
            name="_action"
            value={"delete"}
          >
            {isSubmitting ? "Deleting..." : "Delete"}
          </button>
        </Form>
        {/* UPDATE BUTTON */}
        <Form
          method="post"
          onSubmit={(event) => {
            const response = confirm(
              "Please confirm you want to update this record."
            );
            if (!response) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="id" value={loaderData.data.id} />
          <button
            disabled={isSubmittingUpdate}
            type="submit"
            name="_action"
            value={"update"}
            className="hover:cursor-pointer"
          >
            {isSubmittingUpdate ? "Updating..." : "Update"}
          </button>
        </Form>
        {/* CANCEL */}
        <Button
          variant="destructive"
          onClick={() => navigate(-1)}
          type="button"
          asChild
        >
          <p className="hover:cursor-pointer mt-0.5">Cancel</p>
        </Button>
      </div>
    </div>
  );
}
