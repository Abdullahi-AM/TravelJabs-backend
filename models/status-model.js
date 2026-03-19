const model = {};

model.table = "Status";
model.fields = [
  "StatusID",
  "StatusName"
];

model.buildReadQuery = (req, variant) => {
  let table = model.table;
  let fields = model.fields;
  let where = "";

  switch (variant) {
    case "primary":
      where = " WHERE StatusID=:ID";
      break;
  }

  return `SELECT ${fields} FROM ${table}${where}`;
};

model.buildCreateQuery = () => {
  return `INSERT INTO ${model.table} SET StatusName = :StatusName`;
};

model.buildUpdateQuery = () => {
  return `UPDATE ${model.table} SET StatusName = :StatusName WHERE StatusID = :ID`;
};

model.buildDeleteQuery = () => {
  return `DELETE FROM ${model.table} WHERE StatusID = :ID`;
};

export default model;
