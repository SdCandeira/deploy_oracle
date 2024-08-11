import { db } from "../db.js";

export const getUsers = (_, res) => {
    const sql = 
    "SELECT a.id_credenciados, a.contato as fone, a.profissional, a.especialidade, a.cod_unidade, b.unidade as tabUn_unidade, b.contato as tabUn_contato, b.status as tabUn_status, b.endereco FROM sas16.tab_credenciados a INNER JOIN sas16.tab_unidade b on b.id_unidade = a.cod_unidade WHERE a.status = 1";

    db.query(sql, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const sql =
      "INSERT INTO tab_credenciados (`profissional`, `especialidade`, `contato`, `cod_unidade`, `status`) VALUES(?)";
  
    const values = [
      req.body.nome,
      req.body.especialidade,
      req.body.contato,
      req.body.unidade,
      1,
    ];
  
    db.query(sql, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Profissional cadastrado com sucesso.");
    });
  };
  
  export const updateUser = (req, res) => {
    const sql =
      "UPDATE tab_credenciados SET `profissional` = ?, `especialidade` = ?, `contato` = ?, `cod_unidade` = ? WHERE `id_credenciados` = ?";
    
    const values = [
        req.body.nome,
        req.body.especialidade,
        req.body.contato,
        req.body.unidade,
    ];
    console.log(values);
    db.query(sql, [...values, req.params.id], (err) => {
      
      if (err) return res.json(err);
  
      return res.status(200).json("Dados atualizado com sucesso.");
    });
  };
  
  export const deleteUser = (req, res) => {
    const sql = "UPDATE tab_credenciados SET `status` = 0 WHERE `id_credenciados` = ?";
  
    db.query(sql, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Usuário deletado com sucesso.");
    });
  };

  export const getUnit = (_, res) => {
    const sql = 
    "SELECT * FROM sas16.tab_unidade WHERE status = 1";
  
    db.query(sql, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};