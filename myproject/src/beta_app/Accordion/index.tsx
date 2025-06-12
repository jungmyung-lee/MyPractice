import React, { useState } from "react";
import "./style.css"

interface Props {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}

export const Accordion: React.FC<Props> = ({title, children, isOpen, onClick}) => {
    

    return (
        <div className="accordion">
            <button className={`accordion-header ${isOpen ? "open" : ""}`}
            onClick={onClick} >
                {title}
                <span className={`arrow ${isOpen ? "open" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12" fill="none">
                        <path d="M21 1L11 11L1 1" stroke="#7A7D7F" stroke-width="1.5" stroke-linecap="round" />
                    </svg>    
                </span>
            </button>
            <div className={`accordion-content ${isOpen ? "show" : ""}`}>
                {children}
            </div>
        </div>
    )
}