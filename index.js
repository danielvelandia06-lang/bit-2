const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Datos iniciales
let tareas = [
  { id: 1, titulo: "Aprender Express", completada: false },
  { id: 2, titulo: "Probar Postman", completada: true },
];

// 1. obtener todas las tareas(get)
app.get("/tareas", (req, res) => {
  res.status(200).json(tareas);
});

// 2. crear una tarea(post)
app.post("/tareas", (req, res) => {
  const { titulo } = req.body;
  if (!titulo) {
    return res.status(400).json({ error: "El título es obligatorio" });
  }
  const nuevaTarea = { id: tareas.length + 1, titulo, completada: false };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// 3. actualizar una tarea(put)
app.put("/tareas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tarea = tareas.find((t) => t.id === id);

  if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });

  tarea.titulo = req.body.titulo || tarea.titulo;
  tarea.completada =
    req.body.completada !== undefined ? req.body.completada : tarea.completada;

  res.json(tarea);
});

// 4. eliminar una tarea(delete)
app.delete("/tareas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tareas.findIndex((t) => t.id === id);

  if (index === -1)
    return res.status(404).json({ error: "Tarea no encontrada" });

  tareas.splice(index, 1);
  res.status(204).send(); // Sin contenido, éxito
});

app.listen(port, () => {
  console.log(`API de Tareas corriendo en http://localhost:${port}`);
});
