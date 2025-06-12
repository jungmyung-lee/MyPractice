import React, { useState } from 'react';
import "./style.css"

interface Props {
  readonly value: string;
  readonly onLocationClick: () => void;
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void ;
  readonly handleSubmit: ()=> void;
}

export const LocationInput:React.FC<Props> = ({value, onLocationClick,  onChange, handleSubmit}) => {

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      handleSubmit();
    }
  }

  return (
    <div className='location-div'>
      <button style={{paddingLeft: '5px'}}
        onClick={onLocationClick}
        className="location-button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8.46517 17.9395C6.84408 17.6286 5.39551 16.8343 4.27246 15.7129C3.14941 14.5898 2.35677 13.1413 2.0459 11.5186H3.05664C3.35286 12.8662 4.03158 14.0706 4.97396 15.013C5.91471 15.9538 7.11914 16.6325 8.4668 16.9303V17.9395H8.46517ZM15.6755 10.4948C15.402 10.4948 15.1807 10.2734 15.1807 10C15.1807 9.72656 15.402 9.50521 15.6755 9.50521H19.5036C19.777 9.50521 19.9984 9.72656 19.9984 10C19.9984 10.2734 19.777 10.4948 19.5036 10.4948H15.6755ZM10.4948 4.32454C10.4948 4.59798 10.2734 4.81934 10 4.81934C9.72656 4.81934 9.50521 4.59798 9.50521 4.32454V0.494792C9.50521 0.221354 9.72656 0 10 0C10.2734 0 10.4948 0.221354 10.4948 0.494792V4.32454ZM10.4948 19.5052C10.4948 19.7786 10.2734 20 10 20C9.72656 20 9.50521 19.7786 9.50521 19.5052V15.6755C9.50521 15.0244 10.4948 15.0244 10.4948 15.6755V19.5052ZM0.494792 10.4948C0.221354 10.4948 0 10.2734 0 10C0 9.72656 0.221354 9.50521 0.494792 9.50521H4.32292C4.59635 9.50521 4.81771 9.72656 4.81771 10C4.81771 10.2734 4.59635 10.4948 4.32292 10.4948H0.494792ZM9.99837 7.63997C11.3021 7.63997 12.3584 8.69629 12.3584 10C12.3584 11.3037 11.3021 12.36 9.99837 12.36C8.69466 12.36 7.63835 11.3037 7.63835 10C7.63997 8.69629 8.69629 7.63997 9.99837 7.63997ZM2.04427 8.45052C2.35514 6.82943 3.14941 5.38086 4.27083 4.25781C5.39388 3.13477 6.84245 2.34049 8.46517 2.02962V3.04199C7.11751 3.33822 5.91309 4.01693 4.9707 4.95931C4.02995 5.90007 3.34961 7.10286 3.05501 8.45052H2.04427ZM11.5332 2.02799C13.1559 2.33887 14.6045 3.13314 15.7275 4.25619C16.8506 5.3776 17.6449 6.82943 17.9541 8.45052H16.9434C16.6471 7.10286 15.9684 5.89681 15.026 4.95606C14.0853 4.01367 12.8809 3.33496 11.5332 3.03874V2.02799ZM17.9557 11.5186C17.6449 13.1396 16.8506 14.5898 15.7275 15.7129C14.6045 16.8359 13.1559 17.6302 11.5332 17.9411V16.9303C14.2269 16.3379 16.3542 14.2139 16.945 11.5186H17.9557Z" fill="#454A4D"/>
        </svg>
        <span>현위치</span>
      </button>
      <svg xmlns="http://www.w3.org/2000/svg" width="2" height="36" viewBox="0 0 2 36" fill="none">
        <path d="M1 0L1 36" stroke="#7A7D7F"/>
      </svg>

      <input
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="대구광역시 동구 아양로"
        value={value}
        onChange={onChange}
        className="location-input"
      />
      
      <button onClick= {handleSubmit} style={{justifyContent: 'center', width: '60px', color: 'white', backgroundColor: '#FF6F1E' }}className='location-div' >
        검색
      </button>

      
    </div>
  );
};

