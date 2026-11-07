"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { toast } from "react-toastify";

const Registration = ({ setShowRegistration, setCanReturn }: any) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [tele, setTele] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>();
  const [jsonData, setjsonData] = useState<any>(null);

  const containsLowerAndUpper = (str: any) => {
    const lowerRegex = /[a-z]/;
    const upperRegex = /[A-Z]/;
    return lowerRegex.test(str) && upperRegex.test(str);
  };

  const isValidPasswordLowerAndUpper = containsLowerAndUpper(password);
  const containsDigit = (str: any) => {
    const digitRegex = /\d/;
    return digitRegex.test(str);
  };

  const isValidPasswordDigit = containsDigit(password);
  const isValidPasswordlength = password.length >= 8;
  const isPasswordValid =
    isValidPasswordLowerAndUpper &&
    isValidPasswordDigit &&
    isValidPasswordlength &&
    confirmPassword === password;
  const isButtonDisabled = !isPasswordValid;

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const re = /^\d{8}$/;
    return re.test(phoneNumber);
  };

  const listOfUser = async () => {
    const response = await fetch("http://localhost:8000/backend/user");
    const data = await response.json();
    return data;
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let users = await listOfUser();
    console.log({ users });
    setIsLoading(true);

    if (!validateEmail(email)) {
      toast.error(`Veuillez saisir une adresse e-mail valide!`, {
        autoClose: 2000,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error(`Les mots de passe ne correspondent pas!`, {
        autoClose: 2000,
      });
      return;
    }

    if (!validatePhoneNumber(tele)) {
      toast.error(
        `Veuillez saisir un numéro de téléphone valide (8 chiffres)!`,
        {
          autoClose: 2000,
          theme: "colored",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      return;
    }

    if (users.find((el: any) => el.email === email) !== undefined) {
      toast.error(`L'adresse e-mail est déjà utilisée!`, {
        autoClose: 2000,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (users.find((el: any) => el.tele === tele) !== undefined) {
      toast.error(`Le numéro de téléphone est déjà utilisé!`, {
        autoClose: 2000,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    toast.success(`Compte créé avec succès`, {
      autoClose: 2000,
      theme: "colored",
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    const res = await fetch("http://localhost:8000/backend/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, prenom, tele, email, password }),
    });
    setEmail(email);
    setPassword(password);
    setShowRegistration(false);
    const jsonData = await res.json();
    setjsonData(jsonData);
    console.log({ jsonData });
  };
  React.useEffect(() => {
    handleSubmit;
    setCanReturn(true);
  }, []);
  return (
    <div className="w-full max-w-md space-y-8">
      <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-lightgrey">
        Inscription
      </h2>
      <form className="mt-8 space-y-6">
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            Nom
            <input
              name="nom"
              type="text"
              autoComplete="nom"
              value={nom}
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-lightgrey px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
              placeholder="saisir votre nom"
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          {""}
          <div>
            Prénom
            <input
              name="Prénom"
              type="text"
              autoComplete="Prénom"
              value={prenom}
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-lightgrey px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
              placeholder="Prénom "
              onChange={(e) => setPrenom(e.target.value)}
            />
          </div>
          {""}

          <div>
            Numéro de Télephone
            <input
              name="Télephone"
              autoComplete="Télephone"
              value={tele}
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-lightgrey px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
              placeholder="Télephone"
              onChange={(e) => setTele(e.target.value)}
            />
          </div>
          {""}
          <div>
            Email
            <input
              name="email"
              type="text"
              autoComplete="email"
              value={email}
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-lightgrey px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
              placeholder="nom@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {""}
          <div>
            Mot de Passe
            <input
              name="password"
              type="text"
              autoComplete="current-password"
              value={password}
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-lightgrey px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
              placeholder="Mot de passe "
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {""}
          <div>
            Confirme Mot de Passe
            <input
              name="Confirme Mot de Passe"
              type="text"
              autoComplete="current-password"
              value={confirmPassword}
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-lightgrey px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
              placeholder="Confirmer votre mot de passe "
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            {confirmPassword !== "" && confirmPassword !== password && (
              <p className="text-red-500">
                Les mots de passe ne correspondent pas
              </p>
            )}
            {confirmPassword === password && password.length > 0 && (
              <p className="text-green-500 px-4">
                Les mots de passe correspondent
              </p>
            )}{" "}
          
          </div>
        </div>

        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleSubmit}
        >
          Crée compte
        </button>
      </form>
    </div>
  );
};

export default Registration;
