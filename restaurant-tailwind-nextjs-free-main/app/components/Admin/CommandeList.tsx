"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdAddTask } from "react-icons/md";
import { RiChatDeleteLine } from "react-icons/ri";

interface Commande {
  id: number;
  etat: string;
  prix: string;
  id_user: number;
  createdAt: string;
  ModeRetrait: { Mode: string; time: string };
  cartItem: { [key: string]: { title: string } };
  etat_Commande: string; // Updated property name
}

const CommandeList: React.FC = () => {
  const [commande, setCommande] = useState<Commande[]>([]);
  const [Update, setUpdate] = useState<boolean>(false);

  const [sms, setSms] = useState(false);
  const [telephone, setTelephone] = useState("");
  const onSubmitSMS = async () => {
    const data: any = localStorage.getItem("phonenumber");
    const res = await fetch("http://localhost:8000/backend/user/send_SMS", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber: data.télephone,
        message: `votre commande est prete`,
      }),
    });
    const jsonData = await res.json();

    if (jsonData.message === "Message envoyé avec succès") {
    }
  };

  const fetchCommande = async () => {
    try {
      const response = await fetch("http://localhost:8000/backend/panier", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setCommande(data); // Set the users state with the fetched data
      } else {
        console.error("Failed to fetch Commande");
      }
    } catch (error) {
      console.error("Error fetching Commande:", error);
    }
  };

  const changeEtat = async (
    id: number,
    etat_commande: string,
    phone: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8000/backend/panier/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ etat_Commande: etat_commande }), // Include etat_Commande in the request body
        }
      );

      if (response.ok) {
        // Update the local state to reflect the changes
        setCommande((prevState) =>
          prevState.map((item) =>
            item.id === id ? { ...item, etat_Commande: etat_commande } : item
          )
        );

        const res = await fetch("http://localhost:8000/backend/user/send_SMS", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNumber: phone,
            message: `Votre commande est prete`,
          }),
        });
      } else {
        console.error(
          "Failed to update status:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchCommande();
  }, [Update]);

  return (
    <div>
      <p className="text-3xl font-semibold text-black ml-4 ">
        Liste des commandes
      </p>

      <table className="table">
        <thead>
          <tr>
            <th>titre </th>
            <th>etat_Commande</th>
            <th>prix</th>
            <th>id_user</th>
            <th>ModeRetrait.Mode</th>
            <th>ModeRetrait.time</th>
            <th>createdAt</th>
            <th>accepter</th>
          
          </tr>
        </thead>
        <tbody>
          {commande.map((commandeItem: any) => (
            <tr key={commandeItem.id}>
              <td>
                {/* Convertir l'objet cartItem en tableau d'objets et afficher les titres */}
                {Object.values(commandeItem.cartItem).map(
                  (item: any, index) => (
                    <span key={index}>{item.title}</span>
                  )
                )}
              </td>
              <td>{commandeItem.etat_Commande}</td>
              <td>{commandeItem.prix}</td>
              <td>{commandeItem.id_user}</td>
              <td>{commandeItem.ModeRetrait.Mode}</td>
              <td> {commandeItem.ModeRetrait.time}</td>
              <td>{commandeItem.createdAt}</td>
              <td>
                <Button
                  onClick={() => {
                    changeEtat(
                      commandeItem.id,
                      "commande prete",
                      commandeItem.ModeRetrait.phoneNumber
                    );
                    setUpdate(!Update);
                  }}
                  // setUpdate={setUpdate}
                >
                  <MdAddTask />
                </Button>
              </td>
        
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommandeList;
