import { auth, signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { CiShoppingCart } from "react-icons/ci";
import { PiTireDuotone } from "react-icons/pi";
import { CiCircleInfo } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";

const Navbar = async () => {
  const session = await auth();
  // console.log(session?.id);

  return (
    <header className=" px-5 py-3 bg-white shadow-md">
      <nav className=" flex justify-between items-center">
        <Link href="/">
          <Image src={"/logoTanjung.png"} alt="Logo" width={40} height={40} className=" rounded-[10px]" />
        </Link>

        <div className="flex items-center gap-5">
          <Link href={"/about"}>
            <span className="max-sm:hidden">Tentang</span>
            <CiCircleInfo className="size-6 sm:hidden" />
          </Link>

          <Link href={"/contact"}>
            <span className="max-sm:hidden">Kontak</span>
            <CiPhone className="size-6 sm:hidden" />
          </Link>

          <Link href={"/product"}>
            <span className="max-sm:hidden">Produk</span>
            <PiTireDuotone className="size-6 sm:hidden" />
          </Link>

          {session && session?.user ? (
            <>
              <Link href={`/user/${session.id}/cart`}>
                <span className="max-sm:hidden">Keranjang</span>
                <CiShoppingCart className="size-6 sm:hidden" />
              </Link>

              <Link href={`/user/${session.id}`}>
                <Avatar className="size-10">
                  <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
