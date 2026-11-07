"use client"
import Slider from "react-slick";
import React, { Component } from "react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

// CAROUSEL DATA

interface DataType {
    profession: string;
    name: string;
    imgSrc: string;
}

const postData: DataType[] = [
    {
        profession: 'Senior Chef',
        name: 'Shoo Thar Mien',
        imgSrc: '/images/Expert/boyone.svg',
    },
    {
        profession: 'Junior Chef',
        name: 'Shoo Thar Mien',
        imgSrc: '/images/Expert/girl.png',
    },
    {
        profession: 'Junior Chef',
        name: 'Shoo Thar Mien',
        imgSrc: '/images/Expert/boytwo.svg',
    },
    {
        profession: 'Junior Chef',
        name: 'Shoo Thar Mien',
        imgSrc: '/images/Expert/girl.png',
    },
    {
        profession: 'Junior Chef',
        name: 'Shoo Thar Mien',
        imgSrc: '/images/Expert/girl.png',
    },
    {
        profession: 'Junior Chef',
        name: 'Shoo Thar Mien',
        imgSrc: '/images/Expert/girl.png',
    },
]

// CAROUSEL SETTINGS


export default class MultipleItems extends Component {

    render() {
       


        return (
            <div className="py-10 sm:py-20 bg-darkpink">

                <div className='mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8'>
                    <div className="text-center">
                        <Fade direction={'up'} delay={400} cascade damping={1e-1} triggerOnce={true}>
                            <h2 className='text-pink text-lg font-normal mb-3 tracking-widest uppercase ls-51'>Nos Offres</h2>
                        </Fade>
                        <Fade direction={'up'} delay={800} cascade damping={1e-1} triggerOnce={true}>
                            <h3 className="text-3xl lg:text-5xl font-semibold text-black">
                            1 pizza achetée 1 pizza offerte 
                            </h3>
                        </Fade>
                    </div>


                </div>
            </div>

        );
    }
}
