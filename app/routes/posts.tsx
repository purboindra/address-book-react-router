import { Form } from "react-router";
import type { Route } from "./+types/posts";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const postId = params.postId;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  return await response.json();
}

export async function clientAction({ params }: Route.LoaderArgs) {
  const postId = params.postId;
  await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: "DELETE",
  });
}

export default function Post({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <p>Title: {loaderData.title}</p>
      <p>Title: {loaderData.body}</p>

      <Form method="delete">
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
}
