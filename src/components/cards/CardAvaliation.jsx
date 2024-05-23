import React from "react";
import { useState } from "react";
import { Rating } from "primereact/rating";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function CardAvaliation(props) {
  const [setValue] = useState(0);
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">{bull} {props.username}</Typography>
        <Typography variant="body2">{props.comment}</Typography>
        <div className="Rating--bar">
          <Rating
            value={props.avaliation}
            cancel={false}
            onChange={(e) => setValue(e.value)}
            stars={props.avaliation}
          />
        </div>
      </CardContent>
    </Card>
  );
}
