import type { Product } from "~/types/productInterface";
import type { Route } from "./+types/products";
import { Link } from "react-router";
import { Input } from "~/components/ui/input";
import { useSearchParams } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BASE_URL } from "~/lib/utils";

export async function clientLoader({ request }: Route.LoaderArgs) {
  let url = new URL(request.url);
  let query = url.searchParams.get("q");
  let page = url.searchParams.get("page") || "1";

  const response = await fetch(
    `${BASE_URL}/products/${query != null ? `search?q=${query}` : ""}&skip=${
      Number(page) * 10
    }&limit=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      error: data.message || "Unexpected Error",
    };
  }

  const products = data.products as Product[];

  if (products.length == 0) {
    return {
      error: "Data not found",
    };
  }

  return {
    message: data.message || "Success",
    products: data.products as Product[],
  };
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export function meta() {
  return [{ title: "Dashboard Products" }];
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q");
  const page = searchParams.get("page") || "1";

  const handlePagination = (type: "next" | "prev") => {
    if (type === "next") {
      setSearchParams({ page: (Number(page) + 1).toString() });
    } else {
      setSearchParams({ page: (Number(page) - 1).toString() });
    }
  };

  if (loaderData.error || !loaderData.products) {
    return (
      <div className="mx-auto h-screen w-full max-w-5xl items-center justify-center flex">
        {loaderData.error || "Unknown Error Occured"}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex w-full justify-between py-8">
        <h1 className="text-3xl font-semibold mb-6">Product List</h1>
        <Input
          placeholder="Search Product..."
          className="w-[20%]"
          type="text"
          name="q"
          onChange={(event) => {
            setSearchParams({ q: event.target.value });
          }}
        />
      </div>
      {q && <h3 className="text-xl font-semibold mb-6">Result for {q}</h3>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loaderData?.products.map((product: Product) => (
          <Link
            to={`/dashboard/products/${product.id}`}
            key={product.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <span className="text-xl font-semibold text-green-500">
              ${product.price}
            </span>
          </Link>
        ))}
      </div>
      <div className="flex w-full max-w-5xl mx-auto justify-center py-8 gap-3">
        <Link
          to={`/dashboard/products/${Number(page) - 1}`}
          onClick={(event) => {
            event.preventDefault();
            handlePagination("prev");
          }}
        >
          <ChevronLeft />
        </Link>
        <h3 className="text-base font-semibold text-neutral-600">{page}</h3>
        <Link
          to={`/dashboard/products/${Number(page) + 1}`}
          onClick={(event) => {
            event.preventDefault();
            handlePagination("next");
          }}
        >
          <ChevronRight />
        </Link>
      </div>
    </div>
  );
}
