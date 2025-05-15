import { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import time_machine from "../../public/images/time-machine.png";

const AccordianCourse = ({ list, type,panel,link,mobile}) => {
    // const [expanded, setExpanded] = useState(panel);
    // const handleChangeAccordion = (panel) => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // };



    //const [expanded, setExpanded] = useState(list.length > 0 ? list.map((itm,idx)=> idx) : []);
    const [expanded, setExpanded] = useState(list.length > 0 ?  [0] : []);
    const [newList,setNewList] = useState([])

    useEffect(() => {
      if(list.length > 0){
        let temp = list.filter((itm) => itm.children.length !== 0);
        setNewList(temp)
      }
    },[list])

 
    const handleChangeAccordion = (panel) => (event, isExpanded) => {
          if(expanded.includes(panel)){
            let temp  = [...expanded]
          let index =  temp.findIndex((itm)=> itm == panel)
          if(index != -1){
            temp.splice(index,1)
          }
          setExpanded(temp)
          }else{
            let temp = [...expanded,panel]
            setExpanded(temp)
          }
        };
    return <>
        <div className="item">
            {newList && newList.length > 0 && newList.map((data, idx) => {
                let video_count = data.children?.filter((val)=> val.activity_id == 2).length;
                let lab_count = data.children?.filter((val)=> val.activity_id ==6).length;

                if(data.children.length > 0)
                {
                    return <>
                    <Accordion
                        square
                        TransitionProps={{ unmountOnExit: true }}
                        // expanded={expanded === "panel" + idx}
                        //expanded = {expanded.includes(idx) === true ? true :false} 
                        //  onChange={handleChangeAccordion("panel" + idx)}
                        onChange={handleChangeAccordion(idx)}  
                        key={idx}
                        defaultExpanded = {idx == 0? true : false}
                    >
                        <AccordionSummary
                            aria-controls={"panel1d-content" + idx}
                            // id={"panel1d-header" + idx}
                            id={`${idx}`}
                            className="itm-head"
                            //expandIcon={expanded === "panel" + idx ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineRoundedIcon />}
                            expandIcon={expanded.includes(idx) ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineRoundedIcon />}
                        >
                            <div className="left">
                              
                                <samp></samp>
                                <span>{data.section_heading}</span>
                            </div>
                      {type === "oc" ? (
                        <div
                          className={`right accooridan-course-responsive`}

                    
                        >
                          <div
                            className="total-test"
                            style={{
                              marginRight: data.children?.length > 1 ? "-6px" : "0px",
                            }}
                          >
                            {!mobile && (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    // paddingLeft: lab_count> 0 ? "0px" : "25px",
                                  }}
                                >
                                  <div style={{
                                    margin: 0,
                                    width: "50%",
                                    // backgroundColor: "red",
                                    borderRight: lab_count > 0 ? "1px solid grey " : "none",
                                  }}>
                                    {lab_count > 0 && (
                                      <>
                                        <div className="total-test labs-count"
                                            style={{
                                                marginRight : lab_count === 1 ? "16px" : "10px",
                                            }}
                                        >
                                          {lab_count > 1 ? (
                                            <>{lab_count} labs</>
                                          ) : (
                                            <>{lab_count} lab</>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </div>

                                  <div className="total-test lecture-count">
                                    {video_count > 1 && !mobile && <>{video_count}</>}
                                    {/* <div> */}
                                    {video_count > 1 && !mobile ? (
                                      <>&nbsp;lectures</>
                                    ) : (
                                      <>&nbsp;lecture</>
                                    )}
                                    {/* </div> */}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                            <div className="right" style={{
                                width: type === "oc" ? "25%" : "inherit"
                            }}>
                                <div className="total-test"
                                    style={{
                                        marginRight: data.children?.length > 1 ? "-6px" : "0px",
                                    }}
                                >
                                    {
                                        type === "pt" && !mobile && <>
                                            {data.children?.length + (data.children?.length > 1 ? " Tests" : " Test")}
                                        </> 
                                    }
                                  
                                    { 
                                        type === "lab" && !mobile && <>
                                                                    <div
                          className={`right accooridan-course-responsive`}

                    
                        >
                          <div
                            className="total-test"
                            style={{
                              marginRight: data.children?.length > 1 ? "-6px" : "0px",
                            }}
                          >
                            {!mobile && (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    // paddingLeft: lab_count> 0 ? "0px" : "25px",
                                  }}
                                >
                                  <div style={{
                                    margin: 0,
                                    width: "50%",
                                    // backgroundColor: "red",
                                    borderRight: video_count > 0 ? "1px solid grey " : "none",
                                  }}>
                                    {lab_count > 0 && (
                                      <>
                                        <div className="total-test labs-count"
                                            style={{
                                                //marginRight : lab_count === 1 ? "0px" : "10px",
                                            }}
                                        >
                                          {lab_count > 1 ? (
                                            <>{lab_count} labs</>
                                          ) : (
                                            <>{lab_count} lab</>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                  {
                                    video_count > 0 &&  <div className="total-test lecture-count">
                                    {video_count > 1 && !mobile && <>{video_count}</>}
                                    {/* <div> */}
                                    {video_count > 1 && !mobile ? (
                                      <>&nbsp;lectures</>
                                    ) : (
                                      <>&nbsp;lecture</>
                                    )}
                                    {/* </div> */}
                                  </div>
                                  }
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                                        </>
                                    }

                                </div>
                            </div>
                      )}
                        </AccordionSummary>
                        <AccordionDetails className="item-content">
                            <ul>
                                {data.children.map((itm, idxx) => (
                                    <li key={idxx}>
                                        <div className="title">
                                            {
                                                type === "pt" && <>
                                                    <i className="icon-font-note2"></i>
                                                    <span>{itm.quiz_name}</span>
                                                </>
                                            }
                                            {
                                                type === "oc" && <>
                                                    {itm.activity_id === 2 && (
                                                        <>
                                                            <i className="icon-play icon-font-play-btn-filled"></i>
                                                            <span>{itm.video_name}</span>
                                                        </>
                                                    )}
                                                    {itm.activity_id === 6 && (
                                                        <>
                                                            <i className="icon-font-bicker"></i>
                                                            <span>{itm.lab_name}</span>
                                                        </>
                                                    )}
                                                </>
                                            }
                                            {
                                                type === "lab" && <>
                                                   {
                                                    itm.activity_id == 6 && <>
                                                         <i className="icon-font-bicker"></i>
                                                    <span>{itm.lab_name}</span>
                                                    </>
                                                   }
                                                    {itm.activity_id === 2 && (
                                                        <>
                                                            <i className="icon-play icon-font-play-btn-filled"></i>
                                                            <span>{itm.video_name}</span>
                                                        </>
                                                    )}
                                                </>
                                            }
                                        </div>
                                        <div className="right" style={{marginRight:"0.2rem"}}>
                                            {itm.is_free && (
                                                <a
                                                    className="btn-try"
                                                    href="#"
                                                    onClick={(e) =>
                                                        link(e, itm.id)
                                                    }
                                                    target="_blank"
                                                >
                                                    Try now
                                                </a>
                                            )} 
                                            <div className="total-que">
                                                {type === "pt" && <>
                                                    {itm.questions_count} questions
                                                </>}
                                                {
                                                    type === "oc" && <>
                                                        {itm.activity_id === 2 && (
                                                            <>
                                                                {itm.time_hour > 0 &&
                                                                    itm.time_hour + "h "}
                                                                {itm.time_minute > 0 &&
                                                                    itm.time_minute + "m "}
                                                                {itm.time_second > 0 &&
                                                                    itm.time_second + "s "}
                                                            </>
                                                        )}
                                                        {itm.activity_id === 6 && (
                                                            <>
                                                                {itm.duration_hour > 0 &&
                                                                    itm.duration_hour + "h "}
                                                                {itm.duration_minutes > 0 &&
                                                                    itm.duration_minutes + "m "}

                                                            </>
                                                        )}
                                                    </>
                                                }
                                                {
                                                    type === "lab" && <>
                                                      {
                                                        itm.activity_id == 6 && <div style={{display:"flex", justifyContent: "flex-start", marginLeft: video_count > 1 ? "" : "2rem"}}>
                                                        {<img src={time_machine.src} alt="time-machine" style={{margin:"0.1rem"}}/>}
                                                              {itm?.duration_hour > 0 &&
                                                            `${itm?.duration_hour}h `}
                                                        {itm?.duration_minutes > 0 &&
                                                            `${itm?.duration_minutes}m`}
                                                        </div>
                                                      }
                                                      {
                                                        itm.activity_id == 2 &&  <div style={{display:"flex", justifyContent: "flex-start", marginLeft : video_count > 1 ? "" : "2rem"}}>
                                                        {<img src={time_machine.src} alt="time-machine" style={{margin:"0.1rem"}}/>}
                                                        {itm.time_hour > 0 &&
                                                            itm.time_hour + "h "}
                                                        {itm.time_minute > 0 &&
                                                            itm.time_minute + "m "}
                                                        {itm.time_second > 0 &&
                                                            itm.time_second + "s "}
                                                    </div>
                                                      }
                                                    </>
                                                }

                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </>
                }
            })}
        </div>
    </>
}

export default AccordianCourse;