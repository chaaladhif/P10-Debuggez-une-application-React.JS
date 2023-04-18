import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtB, evtA) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    if (byDateDesc) {
       setIndex(() => (index < (byDateDesc.length)-1 ? index + 1 : 0));
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextCard();
    }, 5000);
    return() => clearInterval(interval)
  });
  
  const handleChange = (event) => {
    setIndex(parseInt(event.target.value, 10));
  }

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${radioIdx+1}`}
                  type="radio"
                  name="radio-button"
                  value={radioIdx}
                  checked={index === radioIdx}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
