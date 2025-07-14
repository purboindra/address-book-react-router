import {
  Form,
  Link,
  useActionData,
  useFetcher,
  useNavigate,
} from "react-router";
import type { Route } from "./+types/product-detail";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id");
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
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

  console.log("data", data);

  return {
    message: data.message || "Success",
    isDeleted: true,
  };
}

export async function loader({ params }: Route.LoaderArgs) {
  const productId = params.id;
  const response = await fetch(`https://dummyjson.com/products/${productId}`, {
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

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();
  const isDeleting = fetcher.state !== "idle";
  const isDeleted = fetcher.data?.isDeleted;
  const navigate = useNavigate();

  const actionData = useActionData();

  console.log("actionData", actionData);
  console.log("fetcher", fetcher.data);

  useEffect(() => {
    if (isDeleted) {
      toast.success(`Successfully delete product: ${loaderData?.data?.title}`);
    }
  }, [isDeleted]);

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
      <h3 className="text-xl font-semibold mb-6">
        {loaderData.data.description}
      </h3>

      <div className="flex w-full gap-4">
        <Form
          action="delete"
          method="delete"
          onError={(event) => {
            event.preventDefault();
            console.log("error");
            toast.error("Failed to delete product");
          }}
          onSubmit={(event) => {
            const response = confirm(
              "Please confirm you want to delete this record."
            );
            if (!response) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="hover:cursor-pointer">
            Delete
          </button>
        </Form>
        <Button
          variant="destructive"
          disabled={isDeleting}
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
