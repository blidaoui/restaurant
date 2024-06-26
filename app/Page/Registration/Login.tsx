"use client";
import React, { SyntheticEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import "react-toastify/dist/ReactToastify.css";

import Motdepasseoublié from "./MotdePassOublier";
import CompteProfile from "../Profile/compte/CompteProfile";
import Registration from "./Registration";

const Login = ({ setShowRegistration, showRegistration,setCanReturn ,isMotdepasseoublié, setIsMotdepasseoublié}: any) => {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignUpClick = () => {
    setShowRegistration(true);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  React.useEffect(() => {
    setShowProfile(localStorage.getItem("userId") !== null);
  }, []);

  async function handleGoogle() {
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
 
      console.log(data);
    } catch (error) {
      console.error("get panier error", error);
    }
  }
  React.useEffect(()=>{
    setCanReturn(false)

},[])

  return (
    <div> 
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
          {!showProfile ? (
            <form className="form_main" action="">
              {!showRegistration ? (
                <>
                  <p className="heading">Login</p>
                  <div className="inputContainer">
                    <input
                      placeholder="nom@gmail.com"
                      id="email"
                      className="inputField"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="inputContainer">
                    <input
                      placeholder="Mot de passe"
                      id="password"
                      className="inputField"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button onClick={Submit} type="submit" id="button">
                    connexion
                  </button>
                  <button
                    onClick={handleMotdepasseoublié}
                    className="underline"
                  >
                    Mot de passe oublié !
                  </button>{" "}
                  <div className="signupContainer">
                    <button id="button" onClick={handleSignUpClick}>
                      Inscription
                    </button>
                  </div>
                  <p className="text-center text-md">se connecter avec</p>
                  <div className="flex gap-4 justify-center justify-content">
                    <Link href="http://localhost:8000/backend/user/google/1">
                      <FcGoogle
                        onClick={handleGoogle}
                        size={30}
                        className="rounded-full m-4 cursor-pointer transition hover:scale-105"
                      />
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Registration setCanReturn={setCanReturn}/>
                </>
              )}
            </form>
          ) : (
            <CompteProfile setShowProfile={setShowProfile} />
          )}
        </>
      )}
    </div>
  );
};

export default Login;
