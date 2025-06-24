import { useState } from "react";
import { Form } from "react-router";
import { authClient } from "~/lib/auth-client";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: (ctx) => {
          // show loading state
        },
        onSuccess: (ctx) => {
          // redirect to home
          alert("Sign up successful");
        },
        onError: (ctx) => {
          console.log(ctx.error.message);
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <h2>Sign Up</h2>
      <Form onSubmit={signUp} className="flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </Form>
    </div>
  );
}
