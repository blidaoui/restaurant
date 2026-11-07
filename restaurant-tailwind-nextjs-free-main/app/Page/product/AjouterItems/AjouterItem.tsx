"use client";

import React, { SyntheticEvent, Fragment, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Dialog, Transition } from "@headlessui/react";

type AjouterItemProps = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setUpdate: (update: boolean) => void;
  update: boolean;
};

type Composition = {
  id: string;
  title: string;
};

const AjouterItem: React.FC<AjouterItemProps> = ({
  showModal,
  setShowModal,
  setUpdate,
  update,
}) => {
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [compositions, setCompositions] = useState<Composition[]>([]);

  const handleAddComposition = () => {
    const newComposition = {
      id: uuidv4(),
      title: "",
    };
    setCompositions([...compositions, newComposition]);
  };

  const handleCompositionChange = (id: string, newTitle: string) => {
    setCompositions(
      compositions.map((comp) =>
        comp.id === id ? { ...comp, title: newTitle } : comp
      )
    );
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const id = uuidv4();
    const categorieID = localStorage.getItem("categorieID");
    const productId = localStorage.getItem("productId");

    if (!categorieID || !productId) {
      alert("Category or Product ID is missing");
      return;
    }

    const newItem = {
      id: [id],
      color: "#FFFFFF",
      price: {
        priceHT: price,
      },
      title: title,
      imageUrl: {
        Default: {
          urlDefault: image,
        },
      },
      basicComposition: compositions.map((comp) => ({
        id: [comp.id],
        title: comp.title,
      })),
    };

    try {
      const response = await fetch(
        `http://localhost:8000/backend/restaurant/addItem/${productId}/${categorieID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ card: { [id]: newItem } }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      setUpdate(!update);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUpdate(!update); // Trigger update to refresh categories
  };
  const buttonStyle: React.CSSProperties = {
    background: "black",
    color: "white",
    width: "60%",
    height: "40px",
    fontWeight: "bold",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    border: "white",
    transition: "background 0.3s ease",
  };

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.currentTarget.style.background = "#FF69B4";
  };

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.currentTarget.style.background = "pink";
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
                    Ajouter Plat
                  </h5>
                </div>
                <Modal.Body style={{ maxHeight: "80vh", overflowY: "auto" }}>
                  <Form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                    <Form.Group className="-space-y-px rounded-md shadow-sm">
                      <Form.Label>Prix</Form.Label>
                      <Form.Control
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-lightgrey px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
                        type="text"
                        placeholder="Prix"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </Form.Group>
                    {compositions.map((composition, index) => (
                      <Form.Group
                      className="-space-y-px rounded-md shadow-sm"
                      key={composition.id}
                      >
                        <Form.Label>Composition de base {index + 1}</Form.Label>
                        <Form.Control
                          className="relative block w-full appearance-none rounded-none rounded-b-md border border-lightgrey px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
                          type="text"
                          placeholder="Titre"
                          value={composition.title}
                          onChange={(e) =>
                            handleCompositionChange(
                              composition.id,
                              e.target.value
                            )
                          }
                          required
                        />
                      </Form.Group>
                    ))}
                  <div> <Button
                      variant="secondary"
                      onClick={handleAddComposition}
                      style={buttonStyle}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      Ajouter composition de base
                    </Button></div> 
                    {""}
                    <div>   <Button
                      variant="primary"
                      type="submit"
                      style={buttonStyle}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      Ajouter
                    </Button>
                    </div> 
                  </Form>
                </Modal.Body>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AjouterItem;
