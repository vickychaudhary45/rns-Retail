import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import React, { useState } from "react";

export const Accordions = ({ data }) => {
    const [expanded, setExpanded] = useState("");

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <div className="item">
        <Accordion expanded={expanded === `panel${data.key}`}
         TransitionProps={{ unmountOnExit: true }}
        onChange={handleChange(`panel${data.key}`)}>
          <AccordionSummary className={expanded === `panel${data.key}` ? "item-head open":"item-head"}>
            <>
              <samp></samp>
              <span>{data.question}</span>
            </>
          </AccordionSummary>
          <AccordionDetails className="item-content">
            <div
              dangerouslySetInnerHTML={{
                __html: data.answer,
              }}
            ></div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};