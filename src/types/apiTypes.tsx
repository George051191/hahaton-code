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

export type TRequestForPost = {
  positionName: string;
  positionCount: number;
  deadline: Date;
  department: TDepartment[];
  approvers: TApprover[];
  salary: number;
  responsibilities: string;
  requirement: string;
  comments: string;
  customer: TCurrentUser[];
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
  status: 'inWork' | 'draft' | 'close';
  dateOfExpire: Date;
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


