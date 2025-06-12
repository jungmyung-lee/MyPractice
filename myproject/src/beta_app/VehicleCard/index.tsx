import { useIonRouter } from "@ionic/react";
import { RightArrowButton } from "../Buttons";
import { CustomCheckBox } from "../Input";
import "./style.css"
interface Props {
    readonly licensePlate: string;
    readonly name: string;
    readonly imgSrc: string;
    readonly type: string;
    readonly checked?: boolean;
    readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly onClick?: () => void;
    readonly rightIcon?: React.ReactNode; // 🔥 이 줄을 추가하세요
}

interface DetailProps {
    readonly start?: string;
    readonly end?: string;
    readonly imgSrc: string;
    readonly plateNumber: string;
    readonly modelName: string;
    readonly repairMethod: string;
    readonly location: string;
    readonly requestType: string;
    readonly errorType: string;
    readonly quoteCount?: number;
}

export const VehicleCard:React.FC<Props> = ({licensePlate, name, imgSrc, type='', onChange, checked=false, onClick, rightIcon}) => {
    return (
        <div style={{width: '100%', height: 96, position: 'relative', background: 'white', overflow: 'hidden', borderRadius: 12}}>
            <div style={{width: 80, height: 80, left: 8, top: 8, position: 'absolute', overflow: 'hidden', borderRadius: 8}}>
                <img style={{borderRadius: '8px', border:'0.5px solid #7A7D7F', flexShrink: 0, objectFit: 'cover', width: 80, height: 80,}} src={imgSrc} />
            </div>
            <div style={{left: 104, top: 29, position: 'absolute'}}>
                <div style={{ color: "black", fontSize: "16px", fontFamily: "Noto Sans KR", fontWeight: 500, lineHeight: "19.2px", wordWrap: "break-word" }}>
                {licensePlate}
                </div>
                <div style={{maxWidth: '180px', color: "#454A4D", fontSize: "16px", fontFamily: "Noto Sans KR", fontWeight: 500, lineHeight: "19.2px", wordWrap: "break-word" }}>
                {name}
                </div>
            </div>
            

            

            { type == 'checkBox' && (
                    <div style={{flexShrink: 0, right: '16px', top: '39px', position: 'absolute'}}>
                        <CustomCheckBox checked={checked} onChange={onChange} />
                    </div>
                )
            }

            {
                type == 'rightArrow' &&(
                    <div style={{flexShrink: 0, right: '16px', top: '39px', position: 'absolute'}}>
                        <RightArrowButton size={20} onClick = {onClick}/>
                    </div>
                )
            }
            


        </div>
    );
}



export const DetailedVehicleCard:React.FC<DetailProps> = ({start='', end='', imgSrc, plateNumber, modelName, repairMethod, location, requestType, errorType, quoteCount}) =>{
    const router = useIonRouter();
    
    return (
         <div className="vehicle-card-button" style={{display: 'flex', flexDirection: 'column',  borderRadius: '12px', backgroundColor: 'white', padding: '8px', gap: '8px', width: '100%', }} >
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{color: '#7A7D7F', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%', wordWrap: 'break-word'}}>
                    {start && !end && `${start} ~`}
                    {!start && end && `~ ${end}`}
                    {start && end && `${start} ~ ${end}`}
                </div>
                {
                   quoteCount &&  <div onClick={() => router.push('/tabs/home')} style={{textAlign: 'right', color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', textDecoration: 'underline', wordWrap: 'break-word'}}>
                        받은 견적({quoteCount}건)
                    </div>
                }
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                <img style={{width: 80, height: 80, borderRadius: 8, border: '0.50px #7A7D7F solid'}} 
                src={imgSrc} />
                <div style={{flex: 1}} />

                <div style={{width: '70%', display: 'flex', flexDirection: 'column', gap: '8px'}}>

                    <div style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                        <span style={{color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                            {plateNumber}
                        </span>{' '}
                        <span style={{color: '#454A4D', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                            {modelName}
                        </span>
                    </div>

                    <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                        <span style={{color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                            {repairMethod}-
                        </span>{' '}
                        <span style={{color: '#454A4D', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                            {location}
                        </span>
                    </div>

                    <div style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                        <span style={{color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                            {requestType}-
                        </span>{' '}
                        <span style={{color: '#454A4D', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                            {errorType}
                        </span>
                    </div>
                    
                    
                </div>
                <div style={{flex: 1}} />
                
                <RightArrowButton size={25}/>
            </div>
        </div>
    )
}