import { useState } from "react";

const Accordion = (props) => {
  const [activeAccordion, setActiveAccordion] = useState(0);
  return (
    <div>
      {props.data.map((item, index) => {
        return (
          <div
            className="accordian-wrap"
            key={index + 1}
            onClick={() => {
              index + 1 === activeAccordion
                ? setActiveAccordion(0)
                : setActiveAccordion(index + 1);
            }}
          >
            <div>
              <span className="accordian-title">{item.heading}</span>
              {index + 1 === activeAccordion && <p>{item.description}</p>}
            </div>
            <div className="icon-wrap">
              {index + 1 === activeAccordion ? (
                <i className="icon-caret-up"></i>
              ) : (
                <i className="icon-caret-down"></i>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
