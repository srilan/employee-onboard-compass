
import { Employee, Application, JobTitle, Department } from '../types';

// Applications for each job title
const applicationsByJobTitle: Record<JobTitle, string[]> = {
  'Software Engineer': ['Github', 'AWS', 'Notion', 'TestRail'],
  'Product Manager': ['Aha!', 'Notion', 'TestRail'],
  'Designer': ['Notion', 'Figma', 'Adobe Creative Cloud'],
  'QA Engineer': ['TestRail', 'Github', 'Notion'],
  'DevOps Engineer': ['AWS', 'Github', 'Notion', 'Jenkins', 'Docker Hub']
};

// Function to generate random applications based on job title
const generateApplications = (jobTitle: JobTitle): Application[] => {
  const apps = applicationsByJobTitle[jobTitle];
  
  return apps.map(app => ({
    id: `app-${app.toLowerCase().replace(/\s/g, '-')}`,
    name: app,
    status: ['completed', 'pending', 'not-started'][Math.floor(Math.random() * 3)] as 'completed' | 'pending' | 'not-started'
  }));
};

// Generate mock employees
export const mockEmployees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=1',
    email: 'jane.smith@company.com',
    jobTitle: 'Software Engineer',
    department: 'Engineering',
    startDate: '2023-10-15',
    applications: generateApplications('Software Engineer')
  },
  {
    id: 'emp-2',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=2',
    email: 'john.doe@company.com',
    jobTitle: 'Product Manager',
    department: 'Product',
    startDate: '2023-11-01',
    applications: generateApplications('Product Manager')
  },
  {
    id: 'emp-3',
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    email: 'sarah.johnson@company.com',
    jobTitle: 'Designer',
    department: 'Design',
    startDate: '2023-09-20',
    applications: generateApplications('Designer')
  },
  {
    id: 'emp-4',
    name: 'Michael Brown',
    avatar: 'https://i.pravatar.cc/150?img=4',
    email: 'michael.brown@company.com',
    jobTitle: 'QA Engineer',
    department: 'QA',
    startDate: '2023-10-05',
    applications: generateApplications('QA Engineer')
  },
  {
    id: 'emp-5',
    name: 'Emily Davis',
    avatar: 'https://i.pravatar.cc/150?img=5',
    email: 'emily.davis@company.com',
    jobTitle: 'DevOps Engineer',
    department: 'Engineering',
    startDate: '2023-11-10',
    applications: generateApplications('DevOps Engineer')
  },
  {
    id: 'emp-6',
    name: 'David Wilson',
    avatar: 'https://i.pravatar.cc/150?img=6',
    email: 'david.wilson@company.com',
    jobTitle: 'Software Engineer',
    department: 'Engineering',
    startDate: '2023-09-15',
    applications: generateApplications('Software Engineer')
  },
  {
    id: 'emp-7',
    name: 'Lisa Taylor',
    avatar: 'https://i.pravatar.cc/150?img=7',
    email: 'lisa.taylor@company.com',
    jobTitle: 'Product Manager',
    department: 'Product',
    startDate: '2023-10-20',
    applications: generateApplications('Product Manager')
  },
  {
    id: 'emp-8',
    name: 'Robert Martinez',
    avatar: 'https://i.pravatar.cc/150?img=8',
    email: 'robert.martinez@company.com',
    jobTitle: 'Designer',
    department: 'Design',
    startDate: '2023-11-05',
    applications: generateApplications('Designer')
  }
];

// Get the list of all applications
export const getAllApplications = (): string[] => {
  const appsSet = new Set<string>();
  
  Object.values(applicationsByJobTitle).forEach(apps => {
    apps.forEach(app => appsSet.add(app));
  });
  
  return Array.from(appsSet);
};

// Get the list of all departments
export const getAllDepartments = (): Department[] => {
  return ['Engineering', 'Product', 'Design', 'QA', 'Operations'];
};

// Get the list of all job titles
export const getAllJobTitles = (): JobTitle[] => {
  return ['Software Engineer', 'Product Manager', 'Designer', 'QA Engineer', 'DevOps Engineer'];
};
