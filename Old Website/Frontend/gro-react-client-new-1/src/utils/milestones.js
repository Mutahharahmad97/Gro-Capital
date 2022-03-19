import axios from 'axios';
import {apiVars} from '../config/env';

export default function(amount,type)
{
    try
    {
        let profile=JSON.parse(localStorage.getItem("profile"));
        axios.post(apiVars.newApplicantNotification,{id:localStorage.getItem("userId"),name:profile.first_name+' '+profile.last_name,email:profile.email,amount,type}).then(response=>{console.log(response);});
    }   
    catch(err)
    {
        console.log(err);
    }
}