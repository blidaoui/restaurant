'use client'
import React, { useEffect, useState } from "react";
import "./style.css"; // Make sure to create this CSS file for custom styles
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

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
function page() {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const fetchCommandes = async () => {
    let arrayCookies:any=document.cookie.split(";")
    let userVariable:any=arrayCookies.find((el:any)=>el.includes("userId"));
    console.log({userVariable});
    
    let indexOfEqual=userVariable!==undefined?userVariable.indexOf("="):-1;
    let userIdCookies=indexOfEqual!==-1?userVariable.substring(indexOfEqual+1):null
    const user_id=localStorage.getItem("userId")!==null?localStorage.getItem("userId"):Number(userIdCookies)
    console.log({ user_id });

    try {
      const response = await fetch(
        `http://localhost:8000/backend/panier/${user_id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
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

  const toggleExpand = (id: number) => {
    const newExpandedIds = new Set(expandedIds);
    if (newExpandedIds.has(id)) {
      newExpandedIds.delete(id);
    } else {
      newExpandedIds.add(id);
    }
    setExpandedIds(newExpandedIds);
  };

  function formatDate(dateString : string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR'); 
  }

  return (
    <div>
    <h1 style={{fontSize:"300%",textAlign:"center",textDecorationStyle:"solid"}}> Mes Commandes </h1>
    {commandes.map((commandeItem, index) => (
      <div
        key={commandeItem.id}
        className="relative justify-content border-[1.2px] border-slate-200 bg-white shadow-md rounded-2xl m-4"
      >
        <div className="flex p-1 justify-between">
   
        <p>Commande N° {commandes.length - index} - {formatDate(commandeItem.createdAt)}</p> 
          {expandedIds.has(commandeItem.id) ? (
            <RiArrowDropUpLine
              size={50}
              onClick={() => toggleExpand(commandeItem.id)}
            />
          ) : (
            <RiArrowDropDownLine
              size={50}
              onClick={() => toggleExpand(commandeItem.id)}
            />
          )}
        </div>
        {expandedIds.has(commandeItem.id) && (
          <div className="grid grid-row p-2 gap-2">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(commandeItem.cartItem).map(([key, item]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ maxWidth: "80px", width: "auto" }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.prix}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.qte}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    ))}

  </div>
  )
}

export default page