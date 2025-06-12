import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import "../beta_app/Layout.css";
import { BellButton, ProtraitButton, RightArrowButton } from "../beta_app/Buttons";
import { HomeCardButton } from "../beta_app/CardButton";
import { Title } from "../beta_app/Title";
import { EmptyGarageCard, GarageCard, NewsCard } from "../beta_app/GarageCard";
import { Geolocation } from '@capacitor/geolocation';
import { getAllGarages } from "../services/garageService";
import { useEffect, useState } from "react";

const Home:React.FC = () => {
    const router = useIonRouter();
    const [nearbyGarages, setNearbyGarages] = useState<any[]>([]);
    
    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371;
      const toRad = (deg: number) => (deg * Math.PI) / 180;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
      return 2 * R * Math.asin(Math.sqrt(a));
    };
    
    useEffect(() => {
      const fetchNearby = async () => {
        try {
          const position = await Geolocation.getCurrentPosition();
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
    
          const all = await getAllGarages();
          const enriched = all
            .map((garage: any) => {
              const distance = getDistance(lat, lng, garage.latitude, garage.longitude);
              return { ...garage, distance };
            })
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 3); // ✅ 가까운 3개만
    
          setNearbyGarages(enriched);
        } catch (e) {
          console.error("정비소 거리 계산 실패:", e);
        }
      };
    
      fetchNearby();
    }, []);


    return (
        <IonPage>
            <div className="tab-container" >
                <div style={{borderBottom: `1px solid rgba(122, 125, 127, 0.1)`, display:'flex', padding:'13px 16px 12px 16px', justifyContent: 'space-between'}}>
                    <ProtraitButton onClick={() => router.push('/tabs/option')}/>
                    <div >
                        <svg xmlns="http://www.w3.org/2000/svg" width="65" height="22" viewBox="0 0 65 22" fill="none">
                            <path d="M0 9.96986H19.9891V12.4801H0V9.96986ZM8.42022 11.296H11.5689V15.6534H8.42022V11.296ZM2.1468 14.6588H17.4368V21.9763H14.2643V17.1453H2.1468V14.6588ZM10.6386 6.01507H18.2239V8.50161H10.6386V6.01507ZM10.6386 0.85253H18.1524V3.33907H13.8826V7.03337H10.6386V0.85253ZM1.88441 0.85253H9.46977V3.33907H5.12847V7.03337H1.88441V0.85253ZM1.88441 6.03875H3.2202C4.04711 6.03875 4.81042 6.03086 5.51012 6.01507C6.22572 5.9835 6.90951 5.93613 7.5615 5.87298C8.2135 5.79404 8.88934 5.69142 9.58904 5.56512L9.87528 8.02799C9.14378 8.17008 8.42818 8.27269 7.72848 8.33584C7.04468 8.399 6.33703 8.44636 5.60553 8.47793C4.87403 8.49372 4.07892 8.50161 3.2202 8.50161H1.88441V6.03875Z" fill="#454A4D"/>
                            <path d="M37.4376 0.0236811H40.6101V12.859H37.4376V0.0236811ZM39.7514 5.13886H43.5441V7.74381H39.7514V5.13886ZM25.8688 13.9483H40.6101V21.9763H37.4376V16.4586H25.8688V13.9483ZM24.0559 9.18837H25.8926C27.4988 9.18837 28.8663 9.17259 29.9954 9.14101C31.1404 9.10944 32.1581 9.04629 33.0486 8.95156C33.955 8.84105 34.8456 8.69107 35.7202 8.50161L36.0303 11.0118C35.1398 11.2013 34.2254 11.3513 33.2872 11.4618C32.3648 11.5565 31.3153 11.6276 30.1385 11.6749C28.9618 11.7065 27.5465 11.7223 25.8926 11.7223H24.0559V9.18837ZM24.0559 1.56297H33.955V4.0732H27.2284V10.6566H24.0559V1.56297Z" fill="#454A4D"/>
                            <path d="M61.8275 0H65V22H61.8275V0ZM58.0348 7.74381H62.2092V10.3014H58.0348V7.74381ZM47.4439 14.5167H49.2329C50.4574 14.5167 51.5865 14.5009 52.6201 14.4693C53.6697 14.4377 54.6874 14.3825 55.6733 14.3036C56.6593 14.2246 57.6691 14.1141 58.7027 13.972L59.0128 16.4586C57.9474 16.6322 56.8978 16.7585 55.8642 16.8375C54.8464 16.9164 53.7969 16.9717 52.7155 17.0032C51.6342 17.0348 50.4733 17.0506 49.2329 17.0506H47.4439V14.5167ZM47.4439 1.84715H57.677V4.40474H50.6164V15.2982H47.4439V1.84715ZM49.877 7.95694H56.9376V10.4198H49.877V7.95694Z" fill="#454A4D"/>
                        </svg> {/*뚝닥터 배너 이미지 */}
                    </div>
                    <BellButton />
                </div>
                <IonContent >
                    <div className="content" style={{padding: '0px 16px', display: 'flex', flexDirection:'column', gap: '16px'}}>
                        <div style={{paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px'}}> {/*카드 버튼들 모여있는 div*/}
                            <div style={{alignSelf: 'stretch', height: 64, position: 'relative', background: 'white', overflow: 'hidden', borderRadius: 12}}>
                                <div style={{left: 43, top: 12, position: 'absolute'}}><span style={{color: 'black', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word'}}>서비스 피드백 또는 제휴문의는 <br/> 010-4632-4008 로 부탁드립니다! </span><span style={{color: 'black', fontSize: 12, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word'}}> </span><span style={{color: 'black', fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word'}}></span></div>
                                <div style={{left: 8, top: 8, position: 'absolute', color: '#7A7D7F', fontSize: 12, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word'}}>광고</div>
                                <div style={{width: 39, height: 39, left: 276, top: 12, position: 'absolute', background: 'white'}} />
                            </div>

                            <div style={{height: '200px', display: 'flex', flexDirection: 'row', gap: '8px'}}> {/*가로 나누기*/}
                                <HomeCardButton onClick={() => router.push('/garagelist')} color="white" imgStyle = {{position: 'absolute', right: '0px', bottom: '0px', width: '136px', height: '135px', }} 
                                imgSrc="/map_color.png"  
                                content="정비소 찾기" desc={["내 근처 정비소를", "지도에서 찾아보세요!"].join('\n')}   />

                                <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '8px'}}>
                                    <HomeCardButton onClick={() => router.push('/onsite/step1')} color="orange" imgStyle={{position: 'absolute', right: '0px', bottom: '5px', width: '76px', height: '76px'}}
                                    imgSrc="/footStep.png"
                                    content="출장 정비" desc={["정비사의 방문이","필요한가요?"].join('\n')}> 
                                    </HomeCardButton>

                                    <HomeCardButton onClick={() => router.push('/reserve/step1')} color="white" imgStyle={{position: 'absolute', right: '5px', bottom: '5px', width: '79px', height: '79px'}}
                                    imgSrc="/multiTool.png"
                                    content="정비예약" desc={["견적 요청하고","빠르고 싸게!"].join('\n')}> 
                                    </HomeCardButton>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
    <Title content="내 근처 정비소 " fontSize={20} />
    {/*<RightArrowButton onClick={() => router.push('/garagelist')} size={20} />*/}
  </div>

  {nearbyGarages.map((garage) => (
    <GarageCard
      key={garage.id}
      title={garage.name}
      distance={garage.distance.toFixed(1)}
      address={garage.address}
      rating={garage.rating ?? 4.0} // 없으면 기본 4.0
      reviewCount={garage.reviewCount ?? 0}
      hashTag={
        typeof garage.mainServices === 'string'
          ? JSON.parse(garage.mainServices.replace(/'/g, '"'))
          : garage.mainServices || []
      }
      imgSrc="https://firebasestorage.googleapis.com/v0/b/my-awesome-project-id-12ff9.firebasestorage.app/o/testUploads%2F1743588807056-1000036152.png?alt=media&token=bfd1aa03-dec8-4741-b931-f7f69e419074" // 썸네일 필드가 없으면 임시 이미지
      onClick={() => router.push(`/garagedetailpage1/${garage.id}`)}
    />
  ))}

  {nearbyGarages.length === 0 && <EmptyGarageCard />}
</div>

                        <div style={{display: 'flex',flexDirection: 'column', gap: '8px' }}> {/*최신 소식 블럭*/}
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Title content="최신 소식" fontSize={20}/>
                                {/*<RightArrowButton size={20} />*/}
                            </div>
                            <NewsCard title="해외건설 수주 1조 달러 돌파, 건설기계 수출 불씨 지피다" 
                              desc="해외건설 시장의 성과가 건설기계 산업에 미치는 영향 중동·유럽·북미, 글로벌 시장 확장에서 건설기계 수출의 기회 찾기
                                    스마트건설기계와 친환경 트렌드, 한국 제품의 글로벌 경쟁력 강화
                                    굴삭기·어태치먼트 업계, 해외시장 공략을 위한 전략적 변화 필요"
                              imgSrc="https://cdn.sisajournal-e.com/news/photo/202502/409261_215043_580.jpg" />
                        </div>
                    </div>
                </IonContent>
            </div>
        </IonPage>
        );
}

export default Home;
