export type TDepartment = {
  id: number; name: string;
};

export type TApprover = {
  id: number;
  name: string;
  shortName: string;
};

export type TCurrentUser = {
  id: number;
  name: string;
  shortName: string;
  role: string;
  department: TDepartment;
  position: { id: number; name: string; };

};

export type TVacancyRequest = {
  id: number;
  positionName: string;
  positionCount: string;
  deadline: Date;
  salary: string;
  salaryType: string;
  departments: TDepartment[];
  approvers: TApprover[];
  status: number;
  approvingCount: number;
  approvedCount: number;
  vacancyId: number;
  responsibilities: string;
  requirement: string;
  comments: string;
};

type ExtendApprover = TApprover & {

  approved: Date;
  rejected: Date;

};

export type TRequestForPost = {
  id: number;
  positionName: string;
  positionCount: number;
  deadline: Date;
  departments: TDepartment[];
  approvers: TApprover[] | ExtendApprover[];
  salary: number;
  salaryType?: string;
  departmentId: 0;
  responsibilities: string;
  requirements: string;
  comments: string;
  customers: TApprover[];
  templateId?: 0;
  status: 1;

};

export type TApproveStage = {
  id: number;
  name: string;
  members: { id: number, name: string }[];
  action: string;
  template: string;
  color: string;
};

export type TVacancy = {
  id: number;
  name: string;
  approvers: TApprover[];
  responseMan: { id: number; name: string; };
  positionAmount: number;
  salary: number;
  status: 'inWork' | 'draft' | 'close' | string;
  dateOfExpire: Date | string;
  daysInProgressStatus: number;
  candidats: number;
};

export type TResumeData = {
  id: number;
  name: string;
  city: string;
  imageUrl: string;
  howMuchDoesItFit: number;
  gender: string;
  age: number;
  specialization: string;
  workExperience: string;
  stage: TApproveStage;
  email: string;
  /// на усмотрение бэка, что и как сможете отдать
};
