import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
const DropInComponent = DropIn as any;
import { Button } from "react-bootstrap";

const Subscriptions = () => {
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  let instance: any;
  const buy = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const res = await fetch("http://localhost:8000/backend/user/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentMethodNonce: nonce, user_id: '1234' }),
      });
      const result = await res.json();
      if (result.result.result === "success") {
      
          setPurchaseComplete(true);
          localStorage.setItem("completed","true")
     
      } else {
        localStorage.setItem("completed","false")

      }
    } catch (error) {
      console.error("Error during checkout:", error);
      localStorage.setItem("completed","false")

    }
  };

  React.useEffect(()=>{
    localStorage.setItem("completed",`${purchaseComplete}`)
  },[purchaseComplete])

  return (
    <div>
      {purchaseComplete ? (
        <div>
          <h1>Completed.</h1>
        </div>
      ) : (
        <div>
          <DropInComponent
            options={{ authorization: "sandbox_jydk65fg_29b46ndbxsvgxwmg" }}
            onInstance={(inst: any) => (instance = inst)}
          />
          <Button type="submit" onClick={buy} >confirme</Button>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
