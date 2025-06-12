import "./style.css";

interface Props {
    readonly content: string;
    readonly fontSize: number;
}

export const Title:React.FC<Props> = ({content, fontSize}) => {
    return (
        <div className='title' style={{whiteSpace:"pre-line", fontSize: fontSize.toString() + 'px'}}>
            {content}
        </div>
    );
};

export const SubTitle:React.FC<Props> = ({content, fontSize}) => {
    return (
        <div style={{ fontSize: fontSize.toString() + 'px', 
            paddingBottom: '8px', color: 'black', fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word'}}>{content}</div>
    )
}