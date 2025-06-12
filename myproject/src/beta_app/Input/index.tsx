import React, { useState } from "react";
import "./inputStyle.css"
import { setNonce } from "ionicons/dist/types/stencil-public-runtime";

interface TextProps {
    readonly value?: string | number;
    readonly placeHolder?: string;
    readonly size?: string;
    readonly onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?:string;
}

interface CheckProps {
    readonly checked?: boolean;
    readonly placeHolder?: string;
    readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput:React.FC<TextProps> = ({value, placeHolder, size, onChange, type="text"}) => {
    return (
        <input
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeHolder}
            className= {size}
        />
    )
}

export const TextArea: React.FC<TextProps> = ({value, placeHolder, size, onChange}) => {
    return (
        <textarea className="custom-textarea"
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
            style={{width: '100%', height: size, border: 'none', resize: 'none'}}
        />
    )
}

export const CheckBox:React.FC<CheckProps> = ({checked, placeHolder, onChange}) => {
    return (
        <div style={{paddingTop: '2px', paddingBottom: '2px', display: 'flex', flexDirection:'row', gap: '7px',  fontFamily: "Noto Sans KR", fontSize: '16px', fontStyle: 'normal', fontWeight: '500', lineHeight: 'normal'}}>
            <input checked={checked} onChange={onChange} type="checkbox" style={{zoom: 1.2}}/>
            {placeHolder}
        </div>
    )
}   

export const CustomCheckBox:React.FC<CheckProps> = ({checked, onChange}) => {
    return (
        <label className="checkbox-wrapper">
            <input
            type="checkbox"
            className="checkbox-input"
            checked={checked}
            onChange={onChange}
            />

            <svg
                className={`checkbox-icon ${checked ? "checked" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
            >
                <path
                d="M1 11L9 19L21 1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
        </label>
    )
}