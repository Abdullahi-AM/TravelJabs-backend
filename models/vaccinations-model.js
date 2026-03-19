const model = {};

model.table = "Vaccinations";
model.fields = [
  "VaccinationID",
  "VaccinationAppointmentID",
  "VaccinationVaccineID",
  "VaccinationOutcomeID"
];

model.buildReadQuery = (req, variant) => {
  let table = model.table;
  let fields = model.fields;
  let where = "";

  switch (variant) {
    case "primary":
      where = " WHERE VaccinationID=:ID";
      break;
    case "appointment":
      where = " WHERE VaccinationAppointmentID=:ID";
      break;
  }

  return `SELECT ${fields} FROM ${table}${where}`;
};

model.buildCreateQuery = () => {
  return `INSERT INTO ${model.table} SET
    VaccinationAppointmentID = :VaccinationAppointmentID,
    VaccinationVaccineID = :VaccinationVaccineID,
    VaccinationOutcomeID = :VaccinationOutcomeID`;
};

model.buildUpdateQuery = () => {
  return `UPDATE ${model.table} SET
    VaccinationAppointmentID = :VaccinationAppointmentID,
    VaccinationVaccineID = :VaccinationVaccineID,
    VaccinationOutcomeID = :VaccinationOutcomeID
    WHERE VaccinationID = :ID`;
};

model.buildDeleteQuery = () => {
  return `DELETE FROM ${model.table} WHERE VaccinationID = :ID`;
};

export default model;
