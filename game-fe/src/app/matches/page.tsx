import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { ButtonAppBar } from "../home/page";

export default function Matches() {
  return (
    <Box
      sx={{
        paddingTop: 12,
        paddingX: 10,
        paddingBottom: 12,
        background: "linear-gradient(to bottom, #ffffff, #eaf6fc)",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <ButtonAppBar />
      <Grid container spacing={6} justifyContent="center">
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={6}
              sx={{
                padding: 3,
                textAlign: "center",
                backgroundColor: "#f2f2f2",
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Typography variant="h6" color="primary" gutterBottom>
                Jogo {index + 1}
              </Typography>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Avatar
                    alt="Time 1"
                    src={`https://via.placeholder.com/40?text=Time+1`}
                    sx={{ width: 40, height: 40 }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <CloseIcon sx={{ fontSize: 25 }} />
                </Grid>
                <Grid item>
                  <Avatar
                    alt="Time 2"
                    src={`https://via.placeholder.com/40?text=Time+2`}
                    sx={{ width: 40, height: 40 }}
                  />
                </Grid>
              </Grid>
              <Typography variant="body2" color="textSecondary" mt={2}>
                data do jogo
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
