import { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
const AccordianFaq = ({ data, panel }) => {
    const [expanded, setExpanded] = useState(panel);
    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return <>
        <div className="item">
            {data.map((item, ie) => {
                if(item.answer !== null && item.question !=null)
                {
                    return <>
                    <Accordion
                        TransitionProps={{ unmountOnExit: true }}
                        key={ie}
                        expanded={expanded === `panel` + ie}
                        onChange={handleChangeAccordion(`panel` + ie)}>
                        <AccordionSummary className="item-head"
                           aria-controls={"panel1d-content" + ie}
                           id={"panel1d-header" + ie}
                         expandIcon={expanded=== "panel"+ie ?<RemoveOutlinedIcon/>:<AddOutlinedIcon/>}
                        >
                            <>
                            <div style={{margin:"0px"}}>
                            <span>{item.question}</span>
                            </div>
                            </>
                        </AccordionSummary>
                        <AccordionDetails className="item-content">
                            <div className="answer_content"
                                dangerouslySetInnerHTML={{
                                    __html: item.answer,
                                }}
                            ></div>
                        </AccordionDetails>
                    </Accordion>
                </>   
                }
            })}
        </div>
    </>
}

export default AccordianFaq;