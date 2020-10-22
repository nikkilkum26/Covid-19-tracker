import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import './infoBox.css';
function infoBox({ title, cases, active, isRed,isGreen,isBlack,total , ...props }) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"} ${isGreen && "infoBox--green"} ${isBlack && "infoBox--black"} `}>
            <CardContent>
{/* title
number of cases
Total */}

        <Typography className="infoBox__title" color="textSecondary">
            {title}
        </Typography >
        
        <h2 className={`infoBox__cases ${(!isRed && !isBlack)&& "infoBox__cases--green"} ${(!isRed && !isGreen)&& "infoBox__cases--black"}`}> {cases} </h2>
        
        <Typography className="infoBox__total" color="textSecondary">
            {total} Total
        </Typography >
   
           </CardContent>
        </Card>
    )
}

export default infoBox
