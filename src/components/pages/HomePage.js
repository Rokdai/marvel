import { useState } from "react";

import { RandomChar } from "../randomChar/RandomChar";
import { CharList } from "../charList/CharList";
import { CharInfo } from "../charInfo/CharInfo";

export const HomePage = () => {
  const [selectedId, setSelectedId] = useState("");

  const handleSelectItemId = (id) => {
    setSelectedId(id);
  };

  return (
    <>
      <RandomChar />
      <div className="char__content">
        <CharList handleSelectItemId={handleSelectItemId} />
        <CharInfo selectedId={selectedId} />
      </div>
    </>
  );
};
