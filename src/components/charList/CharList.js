import { useEffect, useState, useRef } from "react";
import "./charList.scss";
import { Btn } from "../btn/btn";
import { useGetMarvelData } from "../../services/getMarvelService";
import { Spiner } from "../spiner/spiner";
import { Error } from "../error/error";

export const CharList = ({ handleSelectItemId }) => {
  const [charList, setCharList] = useState([]);
  const [reqSettings, setReqSettings] = useState({ limit: 9, offset: 210 });
  const [newCharLoading, setNewCharLoading] = useState(false);
  const [loadingEnd, setLoadingEnd] = useState(false);

  const { loading, error, clearError, allChar } = useGetMarvelData();

  const itemsRef = useRef([]);

  useEffect(() => {
    getData(true);
  }, []);

  const getData = (initial) => {
    initial ? setNewCharLoading(false) : setNewCharLoading(true);

    clearError();
    allChar(reqSettings.limit, reqSettings.offset).then((resp) => {
      onCharListLoaded(resp);
    });
  };

  const onCharListLoaded = (data) => {
    if (data.length < reqSettings.limit) {
      setLoadingEnd(true);
    }

    setCharList((charList) => [...charList, ...data]);
    setNewCharLoading(false);
    setReqSettings(({ offset, limit }) => {
      return {
        ...reqSettings,
        offset: offset + limit,
      };
    });
  };

  const setItemFocuse = (id) => {
    itemsRef.current.forEach((item) => {
      item.classList.remove("char__item_selected");
    });
    itemsRef.current[id].classList.add("char__item_selected");
    itemsRef.current[id].focus();
  };

  const setItemListToJSX = () => {
    return charList.map((item, i) => {
      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => {
            handleSelectItemId(item.id);
            setItemFocuse(i);
          }}
          ref={(elem) => (itemsRef.current[i] = elem)}
        >
          <img src={item.img} alt="abyss" />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
  };

  const checkLoding = () => {
    if (loading && !newCharLoading) {
      return <Spiner />;
    } else if (error) {
      return <Error />;
    } else {
      return setItemListToJSX();
    }
  };

  const checkAddBtn = () => {
    return loadingEnd ? null : (
      <Btn
        disabled={newCharLoading ? true : false}
        onClick={() => getData(false)}
        nameClass={"button__main button__long"}
        text={"load more"}
      />
    );
  };

  return (
    <div className="char__list">
      <ul className="char__grid">{checkLoding()}</ul>
      {checkAddBtn()}
    </div>
  );
};
