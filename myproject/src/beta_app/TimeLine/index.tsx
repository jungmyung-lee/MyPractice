// App.tsx
import React from 'react';
import './Timeline.css';   // ⇢ 4번 예제와 동일한 CSS 그대로 사용

/* ------------------------------------------------------------------ */
/* 1. 데이터 타입 정의                                                */
/* ------------------------------------------------------------------ */
export interface TimelineItemData {
  /** 예: "10:00-12:00 출장 수리" */
  time: string;
  /** 카드 헤더(없어도 됨) */
  title?: string;
  /** 상세 설명(여러 줄 가능) */
  description?: string;
  /** 썸네일 이미지 URL */
  image?: string;
  /** 마커(●) 색상 */
  color?: string;
  /** 비어 있는 슬롯(플레이스홀더)인지 여부 */
  showPlaceholder?: boolean;
}

/* ------------------------------------------------------------------ */
/* 2. 내부 전용 Placeholder 컴포넌트                                  */
/* ------------------------------------------------------------------ */
const Placeholder: React.FC = () => (
  <div className="placeholder">
    <div className="placeholder-lines">
      <span className="line-bar short" />
      <span className="line-bar medium" />
      <span className="line-bar long" />
    </div>

    <div className="placeholder-actions">
      <div className="placeholder-thumb" />
      <button className="add-btn" aria-label="add">
        +
      </button>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* 3. TimelineItem (단일 항목)                                         */
/* ------------------------------------------------------------------ */
interface ItemProps extends TimelineItemData {
  isLast: boolean;           // 마지막 아이템이면 세로선 렌더링 X
}

const TimelineItem: React.FC<ItemProps> = ({
  time,
  title,
  description,
  image,
  color = '#4A90E2',
  showPlaceholder,
  isLast,
}) => (
  <div className="item">
    {/* ───── 마커 + 세로선 영역 ───── */}
    <div className="marker-wrapper">
      <span className="dot" style={{ backgroundColor: color }} />
      {!isLast && <span className="line" />}
    </div>

    {/* ───── 우측 콘텐츠 영역 ───── */}
    <div className="content">
      <p className="time">{time}</p>

      <div className="card">
        {/* 카드 헤더 */}
        <header className="card-header">
          <h3 className="card-title">{title}</h3>
          <button className="arrow-btn" aria-label="open">
            ›
          </button>
        </header>

        {showPlaceholder ? (
          <Placeholder />
        ) : (
          <div className="card-body">
            <p className="description">{description}</p>

            {image && (
              <div className="thumb">
                <img src={image} alt="" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* 4. Timeline(리스트) 컴포넌트                                       */
/* ------------------------------------------------------------------ */
export const Timeline: React.FC<{ items: TimelineItemData[] }> = ({ items }) => (
  <section className="wrapper">
    {items.map((item, idx) => (
      <TimelineItem
        key={idx}
        {...item}
        isLast={idx === items.length - 1}
      />
    ))}
  </section>
);

/* ------------------------------------------------------------------ */
/* 5. 최상위 App                                                      */
/* ------------------------------------------------------------------ */
function App() {
  const data: TimelineItemData[] = [
    {
      time: '10:00-12:00 출장 수리',
      title: '디젤란 DX17Z-7 굴착기',
      description:
        '3.3 km 부산 강서구 공항로393번가길\n유압펌프 굴삭기 동작이 느리고 힘이 없습니다...',
      image: '/img/excavator.jpg',
      color: '#4A90E2',
    },
    {
      time: '14:30-16:00 정비소 수리',
      showPlaceholder: true,
      color: '#F5A623',
    },
  ];

  return (
    <div style={{ background: '#eceff1', minHeight: '100vh', padding: 32 }}>
      <Timeline items={data} />
    </div>
  );
}
