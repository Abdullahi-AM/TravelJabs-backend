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
  let table = `${model.table}
    LEFT JOIN Patients ON AppointmentPatientID = PatientID
    LEFT JOIN Staff ON AppointmentStaffID = StaffID
    LEFT JOIN Status ON AppointmentStatusID = StatusID
    LEFT JOIN Clinics ON AppointmentClinicID = ClinicID`;
  let fields = [
    ...model.fields,
    "PatientFirstname AS AppointmentPatientFirstname",
    "PatientLastname AS AppointmentPatientLastname",
    "StaffFirstname AS AppointmentStaffFirstname",
    "StaffLastname AS AppointmentStaffLastname",
    "StatusName AS AppointmentStatusName",
    "ClinicName AS AppointmentClinicName"
  ];
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
