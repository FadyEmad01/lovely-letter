import Image from "next/image"

import RegisterForm from "@/components/auth/register-form"
import image from "@/assets/images/bg-hero.webp"

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={image}
          alt="Background"
          fill
          placeholder="blur"
          sizes="50vw"
          className="object-cover brightness-[0.6]"
        />
        <Image
          src="/svg/logo.svg"
          alt="Logo"
          width={320}
          height={320}
          className="absolute inset-0 m-auto"
        />
      </div>
    </div>
  )
}
