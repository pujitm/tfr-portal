/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

import { useToggle } from "usehooks-ts";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Button } from "../primitive/Button";
import clsx from "clsx";

type PushFormProps = {
  initiallyOpen?: boolean;
};
export default function PushForm({ initiallyOpen = false }: PushFormProps) {
  const [expanded, toggle] = useToggle(initiallyOpen);
  const [animationParent] = useAutoAnimate();
  return (
    <div ref={animationParent} className={clsx("transition duration-300")}>
      <div
        onClick={toggle}
        className="grid w-full cursor-pointer grid-cols-12 rounded-lg bg-indigo-500/70"
      >
        <h2 className="col-span-10 col-start-2 flex w-full justify-between py-6 text-xl font-semibold leading-7 text-white">
          Mourningdale Push
          <p className="text-white/80">05/06/2023</p>
        </h2>
      </div>

      {expanded && (
        <>
          <p className="mt-8 text-center text-sm leading-6 tracking-wide text-gray-600 dark:text-white/60">
            4 hours until submission deadline: 05/13/2023
          </p>

          <form
            className={
              "mt-10 grid grid-cols-1 gap-x-6 gap-y-12 border-b border-gray-900/10 pb-12 sm:grid-cols-6"
            }
          >
            <UploadInput label="Screenshot of achievements before pushes" />
            <SmallUploader label="Screenshot after finishing all your missions" />

            {/* hack - Force dark theme for button */}
            <div data-theme="dark" className="col-span-4 col-start-2">
              <Button className=" w-1/4 min-w-min">
                Submit for Payout Credit
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
type UploaderProps = {
  label: string;
};

function UploadInput({ label }: UploaderProps) {
  return (
    <div className="col-span-4 col-start-2">
      <label
        htmlFor="cover-photo"
        className="text-base font-medium leading-7 tracking-wide dark:text-white/90"
      >
        {label}
      </label>
      <div className="mt-3 flex justify-center rounded-lg border border-dashed border-indigo-800/60 px-6 py-10 dark:border-white">
        <div className="text-center">
          {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> */}
          <div className="mt-4 flex text-sm leading-6">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  );
}

function SmallUploader({ label }: UploaderProps) {
  return (
    <div className="col-span-4 col-start-2">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-7 tracking-wide dark:text-white/90"
      >
        {label}
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-indigo-800/60 px-6 py-10 dark:border-white">
        <div className="text-center">
          {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> */}
          <div className="mt-4 flex text-sm leading-6">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  );
}
