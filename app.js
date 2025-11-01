const express = require("express");
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1998",
  database: "planning",
  connectionLimit: 5,
});

const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.get("/todo", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, name, description, status, created_at, updated_at FROM todo"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); 
  }
});

app.get("/todo/:id", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, name, description, status, created_at, updated_at FROM todo WHERE id=?",
      [req.params.id]
    );

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Se rompió el servidor ID" });
  } finally {
    if (conn) conn.release(); 
  }
});

app.post("/todo", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO todo(name, description, status, created_at, updated_at) VALUES(?, ?, ?, NOW(), NOW())`,
      [req.body.name, req.body.description, req.body.status]
    );

    res.json({ id: parseInt(response.insertId), ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release();
  }
});

app.put("/todo/:id", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `UPDATE todo SET name=?, description=?, status=? WHERE id=?`,
      [req.body.name, req.body.description, req.body.status, req.params.id]
    );

    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); 
  }
});

app.delete("/todo/:id", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("DELETE FROM todo WHERE id=?", [
      req.params.id,
    ]);
    res.json({ message: "Elemento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release();
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
