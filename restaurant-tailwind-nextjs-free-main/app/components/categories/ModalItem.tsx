
"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import store, { addToCart } from "../store/store";
import { useSnapshot } from "valtio";

const ModalItem = ({ Item, onClose }: any) => {
  const isAdmin = localStorage.getItem('admin') === 'true'

  const [isOpen, setIsOpen] = useState(true);
  const userId = localStorage.getItem("userId");
  const { Panier } = useSnapshot(store);
  const [Somme, SetSomme] = useState(Number(Item.price.priceHT) ?? 0);
  const [checkedCompositions, setCheckedCompositions] = useState<{
    [key: string]: boolean;
  }>({});
  const [supplementQuantities, setSupplementQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const initialCheckedState: { [key: string]: boolean } = {};
    if (Item?.basicComposition) {
      Object.entries(Item.basicComposition).forEach(([key]) => {
        initialCheckedState[key] = true;
      });
    }
    setCheckedCompositions(initialCheckedState);

    const initialSupplementQuantities: { [key: string]: number } = {};
    if (card?.supplements) {
      Object.keys(card.supplements).forEach((key) => {
        initialSupplementQuantities[key] = 0;
      });
    }
    setSupplementQuantities(initialSupplementQuantities);
  }, [Item]);

  const handleValidateClick = async () => {
    let DataCartItem :any= 
      {
        "qte": 1,
        "prix":Item.price.priceHT,
        "title": Item.title,
        "uiiditem": [
          Item.id
        ],
        "prixuniter":Item.price.priceHT
      }
    
    


    let body = {
      cartItem: { ...DataCartItem },
      id_user: Number(userId),
      etat: "En cour de preparation",
      prix: Somme,
      ModeRetrait: {
        Mode: "",
        time: "",
      },
      address: "",
    };
 

    try {
      let response = await fetch(
        "http://localhost:8000/backend/panier/AddPanier",
        {
          method: "POST",
              headers: { "Content-Type": "application/json" },
body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
      onClose(); // Fermer le modal après succès
    } catch (error) {
      console.error("Failed to save cart item:", error);
      setErrorMessage("Erreur lors de l'ajout au panier");
    }
  };

  const handleCheckboxChange = (key: string) => {
    setCheckedCompositions({
      ...checkedCompositions,
      [key]: !checkedCompositions[key],
    });
  };

  const onClickAdd = () => {
    let copPanier: any = [...Panier];
    let prix = Item?.price?.priceHT || 0;
    const existingItemIndex = JSON.parse(JSON.stringify(copPanier)).findIndex(
      (item: any) => item.uiiditem[0] === Item.id[0]
    );
    if (existingItemIndex !== -1) {
      copPanier[existingItemIndex] = {
        ...copPanier[existingItemIndex],
        qte: copPanier[existingItemIndex].qte + 1,
        prix: parseFloat(
          (
            (copPanier[existingItemIndex].qte + 1) *
            copPanier[existingItemIndex].prixuniter
          ).toFixed(2)
        ),
      };
    } else {
      copPanier.push({
        uiiditem: Item.id,
        title: Item.title,
        qte: 1,
        prixuniter: prix,
        prix: Somme,
        image:
          Item.imageUrl.Default.urlDefault ||
          "https://www.commande-pizzatime.fr/CESARWEB_WEB/repimage/83bbc4350c114000b0e2d6c4ff204215/3/web/Famille122.webp",
      });
    }

    addToCart(copPanier);
    onClose();
  };

  const addSupplementToTotal = (key: string, price: number) => {
    const availableQuantity = card.supplements[key].quantity;
    if (supplementQuantities[key] < availableQuantity) {
      setSupplementQuantities({
        ...supplementQuantities,
        [key]: supplementQuantities[key] + 1,
      });
      SetSomme(Somme + price);
      setErrorMessage(null);
    } else {
      setErrorMessage(
        `Tu ne peux pas ajouter plus que la quantité disponible (${availableQuantity}) pour ${card.supplements[key].title}`
      );
    }
  };

  const removeSupplement = (key: string, price: number) => {
    if (supplementQuantities[key] > 0) {
      const newQuantity = supplementQuantities[key] - 1;
      setSupplementQuantities({
        ...supplementQuantities,
        [key]: newQuantity,
      });

      const newTotal = Somme - price;
      const updatedTotal =
        newTotal < Item.price.priceHT ? Item.price.priceHT : newTotal;
      SetSomme(updatedTotal);
      setErrorMessage(null);
    }
  };

  const imageUrl =
    Item.imageUrl.Default.urlDefault ||
    "https://www.commande-pizzatime.fr/CESARWEB_WEB/repimage/83bbc4350c114000b0e2d6c4ff204215/3/web/Famille122.webp";

  const cat: any = localStorage.getItem("card");
  let card = JSON.parse(cat || null);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col items-center space-y-6">
                  <h2 className="text-3xl font-semibold text-gray-800">
                    {Item.title}
                  </h2>
                  <img
                    className="rounded-md  shadow-md"
                    style={{ maxWidth: "200px", width: "auto" }}
                    src={imageUrl}
                    alt="Card image cap"
                  />
                  <div className="w-full">
                    <h5 className="text-xl font-medium text-gray-700 mb-2">
                      Composition de base :
                    </h5>
                    <div className="flex flex-wrap gap-4">
                      {Item?.basicComposition &&
                        Object.entries(Item.basicComposition).map(
                          ([key, value]: any) => (
                            <label
                              key={key}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600"
                                checked={checkedCompositions[key]}
                                onChange={() => handleCheckboxChange(key)}
                              />
                              <span className="text-gray-700">
                                {value?.title || ""}
                              </span>
                            </label>
                          )
                        )}
                    </div>
                  </div>
                  <div className="w-full">
                    <h5 className="text-xl font-medium text-gray-700 mb-2">
                      PIZZA SUPPLEMENTS
                    </h5>
                    <div className="flex flex-col space-y-2">
                      {Object.keys(card?.supplements).map((key: any) => (
                        <div
                          key={key}
                          className="flex justify-between items-center p-2 border rounded-md shadow-sm"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-700">
                              {card?.supplements[key]?.title}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <button
                              className="bg-slate-300 text-black px-2 py-1 rounded-md hover:bg-blue-600"
                              onClick={() =>
                                addSupplementToTotal(
                                  key,
                                  card?.supplements[key]?.price
                                )
                              }
                            >
                              +
                            </button>
                            <span>{supplementQuantities[key]}</span>
                            <button
                              className="bg-slate-300 text-black px-2 py-1 rounded-md hover:bg-red-600"
                              onClick={() =>
                                removeSupplement(
                                  key,
                                  card?.supplements[key]?.price
                                )
                              }
                            >
                              −
                            </button>
                            <span className="text-gray-700">
                              {card?.supplements[key]?.price} €
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {errorMessage && (
                    <div className="text-red-600">{errorMessage}</div>
                  )}
                  <div className="flex justify-end space-x-4 w-full">
                    <button
                      type="button"
                      className="flex justify-end text-xl font-medium bg-bgpink text-pink py-4 px-4 lg:px-8 navbutton rounded-full"
                    >
                      Total: {Somme.toFixed(2)} €
                    </button>
                    <button
                      type="button"
                      disabled ={isAdmin}
                      className="flex justify-end text-xl font-medium bg-bgpink text-pink py-4 px-4 lg:px-8 navbutton rounded-full hover:text-white hover:bg-pink"
                      onClick={() => {
                        onClickAdd();
                        // handleValidateClick();
                      }}
                    >
                      Ajouter Produit
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalItem;
