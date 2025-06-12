interface Props {
    readonly title: string;
    readonly distance: number;
    readonly address: string;
    readonly rating?: number;
    readonly hashTag?: string[];
    readonly reviewCount?: number;
    readonly id?: string;
    readonly className?: string;
    readonly imgSrc: string;
    readonly onClick?: () => void;
}

interface NewsProps {
    readonly title: string;
    readonly desc: string;
    readonly imgSrc: string;
}

interface EquipmentCardProps {
  selected?: boolean;
  onClick?: () => void;
  imgSrc?: string;
  licensePlate?: string;
  name?: string;
}

import "../CardButton/style.css"

export const GarageCard:React.FC<Props> = ({className="", id="", onClick, title, distance, address, rating=4, hashTag=[''],reviewCount=0, imgSrc}) => {
    return (
        <button id = {id} className={className + 'card-button'} 
        onClick={onClick}  style={{padding: '8px', width: '100%', height: 64, position: 'relative', background: 'white', overflow: 'hidden', borderRadius: 12}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <div style={{padding: '4px 0px', display:'flex', flexDirection: 'column',gap: '2px', textAlign: 'left', justifyContent: 'center'}}>
                    <div style={{color: 'black', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word'}}>{title}</div>
                    <div style={{display: 'flex', gap: '2px'}}>
                        <span style={{color: '#7A7D7F', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word'}}>{distance.toString()}km</span>
                        <span style={{color: '#7A7D7F', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word'}}>{address}</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2px'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.34786 0.403875C4.57186 -0.134625 5.33586 -0.134625 5.55986 0.403875L6.60086 2.90687L9.30286 3.12387C9.88486 3.17037 10.1209 3.89637 9.67736 4.27637L7.61886 6.03988L8.24736 8.67637C8.38286 9.24437 7.76536 9.69287 7.26736 9.38888L4.95386 7.97587L2.64036 9.38888C2.14236 9.69287 1.52486 9.24387 1.66036 8.67637L2.28886 6.03988L0.230359 4.27637C-0.213141 3.89637 0.0228587 3.17037 0.604859 3.12387L3.30686 2.90687L4.34786 0.403875Z" fill="#FF6F1E"/>
                        </svg> {/*별*/}
                        <div>
                            <span style={{color: 'black', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word'}}>{rating}</span>
                            <span style={{color: '#7A7D7F', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word'}}>/5 (리뷰 {reviewCount})</span>
                        </div>
                        <div style={{color: '#7A7D7F', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word'}}>
                        {'#' + hashTag.join(' #')}
                        </div>
                    </div>
                </div> 
                <img style={{width: 48, height: 48, borderRadius: 8}} src={imgSrc} />
            </div>
            
            
        </button>
    );
};

export const NewsCard:React.FC<NewsProps> = ({title, desc, imgSrc}) => {
    return (
        <button className={'card-button'} 
         style={{padding: '8px', width: '100%', height: 64, position: 'relative', background: 'white', overflow: 'hidden', borderRadius: 12}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <div style={{display:'flex', flexDirection: 'column',gap: '2px', textAlign: 'left', justifyContent: 'start'}}>
                    <div style={{color: 'black', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word'}}>{title}</div>
                    <div style={{display: 'flex', gap: '2px'}}>
                        <span style={{width: '400px', color: '#7A7D7F', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word'}}>{desc}</span>
                    </div>
                </div> 
                <img style={{width: 48, height: 48, borderRadius: 8}} src={imgSrc} />
            </div>
            
            
        </button>
    );
};

export const EmptyGarageCard:React.FC = () => {
    return (
        <div style={{padding: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 64, position: 'relative', background: 'rgba(255, 255, 255, 0.70)', overflow: 'hidden', borderRadius: 12}}>
            <div>
                <div style={{width: 121, height: 15, left: 8, top: 11, position: 'absolute', background: 'rgba(122, 125, 127, 0.10)', borderRadius: 4}} />
                <div style={{width: 168, height: 10, left: 8, top: 29, position: 'absolute', background: 'rgba(122, 125, 127, 0.10)', borderRadius: 4}} />
                <div style={{width: 145, height: 10, left: 8, top: 42, position: 'absolute', background: 'rgba(122, 125, 127, 0.10)', borderRadius: 4}} />
            </div>
            <div style={{width: 48, height: 48, background: 'rgba(122, 125, 127, 0.10)', borderRadius: 8}} />
        </div>
    );
};

export const EquipmentCard: React.FC<EquipmentCardProps> = ({
  selected,
  onClick,
  imgSrc,
  licensePlate,
  name,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: 12,
        background: selected ? '#F5F5F5' : 'white',
        borderRadius: 12,
        border: selected ? '1.5px solid #C7C7CC' : '1px solid #E5E5EA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img
          src={imgSrc}
          style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }}
        />
        <div style={{ textAlign: 'left' }}>
          <div style={{
            fontSize: 14,
            fontWeight: 700,
            color: 'black',
            fontFamily: 'Noto Sans KR',
            marginBottom: 2,
          }}>{licensePlate}</div>
          <div style={{
            fontSize: 12,
            fontWeight: 400,
            color: '#7A7D7F',
            fontFamily: 'Noto Sans KR',
          }}>{name}</div>
        </div>
      </div>
      {selected && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            fill="#007AFF"
            d="M20.285 6.708a1 1 0 0 1 0 1.414l-10.01 10.01a1 1 0 0 1-1.414 0l-5.01-5.01a1 1 0 0 1 1.414-1.414l4.303 4.303L18.87 6.708a1 1 0 0 1 1.415 0z"
          />
        </svg>
      )}
    </button>
  );
};