import { useState, useEffect } from "react";
import "./charInfo.scss";
import { Btn } from "../btn/btn";
import { useGetMarvelData } from "../../services/getMarvelService";
import Skeleton from "../skeleton/Skeleton";
import { Spiner } from "../spiner/spiner";
import { Error } from "../error/error";

export const CharInfo = ({ selectedId }) => {
  const [charInfo, setCharInfo] = useState({});

  const { loading, error, clearError, oneChar } = useGetMarvelData();

  useEffect(() => {
    if (selectedId !== "") {
      clearError();
      oneChar(selectedId).then((resp) => {
        setCharInfo(resp);
      });
    }
  }, [selectedId]);

  const checkCharInfo = () => {
    if (!Object.keys(charInfo).length) {
      return <Skeleton />;
    } else if (loading) {
      return <Spiner />;
    } else if (error) {
      return <Error />;
    } else {
      return <View charInfo={charInfo} />;
    }
  };

  return <div className="char__info">{checkCharInfo()}</div>;
};

const View = ({ charInfo }) => {
  const setCharInfoList = () => {
    if (!charInfo.comics.length) {
      return <li className="char__comics-item">Sorry, no comics found</li>;
    } else {
      return charInfo.comics.map((item, i) => {
        return i < 10 ? (
          <li className="char__comics-item" key={i}>
            {item.name}
          </li>
        ) : null;
      });
    }
  };

  return (
    <>
      <div className="char__basics">
        <img src={charInfo.img} alt={charInfo.name} />
        <div>
          <div className="char__info-name">{charInfo.name}</div>
          <div className="char__btns">
            <Btn
              type={"link"}
              link={charInfo.homePage}
              nameClass={"button__main"}
              text={"homepage"}
            />
            <Btn
              type={"link"}
              link={charInfo.wiki}
              nameClass={"button__secondary"}
              text={"Wiki"}
            />
          </div>
        </div>
      </div>
      <div className="char__descr">{charInfo.description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{setCharInfoList()}</ul>
    </>
  );
};
