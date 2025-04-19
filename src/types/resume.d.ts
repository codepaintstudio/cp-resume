// 定义类型
export interface PersonalInfo {
  name: string;
  gender: string;
  phone: string;
  email: string;
  university: string;
  politicalStatus: string;
  website: string;
  avatar: string;
  major: string;
  age: string;
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
}

export interface WorkExperience {
  id: number;
  company: string;
  position: string;
  startDate: string | null;
  endDate: string | null;
  description: string;
}

export interface Skill {
  id: number;
  skillName: string;
}

export interface Project {
  id: number;
  projectName: string;
  role: string;
  startDate: string;
  endDate: string;
  // 项目简介
  briefIntroduction: string;
  description: string;

}

export interface Honor {
  id: number;
  honorName: string;
  date: string;
  description: string;
}

// 求职意向
export interface JobIntention {
  position: string;         // 意向岗位
  city: string;             // 意向城市
  salary: string;           // 期待薪资（如：10k-15k）
  status: string;           // 求职状态（如：正在找工作、在职、观望）
  type: string;             // 求职类型（如：全职、实习、远程）
}

// 校园经历
export interface CampusExperience {
  id: number;
  startDate: string;
  endDate: string;
  title: string;            // 摘要或标题
  responsibility: string;   // 主要职责
  description: string;      // 经历描述
}

// 实习经历（复用 WorkExperience 类型）
export type Internship = WorkExperience;

// 作品展示
export interface Portfolio {
  id: number;
  name: string;
  url: string;
  description: string;
}
