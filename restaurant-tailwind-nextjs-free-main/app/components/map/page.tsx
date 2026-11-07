"use client";
import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
const LoadScriptComponent = LoadScript as any;
const GoogleMapComponent = GoogleMap as any;
const MarkerFComponent = MarkerF as any;
const InfoWindowFComponent = InfoWindowF as any;

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setId } from "../store/store";
import Container from "../Container";
import useLocation from "../hooks/useLocation";

type CustomSize = {
  width: number;
  height: number;
  equals: (other: CustomSize) => boolean;
};

const Map = () => {
  const [resto, setResto] = useState([]);
  const [shopList, setShopList] = useState<any>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>();
  const router = useRouter();
  const { userLocation } = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const shop1: any = localStorage.getItem("shop");
    const shop: any = JSON.parse(shop1);
    setResto(shop || []);
  }, []);

  const ContainerStyle = {
    width: "100%",
    height: "70vh",
  };
  const cordinate = { lat: 44.62072, lng: 4.39088 };

  const pixelOffset: CustomSize = {
    width: 0,
    height: 0,
    equals: function (other: CustomSize): boolean {
      return this.width === other.width && this.height === other.height;
    },
  };

  const getShopList = async () => {
    let admin: any = localStorage.getItem("admin");
    admin = JSON.parse(admin || false);
    setIsAdmin(admin);
    try {
      const response = await fetch(`http://localhost:8080/backend/restaurant`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setShopList(jsonData);
      localStorage.setItem("shop", JSON.stringify(jsonData));
      localStorage.setItem("shopLength", jsonData.length);
    } catch (e) {
      console.error("Login error", e);
    }
  };

  const navigateToOtherPage = (id: number) => {
    setId(id);
    const shopData = shopList.find((item:any) => item.resto.shopid === id);
    if (shopData) {
      const jsonData = {
        workflow: shopData?.card?.workflow,
        categories: shopData?.card?.categories,
        items: shopData?.card?.items,
        supplements: shopData?.card?.supplements,
        id: shopData?.id,
      };
      localStorage.setItem("card", JSON.stringify(jsonData));
    }
    router.push("/components/categories")
  };

  useEffect(() => {
    getShopList();
  }, []);

  // Use a useEffect to set googleMapsLoaded when the Google Maps API is loaded
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      setGoogleMapsLoaded(true);
    }
  }, []);
  console.log(resto);

  return (
   
      <div className="mx-auto max-w-7xl py-40 px-6">
      <div className="text-center mb-14">

      <div className="m-2"  id="map-section">
        <LoadScriptComponent
          googleMapsApiKey="AIzaSyDEhl-uIJjF6FAC22WsVvQc_vor_HLPzhk"
          onLoad={() => setGoogleMapsLoaded(true)}
        >
          {googleMapsLoaded && (
            <GoogleMapComponent
              mapContainerStyle={ContainerStyle}
              center={cordinate}
              zoom={4}
            >
              <MarkerFComponent
                key="myLocation"
                position={userLocation}
              />

              {resto.length > 0 &&
                resto.map((shop: any) => (
                  <MarkerFComponent
                    key={shop.id}
                    onClick={() => {
                      if (shop === selectedPlace) {
                        setSelectedPlace(undefined);
                        localStorage.clear();
                      } else {
                        setSelectedPlace(shop);
                      }
                    }}
                    position={{
                      lat: Number(shop.resto.latitude),
                      lng: Number(shop.resto.longitude),
                    }}
                  />
                ))}

              {selectedPlace &&
                selectedPlace.resto.latitude &&
                selectedPlace.resto.longitude && (
                  <InfoWindowFComponent
                    position={{
                      lat: Number(selectedPlace.resto.latitude),
                      lng: Number(selectedPlace.resto.longitude),
                    }}
                    zIndex={1}
                    options={{
                      pixelOffset: pixelOffset,
                    }}
                    onCloseClick={() => setSelectedPlace(undefined)}
                  >
                    <div>
                      <div className="aspect-square overflow-hidden relative w-full rounded-md h-[200px]">
                        <img
                          src={selectedPlace.resto.image}
                          alt=""
                          style={{ width: "100%", height: "auto" }}
                          onClick={() => {
                            navigateToOtherPage(selectedPlace.id);
                            console.log("cc" , selectedPlace.id);
                            
                            localStorage.setItem("idOfShop", selectedPlace.id.toString());
                            }
                            }
                        />
                      </div>

                      <h3>{selectedPlace.resto.company}</h3>
                      <div className="text-[15px] flex gap-1">
                        <div>{selectedPlace.resto.address},</div>
                        <div>{selectedPlace.resto.postalCode}</div>
                        <div>{selectedPlace.resto.town}</div>
                      </div>
                    </div>
                  </InfoWindowFComponent>
                )}
            </GoogleMapComponent>
          )}
        </LoadScriptComponent>
      </div>
      </div>
      </div>
  
  );
};

export default Map;