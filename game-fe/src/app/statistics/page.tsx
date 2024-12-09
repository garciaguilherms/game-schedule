"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { ButtonAppBar } from "../home/page";

export default function Statistics() {
  const [stats, setStats] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get("http://localhost:3000/statistics");
      setStats(response.data);
    } catch (err) {
      setError("Erro ao carregar as estatísticas dos times.");
      console.error(err);
    }
  };

  const calculateWinPercentage = (wins: number, games: number) =>
    games > 0 ? ((wins / games) * 100).toFixed(1) + "%" : "0%";

  useEffect(() => {
    fetchStatistics();
  }, []);

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
        {error && (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        )}
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
                  <TableCell>{stat.team.name}</TableCell>
                  <TableCell align="center">
                    {stat.wins + stat.losses + stat.draws}
                  </TableCell>
                  <TableCell align="center">{stat.wins}</TableCell>
                  <TableCell align="center">{stat.draws}</TableCell>
                  <TableCell align="center">{stat.losses}</TableCell>
                  <TableCell align="center">
                    {calculateWinPercentage(
                      stat.wins,
                      stat.wins + stat.losses + stat.draws,
                    )}
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
