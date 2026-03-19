const model = {};

model.table = "Vaccines";
model.fields = [
  "VaccineID",
  "VaccineName",
  "VaccineCost"
];

model.buildReadQuery = (req, variant) => {
  let table = model.table;
  let fields = model.fields;
  let where = "";

  switch (variant) {
    case "primary":
      where = " WHERE VaccineID=:ID";
      break;
  }

  return `SELECT ${fields} FROM ${table}${where}`;
};

model.buildCreateQuery = () => {
  return `INSERT INTO ${model.table} SET
    VaccineName = :VaccineName,
    VaccineCost = :VaccineCost`;
};

model.buildUpdateQuery = () => {
  return `UPDATE ${model.table} SET
    VaccineName = :VaccineName,
    VaccineCost = :VaccineCost
    WHERE VaccineID = :ID`;
};

model.buildDeleteQuery = () => {
  return `DELETE FROM ${model.table} WHERE VaccineID = :ID`;
};

export default model;
