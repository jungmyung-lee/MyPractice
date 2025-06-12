import "./style.css"

interface Props {
    readonly content: string;
    readonly desc?: string;
    readonly imgSrc: string;
    readonly imgStyle: any;
    readonly onClick?: () => void;
    readonly color?: string;
    readonly selected?: any;
}

interface NewCardButtonProps {
    readonly onClick?: () =>void;
}

export const CardButton:React.FC<Props> = ({imgSrc, imgStyle, content, onClick}) => {
    return (
        <button onClick = {onClick} className="card-button" style={{width: 175, height: 136, position: 'relative', background: 'white', overflow: 'hidden', borderRadius: 12}}>
            <div style={{maxWidth:'86px', left: 8, top: 8, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 22, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: 1.3, wordWrap: 'break-word'}}>{content}</div>
            <img style={imgStyle} src={imgSrc} />
        </button>

    )
}

export const HomeCardButton:React.FC<Props> = ({color, imgStyle, imgSrc, content, desc, onClick}) => {
    return (
        <button className={'card-button card-button-' + color}onClick = {onClick}  style={{flex: 1, position: 'relative',  overflow: 'hidden', borderRadius: '12px' }}>
                <div style={{lineHeight: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',  left: 8, top: 8, position: 'absolute'}}>
                    <div style={{textAlign: 'left', fontSize: 24, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word'}}>{content}</div>
                    <div style={{textAlign: 'left', whiteSpace:"pre-line", fontSize: 12, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word'}}>{desc}</div>
                </div>
                <img style={imgStyle} src={imgSrc} />
        </button>
    );
};

export const NewCardbutton:React.FC<NewCardButtonProps> = ({onClick}) => {
    return (
        <button onClick = {onClick} className="card-button" style={{width: '100%', height: 96, background: 'white', overflow: 'hidden', borderRadius: 12}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 1V11M11 11V21M11 11H21M11 11H1" stroke="#7A7D7F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </button>
    )
}
