"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/dashboard");
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-cyan-500 to-blue-500 ">
      <div className="absolute w-full h-full bg-fit bg-[url('/dashboard_icon.svg')]"></div>
      <form
        className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 bg-slate-300/50 backdrop-blur-md rounded-lg drop-shadow-lg	"
        onSubmit={handleSubmit}
      >
        {error && <div className="text-black">{error}</div>}
        <h1 className="mb-5 w-full text-2xl font-bold">Sign In</h1>
        <label className="w-full text-sm font-bold">Email</label>
        <input
          type="email"
          className="w-full h-8 border border-solid border-black rounded p-2 bg-slate-300/0"
          name="email"
        />
        <label className="w-full text-sm font-bold">Password</label>
        <div className="flex w-full">
          <input
            type="password"
            className="w-full h-8 border border-solid border-black rounded p-2 bg-slate-300/0"
            name="password"
          />
        </div>
        <button className="w-full border border-solid border-black rounded">
          Sign In
        </button>

        <Link
          href="/get-started"
          className="text-sm text-[#888] transition duration-150 ease hover:text-black"
        >
          Don&apos;t have an account?
        </Link>
      </form>
    </div>
  );
}
