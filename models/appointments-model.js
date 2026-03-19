const model = {};

model.table = "Appointments";
model.fields = [
  "AppointmentID",
  "AppointmentDatetime",
  "AppointmentPatientID",
  "AppointmentClinicID",
  "AppointmentStaffID",
  "AppointmentStatusID"
];

model.buildReadQuery = (req, variant) => {
  let table = model.table;
  let fields = model.fields;
  let where = "";

  switch (variant) {
    case "primary":
      where = " WHERE AppointmentID=:ID";
      break;
    case "clinic":
      where = " WHERE AppointmentClinicID=:ID";
      break;
  }

  return `SELECT ${fields} FROM ${table}${where}`;
};

model.buildCreateQuery = () => {
  return `INSERT INTO ${model.table} SET
    AppointmentDatetime = :AppointmentDatetime,
    AppointmentPatientID = :AppointmentPatientID,
    AppointmentClinicID = :AppointmentClinicID,
    AppointmentStaffID = :AppointmentStaffID,
    AppointmentStatusID = :AppointmentStatusID`;
};

model.buildUpdateQuery = () => {
  return `UPDATE ${model.table} SET
    AppointmentDatetime = :AppointmentDatetime,
    AppointmentPatientID = :AppointmentPatientID,
    AppointmentClinicID = :AppointmentClinicID,
    AppointmentStaffID = :AppointmentStaffID,
    AppointmentStatusID = :AppointmentStatusID
    WHERE AppointmentID = :ID`;
};

model.buildDeleteQuery = () => {
  return `DELETE FROM ${model.table} WHERE AppointmentID = :ID`;
};

export default model;
