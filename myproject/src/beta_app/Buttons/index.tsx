import React from "react";
import "./ButtonStyle.css"; // 스타일 파일 import

interface Props {
  readonly content?: string;
  readonly color?: string;
  readonly onClick?: () => void;
  readonly size?: number;
  readonly isOpen?: boolean;
  readonly disabled?: boolean;
}



export const Button: React.FC<Props> = ({ content, color, onClick, disabled }) => {
  return (
    <button onClick={onClick} className={'custom-button ' + color}
    disabled={disabled}>
      {content}
    </button>
  );
};

export const BackButton: React.FC<Props> = ({onClick}) => {
  return (
    <button onClick={onClick} className="svg-inline-button">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22" fill="none">
        <path d="M11 21L1 11L11 1" stroke="#7A7D7F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    </button>
  );
};

export const CloseButton: React.FC<Props> = ({onClick}) => {
  return (
    <button onClick={onClick} className="svg-inline-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M1 21L21 1M1 1L21 21" stroke="#7A7D7F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  );
};

export const RightArrowButton: React.FC<Props> = ({onClick, size=12}) => {
  return (
    <button onClick={onClick} className="svg-inline-button" >
      <svg xmlns="http://www.w3.org/2000/svg" width={size * (7/12)} height={size} viewBox="0 0 7 12" fill="none">
        <path d="M1 1L6 6L1 11" stroke="#7A7D7F" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  );
};

export const DownArrowButton: React.FC<Props> = ({isOpen, onClick, size=12}) => {
  return (
    <button onClick={onClick} className="svg-inline-button" >
        <svg className={`arrow ${isOpen ? "open" : ""}`} xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12" fill="none">
            <path d="M21 1L11 11L1 1" stroke="#7A7D7F" stroke-width="1.5" stroke-linecap="round" />
        </svg>
    </button>
  );
};



export const ProtraitButton: React.FC<Props> = ({onClick}) => {
  return (
    <button onClick={onClick} className="svg-inline-button" >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12.0001 5.14286C11.1524 5.14286 10.3238 5.39421 9.61906 5.86513C8.91427 6.33605 8.36496 7.00539 8.04059 7.7885C7.71621 8.57161 7.63134 9.43332 7.79671 10.2647C7.96207 11.096 8.37025 11.8597 8.96961 12.459C9.56898 13.0584 10.3326 13.4666 11.164 13.6319C11.9953 13.7973 12.857 13.7124 13.6401 13.3881C14.4233 13.0637 15.0926 12.5144 15.5635 11.8096C16.0344 11.1048 16.2858 10.2762 16.2858 9.42857C16.2858 8.29193 15.8343 7.20184 15.0305 6.39811C14.2268 5.59439 13.1367 5.14286 12.0001 5.14286ZM12.0001 12C11.4915 12 10.9943 11.8492 10.5715 11.5666C10.1486 11.2841 9.81901 10.8825 9.62438 10.4126C9.42976 9.94275 9.37883 9.42572 9.47805 8.92691C9.57727 8.4281 9.82218 7.96992 10.1818 7.6103C10.5414 7.25067 10.9996 7.00577 11.4984 6.90655C11.9972 6.80733 12.5142 6.85825 12.9841 7.05288C13.454 7.24751 13.8556 7.57709 14.1381 7.99996C14.4207 8.42283 14.5715 8.91999 14.5715 9.42857C14.5707 10.1103 14.2996 10.7639 13.8175 11.246C13.3354 11.7281 12.6818 11.9992 12.0001 12Z" fill="#7A7D7F"/>
        <path d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21508 0.913451 7.4078C0.0051994 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.807 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0865C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6934 24 14.3734 24 12C23.9964 8.8185 22.731 5.76834 20.4813 3.51868C18.2317 1.26902 15.1815 0.00358448 12 0ZM6.85715 20.8941V19.7143C6.8579 19.0325 7.12905 18.3789 7.61113 17.8968C8.0932 17.4148 8.74682 17.1436 9.42858 17.1429H14.5714C15.2532 17.1436 15.9068 17.4148 16.3889 17.8968C16.871 18.3789 17.1421 19.0325 17.1429 19.7143V20.8941C15.5821 21.8055 13.8073 22.2857 12 22.2857C10.1927 22.2857 8.41786 21.8055 6.85715 20.8941ZM18.8507 19.6507C18.8337 18.5263 18.3756 17.4537 17.5751 16.6639C16.7746 15.8741 15.6959 15.4305 14.5714 15.4286H9.42858C8.30409 15.4305 7.22537 15.8741 6.42491 16.6639C5.62445 17.4537 5.16633 18.5263 5.14929 19.6507C3.59492 18.2628 2.49877 16.4354 2.00601 14.4107C1.51324 12.3859 1.64709 10.2593 2.38984 8.31228C3.13259 6.36529 4.44919 4.68983 6.16532 3.50774C7.88145 2.32566 9.91615 1.69271 12 1.69271C14.0839 1.69271 16.1186 2.32566 17.8347 3.50774C19.5508 4.68983 20.8674 6.36529 21.6102 8.31228C22.3529 10.2593 22.4868 12.3859 21.994 14.4107C21.5012 16.4354 20.4051 18.2628 18.8507 19.6507Z" fill="#7A7D7F"/>
    </svg>
    </button>
  );
};

export const BellButton: React.FC<Props> = ({onClick}) => {
  return (
    <button onClick={onClick} className="svg-inline-button" >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18 16V10.5C18 7.43 16.87 4.86 14 4.18V2H10V4.18C7.14 4.86 6 7.42 6 10.5V16L4 17V19H20V17L18 16ZM12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22C12.7333 22 12.7333 22 12 22ZM8 17H16V10.5C16 8.02 15 5.75 12 5.75C9 5.75 8 8.02 8 10.5V17Z" fill="#7A7D7F"/>
      </svg>
    </button>
  );
};

export const UploadButton: React.FC<Props>  = ({onClick}) => {
  return (
    <button onClick={onClick} style={{transition: 'transform 0.1s ease, box-shadow 0.1s ease', borderRadius:'8px', width:"80px", height: "80px", flexShrink: 0, aspectRatio:'1/1', backgroundColor:'#F5F5F5'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
            <rect width="80" height="80" rx="8" fill="white"/>
            <path d="M33.2307 44.3076V45.2307C33.2307 46.7602 34.4705 47.9999 35.9999 47.9999H45.2307C46.7602 47.9999 47.9999 46.7602 47.9999 45.2307V44.3076M44.3076 36.923L40.6153 33.2307M40.6153 33.2307L36.923 36.923M40.6153 33.2307V44.3076" stroke="#7A7D7F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
  );
};