import { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
const AccordianPricing = ({ data, panel }) => {
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
                         expandIcon={expanded=== "panel"+ie ?<RemoveOutlinedIcon/>:<AddOutlinedIcon/>}
                         aria-controls={"panel1d-content" + ie}
                         id={"panel1d-header" + ie}
                        >
                            <>
                            <div style={{margin:"0px"}}>
                            <span>{item.question}</span>
                            </div>
                            </>
                        </AccordionSummary>
                        <AccordionDetails className="itm-content">
                            <div style={{margin:"0 0 0 8px", color:"#62646A"}}
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

export default AccordianPricing;