import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 1500px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function Cred() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3100");
      setUsers(res.data.sort((a, b) => (a.unidade > b.tabUn_unidade ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
    <Container>
      <Title>Lista de Credenciados IPSM</Title>
      <Grid users={users} setUsers={setUsers} showActions={false}/>
      {/* Outros componentes e lógica para a página inicial */}
    </Container>
    <GlobalStyle />
    </>
  );
}

function Admin() {
  const [unit, setUnit] = useState([]);
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUnit = async () => {
    try {
      const res = await axios.get("http://localhost:3100/units"); // Ajuste a URL aqui
      setUnit(res.data.sort((a, b) => (a.id_unidade > b.id_unidade ? 1 : -1)));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3100");
      setUsers(res.data.sort((a, b) => (a.unidade > b.tabUn_unidade ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
    getUnit();
  }, []);

  
  return (
    <>
      <Container>
      <Title>CREDENCIADOS</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} unit={unit} getUnit={getUnit}/>
      <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} showActions={true} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-right" />
      <GlobalStyle />
    </>
  );
}

function App() {
  const currentPath = window.location.pathname;

  if (currentPath === '/credenciados') {
    return < Admin/>;
  }

  return < Cred/>;
}

export default App;
