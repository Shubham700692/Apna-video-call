import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import "../styles/history.css";

import { IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
export default function History() {



    const { getHistoryOfUser } = useContext(AuthContext);

    const [meetings, setMeetings] = useState([])


    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }

    return (
        <div className="historyPage">

            <div className="historyHeader">
            <IconButton  onClick={() => {
                routeTo("/home")
            }}>
                <HomeIcon sx={{ color: "white", fontSize:"50px" }}/>
            </IconButton >
            </div>

            <div className="historyList">
                {(meetings.length !== 0) ? meetings.map((e, i) => {
                    return (

                        <>


                            <Card key={i} className="historyCard" >


                                <CardContent>
                                   <Typography className="historyText">
                                     <strong>Code:</strong> {e.meetingCode}
                                   </Typography>

                                   <Typography className="historyText">
                                     <strong>Date:</strong> {formatDate(e.date)}
                                   </Typography>
                                 </CardContent>

                            </Card>


                        </>
                    )
                }) :(
      <p className="noHistory">No meetings found</p>
    ) 

            }
            </div>

        </div>
    )
}
