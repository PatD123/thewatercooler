"use client";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import { handleSubmit } from "@/app/actions/register";

const initialState = {
  message: "",
};

export default function BuildProfile({ nextStep }: { nextStep: any }) {
  const [error, setError] = useState<string>();
  const [file, setFile] = useState(0);
  const [formState, formAction] = useFormState(handleSubmit, initialState);

  useEffect(() => {
    if (formState && formState?.message === "good") nextStep();
  }, [formState]);

  return (
    <div className="pb-8">
      <div className="flex w-full justify-center mt-8">
        {/* Left Side */}
        <div className="flex justify-center items-center mt-10 w-[45%]">
          <div>
            {formState && formState?.message !== "good" ? (
              <div className="text-rose-900 text-2xl font-bold">
                {formState.message}
              </div>
            ) : null}
            <div
              className="rounded-lg mt-4 w-full"
              style={{ position: "relative", width: "200px", height: "200px" }}
            >
              <Image
                src="/dashboard_icon.ico"
                alt="currTVShowPosterSrc"
                className="rounded-lg"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        <div className="divider divider-horizontal"></div>

        {/* Right Side */}
        <div className="w-[45%]">
          <form action={formAction}>
            <div className="space-y-12">
              <div>
                <h1 className="text-4xl font-bold leading-7 text-gray-900">
                  Register
                </h1>

                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full Name
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-cyan-700">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="Name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-cyan-700">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-cyan-700">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-cyan-700">
                      <input
                        type="text"
                        name="password"
                        id="password"
                        autoComplete="Password"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      About
                    </label>
                    <div className="">
                      <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        maxLength={100}
                        className="block p-1 w-full rounded-md py-1.5 text-gray-900 bg-transparent shadow-sm ring-1 ring-inset ring-cyan-700 placeholder:text-gray-600 placeholder:text-sm"
                        placeholder="Write a few sentences about yourself (100 chars)"
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Avatar
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-cyan-700 px-6 py-10 ring-1 ring-inset ring-cyan-700">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-300"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <div className="mt-4 flex text-sm leading-6 text-gray-600 items-center">
                          <label
                            htmlFor="file-upload"
                            className="relative rounded-lg bg-rose-300 text-indigo-600 p-1 font-bold"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={() => setFile(1)}
                            />
                          </label>
                          <p className="ml-1">or drag and drop</p>
                        </div>
                        {file ? (
                          <p className="text-xs text-cyan-200 leading-5 text-gray-600">
                            File Uploaded
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-8 justify-center">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
