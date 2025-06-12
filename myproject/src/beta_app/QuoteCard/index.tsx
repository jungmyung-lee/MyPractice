import { DownArrowButton, RightArrowButton } from "../Buttons";
import "./style.css"

interface Props {
    readonly id: string;
    readonly modelName: string;
    readonly location: string;
    readonly distance: number;
    readonly repairDetail : string;
    readonly keywords: string[];
    readonly onClick: () => void;
    readonly imgSrc: string;
}

interface ExtendedProps extends Props {
    readonly isOpen: boolean;
    readonly errorCode: string;
    readonly imgOnClick: () => void;
}

export const QuoteCard:React.FC<Props> = ({onClick, id, modelName, location, distance, repairDetail, keywords, imgSrc}) =>{
    return (
        <div className='quote-card-button' key={id} onClick={onClick} style={{display: 'flex', gap: '15px', alignItems: 'center', padding: '8px',borderRadius: '12px', background: '#FFF'}}>
            <div style={{width: '70%', flex: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
            <div style={{lineHeight: '120%', color: 'black', fontSize: 14, fontWeight: '700',  textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                {modelName}
            </div>

            <div style={{color: '#7A7D7F', fontSize: 10,  textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                <span style={{fontWeight: '700'}}>
                {distance}km
                </span>
                {' '}
                <span style={{fontWeight: '400'}}> 
                {location}
                </span>
            </div>

            <div style={{color: '#000', fontSize: 10,  textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                <span style={{fontWeight: '700'}}>
                {keywords.join(', ')}
                </span>
                {' '}
                <span style={{fontWeight: '400'}}> 
                {repairDetail}
                </span>
            </div>
            </div>
            <img style={{width: 48, height: 48, borderRadius: 8}} src={imgSrc} alt="장비 사진"  />
            <RightArrowButton size={20} />
        </div>
    );
}

export const ExpandableQuoteCard: React.FC<ExtendedProps> = ({isOpen, onClick, id, modelName, location, distance, repairDetail, keywords, imgSrc, errorCode, imgOnClick}) => {
    return (
        <>
            <div className={`quote-card-button ${isOpen ? "show" : ""}`} key={id} onClick={onClick} >
                <div className={`text-container ${isOpen? "show": ""}`}>
                    <div className="medium" style={{lineHeight: '120%', color: 'black', fontWeight: '700'}}>
                        {modelName}
                    </div>

                    <div className="small" style={{color: '#7A7D7F'}}>
                        <span style={{fontWeight: '700'}}>
                        {distance}km
                        </span>
                        {' '}
                        <span style={{fontWeight: '400'}}> 
                        {location}
                        </span>
                    </div>

                    <div className="small" style={{color: '#000'}}>
                        <span style={{fontWeight: '700'}}>
                        {keywords.join(', ')}
                        </span>
                        {' '}
                        {!isOpen && 
                        <span style={{fontWeight: '400'}}> 
                        {repairDetail}
                        </span>
                        }
                    </div>
                    
                    { isOpen &&
                        <>
                            <div className="small" style={{color: '#000'}}>
                                <span style={{fontWeight: '700'}}>
                                    문제 설명: 
                                </span>
                                {' '}
                                <span style={{fontWeight: '400'}}> 
                                    {repairDetail}
                                </span>
                            </div>

                            <div className="small" style={{color: '#000'}}>
                                <span style={{fontWeight: '700'}}>
                                    오류코드: 
                                </span>
                                {' '}
                                <span style={{fontWeight: '400'}}> 
                                    {errorCode}
                                </span>
                            </div>
                            
                        </>
                    }
                </div>
                <img onClick ={(e) => {e.stopPropagation(); imgOnClick();} } className={`img-box ${isOpen? "show": ""}`} src={imgSrc} alt="장비 사진"  />
                {isOpen? <></> : <DownArrowButton isOpen={isOpen} size={20} />}
            </div>

        </>
    );
}