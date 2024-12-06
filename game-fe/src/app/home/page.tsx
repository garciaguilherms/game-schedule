"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import GroupsIcon from "@mui/icons-material/Groups";
import Link from "next/link";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RadioGroup from "@mui/material/RadioGroup";
import BarChartIcon from "@mui/icons-material/BarChart";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventClickArg } from "@fullcalendar/core";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import axios from "axios";

export function ButtonAppBar() {
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
            Grade de Jogos
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
                <CalendarMonthIcon sx={{ fontSize: 18 }} />
                Grade de Jogos
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
                TIMES
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

interface Game {
  id?: number;
  dateTime: string;
  homeTeamId: number;
  awayTeamId: number;
  result?: string;
}

interface Team {
  id: number;
  name: string;
}

export default function Home() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openFinishDialog, setOpenFinishDialog] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Game | null>(null);
  const [openActionModal, setOpenActionModal] = useState(false);
  const [gameResult, setGameResult] = useState({
    result: "", // pode ser 'win' ou 'draw'
    winningTeam: null as string | null,
  });

  const [newGame, setNewGame] = useState({
    homeTeam: "",
    awayTeam: "",
    date: "",
    startTime: "",
  });

  const handleEventClick = (clickInfo: EventClickArg) => {
    const eventId = clickInfo.event.id;
    const game = games.find((g) => g.id?.toString() === eventId);
    if (game) {
      setSelectedEvent(game);
      setOpenActionModal(true);
    }
  };

  const fetchGames = async (teams: Team[]) => {
    try {
      const response = await axios.get("http://localhost:3000/games");

      const formattedGames = response.data
        .map(
          (game: {
            homeTeamId: number;
            awayTeamId: number;
            id: { toString: () => any };
            dateTime: string | number | Date;
            status: any;
          }) => {
            const homeTeam = teams.find((team) => team.id === game.homeTeamId);
            const awayTeam = teams.find((team) => team.id === game.awayTeamId);

            if (!homeTeam || !awayTeam) {
              console.error("Erro: Jogo sem equipe(s) definida(s)", game);
              return null;
            }

            return {
              id: game.id?.toString(),
              homeTeamId: game.homeTeamId,
              awayTeamId: game.awayTeamId,
              dateTime: game.dateTime,
              title: `${homeTeam.name} vs ${awayTeam.name}`,
              start: game.dateTime,
              end: new Date(
                new Date(game.dateTime).getTime() + 90 * 60000,
              ).toISOString(),
              status: game.status,
            };
          },
        )
        .filter((game: null) => game !== null);

      setGames(formattedGames as Game[]);
    } catch (error) {
      console.error("Erro ao carregar os jogos:", error);
    }
  };

  const handleAddGame = async () => {
    const { homeTeam, awayTeam, date, startTime } = newGame;
    const dateTime = new Date(`${date}T${startTime}`).toISOString();

    if (!homeTeam || !awayTeam || !date || !startTime) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/games", {
        homeTeamId: homeTeam,
        awayTeamId: awayTeam,
        dateTime,
      });

      fetchGames(teams);
      setNewGame({
        homeTeam: "",
        awayTeam: "",
        date: "",
        startTime: "",
      });
      setOpenDialog(false);
    } catch (error) {
      console.error("Erro ao adicionar jogo:", error);
    }
  };

  const handleDeleteGame = async (id: number | undefined) => {
    if (!id) return;
    try {
      await axios.delete(`http://localhost:3000/games/${id}`);
      setGames(games.filter((game) => game.id !== id));
      setOpenActionModal(false);
    } catch (error) {
      console.error("Erro ao excluir o jogo:", error);
    }
  };

  const handleEditGame = (game: Game) => {
    setNewGame({
      homeTeam: game.homeTeamId.toString(),
      awayTeam: game.awayTeamId.toString(),
      date: game.dateTime.split("T")[0],
      startTime: game.dateTime.split("T")[1].slice(0, 5),
    });
    setSelectedEvent(game);
    setOpenDialog(true);
  };

  const handleSaveEditGame = async () => {
    if (!selectedEvent) return;

    const { homeTeam, awayTeam, date, startTime } = newGame;
    const dateTime = new Date(`${date}T${startTime}`).toISOString();

    if (!homeTeam || !awayTeam || !date || !startTime) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/games/${selectedEvent.id}`, {
        homeTeamId: parseInt(homeTeam),
        awayTeamId: parseInt(awayTeam),
        dateTime,
      });

      fetchGames(teams);
      setNewGame({
        homeTeam: "",
        awayTeam: "",
        date: "",
        startTime: "",
      });
      setSelectedEvent(null);
      setOpenDialog(false);
      setOpenActionModal(false);
    } catch (error) {
      console.error("Erro ao editar jogo:", error);
    }
  };

  const handleFinishGame = async (game: Game) => {
    if (!game) {
      console.error("Jogo inválido.");
      return;
    }

    if (!gameResult.result) {
      alert("Por favor, selecione o resultado do jogo.");
      return;
    }

    try {
      const resultPayload = {
        gameId: game.id,
        result: gameResult.result,
        homeTeamId: game.homeTeamId,
        awayTeamId: game.awayTeamId,
        winningTeamId:
          gameResult.result === "win" ? gameResult.winningTeam : null,
      };

      await axios.post("http://localhost:3000/game-result", resultPayload);

      alert("Resultado registrado com sucesso!");

      setOpenFinishDialog(false);
      setOpenActionModal(false);

      const updatedGames = games.map((g) =>
        g.id === game.id ? { ...g, result: gameResult.result } : g,
      );
      setGames(updatedGames);
    } catch (error) {
      console.error("Erro ao registrar o resultado do jogo:", error);
      alert("Ocorreu um erro ao registrar o resultado.");
    }
  };

  const handleChangeResult = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedResult = event.target.value as string;
    setGameResult((prevState) => ({
      ...prevState,
      result: selectedResult,
      winningTeam: selectedResult === "win" ? "" : prevState.winningTeam, // resetar winningTeam se for empate
    }));
  };

  useEffect(() => {
    const fetchTeamsAndGames = async () => {
      try {
        const teamResponse = await axios.get("http://localhost:3000/teams");
        setTeams(teamResponse.data);
        fetchGames(teamResponse.data);
      } catch (error) {
        console.error("Erro ao carregar equipes e jogos:", error);
      }
    };

    fetchTeamsAndGames();
  }, []);

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #ffffff, #eaf6fc)",
        minHeight: "100vh",
        paddingTop: "80px",
        paddingBottom: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ButtonAppBar />
      <Box
        sx={{
          width: "90%",
          maxWidth: "1200px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: "20px" }}
          onClick={() => setOpenDialog(true)}
        >
          Adicionar Novo Jogo
        </Button>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek",
          }}
          events={games}
          editable={true}
          selectable={true}
          allDaySlot={false}
          locale={ptBrLocale}
          timeZone="local"
          eventClick={(info) => {
            const selectedGame = games.find(
              (game) => game.id.toString() === info.event.id,
            );

            if (selectedGame && selectedGame.result) {
              alert("Este jogo já tem um resultado e não pode ser editado!");
              return;
            }

            setSelectedEvent(selectedGame);
            setOpenActionModal(true);
          }}
          eventClassNames={(info) => {
            const game = games.find(
              (game) => game.id.toString() === info.event.id,
            );
            return game?.result ? ["event-finalizado"] : [];
          }}
        />
      </Box>

      {/* Modal para Adicionar/Editar Novo Jogo */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedEvent ? "Editar Jogo" : "Adicionar Novo Jogo"}
        </DialogTitle>
        <DialogContent>
          <Select
            label="Equipe da Casa"
            fullWidth
            margin="dense"
            value={newGame.homeTeam}
            onChange={(e) =>
              setNewGame({ ...newGame, homeTeam: e.target.value })
            }
          >
            {teams.map((team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            label="Equipe Visitante"
            fullWidth
            margin="dense"
            value={newGame.awayTeam}
            onChange={(e) =>
              setNewGame({ ...newGame, awayTeam: e.target.value })
            }
          >
            {teams.map((team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Data do Jogo"
            type="date"
            fullWidth
            margin="dense"
            value={newGame.date}
            onChange={(e) => setNewGame({ ...newGame, date: e.target.value })}
          />
          <TextField
            label="Horário de Início"
            type="time"
            fullWidth
            margin="dense"
            value={newGame.startTime}
            onChange={(e) =>
              setNewGame({ ...newGame, startTime: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={selectedEvent ? handleSaveEditGame : handleAddGame}
            color="primary"
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openActionModal} onClose={() => setOpenActionModal(false)}>
        <DialogTitle>Gerenciar Jogo</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Deseja realizar alguma ação para o jogo entre:
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => handleDeleteGame(selectedEvent?.id)}
          >
            Excluir
          </Button>
          <Button
            color="primary"
            onClick={() => selectedEvent && handleEditGame(selectedEvent)}
          >
            Editar
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setGameResult({ result: "", winningTeam: null });
              setOpenFinishDialog(true);
            }}
          >
            Concluir
          </Button>
          <Button onClick={() => setOpenActionModal(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openFinishDialog}
        onClose={() => setOpenFinishDialog(false)}
      >
        <DialogTitle>Registrar Resultado do Jogo</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="result-label">Resultado</InputLabel>
            <Select
              labelId="result-label"
              value={gameResult.result || ""}
              onChange={handleChangeResult}
            >
              <MenuItem value="">Selecione o Resultado</MenuItem>
              <MenuItem value="draw">Empate</MenuItem>
              <MenuItem value="win">Vitória</MenuItem>
            </Select>
          </FormControl>

          {gameResult.result === "win" && selectedEvent && (
            <FormControl fullWidth margin="dense">
              <InputLabel id="winning-team-label">Time Vencedor</InputLabel>
              <Select
                labelId="winning-team-label"
                value={gameResult.winningTeam || ""} // Garantir que nunca seja null
                onChange={(e) =>
                  setGameResult({ ...gameResult, winningTeam: e.target.value })
                }
              >
                <MenuItem value="">Selecione o Time Vencedor</MenuItem>
                {/* Encontrando o time da casa e visitante pelo ID */}
                <MenuItem value={selectedEvent.homeTeamId}>
                  {
                    teams.find((team) => team.id === selectedEvent.homeTeamId)
                      ?.name
                  }{" "}
                  {/* Nome do time da casa */}
                </MenuItem>
                <MenuItem value={selectedEvent.awayTeamId}>
                  {
                    teams.find((team) => team.id === selectedEvent.awayTeamId)
                      ?.name
                  }{" "}
                  {/* Nome do time visitante */}
                </MenuItem>
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={() => selectedEvent && handleFinishGame(selectedEvent)}
            color="primary"
            disabled={
              !gameResult.result ||
              (gameResult.result === "win" && !gameResult.winningTeam)
            }
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
