import React, {useState} from 'react';
import numeric from "../utils/NumericFunction";
import {Basket, BasketLittle, BasketLittleSelected} from "../../Assets/svg";
import tr from "../translate/translate";

const SingleModule = (props) => {
  const {moduleId, moduleName, modulePrice, pictureUrl, fixed} = props.module;
  const [mode, setMode] = useState(false);
  //mode 0== unSelect
  //mode 1== selected

  const selectModule = (moduleId, modulesName, modulePrice) => {
    setMode(ps => !ps);
    props.selectSingleModule(moduleId, modulesName, modulePrice)
  }

  return (
    <>
      <div className={"single__module"}>
        <div className={"single__module__title"}>
          {moduleName}
        </div>
        <hr/>
        <div className={"d-flex  justify-content-between"}>
          <div>{modulePrice!==undefined && numeric.e2p(modulePrice.toLocaleString())} {tr.currency_unit}</div>
          <div onClick={() => selectModule(moduleId, moduleName, modulePrice)}
               className={"little__basket__icon"}>

            {mode ? <BasketLittleSelected/> : <BasketLittle/>}

          </div>

        </div>

      </div>

    </>
  );
};

export default SingleModule;
