import PasswordChecker from "@/components/PasswordChecker";
import UrlChecker from "@/components/UrlChecker";

export default function ToolsPage() {
  return (
    <div className="grid w-screen place-items-center py-5">
      <div className="text-center text-3xl font-black">Tools</div>
      <hr className="mx-auto mb-5 mt-3 max-w-64 w-screen border-2 border-solid border-[#FFB61B]" />
      <div className="max-w-10xl flex flex-col gap-x-10 lg:flex-row lg:items-center">
        <PasswordChecker className="w-screen lg:w-auto lg:min-w-[448px]" />
        <div className="mx-auto mt-5 w-screen max-w-[448px] px-5 lg:max-w-md">
          <span className="font-bold">Note:</span> This password checker helps
          you see if your password is strong enough.
          <ul className="ml-5 text-sm">
            <li className="list-inside list-disc">
              <span className="font-semibold">Privacy and Security:</span>{" "}
              Don&apos;t worry—when you enter your password, it won&apos;t be
              saved in our system, so it&apos;s completely safe.
            </li>
            <li className="list-inside list-disc">
              <span className="font-semibold">Show Password Feature:</span> You
              can click the eye icon to show your password.
            </li>
            <li className="list-inside list-disc">
              <span className="font-semibold">Copy Password Feature:</span> You
              can click the copy icon to copy your password.
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-10xl flex flex-col gap-x-10 lg:flex-row lg:items-center">
        <UrlChecker className="w-screen lg:w-auto lg:min-w-[448px]" />
        <div className="mx-auto mt-5 w-screen max-w-[448px] px-5 lg:max-w-md">
          <span className="font-bold">Note:</span> This URL checker examines the
          URL you provide to determine if it is malicious or safe. It helps
          protect you from potentially harmful websites by analyzing the
          URL&apos;s security.
          <ul className="ml-5 text-sm">
            <li className="list-inside list-disc">
              <span className="font-semibold"> Paste URL Feature:</span> You can
              easily paste the URL you want to check by clicking the clipboard
              icon. This feature makes it convenient to quickly insert and
              verify URLs without typing them out manually..
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
