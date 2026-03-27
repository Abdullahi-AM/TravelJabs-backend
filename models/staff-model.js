const model = {};

model.table = "Staff";

model.fields = ["StaffID", "StaffName", "StaffClinicID", "StaffRoleID"];

model.buildReadQuery = (req, variant) => {
  let where = "";

  switch (variant) {
    case "primary":
      where = " WHERE StaffID = :ID";
      break;
    case "clinic":
      where = " WHERE StaffClinicID = :ID";
      break;
  }

  return `SELECT ${model.fields} FROM ${model.table}${where}`;
};

model.buildCreateQuery = () => {
  return `INSERT INTO ${model.table} SET
    StaffName = :StaffName,
    StaffClinicID = :StaffClinicID,
    StaffRoleID = :StaffRoleID`;
};

model.buildUpdateQuery = () => {
  return `UPDATE ${model.table} SET
    StaffName = :StaffName,
    StaffClinicID = :StaffClinicID,
    StaffRoleID = :StaffRoleID
    WHERE StaffID = :ID`;
};

model.buildDeleteQuery = () => {
  return `DELETE FROM ${model.table} WHERE StaffID = :ID`;
};

export default model;