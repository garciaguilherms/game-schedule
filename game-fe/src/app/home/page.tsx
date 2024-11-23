"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupsIcon from "@mui/icons-material/Groups";
import Link from "next/link";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
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
  Select
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import ptBrLocale from "@fullcalendar/core/locales/pt-br"; 
import axios from 'axios';

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

interface Event {
  id: number;
  title: string;
  start: number;
  end: number;
  status: string;
}

interface Team {
  id: number;
  name: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  const [newGame, setNewGame] = useState({
    homeTeam: "",
    awayTeam: "",
    date: "",
    startTime: "",
  });

  const [games, setGames] = useState();
  const [teams, setTeams] = useState<Team[]>([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    // Função para carregar os times
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:3000/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Erro ao carregar as equipes:", error);
      }
    };
  
    fetchTeams();
  }, []);
  
  useEffect(() => {
    // Função para carregar os jogos
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/games");
        console.log(response.data);
  
        const formattedGames = response.data.map(game => {
          const homeTeam = teams.find(team => team.id === game.homeTeamId);
          const awayTeam = teams.find(team => team.id === game.awayTeamId);
  
          if (!homeTeam || !awayTeam) {
            console.error("Erro: Jogo sem equipe(s) definida(s)", game);
            return null;
          }
  
          return {
            id: game.id,
            title: `${homeTeam.name} vs ${awayTeam.name}`,
            start: game.dateTime, // Data e hora do jogo
            end: new Date(new Date(game.dateTime).getTime() + 90 * 60000).toISOString(),
            status: game.status,
          };
        }).filter(game => game !== null);
  
        setGames(formattedGames);
      } catch (error) {
        console.error("Erro ao carregar os jogos:", error);
      }
    };
  
    if (teams.length > 0) {
      fetchGames();
    }
  }, [teams]);

  const handleAddEvent = async () => {
    const { homeTeam, awayTeam, date, startTime } = newGame;
    const startDate = new Date(`${date}T${startTime}`);
    const endDate = new Date(startDate.getTime() + 90 * 60 * 1000);
    const title = `${homeTeam} vs ${awayTeam}`;
    const eventData = {
      id: Number(events.length + 1),
      title,
      start: startDate.getTime(),
      end: endDate.getTime(),
      status: "Pendente",
    };

    if (!homeTeam || !awayTeam || !date || !startTime) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    axios.post("http://localhost:3000/games", eventData)
    .then(response => {
      console.log("Jogo adicionado com sucesso", response);
      setEvents([...events, eventData]);
    })
    .catch(error => {
      console.error("Erro ao adicionar jogo", error);
    });
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
          events={games} // Use games, que já contém os jogos formatados
          editable={true}
          selectable={true}
          allDaySlot={false}
          locale={ptBrLocale}
        />
      </Box>

      {/* Modal para Adicionar/Editar Novo Jogo */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedEvent ? "Editar Jogo" : "Adicionar Novo Jogo"}</DialogTitle>
        <DialogContent>
          <Select
            label="Equipe da Casa"
            fullWidth
            margin="dense"
            value={newGame.homeTeam}
            onChange={(e) => setNewGame({ ...newGame, homeTeam: e.target.value })}
          >
            {teams.map((team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name} {/* Supondo que o nome da equipe esteja em "name" */}
              </MenuItem>
            ))}
          </Select>
          <Select
            label="Equipe Visitante"
            fullWidth
            margin="dense"
            value={newGame.awayTeam}
            onChange={(e) => setNewGame({ ...newGame, awayTeam: e.target.value })}
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
            onChange={(e) => setNewGame({ ...newGame, startTime: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddEvent} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
