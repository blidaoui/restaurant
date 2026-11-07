"use client";
import React, { useEffect, useState } from "react";
import './style.css'; // Assurez-vous de créer ce fichier CSS pour les styles personnalisés

interface Item {
  qte: number;
  prix: number;
  image: string;
  title: string;
  uiiditem: string[];
  prixuniter: string;
}

interface Commande {
  id: number;
  etat: string;
  prix: string;
  id_user: number;
  image: string;
  createdAt: string;
  ModeRetrait: { Mode: string; time: string };
  cartItem: { [key: string]: Item };
  etat_Commande: string;
}

const CommandeItem = ({ commandeItem }: { commandeItem: Commande }) => (
  <div key={commandeItem.id} className="invoice-card">
    <div className="invoice-header">
      <h2 className="invoice-title">Facture</h2>
      <div className="invoice-id">Commande ID: {commandeItem.id}</div>
      <button onClick={() => window.print()} className="print-button">Imprimer Facture</button>  

    </div>
    <div className="invoice-body">
      <CommandeRow label="Plat" value={Object.values(commandeItem.cartItem).map((item, index) => (
        <span key={index} className="invoice-item">{item.title}</span>
      ))} />
      <CommandeRow label="Mode de retrait" value={commandeItem.ModeRetrait.Mode} />
      <CommandeRow label="État de commande" value={commandeItem.etat_Commande} />
      <CommandeRow label="Date de retrait" value={commandeItem.ModeRetrait.time} />
      {commandeItem.ModeRetrait.Mode=== "livraison"?   <CommandeRow label="livraison" value="3 €" />:null}
      <CommandeRow label="Montant" value={`${commandeItem.prix} €`} />
    </div>
    <div className="invoice-footer">
      <div>Date de commande: {new Date(commandeItem.createdAt).toLocaleDateString()}</div>
    </div>
  </div>
);

const CommandeRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="invoice-row">
    <div className="invoice-label">{label}</div>
    <div className="invoice-value">{value}</div>
  </div>
);

function Page() {
  const [commandes, setCommandes] = useState<Commande[]>([]);

  const fetchCommandes = async () => {
    let arrayCookies:any=document.cookie.split(";")
    let userVariable:any=arrayCookies.find((el:any)=>el.includes("userId"));
    console.log({userVariable});
    
    let indexOfEqual=userVariable!==undefined?userVariable.indexOf("="):-1;
    let userIdCookies=indexOfEqual!==-1?userVariable.substring(indexOfEqual+1):null
    const user_id=localStorage.getItem("userId")!==null?localStorage.getItem("userId"):Number(userIdCookies)
    console.log({ user_id });
    
    try {
      const response = await fetch(`http://localhost:8000/backend/panier/${user_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        console.log({ data });

        setCommandes(data);
      } else {
        console.error("Failed to fetch commandes");
      }
    } catch (error) {
      console.error("Error fetching commandes:", error);
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  const today = new Date();

  return (
    <>
      {commandes.filter((commandeItem) => new Date(commandeItem.createdAt).toDateString() === today.toDateString())
        .map((filteredCommandeItem) => (
          <CommandeItem key={filteredCommandeItem.id} commandeItem={filteredCommandeItem} />
      ))}
    </>
  );
}

export default Page;
