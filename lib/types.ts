export type Department = 'Терапия' | 'Детское' | 'Хирургия' | 'Ортопедия' | 'Рентген';
export type DepartmentFilter = 'Все' | Department;

export interface Clinic {
  id: number;
  address: string;
  departments: Department[];
}
