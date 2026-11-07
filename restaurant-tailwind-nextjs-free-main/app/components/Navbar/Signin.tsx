// import React from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, SyntheticEvent, useEffect, useState } from "react";
// import { LockClosedIcon } from "@heroicons/react/20/solid";
// import Link from "next/link";
// import Image from "next/image";
// import "react-toastify/dist/ReactToastify.css";
// import { GoArrowLeft, GoSignOut } from "react-icons/go";
// import { ToastContainer, toast } from "react-toastify";
// import { FcGoogle } from "react-icons/fc";

// import CompteProfile from "./MonCompte/CompteProfile";
// import Motdepasseoublié from "./MotdePasse/MotdePassOublier";
// import Registration from "./Registration";

// const Signin = ({ isOpen, setIsOpen }: any) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [canReturn, setCanReturn] = useState(false);
//   const [isMotdepasseoublié, setIsMotdepasseoublié] = useState<boolean>(false);
//   const [showRegistration, setShowRegistration] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   const handelCanReturn = () => {
//     setCanReturn(false);
//     setIsMotdepasseoublié(false);
//     setShowProfile(false);
//     setShowRegistration(false);
//   };

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   console.log({ showProfile });

//   const handleSignUpClick = () => {
//     setShowRegistration(true);
//   };


//   const listOfUser = async () => {
//     const response = await fetch("http://localhost:8000/backend/user");
//     const data: any = await response.json();
//     return data;
//   };
//   const handleMotdepasseoublié = () => {
//     setIsMotdepasseoublié(true);
//     setIsLoading(false);
//   };
//   const Submit = async (e: SyntheticEvent) => {
//     e.preventDefault();
//     let users = await listOfUser();
//     console.log({ users });

