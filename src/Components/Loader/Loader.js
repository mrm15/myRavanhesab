import "./Loader.css"
import  tr from "../translate/translate"

export default function Loader({className, text}) {
  return (
    <div className={"text-center "+ (className === undefined ? undefined : ` ${className}`)}>
      <div className="loadingio-spinner-ripple-ixg803dsts">
        <div className="ldio-k9k17u9exoh">
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={"text-center"}>{text === undefined ? `${tr.loadingText}` : text}</div>
    </div>
  );
}
