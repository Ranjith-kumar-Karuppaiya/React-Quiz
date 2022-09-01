import React from "react";
import useStateContext from "./hooks/useStateContext";
import { createAPIEndpoint } from "./api";
import { useEffect } from "react";
import { useState } from "react";
import { ENDPOINTS } from "./api";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import CardHeader from "@mui/material/CardHeader";
import { getFormatedTime } from "../helper";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";

export default function Quiz() {

  const [qns, setQns] = useState([])
  const [qnIndex, setQnIndex] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)
  const { context, setContext } = useStateContext()
  const navigate = useNavigate()
  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, [1000]);
  };

  useEffect(() => {
    setContext({
        timeTaken: 0,
        selectedOptions: []
    })
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then((res) => {
        setQns(res.data);
        startTimer();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      clearInterval(timer);
    };
  }, []);

 const updateAnswer = (qnId,optionIdx) => {
    const temp = [...context.selectedOptions]
        temp.push({
        qnId,
        selected: optionIdx
       
    })
  if(qnIndex < 4){
    setContext({selectedOptions:[...temp]})
    setQnIndex(qnIndex + 1 )
  }
  else{
    setContext({
        selectedOptions:[...temp],timeTaken
        
    })
    navigate('/result')
  }
    
 }


  return qns.length != 0 ? (
    <Card sx={{ maxWidth: 640, mx: "auto", mt: 5 }}>
      <CardHeader
        title={"Question " + (qnIndex + 1) + " of 5"}
        action={<Typography>{getFormatedTime(timeTaken)}</Typography>}
      />
      <Box>
      <LinearProgress variant="determinate" value={(qnIndex+1)*100/5} />
      </Box>

      <CardContent>
        <Typography variant="h6"> {qns[qnIndex].qnInWords} </Typography>
        <List>
                        {qns[qnIndex].options.map((item, idx) =>
                            <ListItemButton disableRipple key={idx} onClick={() => updateAnswer(qns[qnIndex].qnId, idx+1)}>
                                <div>
                                    <b>{String.fromCharCode(65 + idx) + " . "}</b>{item}
                                </div>

                            </ListItemButton>
                        )}

                    </List>
      </CardContent>
    </Card>
  ) : null;
}