//     const user = users.find(
//       (el: any) => el.email === email && el.password === password
//     );
//     if (user !== undefined) {
//       toast.error(`Vérifiez vos données!`, {
//         autoClose: 2000,
//         theme: "colored",
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     } else {
//       let response = await fetch("http://localhost:8000/backend/user/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       let data = await response.json();
//       if (data.data !== undefined) {
//         localStorage.setItem("userId", data.data.user_id);
//       }
//       if (data.statusCode === 200) {
//         setShowProfile(true);
//         if (data.data.role === "admin") {
//           localStorage.setItem("admin", "true");
//         } else {
//           localStorage.setItem("admin", "false");
//         }
//       } else {
//         toast.error(`Utilisateur non trouvé`, {
//           autoClose: 2000,
//           theme: "colored",
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//       }
//       console.log({ data });
//     }
//   };
//   useEffect(() => {
//     setShowProfile(
//       localStorage.getItem("userId") !== null ||
//         localStorage.getItem("isConnected") !== null
//     );
//   }, []);

//   async function handleGoogle() {
//     localStorage.setItem("isConnected", "true");

//     try {
//       const response = await fetch(
//         "http://localhost:8000/backend/user/auth/google/callback",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         }
//       );

//       const data = await response.json();

//       setShowProfile(true);
//       console.log(data);
//     } catch (error) {
//       console.error("get panier error", error);
//     }
//   }
//   React.useEffect(() => {
//     setCanReturn(false);
//   }, []);

//   return (
//     <>
//       <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//       <div className="hidden md:block">
//           <button
//             type="button"
//             className="flex justify-end text-xl font-medium bg-bgpink text-pink py-4 px-4 lg:px-8 navbutton rounded-full hover:text-white hover:bg-pink"
//             onClick={openModal}
//           >
//             {showProfile ? "Profile" : "Connexion"}
//           </button>
//         </div>
//       </div>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <ToastContainer limit={1} />

//                   {isMotdepasseoublié ? (
//                     <Motdepasseoublié
//                       setIsMotdepasseoublié={setIsMotdepasseoublié}
//                       handleSignUpClick={handleSignUpClick}
//                       isLoading={isLoading}
//                       setIsLoading={setIsLoading}
//                       setemail={setEmail}
//                       setPassword={setPassword}
//                       setCanReturn={setCanReturn}
//                     />
//                   ) : (
//                     <>
//                       {canReturn ? (
//                         <button type="button" onClick={handelCanReturn}>
//                           <GoArrowLeft />
//                         </button>
//                       ) : null}
//                       {!showProfile ? (
//                         <div className="flex min-h-full items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
//                           {!showRegistration ? (
//                             <>
//                               <div className="w-full max-w-md space-y-8">
//                                 <header
//                                   className="flex gap-4"
//                                   style={{
//                                     background: "#f8f9fa",
//                                     borderBottom: "2px solid #dee2e6",
//                                     padding: "10px 0",
//                                     marginBottom: "5px",
//                                     textAlign: "center",
//                                   }}
//                                 >
//                                   <p className="text-2xl text-center py-2 px-4 sm:px-6 lg:px-8  solid">
//                                     Connexion
//                                   </p>
//                                 </header>

//                                 <form
//                                   className="mt-8 space-y-6"
//                                   action="#"
//                                   method="POST"
//                                 >
//                                   <input
//                                     type="hidden"
//                                     name="remember"
//                                     defaultValue="true"
//                                   />
//                                   <div className="-space-y-px rounded-md shadow-sm">
//                                     <div>
                                  
//                                         Email
//                                       <input
//                                         id="email-address"
//                                         name="email"
//                                         type="email"
//                                         autoComplete="email"
//                                         required
//                                         className="relative block w-full appearance-none rounded-none rounded-t-md border border-lightgrey px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
//                                         placeholder="nom@gmail.com"
//                                         onChange={(e) =>
//                                           setEmail(e.target.value)
//                                         }
//                                       />
//                                     </div>
//                                     <div>
                                      
//                                         Mot de Passe
                                  
//                                       <input
//                                         id="password"
//                                         name="password"
//                                         type="password"
//                                         autoComplete="current-password"
//                                         required
//                                         className="relative block w-full appearance-none rounded-none rounded-b-md border border-lightgrey px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
//                                         placeholder="Mot de passe"
//                                         onChange={(e) =>
//                                           setPassword(e.target.value)
//                                         }
//                                       />
//                                     </div>
//                                   </div>
//                                   <div className="flex items-center justify-between">
//                                     <div className="text-sm">
//                                       <a
//                                         href="#"
//                                         className="font-medium text-indigo-600 hover:text-indigo-500"
//                                         onClick={handleMotdepasseoublié}
//                                       >
//                                         Mot de passe oublié?
//                                       </a>
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <button
//                                       type="submit"
//                                       className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                                       onClick={Submit}
//                                     >
//                                       <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                                         <LockClosedIcon
//                                           className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
//                                           aria-hidden="true"
//                                         />
//                                       </span>
//                                       Connexion
//                                     </button>
//                                   </div>
//                                   <p className="text-center">ou</p>
//                                   <div>
//                                     <a
//                                       className="justify-center"
//                                       onClick={handleSignUpClick}
//                                     >
//                                       Inscription{" "}
//                                     </a>
//                                   </div>
//                                   <div>
//                                     <Link href="http://localhost:8000/backend/user/google/1">
//                                       <button
//                                         type="button"
//                                         className="flex justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
//                                         onClick={handleGoogle}
//                                       >
//                                         <FcGoogle size={20} className="mr-2" />
//                                         Se connecter avec Google
//                                       </button>
//                                     </Link>
//                                   </div>
//                                 </form>
//                               </div>
//                             </>
//                           ) : (
//                             <>
//                               <Registration
//                                 setCanReturn={setCanReturn}
//                                 setShowRegistration={setShowRegistration}
//                               />
//                             </>
//                           )}
//                         </div>
//                       ) : (
//                         <CompteProfile setShowProfile={setShowProfile} />
//                       )}
//                     </>
//                   )}
//                   <div className="mt-4 flex justify-end">
//                     <button
//                       type="button"
//                       className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-2xl font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                       onClick={closeModal}
//                     >
//                       <GoSignOut />
//                     </button>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };

// export default Signin;

import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, SyntheticEvent, useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { GoArrowLeft, GoSignOut } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

import CompteProfile from "./MonCompte/CompteProfile";
import Motdepasseoublié from "./MotdePasse/MotdePassOublier";
import Registration from "./Registration";
import { useSnapshot } from "valtio";
import store from "../store/store";

const Signin = ({ isOpen, setIsOpen }: any) => {
  const {isFromPayment}=useSnapshot(store)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canReturn, setCanReturn] = useState(false);
  const [isMotdepasseoublié, setIsMotdepasseoublié] = useState<boolean>(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handelCanReturn = () => {
    setCanReturn(false);
    setIsMotdepasseoublié(false);
    setShowProfile(false);
    setShowRegistration(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  console.log({ showProfile });

  const handleSignUpClick = () => {
    setShowRegistration(true);
  };


  const listOfUser = async () => {
    const response = await fetch("http://localhost:8000/backend/user");
    const data: any = await response.json();
    return data;
  };
  const handleMotdepasseoublié = () => {
    setIsMotdepasseoublié(true);
    setIsLoading(false);
  };
  const Submit = async (e: SyntheticEvent) => {
    if(isFromPayment){
      setIsOpen(false)
    }
  
      e.preventDefault();
      let users = await listOfUser();
      console.log({ users });
  
      const user = users.find(
        (el: any) => el.email === email && el.password === password
      );
      if (user !== undefined) {
        toast.error(`Vérifiez vos données!`, {
          autoClose: 2000,
          theme: "colored",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        let response = await fetch("http://localhost:8000/backend/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        let data = await response.json();
        if (data.data !== undefined) {
          localStorage.setItem("userId", data.data.user_id);
        }
        if (data.statusCode === 200) {
          setShowProfile(true);
          if (data.data.role === "admin") {
            localStorage.setItem("admin", "true");
          } else {
            localStorage.setItem("admin", "false");
          }
        } else {
          toast.error(`Utilisateur non trouvé`, {
            autoClose: 2000,
            theme: "colored",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        console.log({ data });
      }
  
  };
  useEffect(() => {
    setShowProfile(
      localStorage.getItem("userId") !== null ||
        localStorage.getItem("isConnected") !== null
    );
  }, []);

  async function handleGoogle() {
    localStorage.setItem("isConnected", "true");

    try {
      const response = await fetch(
        "http://localhost:8000/backend/user/auth/google/callback",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      setShowProfile(true);
      console.log(data);
    } catch (error) {
      console.error("get panier error", error);
    }
  }
  React.useEffect(() => {
    setCanReturn(false);
  }, []);

  return (
    <>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <div className="hidden md:block">
          <button
            type="button"
            className="flex justify-end text-xl font-medium bg-bgpink text-pink py-4 px-4 lg:px-8 navbutton rounded-full hover:text-white hover:bg-pink"
            onClick={openModal}
          >
            {showProfile ? "Profile" : "Connexion"}
          </button>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <ToastContainer limit={1} />

                  {isMotdepasseoublié ? (
                    <Motdepasseoublié
                      setIsMotdepasseoublié={setIsMotdepasseoublié}
                      handleSignUpClick={handleSignUpClick}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      setemail={setEmail}
                      setPassword={setPassword}
                      setCanReturn={setCanReturn}
                    />
                  ) : (
                    <>
                      {canReturn ? (
                        <button type="button" onClick={handelCanReturn}>
                          <GoArrowLeft />
                        </button>
                      ) : null}
                      {!showProfile ? (
                        <div className="flex min-h-full items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
                          {!showRegistration ? (
                            <>
                              <div className="w-full max-w-md space-y-8">
                                <header
                                  className="flex justify-center items-center"
                                  style={{
                                    background: "#f8f9fa",
                                    borderBottom: "2px solid #dee2e6",
                                    padding: "10px 0",
                                    marginBottom: "5px",
                                  }}
                                >
                                  <p className="text-2xl font-bold text-center py-2 px-4 sm:px-6 lg:px-8">
                                    Connexion
                                  </p>
                                </header>

                                <form
                                  className="mt-8 space-y-6"
                                  action="#"
                                  method="POST"
                                >
                                  <input
                                    type="hidden"
                                    name="remember"
                                    defaultValue="true"
                                  />
                                  <div className="-space-y-px rounded-md shadow-sm">
                                    <div>
                                      <label
                                        htmlFor="email-address"
                                        className="sr-only"
                                      >
                                        Email
                                      </label>
                                      <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-lightgrey px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
                                        placeholder="nom@gmail.com"
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="password"
                                        className="sr-only"
                                      >
                                        Mot de Passe
                                      </label>
                                      <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-lightgrey px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
                                        placeholder="Mot de passe"
                                        onChange={(e) =>
                                          setPassword(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="text-sm">
                                      <a
                                        href="#"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={handleMotdepasseoublié}
                                      >
                                        Mot de passe oublié?
                                      </a>
                                    </div>
                                  </div>
                                  <div>
                                    <button
                                      type="submit"
                                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      onClick={Submit}
                                    >
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <LockClosedIcon
                                          className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                          aria-hidden="true"
                                        />
                                      </span>
                                      Connexion
                                    </button>
                                  </div>
                                  <p className="text-center">ou</p>
                                  <div>
                                    <a
                                      className="justify-center"
                                      onClick={handleSignUpClick}
                                    >
                                      Inscription{" "}
                                    </a>
                                  </div>
                                  <div>
                                    <Link href="http://localhost:8000/backend/user/google/1">
                                      <button
                                        type="button"
                                        className="flex justify-center w-full py-2 px-4 border-black border-black rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        onClick={handleGoogle}
                                      >
                                        <FcGoogle size={20} className="mr-2" />
                                        Se connecter avec Google
                                      </button>
                                    </Link>
                                  </div>
                                </form>
                              </div>
                            </>
                          ) : (
                            <>
                              <Registration
                                setCanReturn={setCanReturn}
                                setShowRegistration={setShowRegistration}
                              />
                            </>
                          )}
                        </div>
                      ) : (
                        <CompteProfile setShowProfile={setShowProfile} />
                      )}
                    </>
                  )}
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-2xl font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      <GoSignOut />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Signin;
