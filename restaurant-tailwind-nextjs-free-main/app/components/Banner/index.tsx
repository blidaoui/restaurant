"use client";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import Link from "next/link";

const Banner = () => {
  return (
    <div id="home-section" className="bg-lightpink">
      <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 space-x-1">
          <div className="col-span-6 flex flex-col justify-center">
            <Fade
              direction={"up"}
              delay={400}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <h1 className="text-7xl lg:text-6xl font-semibold mb-5 text-lightgrey md:4px lg:text-start text-center">
                Profitez de repas savoureux <br /> et d'une livraision à
                domicile rapide !
              </h1>
            </Fade>
            <Fade
              direction={"up"}
              delay={800}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <p className="text-grey lg:text-lg font-normal mb-10 lg:text-start text-center">
                Découvrez le menu de Pizza time et commandez vos plats préféres.{" "}
              </p>
            </Fade>
            <Fade
              direction={"up"}
              delay={1000}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <div className="md:flex align-middle justify-center lg:justify-start">
                <button
                  type="button"
                  className="flex justify-end text-xl font-medium bg-bgpink text-pink py-4 px-4 lg:px-8 navbutton rounded-full hover:text-white hover:bg-pink"
                >
                  <Link href="#map-section">
                  Retrouvez-nous sur la carte
                  </Link>
                </button>
              </div>
            </Fade>
          </div>

          <div className="col-span-6 flex justify-center relative rounded-xl">
            <Fade
              direction={"up"}
              delay={1200}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <Image
                className=" rounded-3xl"
                src="/images/Banner/pizza.jpg"
                alt="nothing"
                width={1000}
                height={805}
              />
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
