import express from "express";
import database from "./database.js";
import Controller from "./controllers/controller.js";
import appointmentsModel from "./models/appointments-model.js";
import patientsModel from "./models/patients-model.js";
import vaccinesModel from "./models/vaccines-model.js";
import vaccinationsModel from "./models/vaccinations-model.js";
import rolesModel from "./models/roles-model.js";
import statusModel from "./models/status-model.js";
import clinicsModel from "./models/clinics-model.js";
import staffModel from "./models/staff-model.js";

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
const vaccinesController = new Controller(vaccinesModel, database);
const vaccinationsController = new Controller(vaccinationsModel, database);
const rolesController = new Controller(rolesModel, database);
const statusController = new Controller(statusModel, database);
const clinicsController = new Controller(clinicsModel, database);
const staffController = new Controller(staffModel, database);

// Endpoints -----------------------------------------------
app.get("/api", (req, res) => {
  res.json({ message: "Travel Jabs API" });
});

app.get("/api/appointments", (req, res) => appointmentsController.get(req, res, null));
app.get("/api/appointments/clinics/:id", (req, res) => appointmentsController.get(req, res, "clinic"));
app.get("/api/appointments/:id", (req, res) => appointmentsController.get(req, res, "primary"));
app.post("/api/appointments", (req, res) => appointmentsController.post(req, res));
app.put("/api/appointments/:id", (req, res) => appointmentsController.put(req, res));
app.delete("/api/appointments/:id", (req, res) => appointmentsController.remove(req, res));

app.get("/api/patients", (req, res) => patientsController.get(req, res, null));
app.get("/api/patients/:id", (req, res) => patientsController.get(req, res, "primary"));
app.post("/api/patients", (req, res) => patientsController.post(req, res));
app.put("/api/patients/:id", (req, res) => patientsController.put(req, res));
app.delete("/api/patients/:id", (req, res) => patientsController.remove(req, res));

app.get("/api/vaccines", (req, res) => vaccinesController.get(req, res, null));
app.get("/api/vaccines/:id", (req, res) => vaccinesController.get(req, res, "primary"));
app.post("/api/vaccines", (req, res) => vaccinesController.post(req, res));
app.put("/api/vaccines/:id", (req, res) => vaccinesController.put(req, res));
app.delete("/api/vaccines/:id", (req, res) => vaccinesController.remove(req, res));

app.get("/api/vaccinations", (req, res) => vaccinationsController.get(req, res, null));
app.get("/api/vaccinations/appointments/:id", (req, res) => vaccinationsController.get(req, res, "appointment"));
app.get("/api/vaccinations/:id", (req, res) => vaccinationsController.get(req, res, "primary"));
app.post("/api/vaccinations", (req, res) => vaccinationsController.post(req, res));
app.put("/api/vaccinations/:id", (req, res) => vaccinationsController.put(req, res));
app.delete("/api/vaccinations/:id", (req, res) => vaccinationsController.remove(req, res));

app.get("/api/roles", (req, res) => rolesController.get(req, res, null));
app.get("/api/roles/:id", (req, res) => rolesController.get(req, res, "primary"));
app.post("/api/roles", (req, res) => rolesController.post(req, res));
app.put("/api/roles/:id", (req, res) => rolesController.put(req, res));
app.delete("/api/roles/:id", (req, res) => rolesController.remove(req, res));

app.get("/api/status", (req, res) => statusController.get(req, res, null));
app.get("/api/status/:id", (req, res) => statusController.get(req, res, "primary"));
app.post("/api/status", (req, res) => statusController.post(req, res));
app.put("/api/status/:id", (req, res) => statusController.put(req, res));
app.delete("/api/status/:id", (req, res) => statusController.remove(req, res));

app.get("/api/clinics", (req, res) => clinicsController.get(req, res, null));
app.get("/api/clinics/:id", (req, res) =>
  clinicsController.get(req, res, "primary")
);
app.post("/api/clinics", (req, res) => clinicsController.post(req, res));
app.put("/api/clinics/:id", (req, res) => clinicsController.put(req, res));
app.delete("/api/clinics/:id", (req, res) =>
  clinicsController.remove(req, res)
);

app.get("/api/staff", (req, res) => staffController.get(req, res, null));
app.get("/api/staff/:id", (req, res) =>
  staffController.get(req, res, "primary")
);
app.get("/api/staff/clinic/:id", (req, res) =>
  staffController.get(req, res, "clinic")
);
app.post("/api/staff", (req, res) => staffController.post(req, res));
app.put("/api/staff/:id", (req, res) => staffController.put(req, res));
app.delete("/api/staff/:id", (req, res) =>
  staffController.remove(req, res)
);

// Start server --------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
