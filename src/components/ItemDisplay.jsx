import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const ItemDisplay = ({ item }) => {
  return (
    <Card sx={{ maxWidth: 400, margin: "auto", boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Course: {item?.course}
        </Typography>
        <Box sx={{ marginBottom: 1 }}>
          <Typography variant="body1" component="p">
            <strong>Student:</strong> {item.student.firstname}{" "}
            {item.student.lastname} (ID: {item.student.id})
          </Typography>
        </Box>
        <Box sx={{ marginBottom: 1 }}>
          <Typography variant="body1" component="p">
            <strong>Date:</strong> {item.date}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: 1 }}>
          <Typography variant="body1" component="p">
            <strong>Grade:</strong> {item.grade}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ItemDisplay;
