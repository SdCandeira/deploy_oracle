import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Select = styled.select`
  width: 220px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Option = styled.option`
  width: 120px;
  padding: 0 20px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ unit, getUnit, getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.profissional;
      user.espec.value = onEdit.especialidade;
      user.fone.value = onEdit.fone;
      user.unidade.value = onEdit.cod_unidade;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.espec.value ||
      !user.fone.value ||
      !user.unidade.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:3100/" + onEdit.id_credenciados, {
          
          nome: user.nome.value,
          especialidade: user.espec.value,
          contato: user.fone.value,
          unidade: user.unidade.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
        
    } else {
      await axios
        .post("http://localhost:3100", {
          nome: user.nome.value,
          especialidade: user.espec.value,
          contato: user.fone.value,
          unidade: user.unidade.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.espec.value = "";
    user.fone.value = "";
    user.unidade.value = "";

    setOnEdit(null);
    getUsers();
    getUnit();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Especialidade</Label>
        <Input name="espec" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Unidade</Label>
        <Select name="unidade">
        <Option value="">Selecione a unidade</Option>
        {unit.map((item, i) => (
        <Option key={i} value={item.id_unidade}>{item.unidade}</Option>
        ))}
        </Select>
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;