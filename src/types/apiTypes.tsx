export type TDepartment = {
  id: number; name: string;
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
  department: TDepartment;
  approvers: { id: number; name: string; shortName: string; }[];
  status: number;
  approvingCount: number;
  approvedCount: number;
  vacancyId: number;
};

export type TApproveStage = {
  id: number;
  name: string;
  members: { id: number, name: string }[];
  action: string;
  template: string;

};

export type TVacancy = {
  id: number;
  name: string;
  approvers: { id: number; name: string; }[];
  responseMan: { id: number; name: string; };
  positionAmount: number;
  salary: number;
  status: 'inWork' | 'draft' | 'close';
  dateOfExpire: Date;
  daysInProgressStatus: number;
};

export type TResumeData = {
  id: number;
  name: string;
  howMuchDoesItFit: number;
  gender: string;
  age: number;
  specialization: string;
  workExperience: string;
  vacancy: string; /// обязательно нужно на какую профессию у нас мы его закинули
  /// на усмотрение бэка, что и как сможете отдать
};
