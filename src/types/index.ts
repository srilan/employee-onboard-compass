
export interface Application {
  id: string;
  name: string;
  status: 'completed' | 'pending' | 'not-started';
  comments?: string; // Optional comments field
}

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  email: string;
  jobTitle: string;
  department: string;
  startDate: string;
  applications: Application[];
}

export type JobTitle = 'Software Engineer' | 'Product Manager' | 'Designer' | 'QA Engineer' | 'DevOps Engineer';

export type Department = 'Engineering' | 'Product' | 'Design' | 'QA' | 'Operations';
