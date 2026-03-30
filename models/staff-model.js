const model = {};

model.table = "Staff";
model.fields = [
  "StaffID",
  "StaffRoleID",
  "StaffFirstname",
  "StaffLastname",
  "StaffClinicID"
];

model.buildReadQuery = (req, variant) => {
  let table = model.table;
  let fields = model.fields;
  let where = "";

  switch (variant) {
    case "primary":
      where = " WHERE StaffID=:ID";
      break;
    case "clinic":
      where = " WHERE StaffClinicID=:ID";
      break;
    case "clinicians":
      where = " WHERE StaffClinicID=:ID AND StaffRoleID=2";
      break;
  }

  return `SELECT ${fields} FROM ${table}${where}`;
};

model.buildCreateQuery = () => {
  return `INSERT INTO ${model.table} SET
    StaffRoleID = :StaffRoleID,
    StaffFirstname = :StaffFirstname,
    StaffLastname = :StaffLastname,
    StaffClinicID = :StaffClinicID`;
};

model.buildUpdateQuery = () => {
  return `UPDATE ${model.table} SET
    StaffRoleID = :StaffRoleID,
    StaffFirstname = :StaffFirstname,
    StaffLastname = :StaffLastname,
    StaffClinicID = :StaffClinicID
    WHERE StaffID = :ID`;
};

model.buildDeleteQuery = () => {
  return `DELETE FROM ${model.table} WHERE StaffID = :ID`;
};

export default model;
