"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Fade } from "react-awesome-reveal";
import { setId } from "../store/store";
import { useRouter } from "next/navigation";

// Interface for a single shop item
interface ShopItem {
  resto: {
    shopid: number;
    image: string;
    company: string;
    address: string;
    postalCode: string;
    town: string;
    latitude: number;
    longitude: number;
  };
  id: number;
  card?: {
    workflow: string;
    categories: string[];
    items: string[];
    supplements: string[];
  };
}

const Work = () => {
  const [shopList, setShopList] = useState<ShopItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const getShopList = async () => {
    const adminStatus = JSON.parse(localStorage.getItem("admin") || "false");
    setIsAdmin(adminStatus);
    try {
      const response = await fetch(`http://localhost:8000/backend/restaurant`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setShopList(jsonData);
      localStorage.setItem("shop", JSON.stringify(jsonData));
      localStorage.setItem("shopLength", String(jsonData.length));
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  const navigateToOtherPage = (id: number) => {
    setId(id);
    const shopData = shopList.find((item) => item.resto.shopid === id);
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
  };

  useEffect(() => {
    getShopList();
  }, []);

  return (
    <div className="mx-auto max-w-7xl py-40 px-6" id="Restaurant-section">
      <div className="text-center mb-14">
        <Fade direction="up" delay={800} cascade damping={0.1} triggerOnce>
          <p className="text-3xl lg:text-5xl font-semibold text-pink">
            Nos Restaurants
          </p>
        </Fade>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5 mt-32">
        <Fade direction="up" delay={1000} cascade damping={0.1} triggerOnce>
          {shopList.map((item, id) => (
            <div
              className="card-b p-8 relative rounded-3xl"
              key={id}
              onClick={() => {
                localStorage.setItem("resto", JSON.stringify(item?.resto));
                localStorage.setItem(
                  "idResto",
                  JSON.stringify(item?.resto.shopid)
                );
                localStorage.setItem(
                  "latitude",
                  JSON.stringify(item?.resto.latitude)
                );
                localStorage.setItem(
                  "longitude",
                  JSON.stringify(item?.resto.longitude)
                );
              }}
            >
              <img
                className=" rounded-3xl"
                src={item.resto.image}
                width={510}
                height={10}
                alt={`Image of ${item.resto.company}`}
              />
              <h3 className="text-2xl text-black font-semibold text-center mt-4">
                {item.resto.company}
              </h3>
              <p className="text-lg font-normal text-black text-center text-opacity-50 mt-2">
                {item.resto.address}, {item.resto.postalCode} {item.resto.town}
              </p>
              <div className="flex items-center justify-center">
                <Link
                  href={`/components/categories`}
                  className="flex text-center text-lg font-medium text-pink mt-2 hover:underline"
                  onClick={() => {
                    navigateToOtherPage(item?.resto.shopid);
                    localStorage.setItem("idOfShop", item.id.toString());
                  }}
                >
                  Consulter menu<ChevronRightIcon width={20} height={20} />
                </Link>
              </div>
            </div>
          ))}
        </Fade>
      </div>
    </div>
  );
};

export default Work;
