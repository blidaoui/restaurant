// import React, { Fragment } from "react";
// import { Button, Modal, Form } from "react-bootstrap";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { IoMdAdd } from "react-icons/io";
// import { Dialog, Transition } from "@headlessui/react";

// interface AjouterRestaurantProps {
//   showModal: boolean;
//   setShowModal: (show: boolean) => void;
//   setUpdate: (update: boolean) => void;
//   update: boolean;
// }

// const restaurantSchema = Yup.object().shape({
//   image: Yup.string().required("Image is required"),
//   town: Yup.string().required("Town is required"),
//   company: Yup.string().required("Company name is required"),
//   country: Yup.string().required("Country is required"),
//   address: Yup.string().required("Address is required"),
//   latitude: Yup.number().required("Latitude is required"),
//   longitude: Yup.number().required("Longitude is required"),
//   openingTime: Yup.string().required("Opening time is required"),
//   closingTime: Yup.string().required("Closing time is required"),
//   postalCode: Yup.string().required("Postal code is required"),
//   nature: Yup.string().required("Nature is required"),
// });

// const AjouterRestaurant: React.FC<AjouterRestaurantProps> = ({
//   showModal,
//   setShowModal,
//   setUpdate,
//   update,
// }) => {
//   const formik = useFormik({
//     initialValues: {
//       image: "",
//       town: "",
//       company: "",
//       country: "",
//       address: "",
//       latitude: "",
//       longitude: "",
//       openingTime: "",
//       closingTime: "",
//       postalCode: "",
//       nature: "",
//     },
//     validationSchema: restaurantSchema,
//     onSubmit: async (values) => {
//       setShowModal(false);

//       let shopId: any = localStorage.getItem("shopLength");

//       await fetch("http://localhost:8000/backend/restaurant/addresto", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           resto: {
//             ...values,
//             shopid: Number(shopId),
//             Responsible: "",
//           },
//           card: {
//             etat: "En attente",
//             color: "#FFFFF",
//             items: {},
//             workflow: {},
//             categories: {},
//             supplements: {
//               "08406871-3262-4dfe-9fee-1309a499fc01": {
//                 title: "AIL",
//                 quantity: 10,
//                 price: 3.0,
//               },
//               "08406871-3262-4dfe-9fee-1309a499fc02": {
//                 title: "ANCHOIS",
//                 quantity: 10,
//                 price: 1.0,
//               },
//               "08406871-3262-4dfe-9fee-1309a499fc03": {
//                 title: "ARTICHAUTS",
//                 quantity: 10,
//                 price: 1.0,
//               },
//             },
//           },
//         }),
//       });
//       setUpdate(!update);
//       shopId = Number(shopId) + 1;
//       localStorage.setItem("shopLength", shopId);
//     },
//   });

//   const handleClose = () => {
//     setShowModal(false);

// };
//   return (
//     <Transition appear show={true} as={Fragment}>
//        <Dialog as="div" className="relative z-10" onClose={handleClose}>
//        <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//         >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//         </Transition.Child>
//         <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//                 <Transition.Child
//                     as={Fragment}
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0 scale-95"
//                     enterTo="opacity-100 scale-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100 scale-100"
//                     leaveTo="opacity-0 scale-95"
//                 >
//                     <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">

//       <Modal.Header closeButton>
//         <Modal.Title className="text-center">Ajouter restaurant</Modal.Title>
//       </Modal.Header>
//       <Modal.Body style={{ maxHeight: "80vh", overflowY: "auto" }}>
//         <Form onSubmit={formik.handleSubmit}>
//           {Object.keys(formik.values).map((key)=> (
//             <Form.Group className="mb-3" controlId={key} key={key}>
//               <Form.Label>
//                 {key.charAt(0).toUpperCase() + key.slice(1)}
//               </Form.Label>
//               <Form.Control
//                 type={key.includes("Time") ? "time" : "text"}
//                 placeholder={`Enter ${key}`}
//                 onChange={formik.handleChange}
//                 value={formik.values[key as keyof typeof formik.values]}
//                 isInvalid={!!formik.errors[key as keyof typeof formik.values]}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {formik.errors[key as keyof typeof formik.values]}
//               </Form.Control.Feedback>
//             </Form.Group>
//           ))}
//           <Button variant="primary" type="submit">
//             <IoMdAdd />
//           </Button>
//         </Form>
//       </Modal.Body>
//       </Dialog.Panel>
//       </Transition.Child>

