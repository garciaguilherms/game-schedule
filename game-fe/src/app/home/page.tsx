"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import GroupsIcon from "@mui/icons-material/Groups";
import Link from "next/link";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import React, { useState, useEffect, useRef } from "react";
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
  Alert,
  Modal,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
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
  homeTeamId?: number;
  awayTeamId?: number;
  result?: string;
  gameLocationId?: number;
}

interface Team {
  id: number;
  name: string;
}

interface GameLocation {
  id: number;
  name: string;
}

export default function Home() {
  const [error, setError] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openFinishDialog, setOpenFinishDialog] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Game | null>(null);
  const [openActionModal, setOpenActionModal] = useState(false);
  const [gameLocations, setGameLocations] = useState<GameLocation[]>([]);
  const [gameResult, setGameResult] = useState({
    homePoints: 0,
    awayPoints: 0,
    result: "",
    winningTeam: null as string | null,
  });

  const [newGame, setNewGame] = useState({
    homeTeam: "",
    awayTeam: "",
    date: "",
    startTime: "",
    gameLocation: "",
  });

  const [filter, setFilter] = useState({
    teamName: "",
    date: "",
    gameStatus: "",
    awayTeamId: "",
    homeTeamId: "",
    gameLocationId: ""
  });

  const calendarRef = useRef<FullCalendar>(null);

  const fetchGames = async (
    teams: Team[],
    gameLocations?: GameLocation[],
    filters?: {
      teamName?: string;
      date?: string;
      gameStatus?: string;
      awayTeamId?: string;
      homeTeamId?: string;
      gameLocationId?: string;
    },
  ) => {
    try {
      const params = new URLSearchParams();
      if (filters?.teamName) params.append("teamName", filters.teamName);
      if (filters?.date) params.append("date", filters.date);
      if (filters?.gameStatus) params.append("gameStatus", filters.gameStatus);
      if (filters?.awayTeamId) params.append("awayTeamId", filters.awayTeamId);
      if (filters?.homeTeamId) params.append("homeTeamId", filters.homeTeamId);
      if (filters?.gameLocationId) params.append("gameLocationId", filters.gameLocationId);

      const response = await axios.get(
        `http://localhost:3000/games?${params.toString()}`,
      );
      const formattedGames = response.data
        .map(
          (game: {
            homeTeamId: number;
            awayTeamId: number;
            id: { toString: () => any };
            dateTime: string | number | Date;
            game_status: any;
            homePoints: number;
            awayPoints: number;
            gameLocationId: number;
          }) => {
            const homeTeam = teams.find((team) => team.id === game.homeTeamId);
            const awayTeam = teams.find((team) => team.id === game.awayTeamId);
            const gameLocation = gameLocations?.find((location) => location.id === game.gameLocationId);

            if (!homeTeam || !awayTeam) {
              console.error("Erro: Jogo sem equipe(s) definida(s)", game);
              return null;
            }

            if (!gameLocation) {
              console.error("Erro: Jogo sem local", game);
              return null;
            }

            const isFinalized = game.game_status === "finalizado";
            const isDraw = game.game_status === "empate";

            if (isFinalized || isDraw) {
              var title = `${homeTeam.name} ${game.homePoints} x ${game.awayPoints} ${awayTeam.name}`;
            } else {
              var title = `${homeTeam.name} vs ${awayTeam.name}`;
            }

            return {
              id: game.id?.toString(),
              homeTeamId: game.homeTeamId,
              awayTeamId: game.awayTeamId,
              gameLocationId: game.gameLocationId,
              dateTime: game.dateTime,
              title: title,
              start: game.dateTime,
              end: new Date(
                new Date(game.dateTime).getTime() + 90 * 60000,
              ).toISOString(),
              game_status: game.game_status,
              isDraw,
            };
          },
        )
        .filter((game: null) => game !== null);

      setGames(formattedGames as Game[]);

      if (formattedGames.length > 0) {
        const firstGameDate = formattedGames[0].start;
        const calendarApi = calendarRef.current?.getApi();
        calendarApi?.gotoDate(firstGameDate);
      }
    } catch (error) {
      console.error("Erro ao carregar os jogos:", error);
    }
  };

  const handleAddGame = async () => {
    const { homeTeam, awayTeam, date, startTime, gameLocation } = newGame;
    const dateTime = new Date(`${date}T${startTime}`).toISOString();

    if (!homeTeam || !awayTeam || !date || !startTime || !gameLocation) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/games", {
        homeTeamId: homeTeam,
        awayTeamId: awayTeam,
        dateTime,
        gameLocationId: gameLocation
      });

      setError(null);
      fetchGames(teams, gameLocations);
      setNewGame({
        homeTeam: "",
        awayTeam: "",
        date: "",
        startTime: "",
        gameLocation: "",
      });
      setOpenAddDialog(false);
    } catch (error: any) {
      console.log(error);
      setError(
        error.response?.data?.message ||
          "Erro ao criar o jogo. Tente novamente.",
      );
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
    const [date, time] = game.dateTime.split("T");
    const formattedTime = time.slice(0, 5);

    console.log(game)
    setNewGame({
      homeTeam: game.homeTeamId.toString(),
      awayTeam: game.awayTeamId.toString(),
      gameLocation: game.gameLocationId,
      date: date,
      startTime: formattedTime,
    });

    setSelectedEvent(game);
    setOpenEditDialog(true);
  };

  const handleSaveEditGame = async () => {
    if (!selectedEvent) return;

    const { homeTeam, awayTeam, date, startTime, gameLocation } = newGame;
    const dateTime = new Date(`${date}T${startTime}`).toISOString();

    if (!homeTeam || !awayTeam || !date || !startTime) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/games/${selectedEvent.id}`, {
        homeTeamId: parseInt(homeTeam),
        awayTeamId: parseInt(awayTeam),
        gameLocationId: parseInt(gameLocation),
        dateTime,
      });

      fetchGames(teams, gameLocations);
      setSelectedEvent(null);
      setOpenEditDialog(false);
      setOpenActionModal(false);
      setError(null);
      setNewGame({
        homeTeam: "",
        awayTeam: "",
        date: "",
        startTime: "",
        gameLocation: "",
      });
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Erro ao criar o jogo. Tente novamente.",
      );
      console.log(error.response.data.message);
    }
  };

  const handleFinishGame = async (game: Game) => {
    if (gameResult.homePoints === null || gameResult.awayPoints === null) {
      alert("Por favor, insira os gols de ambos os times.");
      return;
    }

    let game_status = "empate";
    let winningTeamId = null;

    if (gameResult.homePoints > gameResult.awayPoints) {
      game_status = "finalizado";
      winningTeamId = game.homeTeamId;
    } else if (gameResult.awayPoints > gameResult.homePoints) {
      game_status = "finalizado";
      winningTeamId = game.awayTeamId;
    }

    const resultPayload = {
      game_status: game_status,
      winningTeamId: winningTeamId,
      homePoints: gameResult.homePoints,
      awayPoints: gameResult.awayPoints,
    };

    try {
      await axios.patch(
        `http://localhost:3000/games/${game.id}/result`,
        resultPayload,
      );

      setOpenFinishDialog(false);
      setOpenActionModal(false);

      const updatedGames = games.map((g) =>
        g.id === game.id
          ? { ...g, result: game_status, winningTeamId: winningTeamId }
          : g,
      );
      setGames(updatedGames);
      fetchGames(teams, gameLocations);
    } catch (error) {
      console.error("Erro ao registrar o resultado do jogo:", error);
    }
  };

  const getGameById = (gameId: string) => {
    return games.find((game) => game.id.toString() === gameId);
  };

  const isGameFinalized = (game: any) => {
    return game?.game_status === "finalizado";
  };

  const isGameTied = (game: any) => {
    return game?.game_status === "empate";
  };

  const handleEventClick = (info: { event: { id: any } }) => {
    const selectedGame = getGameById(info.event.id);

    if (isGameFinalized(selectedGame) || isGameTied(selectedGame)) {
      alert("Este jogo já tem um resultado e não pode ser editado!");
      return;
    }

    setSelectedEvent(selectedGame);
    setOpenActionModal(true);
  };

  const getEventClassNames = (info: { event: { id: any } }) => {
    const game = getGameById(info.event.id);
    if (isGameFinalized(game)) {
      return ["event-finalizado"];
    } else if (isGameTied(game)) {
      return ["event-empate"];
    }
    return [];
  };

  const closeEditModal = () => {
    setOpenEditDialog(false);
    setNewGame({
      homeTeam: "",
      awayTeam: "",
      date: "",
      startTime: "",
      gameLocationId: "",
    });
  };

  useEffect(() => {
    const fetchTeamsAndGames = async () => {
      try {
        const teamResponse = await axios.get("http://localhost:3000/teams");
        setTeams(teamResponse.data);

        const gameLocationResponse = await axios.get("http://localhost:3000/game-location");
        setGameLocations(gameLocationResponse.data);

        fetchGames(teamResponse.data, gameLocationResponse.data);

      } catch (error) {
        console.error("Erro ao carregar equipes e locais de jogos:", error);
      }
    };

    fetchTeamsAndGames();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilter = () => {
    fetchGames(teams, gameLocations, filter);
  };

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
      <Box sx={{ display: "flex", gap: 4, marginBottom: 4, width: "1000px" }}>
        <TextField
          label="Buscar por Time"
          variant="outlined"
          value={filter.teamName}
          onChange={(e) => handleFilterChange("teamName", e.target.value)}
          sx={{ width: "100%" }}
        />
        <TextField
          label="Data do Jogo"
          type="date"
          variant="outlined"
          value={filter.date}
          onChange={(e) => handleFilterChange("date", e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ width: "100%" }}
        />
        <FormControl variant="outlined" sx={{ width: "100%" }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filter.gameStatus}
            onChange={(e) => handleFilterChange("gameStatus", e.target.value)}
            label="Status"
          >
            <MenuItem value="finalizado">Finalizado</MenuItem>
            <MenuItem value="empate">Empate</MenuItem>
            <MenuItem value="null">Pendente</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ width: "100%" }}>
          <InputLabel>Time da Casa</InputLabel>
          <Select
            value={filter.homeTeamId || ""}
            onChange={(e) => handleFilterChange("homeTeamId", e.target.value)}
            label="Time da Casa"
          >
            {teams.map((team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ width: "100%" }}>
          <InputLabel>Time Visitante</InputLabel>
          <Select
            value={filter.awayTeamId || ""}
            onChange={(e) => handleFilterChange("awayTeamId", e.target.value)}
            label="Time Visitante"
          >
            {teams.map((team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ width: "100%" }}>
          <InputLabel>Estádio</InputLabel>
          <Select
            value={filter.gameLocationId || ""}
            onChange={(e) => handleFilterChange("stadiumId", e.target.value)}
            label="Estádio"
          >
            {gameLocations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        <Button variant="contained" color="primary" onClick={applyFilter}>
          Filtrar
        </Button>
      </Box>
      <ButtonAppBar />
      <Box
        sx={{
          width: "80%",
          height: "80%",
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
          onClick={() => setOpenAddDialog(true)}
        >
          Adicionar Novo Jogo
        </Button>
        <FullCalendar
          ref={calendarRef}
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
          eventClick={handleEventClick}
          eventClassNames={getEventClassNames}
        />
      </Box>

      {/* Modal para adicionar novo jogo */}
      <Modal
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        aria-labelledby="add-game-modal"
        aria-describedby="add-game-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            id="add-game-modal"
            variant="h6"
            component="h2"
            sx={{ marginBottom: 2 }}
          >
            Adicionar Novo Jogo
          </Typography>

          {error && (
            <Box sx={{ marginBottom: 4, textAlign: "center" }}>
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            </Box>
          )}

          <FormControl fullWidth margin="normal">
            <InputLabel id="home-team-label">Equipe da Casa</InputLabel>
            <Select
              labelId="home-team-label"
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
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="away-team-label">Equipe Visitante</InputLabel>
            <Select
              labelId="away-team-label"
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
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="game-date"></InputLabel>
            <TextField
              id="game-date"
              type="date"
              fullWidth
              value={newGame.date}
              onChange={(e) => setNewGame({ ...newGame, date: e.target.value })}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="start-time"></InputLabel>
            <TextField
              id="start-time"
              type="time"
              fullWidth
              value={newGame.startTime}
              onChange={(e) =>
                setNewGame({ ...newGame, startTime: e.target.value })
              }
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
          <InputLabel id="stadium-label">Estádio</InputLabel>
          <Select
            labelId="stadium-label"
            value={newGame.gameLocation || ""}
            onChange={(e) =>
              setNewGame({ ...newGame, gameLocation: e.target.value })
            }
          >
            {gameLocations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              marginTop: 2,
            }}
          >
            <Button
              onClick={() => setOpenAddDialog(false)}
              variant="outlined"
              color="error"
            >
              Cancelar
            </Button>
            <Button onClick={handleAddGame} variant="contained" color="primary">
              Adicionar Jogo
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal para editar jogo */}
      <Modal
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        aria-labelledby="edit-game-modal"
        aria-describedby="edit-game-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            id="edit-game-modal"
            variant="h6"
            component="h2"
            sx={{ marginBottom: 2 }}
          >
            Editar Jogo
          </Typography>

          {error && (
            <Box sx={{ marginBottom: 4, textAlign: "center" }}>
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            </Box>
          )}

          <FormControl fullWidth margin="normal">
            <InputLabel id="home-team-label">Equipe da Casa</InputLabel>
            <Select
              labelId="home-team-label"
              value={selectedEvent?.homeTeamId || ""}
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  homeTeamId: e.target.value,
                })
              }
            >
              {teams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="away-team-label">Equipe Visitante</InputLabel>
            <Select
              labelId="away-team-label"
              value={selectedEvent?.awayTeamId || ""}
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  awayTeamId: e.target.value,
                })
              }
            >
              {teams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="game-date"></InputLabel>
            <TextField
              id="game-date"
              type="date"
              fullWidth
              value={selectedEvent?.dateTime.split("T")[0] || ""}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, dateTime: e.target.value })
              }
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="start-time"></InputLabel>
            <TextField
              id="start-time"
              type="time"
              fullWidth
              value={selectedEvent?.dateTime.split("T")[1] || ""}
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  dateTime: `${selectedEvent.dateTime.split("T")[0]}T${e.target.value}:00`,
                })
              }
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
          <InputLabel id="stadium-label">Estádio</InputLabel>
          <Select
            labelId="stadium-label"
            value={selectedEvent?.gameLocationId || ""}
            onChange={(e) =>
              setSelectedEvent({
                ...selectedEvent,
                gameLocationId: e.target.value,
              })
            }
          >
            {gameLocations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              marginTop: 2,
            }}
          >
            <Button onClick={closeEditModal} variant="outlined" color="error">
              Cancelar
            </Button>
            <Button
              onClick={handleSaveEditGame}
              variant="contained"
              color="primary"
            >
              Salvar Alterações
            </Button>
          </Box>
        </Box>
      </Modal>

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
          <TextField
            label="Gols do Time da Casa"
            type="number"
            value={gameResult.homePoints || ""}
            onChange={(e) =>
              setGameResult({
                ...gameResult,
                homePoints: parseInt(e.target.value),
              })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Gols do Time Visitante"
            type="number"
            value={gameResult.awayPoints || ""}
            onChange={(e) =>
              setGameResult({
                ...gameResult,
                awayPoints: parseInt(e.target.value),
              })
            }
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFinishDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={() => selectedEvent && handleFinishGame(selectedEvent)}
            color="primary"
            disabled={
              gameResult.homePoints === null || gameResult.awayPoints === null
            }
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
