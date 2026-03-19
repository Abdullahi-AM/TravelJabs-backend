const model = {};

model.table = "Patients";
model.fields = [
  "PatientID",
  "PatientFirstname",
  "PatientLastname",
  "PatientAddress",
  "PatientPostcode",
  "PatientAge"
];

model.buildReadQuery = (req, variant) => {
  let table = model.table;
  let fields = model.fields;
  let where = "";

  switch (variant) {
    case "primary":
      where = " WHERE PatientID=:ID";
      break;
  }

  return `SELECT ${fields} FROM ${table}${where}`;
};

model.buildCreateQuery = () => {
  return `INSERT INTO ${model.table} SET
    PatientFirstname = :PatientFirstname,
    PatientLastname = :PatientLastname,
    PatientAddress = :PatientAddress,
    PatientPostcode = :PatientPostcode,
    PatientAge = :PatientAge`;
};

model.buildUpdateQuery = () => {
  return `UPDATE ${model.table} SET
    PatientFirstname = :PatientFirstname,
    PatientLastname = :PatientLastname,
    PatientAddress = :PatientAddress,
    PatientPostcode = :PatientPostcode,
    PatientAge = :PatientAge
    WHERE PatientID = :ID`;
};

model.buildDeleteQuery = () => {
  return `DELETE FROM ${model.table} WHERE PatientID = :ID`;
};

export default model;
