import { useState } from "react";
import { Form } from "react-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {};

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
