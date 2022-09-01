import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import CardContent from "@mui/material/CardContent";
import Center from "./center";
import { Typography } from "@mui/material";
import useForm from "./hooks/useForm";
import { createAPIEndpoint } from "./api";
import { ENDPOINTS } from "./api";
import useStateContext from "./hooks/useStateContext";
import { useNavigate } from "react-router";
import App from "../App";
const getFreshModel=()=>()=>({
    name:'',
    email:''
})
export default function Login() {
  const{context,setContext}=useStateContext()
 const{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange } =
        useForm(getFreshModel);

   const navigate = useNavigate()     
   
 const login = e=> {
    e.preventDefault();
    if(validate())
    if(validate())
    createAPIEndpoint(ENDPOINTS.participant)
        .post(values)      
        .then(res=>{
          setContext({participantId:res.data.participantId})
          navigate('/quiz') })
      .catch(err=>console.log(err))
     
 }
 const validate=()=>{
    let temp={}
    temp.email=(/\S+@\S+\.\S+/).test(values.email)?"":"Email is not valid."
    temp.name=values.name!=""?"":"This field is required."
    setErrors(temp)
    return Object.values(temp).every(x => x == "")
 }
//  const myStyle={
//   backgroundImage:   `url(${"https://lumiere-a.akamaihd.net/v1/images/pp_frozen_herobanner_mobile_20501_ae840c59.jpeg?region=0,0,1024,768"})`,
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           };
  return (
    <Center>
      <Card sx={{ width: "400px" }} >
        <CardContent>
          <Typography variant="h4" sx={{ my: "3", textAlign: "center" }}>
            Quiz App
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                margin: 1,
                width: "95%",
              },
            }}
          >
            <form noValidate autoComplete="off" onSubmit={login}>
              <TextField
                id="outlined-basic"
                name="email"
                label="Email"
                variant="outlined"
                value={values.email}
                onChange={handleInputChange}
                {...(errors.email &&{ error:true,helperText:errors.email})}

              />
              <TextField
                id="outlined-basic"
                name="name"
                label="Name"
                variant="outlined"
                value={values.name}
                onChange={handleInputChange}
                {...(errors.name &&{ error:true,helperText:errors.name})}

              />

              <Button
                type="submit"
                sx={{ width: "95%" }}
                variant="contained"
                size="large"
              >
                Start
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}
