const model = {};

model.table = "Clinics";

model.fields = [
  "ClinicID",
  "ClinicName",
  "ClinicAddress",
  "ClinicPostcode",
  "ClinicPhone",
];

model.buildReadQuery = (req, variant) => {
  let where = "";

  switch (variant) {
    case "primary":
      where = " WHERE ClinicID = :ID";
      break;
  }

  return `SELECT ${model.fields} FROM ${model.table}${where}`;
};

model.buildCreateQuery = () => {
  return `INSERT INTO ${model.table} SET
    ClinicName = :ClinicName,
    ClinicAddress = :ClinicAddress,
    ClinicPostcode = :ClinicPostcode,
    ClinicPhone = :ClinicPhone`;
};

model.buildUpdateQuery = () => {
  return `UPDATE ${model.table} SET
    ClinicName = :ClinicName,
    ClinicAddress = :ClinicAddress,
    ClinicPostcode = :ClinicPostcode,
    ClinicPhone = :ClinicPhone
    WHERE ClinicID = :ID`;
};

model.buildDeleteQuery = () => {
  return `DELETE FROM ${model.table} WHERE ClinicID = :ID`;
};

export default model;