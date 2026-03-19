const model = {};

model.table = "Roles";
model.fields = [
  "RoleID",
  "RoleName"
];

model.buildReadQuery = (req, variant) => {
  let table = model.table;
  let fields = model.fields;
  let where = "";

  switch (variant) {
    case "primary":
      where = " WHERE RoleID=:ID";
      break;
  }

  return `SELECT ${fields} FROM ${table}${where}`;
};

model.buildCreateQuery = () => {
  return `INSERT INTO ${model.table} SET RoleName = :RoleName`;
};

model.buildUpdateQuery = () => {
  return `UPDATE ${model.table} SET RoleName = :RoleName WHERE RoleID = :ID`;
};

model.buildDeleteQuery = () => {
  return `DELETE FROM ${model.table} WHERE RoleID = :ID`;
};

export default model;
