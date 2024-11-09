"use client";

// Importações necessárias
import Image from 'next/image';  // Import Image from Next.js
import logo from './img/logo.png'; 
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupsIcon from "@mui/icons-material/Groups";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

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
            Tabela de jogos
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
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
            <Button
              sx={{
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <GroupsIcon sx={{ fontSize: 18 }} />
              Times
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <ButtonAppBar />
      
      {/* Adicionando Paper com conteúdo */}
      <Box sx={{ paddingTop: "100px", display: "flex", justifyContent: "center" }}>
        <Paper 
          sx={{
            padding: 3, // Espaçamento interno
            width: "80%", // Largura do Paper
            maxWidth: "800px", // Largura máxima
            boxShadow: 3, // Efeito de sombra
            textAlign: "center", // Alinha o conteúdo ao centro
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>
            <Image 
              src={logo}  // Logo importado como StaticImageData
              alt="Logo"  // Fornecendo o texto alternativo
              width={300}  // Defina a largura da imagem
              height={150}  // Defina a altura da imagem
              layout="intrinsic"  // Ou use "responsive" para uma imagem responsiva
            />
          </Box>
          <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          PROJETO E GERÊNCIA DE BANCO DE DADOS
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
            TABELA DE JOGOS
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Integrantes: Guilherme, Thales, Bruno e Rafael
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2, marginTop: 4 }}>
          Este trabalho tem como objetivo apresentar o desenvolvimento de um banco de dados para o gerenciamento de uma tabela de jogos, abordando conceitos fundamentais como a modelagem de dados, normalização, criação de chaves primárias e estrangeiras. A tabela de jogos será estruturada para armazenar informações essenciais como jogadores, partidas e times, permitindo uma consulta eficiente e fácil manutenção. O foco principal é garantir uma organização eficaz dos dados, proporcionando um sistema ágil e escalável para o armazenamento e recuperação das informações sobre os jogos.
          </Typography>
        </Paper>
      </Box>
    </div>
  );
}
