import React from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from '@mui/icons-material/BarChart';
import Link from "next/link";

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
            Estatísticas dos Times
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

export default function Statistics() {
  const stats = [
    {
      team: "Time 1",
      games: 10,
      wins: 6,
      draws: 2,
      losses: 2,
    },
    {
      team: "Time 2",
      games: 10,
      wins: 5,
      draws: 3,
      losses: 2,
    },
    {
      team: "Time 3",
      games: 10,
      wins: 4,
      draws: 4,
      losses: 2,
    },
    {
      team: "Time 4",
      games: 10,
      wins: 3,
      draws: 5,
      losses: 2,
    },
    {
      team: "Time 5",
      games: 10,
      wins: 2,
      draws: 3,
      losses: 5,
    },
  ];

  const calculateWinPercentage = (wins, games) =>
    games > 0 ? ((wins / games) * 100).toFixed(1) + "%" : "0%";

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
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TableContainer
          component={Paper}
          elevation={6}
          sx={{
            maxWidth: "90%",
            borderRadius: 2,
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table>
            <TableHead
              sx={{
                backgroundColor: "#005287",
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Time
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                  align="center"
                >
                  Jogos
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                  align="center"
                >
                  Vitórias
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                  align="center"
                >
                  Empates
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                  align="center"
                >
                  Derrotas
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                  align="center"
                >
                  % Vitórias
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((stat, index) => (
                <TableRow key={index}>
                  <TableCell>{stat.team}</TableCell>
                  <TableCell align="center">{stat.games}</TableCell>
                  <TableCell align="center">{stat.wins}</TableCell>
                  <TableCell align="center">{stat.draws}</TableCell>
                  <TableCell align="center">{stat.losses}</TableCell>
                  <TableCell align="center">
                    {calculateWinPercentage(stat.wins, stat.games)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
