"use client"
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

const Newsletter = () => {
    return (
        <div className='relative'>
            {/* <div className="mx-auto max-w-2xl bg-pink br-50 md:max-w-7xl mt-48 rounded-lg"> */}
                {/* <div className="grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-12 xl:gap-x-8"> */}

                    {/* COLUMN-1 */}
                    <div className="col-span-7">
                        <div className="m-10 lg:ml-32 lg:mt-20 lg:mb-20">
        
                            <div>
                                <Fade direction={'up'} delay={1200} cascade damping={1e-1} triggerOnce={true}>
                                    <div className="relative text-white focus-within:text-white flex flex-row-reverse shadow-fi rounded-full">
                                        <input type="Adress" name="q" className="py-6 sm:py-8 text-sm w-full text-black bg-gray-900 rounded-full pl-6 par-87 focus:outline-none focus:text-black" placeholder="Saisissez votre adresse, code postale ou ville" autoComplete="off" />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                                                <Image src={'/images/Newsletter/arrow.svg'} alt="inputicon" width={57} height={71} />
                                            </button>
                                        </div>
                                    </div>
                                </Fade>
                            </div>

                </div>
            </div>
        </div>
    )
}

export default Newsletter;