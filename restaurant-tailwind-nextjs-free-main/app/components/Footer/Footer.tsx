import Link from "next/link";
import Image from "next/image";


interface ProductType {
    id: number;
    section: string;
    link: string[];
}

interface socialLinks {
    imgSrc: string;
    link: string;
    width: number;
}

const socialLinks: socialLinks[] = [
    {
        imgSrc: '/images/Footer/facebook.svg',
        link: 'https://www.facebook.com/PizzaTimeFrance',
        width: 10
    },
    {
        imgSrc: '/images/Footer/insta.svg',
        link: 'https://www.instagram.com/pizzatimefrance/?hl=tr',
        width: 14
    },
  

]

const products: ProductType[] = [

    {
        id: 2,
        section: "Contact",
        link: ["E-mail: contact@storydeveloppement.com",
         'Téléphone: +33 01 30 27 97 50 ']
    }
    ,
    {
        id: 3,
        section: "Adresse",
        link: [' 294 Avenue du Bois de la Pie, 95700 Roissy-en-France']
    }
]

const footer = () => {
    return (

        <div className="mx-auto max-w-2xl pt-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="my-12 grid grid-cols-1 gap-y-10 sm:grid-cols-6 lg:grid-cols-12">

                {/* COLUMN-1 */}

                <div className='sm:col-span-6 lg:col-span-5'>
                    <div className="flex flex-shrink-0 items-center border-right">
                        <Image src="/images/Logo/Logo.jpg" alt="logo" width={100} height={100} />
                        <Link href="/" className='text-2xl font-semibold text-black ml-4'>
                           Pizza Time
                        </Link>
                    </div>
                    <br/>
                    <div className='flex gap-5'>

                        {socialLinks.map((items, i) => (
                        <Link href={items.link} key={i}>
                            <div className="bg-white h-10 w-10 shadow-xl text-base rounded-full flex items-center justify-center footer-icons hover:bg-pink">
                                <Image src={items.imgSrc} alt={items.imgSrc} width={items.width} height={2} className="sepiaa" />
                            </div>
                        </Link>
                        ))}

                    </div>
                </div>

                {/* CLOUMN-2/3/4 */}


                {products.map((product) => (
                    <div key={product.id} className="sm:col-span-3">
                        <p className="text-black text-xl font-semibold mb-9">{product.section}</p>
                        <ul>
                            {product.link.map((link: string, index: number) => (
                                <li key={index} className='mb-5'>
                                    <Link href="/" className="text-footerlinks text-base font-normal mb-6 space-links">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>

       

             <div className='py-10 md:flex items-center justify-between border-t border-t-bordertop'>
                <h4 className='text-darkgrey text-sm text-center md:text-start font-normal'>Copyright; 2023 Pizzatime. All rights reserved.</h4>
                   
                </div>
            </div>
    )
}

export default footer;
