import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  AppBar,
  Toolbar,
  Button,
  Fab,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupsIcon from "@mui/icons-material/Groups";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import BarChartIcon from '@mui/icons-material/BarChart';

function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#005287",
          zIndex: 1301,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Resultados
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link href="/home" passHref>
              <Button
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <HomeIcon sx={{ fontSize: 18 }} />
                Início
              </Button>
            </Link>

            <Link href="/matches" passHref>
              <Button
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <SportsSoccerIcon sx={{ fontSize: 18 }} />
                Partidas
              </Button>
            </Link>
            <Link href="/results" passHref>
              <Button
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <GroupsIcon sx={{ fontSize: 18 }} />
                Resultados
              </Button>
            </Link>
            <Link href="/statistics" passHref>
              <Button
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <BarChartIcon sx={{ fontSize: 18 }} />
                Estatísticas
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default function Results() {
  const resultados = [
    { time1: "Time 1", time2: "Time 2", placar1: 2, placar2: 1 },
    { time1: "Time 3", time2: "Time 4", placar1: 1, placar2: 1 },
    { time1: "Time 5", time2: "Time 6", placar1: 3, placar2: 0 },
    { time1: "Time 7", time2: "Time 8", placar1: 0, placar2: 2 },
    { time1: "Time 7", time2: "Time 8", placar1: 0, placar2: 2 },
    { time1: "Time 7", time2: "Time 8", placar1: 0, placar2: 2 },
  ];

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
        {resultados.map((jogo, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={6}
              sx={{
                padding: 3,
                textAlign: "center",
                backgroundColor: "#f2f2f2",
                borderRadius: 2,
                boxShadow: 3,
                height: "180px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <Typography variant="h6" color="primary">
                Jogo {index + 1}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  alt={jogo.time1}
                  src={`https://via.placeholder.com/40?text=${jogo.time1}`}
                  sx={{ width: 40, height: 40 }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <span style={{ color: "red" }}>{jogo.placar1}</span>
                  <span style={{ color: "black" }}>x</span>
                  <span style={{ color: "green" }}>{jogo.placar2}</span>
                </Typography>
                <Avatar
                  alt={jogo.time2}
                  src={`https://via.placeholder.com/40?text=${jogo.time2}`}
                  sx={{ width: 40, height: 40 }}
                />
              </Box>
              <Typography variant="body2" color="textSecondary">
                Data do jogo
              </Typography>
            </Paper>
          </Grid>
        ))}


        <Grid item xs={12} sm={6} md={4}>
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "150px",
            }}
          >
            <Typography variant="h6" sx={{ marginRight: 2 }}>
              Adicionar novo resultado
            </Typography>
            <Fab color="primary" size="small">
              <AddIcon />
            </Fab>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
