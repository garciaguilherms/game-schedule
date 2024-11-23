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
import { ButtonAppBar } from "../home/page";

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
