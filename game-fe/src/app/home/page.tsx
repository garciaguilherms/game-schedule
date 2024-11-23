"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupsIcon from "@mui/icons-material/Groups";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from '@mui/icons-material/BarChart';
import React, { useState } from "react";
import { 
  Box, 
  Button, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  MenuItem 
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import ptBrLocale from "@fullcalendar/core/locales/pt-br"; 


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
            Inicio
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

export default function Home() {
  const [events, setEvents] = useState([
    { id: "1", title: "Jogo 1: Time A vs Time B", start: "2024-11-22T10:00:00", end: "2024-11-22T11:30:00", status: "Pendente" },
    { id: "2", title: "Jogo 2: Time C vs Time D", start: "2024-11-23T14:00:00", end: "2024-11-23T15:30:00", status: "Pendente" },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [openConcludeDialog, setOpenConcludeDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newGame, setNewGame] = useState({
    homeTeam: "",
    awayTeam: "",
    date: "",
    startTime: "",
  });
  const [result, setResult] = useState("");

  const handleAddEvent = () => {
    const { homeTeam, awayTeam, date, startTime } = newGame;

    if (!homeTeam || !awayTeam || !date || !startTime) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const start = `${date}T${startTime}`;
    const end = new Date(new Date(start).getTime() + 90 * 60 * 1000).toISOString();

    const title = `${homeTeam} vs ${awayTeam}`;
    const id = String(events.length + 1);

    setEvents([...events, { id, title, start, end, status: "Pendente" }]);
    setNewGame({ homeTeam: "", awayTeam: "", date: "", startTime: "" });
    setOpenDialog(false);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setOpenEventDialog(true);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event.id !== selectedEvent.id));
    setOpenEventDialog(false);
  };

  const handleEditEvent = () => {
    const [homeTeam, awayTeam] = selectedEvent.title.split(" vs ");
    setNewGame({
      homeTeam: homeTeam.trim(),
      awayTeam: awayTeam.trim(),
      date: selectedEvent.start.toISOString().split("T")[0],
      startTime: selectedEvent.start.toISOString().split("T")[1].substring(0, 5),
    });
    setOpenEventDialog(false);
    setOpenDialog(true);
  };

  const handleConcludeEvent = () => {
    setOpenEventDialog(false);
    setOpenConcludeDialog(true);
  };

  const handleSaveResult = () => {
    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id
        ? { ...event, status: result, title: `${selectedEvent.title} (${result})` }
        : event
    );

    setEvents(updatedEvents);
    setOpenConcludeDialog(false);
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
      <ButtonAppBar/>
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
            right: "timeGridWeek,dayGridMonth",
          }}
          events={events}
          editable={true}
          selectable={true}
          allDaySlot={false}
          locale={ptBrLocale}
          eventClick={handleEventClick} // Captura o clique no evento
        />
      </Box>

      {/* Modal para Adicionar/Editar Novo Jogo */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedEvent ? "Editar Jogo" : "Adicionar Novo Jogo"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Equipe da Casa"
            fullWidth
            margin="dense"
            value={newGame.homeTeam}
            onChange={(e) => setNewGame({ ...newGame, homeTeam: e.target.value })}
          />
          <TextField
            label="Equipe Visitante"
            fullWidth
            margin="dense"
            value={newGame.awayTeam}
            onChange={(e) => setNewGame({ ...newGame, awayTeam: e.target.value })}
          />
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

      {/* Modal para Opções de Evento */}
      <Dialog open={openEventDialog} onClose={() => setOpenEventDialog(false)}>
        <DialogTitle>Opções do Jogo</DialogTitle>
        <DialogContent>
          <p>Deseja editar, excluir ou concluir este jogo?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditEvent} color="primary">
            Editar
          </Button>
          <Button onClick={handleDeleteEvent} color="error">
            Excluir
          </Button>
          <Button onClick={handleConcludeEvent} color="success">
            Concluir
          </Button>
          <Button onClick={() => setOpenEventDialog(false)} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para Concluir Jogo */}
      <Dialog open={openConcludeDialog} onClose={() => setOpenConcludeDialog(false)}>
        <DialogTitle>Concluir Jogo</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Resultado"
            fullWidth
            margin="dense"
            value={result}
            onChange={(e) => setResult(e.target.value)}
          >
            <MenuItem value="Empate">Empate</MenuItem>
            <MenuItem value="Vitória da Casa">Vitória da Casa</MenuItem>
            <MenuItem value="Vitória do Visitante">Vitória do Visitante</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConcludeDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveResult} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
