
import { mockEmployees } from "@/data/mockData";
import EmployeeList from "./EmployeeList";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Employee Onboarding Compass</h1>
        <p className="text-muted-foreground">Track application access and onboarding status for your team</p>
      </header>
      
      <div className="stats flex flex-wrap gap-4 mb-8">
        <div className="stat bg-white p-4 rounded-lg shadow-sm border min-w-[200px] flex-1">
          <div className="stat-title text-sm text-muted-foreground">Total Employees</div>
          <div className="stat-value text-2xl font-semibold">{mockEmployees.length}</div>
        </div>
        
        <div className="stat bg-white p-4 rounded-lg shadow-sm border min-w-[200px] flex-1">
          <div className="stat-title text-sm text-muted-foreground">Fully Onboarded</div>
          <div className="stat-value text-2xl font-semibold">
            {mockEmployees.filter(emp => 
              emp.applications.every(app => app.status === 'completed')
            ).length}
          </div>
        </div>
        
        <div className="stat bg-white p-4 rounded-lg shadow-sm border min-w-[200px] flex-1">
          <div className="stat-title text-sm text-muted-foreground">In Progress</div>
          <div className="stat-value text-2xl font-semibold">
            {mockEmployees.filter(emp => 
              emp.applications.some(app => app.status === 'pending') &&
              !emp.applications.every(app => app.status === 'completed')
            ).length}
          </div>
        </div>
        
        <div className="stat bg-white p-4 rounded-lg shadow-sm border min-w-[200px] flex-1">
          <div className="stat-title text-sm text-muted-foreground">Not Started</div>
          <div className="stat-value text-2xl font-semibold">
            {mockEmployees.filter(emp => 
              emp.applications.every(app => app.status === 'not-started')
            ).length}
          </div>
        </div>
      </div>
      
      <EmployeeList employees={mockEmployees} />
    </div>
  );
};

export default Dashboard;
