import { useEffect, useState } from "react";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { Btn } from "../btn/btn";
import { useGetMarvelData } from "../../services/getMarvelService";
import { Spiner } from "../spiner/spiner";
import { Error } from "../error/error";

export const RandomChar = () => {
  const [characterData, setCherecter] = useState({});

  const { loading, error, clearError, oneChar } = useGetMarvelData();

  useEffect(() => {
    console.log("effect");
    getRandomChar();
  }, []);

  const randomID = () => {
    return Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
  };

  const getRandomChar = () => {
    clearError();
    oneChar(randomID()).then((resp) => {
      setCherecter(resp);
    });
  };

  const checkLoading = () => {
    if (loading) {
      return <Spiner />;
    } else if (error) {
      return <Error />;
    } else {
      return view(characterData);
    }
  };

  return (
    <div className="randomchar">
      {console.log("render")}
      {checkLoading()}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <Btn
          nameClass={"button__main"}
          text={"Try it"}
          onClick={getRandomChar}
        />
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const view = (characterData) => {
  return (
    <>
      <div className="randomchar__block">
        <img
          src={characterData.img}
          alt="Random character"
          className="randomchar__img"
        />
        <div className="randomchar__info">
          <p className="randomchar__name">{characterData.name}</p>
          <p className="randomchar__descr">{characterData.description}</p>
          <div className="randomchar__btns">
            <Btn
              type={"link"}
              link={characterData.homePage}
              nameClass={"button__main"}
              text={"homepage"}
            />
            <Btn
              type={"link"}
              link={characterData.wiki}
              nameClass={"button__secondary"}
              text={"Wiki"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