//       </div>
//         </div>
//     </Dialog>
// </Transition>
//   );
// };

// export default AjouterRestaurant;

import React, { Fragment, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoMdAdd } from "react-icons/io";
import { Dialog, Transition } from "@headlessui/react";

interface RestaurantFormValues {
  image: string;
  town: string;
  company: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
  openingTime: string;
  closingTime: string;
  postalCode: string;
  nature: string;
}

interface AjouterRestaurantProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setUpdate: (update: boolean) => void;
  update: boolean;
}
const restaurantSchema = Yup.object().shape({
  image: Yup.string().required("Image is required"),
  town: Yup.string().required("Town is required"),
  company: Yup.string().required("Company name is required"),
  country: Yup.string().required("Country is required"),
  address: Yup.string().required("Address is required"),
  latitude: Yup.number().required("Latitude is required"),
  longitude: Yup.number().required("Longitude is required"),
  openingTime: Yup.string().required("Opening time is required"),
  closingTime: Yup.string()
    .required("Closing time is required")
    .test(
      'is-greater',
      'Closing time must be later than opening time',
      function(value) {
        const { openingTime } = this.parent;
        return value > openingTime;
      }
    ),
  postalCode: Yup.string().required("Postal code is required"),
  nature: Yup.string().required("Nature is required"),
});
const AjouterRestaurant: React.FC<AjouterRestaurantProps> = ({
  showModal,
  setShowModal,
  setUpdate,
  update,
}) => {
  const handleClose = () => setShowModal(false);

  const formik = useFormik<RestaurantFormValues>({
    initialValues: {
      image: "",
      town: "",
      company: "",
      country: "",
      address: "",
      latitude: 0,
      longitude: 0,
      openingTime: "",
      closingTime: "",
      postalCode: "",
      nature: "",
    },
    validationSchema: restaurantSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "http://localhost:8000/backend/restaurant/addresto",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              resto: {
                ...values,
                shopId: parseInt(localStorage.getItem("shopLength") || "0"),
                Responsible: "",
              },
              card: {
                items: {},
                workflow: {},
                categories: {},
                supplements: {
                  "08406871-3262-4dfe-9fee-1309a499fc01": {
                    title: "AIL",
                    quantity: 10,
                    price: 3.0,
                  },
                  "08406871-3262-4dfe-9fee-1309a499fc02": {
                    title: "ANCHOIS",
                    quantity: 10,
                    price: 1.0,
                  },
                  "08406871-3262-4dfe-9fee-1309a499fc03": {
                    title: "ARTICHAUTS",
                    quantity: 10,
                    price: 1.0,
                  },
                },
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add restaurant");
        }

        setUpdate(!update);
        localStorage.setItem(
          "shopLength",
          (parseInt(localStorage.getItem("shopLength") || "0") + 1).toString()
        );
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setShowModal(false);
      }
    },
  });
  const buttonStyle: React.CSSProperties = {
    background: 'black',
    color: 'white',
    width:"50%",
    height:"40px",
    fontWeight: 'bold',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    border: 'white',
    transition: 'background 0.3s ease'
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.currentTarget.style.background = '#FF69B4';
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.currentTarget.style.background = 'pink';
  };

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                    Ajouter Restaurant
                  </h5>
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={handleClose}
                  >
                    ✕
                  </button>
                </div>
                <Modal.Body style={{ maxHeight: "80vh", overflowY: "auto" }}>
                  <Form
                    onSubmit={formik.handleSubmit}
                    className="mt-8 space-y-6"
                  >
                    {Object.keys(formik.values).map((key) => (
                      <Form.Group
                        className="-space-y-px rounded-md shadow-sm"
                        controlId={key}
                        key={key}
                      >
                        <Form.Label>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Form.Label>
                        <Form.Control
                          type={key.includes("Time") ? "time" : "text"}
                          placeholder={`Enter ${key}`}
                          onChange={formik.handleChange}
                          value={
                            formik.values[key as keyof typeof formik.values]
                          }
                          isInvalid={
                            !!formik.errors[key as keyof typeof formik.values]
                          }
                          className="relative block w-full appearance-none rounded-none rounded-b-md border border-lightgrey px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors[key as keyof typeof formik.values]}
                        </Form.Control.Feedback>
                      </Form.Group>
                    ))}
                    <Button
                      variant="primary"
                      type="submit"
                      style={buttonStyle}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave }
                    >
                      Ajouter restaurant
                    </Button>
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

export default AjouterRestaurant;
