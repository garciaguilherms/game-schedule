import Image from "next/image";
import logo from "./logo.png";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupsIcon from "@mui/icons-material/Groups";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
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
  return (
    <Box
      className="min-h-screen bg-gradient"
      sx={{
        background: "linear-gradient(to bottom, #ffffff, #eaf6fc)",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
    >
      <ButtonAppBar />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "40px",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 5,
            borderRadius: 3,
            width: "80%",
            maxWidth: "800px",
            textAlign: "center",
            backgroundColor: "white",
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 3,
            }}
          >
            <Image
              src={logo}
              alt="Logo"
              width={200}
              height={200}
              style={{
                borderRadius: "50%",
                border: "3px solid #005287",
              }}
            />
          </Box>
          <Typography
            variant="h4"
            sx={{ marginBottom: 2, fontWeight: "bold", color: "#005287" }}
          >
            PROJETO E GERÊNCIA DE BANCO DE DADOS
          </Typography>
          <Typography
            variant="h5"
            sx={{ marginBottom: 2, fontWeight: "bold", color: "#007BB5" }}
          >
            TABELA DE JOGOS
          </Typography>
          <Typography
            variant="h6"
            sx={{ marginBottom: 4, fontWeight: "normal", color: "#4A4A4A" }}
          >
            Integrantes: Guilherme, Thales, Bruno e Rafael
          </Typography>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              fontSize: "1.1rem",
              color: "#5A5A5A",
              textAlign: "justify",
            }}
          >
            Este trabalho tem como objetivo apresentar o desenvolvimento de um
            banco de dados para o gerenciamento de uma tabela de jogos,
            abordando conceitos fundamentais como a modelagem de dados,
            normalização, criação de chaves primárias e estrangeiras. A tabela
            de jogos será estruturada para armazenar informações essenciais
            como jogadores, partidas e times, permitindo uma consulta eficiente
            e fácil manutenção. O foco principal é garantir uma organização
            eficaz dos dados, proporcionando um sistema ágil e escalável para o
            armazenamento e recuperação das informações sobre os jogos.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
