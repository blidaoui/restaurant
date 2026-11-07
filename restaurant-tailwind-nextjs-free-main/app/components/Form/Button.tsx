'use client'

import { IconType } from "react-icons";

interface ButtonProps{
    label:string,
    disabled?:boolean,
    outline?:boolean,
    small?:boolean,
    ModalInfo?:boolean,
    custom?:string,
    type?:string,
    href?:string,
    Icon?:IconType,
    onClick?:(e:React.MouseEvent<HTMLButtonElement>) =>void
    
}
const Button :React.FC<ButtonProps> = ( 
    {label,
    disabled,
    outline,
    href,
    small,
    ModalInfo,
    custom,

    onClick}) => {

    return ( <button
        onClick={onClick}
        disabled={disabled} 
        type="button"
        className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
        {label}
    </button> );
}

export default Button;