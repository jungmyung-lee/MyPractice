import "./style.css";

interface Props {
  readonly title?: string | string[];
  readonly content?: string | string[];
}

export const Beta: React.FC<Props> = ({
  title = ["아직 준비중인 기능이에요!"],
  content = ["현재 열심히 개발중인 기능이에요.", "조금만 기다려주세요! :)"],
}) => {
  // title과 content를 항상 배열로 처리
   const titleText = Array.isArray(title) ? title.join("\n") : title;
  const contentText = Array.isArray(content) ? content.join("\n") : content;

  return (
    <div className="frame">
      <div className="text-wrapper">{titleText}</div>
      <div className="div">{contentText}</div>

      <svg
        style={{ marginTop: "47px" }}
        xmlns="http://www.w3.org/2000/svg"
        width="94"
        height="94"
        viewBox="0 0 94 94"
        fill="none"
      >
        <path
          d="M36.7873 2.71957C37.1104 1.1368 38.5028 0 40.1182 0H53.9563C55.5717 0 56.964 1.1368 57.2872 2.71957L73.4931 82.0954C73.9233 84.2028 72.313 86.1751 70.1621 86.1751H23.9123C21.7614 86.1751 20.1511 84.2028 20.5814 82.0954L36.7873 2.71957Z"
          fill="#FF6F1E"
        />
        <path
          d="M0 84.311C0 83.3723 0.761035 82.6112 1.69982 82.6112H92.3002C93.239 82.6112 94 83.3723 94 84.311V92.3002C94 93.239 93.239 94 92.3002 94H1.69982C0.761032 94 0 93.239 0 92.3002V84.311Z"
          fill="#FF6F1E"
        />
        <path
          d="M21.2477 51.6745H72.7523V68.6727H21.2477V51.6745Z"
          fill="#F5F5F5"
        />
        <path
          d="M21.2477 16.9982H72.7523V30.5967H21.2477V16.9982Z"
          fill="#F5F5F5"
        />
      </svg>
    </div>
  );
};
