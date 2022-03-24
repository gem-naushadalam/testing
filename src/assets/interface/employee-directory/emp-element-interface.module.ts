export interface EmpElement {
  employeeName: string;
  contactNo: string;
  extensionNo: number;
  location: string;
  designation: {
    designationName: string;
  };
  team: {
    department: {
      departmentName: string;
    };
  };
}
