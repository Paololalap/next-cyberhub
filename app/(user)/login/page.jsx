import Image from "next/image";
import Link from "next/link";

const LoginForm = () => {
  return (
    <main className="flex h-screen justify-center bg-[#f8f9fa] bg-gradient-to-r from-[#f8f9fa] to-[#dee2e6] px-[15px]">
      <div className=" w-full min-[576px]:flex min-[576px]:w-full min-[576px]:flex-col min-[576px]:justify-center min-[768px]:max-w-[600px] ">
        <div className="min-h-2/3 w-full bg-[#ffffff] p-12 shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)] min-[768px]:h-[62%] min-[768px]:rounded-[8px] ">
          <div className="mb-[16px] w-full">
            <Image
              src="/New UPOU Seal Banner Black (MyPortal).png"
              alt="UPOU Seal Banner Black (MyPortal)"
              width={384}
              height={100}
              sizes="(min-width: 460px) 381px, calc(82.86vw + 16px)"
              className="min-[576px]:h-auto min-[576px]:w-full"
            />
          </div>

          <form className="flex flex-col">
            <input
              type="text"
              className="m-[0.8px] mb-[16px] w-full rounded-[9.6px] border border-[#8f959e] px-[16px] py-[8px] text-[#495057] placeholder:text-[13px] placeholder:text-[#6a737b] focus:border-transparent focus:outline focus:outline-[#e33c6e] focus:transition-all min-[768px]:py-[10px]"
              placeholder="Username"
            />

            <input
              type="password"
              className=" m-[0.8px] mb-[16px] w-full rounded-[9.6px] border border-[#8f959e] px-[16px] py-[8px] text-[#495057] placeholder:text-[13px] placeholder:text-[#6a737b] focus:border-transparent focus:outline focus:outline-[#e33c6e] focus:transition-all min-[768px]:py-[10px]"
              placeholder="Password"
            />

            <div className="mb-[16px]">
              <button
                type="submit"
                className="flex rounded-lg border border-[#5e0e26] bg-[#8B1438] px-4 py-2 font-bold text-white hover:bg-[rgb(106,15,43)] min-[768px]:ml-1 min-[768px]:scale-110"
              >
                Log in
              </button>
            </div>
          </form>
          <div className="flex text-center">
            <Link
              href="#"
              className="text-sm font-[400] text-[#8B1438] hover:text-[#480a1d] hover:underline"
            >
              Forgot your username or password?
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
