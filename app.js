import express from "express";
import database from "./database.js";
import Controller from "./controllers/controller.js";
import appointmentsModel from "./models/appointments-model.js";
import patientsModel from "./models/patients-model.js";

// Configure express app -----------------------------------
const app = express();

// Configure middleware -------------------------------------
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Controllers ---------------------------------------------
const appointmentsController = new Controller(appointmentsModel, database);
const patientsController = new Controller(patientsModel, database);

// Endpoints -----------------------------------------------
app.get("/api/appointments", (req, res) => appointmentsController.get(req, res, null));
app.get("/api/appointments/:id", (req, res) => appointmentsController.get(req, res, "primary"));
app.get("/api/appointments/clinics/:id", (req, res) => appointmentsController.get(req, res, "clinic"));
app.post("/api/appointments", (req, res) => appointmentsController.post(req, res));
app.put("/api/appointments/:id", (req, res) => appointmentsController.put(req, res));
app.delete("/api/appointments/:id", (req, res) => appointmentsController.remove(req, res));

app.get("/api/patients", (req, res) => patientsController.get(req, res, null));
app.get("/api/patients/:id", (req, res) => patientsController.get(req, res, "primary"));
app.post("/api/patients", (req, res) => patientsController.post(req, res));
app.put("/api/patients/:id", (req, res) => patientsController.put(req, res));
app.delete("/api/patients/:id", (req, res) => patientsController.remove(req, res));

app.get("/api/test/:id", async (req, res) => {
  try {
    const [result] = await database.query("SELECT * FROM Appointments WHERE AppointmentID = :ID", { ID: parseInt(req.params.id) });
    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Start server --------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
