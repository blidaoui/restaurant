
import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LuBadgePercent, LuUserCircle2 } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbShoppingBagCheck } from "react-icons/tb";
import { DiAptana } from "react-icons/di";
import { FaUserCircle } from "react-icons/fa";
import { ClearCart } from "../../store/store";


const CompteProfile = ({ setShowProfile }: any) => {
  

 
  const router = useRouter();
  

  const [dataUser, setDataUser] = React.useState(null);
  const [canAccess, setCanAccess] = React.useState(true);

  const goto = () => {
    router.push("/components/Navbar/MonCompte/GererRestaurant");
  };
 
  const gotoProfile = () => {
      router.push("/components/Navbar/MonCompte/Profile");
      
  };

  const gotoCommande = () => {
    router.push("/components/Navbar/MonCompte/HistoriquedeCommande");
  };
  const HandleLogout = async () => {
    await fetch("http://localhost:8000/backend/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    localStorage.setItem("CartItem", JSON.stringify(null));
    await getData();
    setShowProfile(false);
    localStorage.removeItem("userId");
    router.push("/");
    localStorage.clear();
    ClearCart()
  };
  const getData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      console.log({ userId });

      const response = await fetch(
        `http://localhost:8000/backend/user/${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setDataUser(jsonData);
    } catch (e) {
      console.error("Login error", e);
    }
  };
  React.useEffect(() => {
    if (!dataUser) {
      getData();
      console.log(dataUser);
    }
  }, []);
  return (
    <div className="d-flex font-weight-bold  justify-content-center align-items-center mr-2">
      <header
        className="flex gap-4"
        style={{
          background: "#f8f9fa",
          borderBottom: "2px solid #dee2e6",
          padding: "20px 0",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <FaUserCircle size={32} />

        <p className="text-2xl text-center">Mon compte</p>
      </header>

      <div className="grid flex-row-6  gap-5 p-4">
        <div onClick={gotoProfile} className="flex cursor-pointer gap-4">
          <LuUserCircle2 size={30} />
          <p className="text-2xl cursor-pointer">Profile</p>
        </div>
        <div className="flex gap-4" onClick={gotoCommande}>
          <TbShoppingBagCheck size={30} />
          <p className="text-2xl cursor-pointer gap-4" >Mes Commandes</p>
        </div>

        {localStorage.getItem("admin") === "true" && (
          <div onClick={goto} className="flex cursor-pointer gap-4">
            <DiAptana size={30} />
            <p className="text-2xl cursor-pointer">Gérer Restaurant</p>
          </div>
        )}
        <div className="flex gap-4" onClick={HandleLogout}>
          <RiLogoutCircleLine size={30} />
          <p className="text-2xl cursor-pointer" onClick={HandleLogout}>
            Déconnexion
          </p>
        </div>
      </div>
    </div>
  );
};
export default CompteProfile;


