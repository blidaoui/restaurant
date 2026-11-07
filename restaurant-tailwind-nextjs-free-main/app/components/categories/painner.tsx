"use client";
import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import "tailwindcss/tailwind.css";
import { FaTrashAlt } from "react-icons/fa";
import store, { addToCart } from "../store/store";
import ModalCategorie from "../Modal/Modal";
import { Fade } from "react-awesome-reveal";

function Painner({ setIsSignInOpen }: any) {
  const panierSnapshot = useSnapshot(store);
  const Panier = panierSnapshot.Panier;
  if (Panier && Panier.length > 0) {
    const panierJSON = JSON.stringify(Panier);
    console.log("entre");
    localStorage.setItem("Panier", panierJSON);
  }

  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [Somme, SetSomme] = useState(0);
  const [quantity, SetQuantity] = useState(0);

  const handleCommandeClick = () => {
    setShowModal(true);
    setIsOpen(false);
  };

  const increaseQuantity = (itemId: number) => {
    console.log("increaseQuantity called", itemId);

    let copPanier = [...Panier];
    let itemIndex = copPanier.findIndex((item) => item.uiiditem === itemId);
    if (itemIndex !== -1) {
      let mutableItem = { ...copPanier[itemIndex] };
      mutableItem.qte += 1;
      mutableItem.prix = (
        mutableItem.qte * parseFloat(mutableItem.prixuniter)
      ).toFixed(2);
      copPanier[itemIndex] = mutableItem;
      addToCart(copPanier); // Assurez-vous que cette fonction actualise l'état du store
    }
  };

  const decreaseQuantity = (itemId: number) => {
    console.log("decreaseQuantity called", itemId);

    let copPanier = [...Panier];
    let itemIndex = copPanier.findIndex((item) => item.uiiditem === itemId);
    if (itemIndex !== -1) {
      let mutableItem = { ...copPanier[itemIndex] };
      if (mutableItem.qte > 1) {
        // Vérifier si la quantité est supérieure à 1
        mutableItem.qte -= 1;
        mutableItem.prix = (
          mutableItem.qte * parseFloat(mutableItem.prixuniter)
        ).toFixed(2);
        copPanier[itemIndex] = mutableItem;
      } // Si qte est 1, ne rien faire pour éviter d'aller en dessous de 1
      addToCart(copPanier);
    }
  };

  const removeItem = (itemId: number) => {
    console.log("removeItem called", itemId);

    let copPanier = [...Panier];
    copPanier = copPanier.filter((p) => p.uiiditem !== itemId);
    addToCart(copPanier);
  };

  useEffect(() => {
    let s = 0;
    let q = 0;
    for (let item of Panier) {
      s += parseFloat(item.prix);
      q += item.qte;
    }
    SetSomme(s);
    SetQuantity(q);
  }, [Panier]);

  return (
    <>
      <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 space-x-1">
          <div className="col-span-6 flex flex-col justify-center">
            <div className="relative">
              <svg
                className="w-10 h-10 cursor-pointer"
                fill="currentColor"
                viewBox="0 0 24 24"
                onClick={() => setIsOpen(!isOpen)}
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4L4 5H2M7 13l1 5h8l1-5M5 21h2a2 2 0 0 0 2-2H5a2 2 0 0 0-2 2zm10 0h2a2 2 0 0 0 2-2h-4a2 2 0 0 0 0 2z" />
              </svg>

              <span className="circle absolute top-0 right-0  h-5 w-5 flex items-center justify-center">
                {quantity}
              </span>
            </div>

            {isOpen && (
              <div
                className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20"
                onClick={() => setIsOpen(false)}
              >
                <div
                  className="fixed right-0 top-0 bg-white w-80 h-full shadow-lg p-4 z-30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Fade
                    direction={"up"}
                    delay={400}
                    cascade
                    damping={1e-1}
                    triggerOnce={true}
                  >
                    <div className="flex justify-between items-center border-b pb-2">
                      <h5 className="text-xl font-bold">Panier</h5>
                      <button
                        className="text-gray-500"
                        onClick={() => setIsOpen(false)}
                      >
                        ✕
                      </button>
                    </div>
                  </Fade>

                  {Panier.length === 0 ? (
                    <>
                      <Fade
                        direction={"up"}
                        delay={400}
                        cascade
                        damping={1e-1}
                        triggerOnce={true}
                      >
                        <div className="text-center text-gray-500">
                          Votre panier est vide
                        </div>
                      </Fade>
                    </>
                  ) : (
                    Panier.map((item: any, index) => (
                      <Fade
                        direction={"up"}
                        delay={400}
                        cascade
                        damping={1e-1}
                        triggerOnce={true}
                      >
                        <div
                          className="flex items-center space-x-4"
                          key={index}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover"
                          />
                          <div className="flex-grow">
                            <h5 className="text-lg font-bold">{item.title}</h5>
                            <p className="text-sm text-gray-500">
                              {item.prix} €
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              className="px-2 py-1 bg-gray-200 text-gray-600 rounded"
                              onClick={() => decreaseQuantity(item.uiiditem)}
                              disabled={item.qte <= 1}
                            >
                              -
                            </button>
                            <span>{item.qte}</span>
                            <button
                              className="px-2 py-1 bg-gray-200 text-gray-600 rounded"
                              onClick={() => increaseQuantity(item.uiiditem)}
                            >
                              +
                            </button>
                            <button
                              className="text-red-500"
                              onClick={() => removeItem(item.uiiditem)}
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </div>
                      </Fade>
                    ))
                  )}

                  <Fade
                    direction={"up"}
                    delay={400}
                    cascade
                    damping={1e-1}
                    triggerOnce={true}
                  >
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total:</span>
                        <span>{Somme.toFixed(2)} €</span>
                      </div>
                      <button
                        className={`w-full mt-4 py-2 rounded ${
                          Somme === 0 ? "bg-gray-400" : "bg-blue-600"
                        }`}
                        disabled={Somme === 0}
                        onClick={() => handleCommandeClick()}
                      >
                        Commander
                      </button>
                    </div>
                  </Fade>
                </div>
              </div>
            )}
          </div>

          {showModal && (
            <ModalCategorie
              setShowModal={setShowModal}
              setIsSignInOpen={setIsSignInOpen}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Painner;
