"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid2,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Alert,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { ButtonAppBar } from "../home/page";
import axios from "axios";

interface Team {
  id: number;
  name: string;
  players: number;
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [createError, setCreateError] = React.useState<string | null>(null);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState({
    id: 0,
    name: "",
    players: 0,
  });
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [newTeam, setNewTeam] = React.useState({ name: "", players: 0 });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchTeams = async (name?: string) => {
    try {
      const query = name ? `?name=${encodeURIComponent(name)}` : "";
      const teamResponse = await axios.get(
        `http://localhost:3000/teams${query}`,
      );
      setTeams(teamResponse.data);
    } catch (error) {
      console.error("Erro ao carregar equipes:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    fetchTeams(term);
  };

  const handleDeleteTeam = async (id: number | undefined) => {
    if (!id) return;
    try {
      await axios.delete(`http://localhost:3000/teams/${id}`);
      setTeams(teams.filter((team) => team.id !== id));
      setError(null);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Erro ao excluir o time. Tente novamente.",
      );
    }
  };

  const handleUpdateTeam = async () => {
    try {
      await axios.patch(`http://localhost:3000/teams/${selectedTeam.id}`, {
        name: selectedTeam.name,
        players: selectedTeam.players,
      });
      setTeams((prev) =>
        prev.map((team) =>
          team.id === selectedTeam.id
            ? {
                ...team,
                name: selectedTeam.name,
                players: selectedTeam.players,
              }
            : team,
        ),
      );
      handleCloseEditModal();
    } catch (error) {
      console.error("Erro ao atualizar o time:", error);
      alert("Erro ao atualizar o time. Tente novamente.");
    }
  };

  const handleCreateTeam = async () => {
    try {
      const response = await axios.post("http://localhost:3000/teams", newTeam);
      setTeams((prev) => [...prev, response.data]);
      setCreateError(null);
      handleCloseCreateModal();
    } catch (error: any) {
      setCreateError(
        error.response?.data?.message ||
          "Erro ao excluir o time. Tente novamente.",
      );
    }
  };

  const handleOpenEditModal = (team: {
    id: number;
    name: string;
    players: number;
  }) => {
    setSelectedTeam(team);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleOpenCreateModal = () => {
    setNewTeam({ name: "", players: 0 });
    setCreateError(null);
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setCreateError(null);
    setOpenCreateModal(false);
  };

  useEffect(() => {
    fetchTeams();
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
        <Box sx={{ marginBottom: 4, textAlign: "center" }}>
          <Alert severity="error" onClose={() => setError(null)}>
            {" "}
            {error}{" "}
          </Alert>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <TextField
          label="Buscar por Nome"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          sx={{ width: "50%" }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCreateModal}
          sx={{
            backgroundColor: "#005287",
            "&:hover": { backgroundColor: "#003d66" },
          }}
        >
          Adicionar Novo Time
        </Button>
      </Box>

      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="edit-team-modal"
        aria-describedby="edit-team-modal-description"
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
            id="edit-team-modal"
            variant="h6"
            component="h2"
            sx={{ marginBottom: 2 }}
          >
            Editar Time
          </Typography>
          <TextField
            label="Nome do Time"
            fullWidth
            margin="normal"
            value={selectedTeam.name}
            onChange={(e) =>
              setSelectedTeam({ ...selectedTeam, name: e.target.value })
            }
          />
          <TextField
            label="Quantidade de Jogadores"
            fullWidth
            margin="normal"
            type="number"
            value={selectedTeam.players}
            onChange={(e) =>
              setSelectedTeam({ ...selectedTeam, players: +e.target.value })
            }
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              marginTop: 2,
            }}
          >
            <Button
              onClick={handleCloseEditModal}
              variant="outlined"
              color="error"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpdateTeam}
              variant="contained"
              color="primary"
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        aria-labelledby="create-team-modal"
        aria-describedby="create-team-modal-description"
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
          {createError && (
            <Box sx={{ marginBottom: 4, textAlign: "center" }}>
              <Alert severity="error" onClose={() => setCreateError(null)}>
                {" "}
                {createError}{" "}
              </Alert>
            </Box>
          )}
          <Typography
            id="create-team-modal"
            variant="h6"
            component="h2"
            sx={{ marginBottom: 2 }}
          >
            Criar Novo Time
          </Typography>
          <TextField
            label="Nome do Time"
            fullWidth
            margin="normal"
            value={newTeam.name}
            onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
          />
          <TextField
            label="Quantidade de Jogadores"
            fullWidth
            margin="normal"
            type="number"
            value={newTeam.players}
            onChange={(e) =>
              setNewTeam({ ...newTeam, players: +e.target.value })
            }
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              marginTop: 2,
            }}
          >
            <Button
              onClick={handleCloseCreateModal}
              variant="outlined"
              color="error"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateTeam}
              variant="contained"
              color="primary"
            >
              Criar
            </Button>
          </Box>
        </Box>
      </Modal>

      <Grid2 container spacing={6} justifyContent="center">
        {teams.map((team) => (
          <Grid2 key={team.id}>
            <Paper
              elevation={4}
              sx={{
                padding: 3,
                textAlign: "center",
                background: "#003d66",
                color: "#fff",
                borderRadius: "16px",
                position: "relative",
                minWidth: "300px",
                maxWidth: "300px",
              }}
            >
              {/* Nome do Time */}
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  marginBottom: 2,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}
              >
                {team.name}
              </Typography>

              {/* Ícone Representativo */}
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  margin: "0 auto",
                  marginBottom: 2,
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  fontSize: "32px",
                }}
              >
                {team.name.charAt(0)}
              </Avatar>

              {/* Jogadores */}
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Nº de Jogadores:</strong> {team.players}
              </Typography>

              {/* Botões de Ação */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  position: "absolute",
                  bottom: 5,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <IconButton
                  sx={{
                    color: "#fff",
                    background: "rgba(0, 0, 0, 0.2)",
                    width: 32,
                    height: 32,
                    "&:hover": { background: "rgba(0, 0, 0, 0.3)" },
                  }}
                  onClick={() => handleOpenEditModal(team)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    color: "#fff",
                    background: "rgba(255, 0, 0, 0.2)",
                    width: 32,
                    height: 32,
                    "&:hover": { background: "rgba(255, 0, 0, 0.3)" },
                  }}
                  onClick={() => {
                    handleDeleteTeam(team.id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
