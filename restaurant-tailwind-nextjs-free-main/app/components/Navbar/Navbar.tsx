import React from "react";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";

import Signindialog from "./Signin";
import Painner from "../categories/painner";
import Drawerdata from "./Drawerdata";
import Drawer from "./Drawer";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  // { name: "Accueil", href: "#home-section", current: false },
  // { name: "Menu", href: "#menu-section", current: false },
  { name: "Nos Restaurants", href: "#Restaurant-section", current: false },
  // { name: "Retrouvez-nous sur la carte", href: "#map-section", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSignInOpen, setIsSignInOpen] = React.useState(false);

  return (
    <Disclosure as="nav" className="navbar">
      <>
        <div className="mx-auto max-w-7xl p-3 md:p-6 lg:px-8">
          <div className="relative flex h-12 sm:h-20 items-center">
            <div className="flex flex-1 items-center sm:justify-between">
              <div className="flex sm:hidden flex-shrink-0 items-center border-right">
                <Image
                  src="/images/Logo/logo.jpg"
                  alt="logo"
                  width={36}
                  height={36}
                />
                <Link
                  href="/"
                  className="text-3xl font-semibold text-black ml-4 "
                >
                  Pizza Time
                </Link>
              </div>
              <div className="hidden sm:flex flex-shrink-0 items-center border-right">
                <Link href="/">
                  <Image
                    src="/images/Logo/logo.jpg"
                    alt="logo"
                    width={100}
                    height={100}
                  />
                </Link>
                <Link
                  href="/"
                  className="text-3xl font-semibold text-black ml-4 "
                >
                  Pizza Time
                </Link>
              </div>

              {/* LINKS */}

              <div className="hidden lg:flex items-center border-right ">
                <div className="flex justify-end space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-black"
                          : "navlinks hover:opacity-100",
                        "px-3 py-4 rounded-md text-lg font-normal opacity-50 hover:text-black space-links"
                      )}
                      aria-current={item.href ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="gap-6 hidden lg:flex">
           
                <div className="flex items-center mb-4 gap-2">
                  <Painner setIsSignInOpen={setIsSignInOpen}/>
                </div>
              </div>
              <div className="gap-6 hidden lg:flex">
                <div className="flex items-center gap-2">
                  <Image
                    src={"/images/Navbar/phone.svg"}
                    alt="phone-image"
                    width={19}
                    height={19}
                  />
                  <p className="text-lg font-medium">+33 01 30 27 97 50</p>
                </div>
                <Signindialog isOpen={isSignInOpen} setIsOpen={setIsSignInOpen}/>
              </div>
            </div>
         

            <div className="block lg:hidden">
              <Bars3Icon
                className="block h-6 w-6"
                aria-hidden="true"
                onClick={() => setIsOpen(true)}
              />
            </div>


            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata />
            </Drawer>
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default Navbar;
