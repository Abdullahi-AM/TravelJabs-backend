const db = require("../database.js");

const buildController = (model) => {
  const get = async (req, res) => {
    const { sql, parameters } = model.buildReadQuery(req);
    try {
      const [result] = await db.query(sql, parameters);
      if (result.length === 0) res.status(404).json({ message: "No record(s) found" });
      else res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: `Failed to execute query: ${err.message}` });
    }
  };

  const post = async (req, res) => {
    const { sql } = model.buildCreateQuery();
    const parameters = req.body;
    try {
      const [status] = await db.query(sql, parameters);
      const lastInsertId = status.insertId;
      const tempReq = { params: { id: lastInsertId } };
      get(tempReq, res);
    } catch (err) {
      res.status(500).json({ message: `Failed to execute query: ${err.message}` });
    }
  };

  const put = async (req, res) => {
    const { sql } = model.buildUpdateQuery();
    const id = parseInt(req.params.id);
    const parameters = { ...req.body, id: id };
    try {
      await db.query(sql, parameters);
      const tempReq = { params: { id: id } };
      get(tempReq, res);
    } catch (err) {
      res.status(500).json({ message: `Failed to execute query: ${err.message}` });
    }
  };

  const remove = async (req, res) => {
    const { sql } = model.buildDeleteQuery();
    const id = parseInt(req.params.id);
    const parameters = { id: id };
    try {
      const [status] = await db.query(sql, parameters);
      if (status.affectedRows === 0) res.status(400).json({ message: "Failed to delete the record" });
      else res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: `Failed to execute query: ${err.message}` });
    }
  };

  return { get, post, put, remove };
};

module.exports = buildController;
