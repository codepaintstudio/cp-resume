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
  applicationPosition: string;
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
