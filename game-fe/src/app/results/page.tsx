"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { ButtonAppBar } from "../home/page";

export default function Results() {
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = async () => {
    try {
      const response = await axios.get("http://localhost:3000/games/results");
      setResults(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Erro ao carregar os results dos jogos");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGames();
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
      {error && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
      <Grid container spacing={6} justifyContent="center">
        {results.map((jogo, index) => {
          const gameDate = new Date(jogo.dateTime);
          const gameDateString = gameDate.toLocaleString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          const homeTeamName = jogo.homeTeam.name || `Time ${jogo.homeTeamId}`;
          const awayTeamName = jogo.awayTeam.name || `Time ${jogo.awayTeamId}`;

          return (
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
                  <Typography variant="h6">{homeTeamName}</Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <span style={{ color: "red" }}>{jogo.homePoints}</span>
                    <span style={{ color: "black" }}>x</span>
                    <span style={{ color: "green" }}>{jogo.awayPoints}</span>
                  </Typography>
                  <Typography variant="h6">{awayTeamName}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {gameDateString}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
