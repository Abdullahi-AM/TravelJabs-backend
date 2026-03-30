const model = {};

model.table = "Staff";

model.fields = [
  "Staff.StaffID",
  "Staff.StaffName",
  "Staff.StaffClinicID",
  "Staff.StaffRoleID"
];

model.buildReadQuery = (req, variant) => {
  let table = model.table;
  let fields = [
    ...model.fields,
    "Clinics.ClinicName AS StaffClinicName",
    "Roles.RoleName AS StaffRoleName"
  ];
  let joins = `
    LEFT JOIN Clinics ON Clinics.ClinicID = Staff.StaffClinicID
    LEFT JOIN Roles ON Roles.RoleID = Staff.StaffRoleID`;
  let where = "";

  switch (variant) {
    case "primary":
      where = " WHERE Staff.StaffID = :ID";
      break;
    case "clinic":
      where = " WHERE Staff.StaffClinicID = :ID";
      break;
  }

  return `SELECT ${fields} FROM ${table}${joins}${where}`;
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