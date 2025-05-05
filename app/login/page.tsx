import Image from "next/image";
import Link from "next/link";

import LoginForm from "@/components/forms/LoginForm";

const Login = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <LoginForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 MedPortal
            </p>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/login-img.png"
        height={1000}
        width={1000}
        alt="login"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Login;
