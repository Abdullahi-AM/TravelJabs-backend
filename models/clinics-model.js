const model = {};

model.table = "Clinics";
model.fields = [
  "ClinicID",
  "ClinicName",
  "ClinicAddress",
  "ClinicPostcode",
  "ClinicContact",
  "ClinicManagerID"
];

model.buildReadQuery = (req, variant) => {
  let table = model.table;
  let fields = model.fields;
  let where = "";

  switch (variant) {
    case "primary":
      where = " WHERE ClinicID=:ID";
      break;
  }

  return `SELECT ${fields} FROM ${table}${where}`;
};

model.buildCreateQuery = () => {
  return `INSERT INTO ${model.table} SET
    ClinicName = :ClinicName,
    ClinicAddress = :ClinicAddress,
    ClinicPostcode = :ClinicPostcode,
    ClinicContact = :ClinicContact,
    ClinicManagerID = :ClinicManagerID`;
};

model.buildUpdateQuery = () => {
  return `UPDATE ${model.table} SET
    ClinicName = :ClinicName,
    ClinicAddress = :ClinicAddress,
    ClinicPostcode = :ClinicPostcode,
    ClinicContact = :ClinicContact,
    ClinicManagerID = :ClinicManagerID
    WHERE ClinicID = :ID`;
};

model.buildDeleteQuery = () => {
  return `DELETE FROM ${model.table} WHERE ClinicID = :ID`;
};

export default model;
