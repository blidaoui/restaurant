"use client";
import React, { Fragment, SyntheticEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { v4 } from "uuid";

import { AjouterCategories } from "./Ajouter";
import { Dialog, Transition } from "@headlessui/react";

type AjouterCategorieType = {
  showModal?: boolean;
  setShowModal?: Function;
  setUpdate?: Function;
  update?: boolean;
};

export default function AjouterCategorie({
  showModal = false,
  setShowModal,
  setUpdate,
  update = false,
}: AjouterCategorieType) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const shopDataString = localStorage.getItem("shop");
    const shopData = shopDataString ? JSON.parse(shopDataString) : [];
    const idShop: any = localStorage.getItem("idResto");
    let IdCard = 0;
    let IndexCard = 0;

    for (let i = 0; i < shopData.length; i++) {
      const shop = shopData[i];
      if (shop.resto.shopid == idShop) {
        IdCard = shop.id;
        IndexCard = i;
      }
    }

    let id = v4();
    let NewCategories = AjouterCategories(id, title, image, IndexCard);
    const productId = localStorage.getItem("productId");
    await fetch(`http://localhost:8000/backend/restaurant/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        card: {
          [id]: { ...NewCategories },
        },
      }),
    });

    // Update local storage
    const cat: string | null = localStorage.getItem("card");
    const card = JSON.parse(cat || "{}");
    card.categories = { ...card.categories, [id]: NewCategories };
    localStorage.setItem("card", JSON.stringify(card));

    setUpdate?.(!update);
    setShowModal?.(false);
  };

  const handleCloseModal = () => {
    setShowModal?.(false);
    setUpdate?.(!update); // Trigger update to refresh categories
  };

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <h5 className="text-xl font-bold text-gray-800">
                    Ajouter catégorie
                  </h5>
                </div>
                <Modal.Body>
                  <Form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <Form.Group className="-space-y-px rounded-md shadow-sm">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-lightgrey px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="-space-y-px rounded-md shadow-sm">
                      <Form.Label>Titre</Form.Label>
                      <Form.Control
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-lightgrey px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
                        type="text"
                        placeholder="Titre"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button type="submit">Ajouter</Button>
                  </Form>
                </Modal.Body>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
