import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  IconButton,
  AppBar,
  Toolbar,
  Button,
  Fab,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupsIcon from "@mui/icons-material/Groups";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
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
            Partidas
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
              Adicionar nova partida
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
