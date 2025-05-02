
import { Employee } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";
import ApplicationChecklist from "./ApplicationChecklist";

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('');
  };

  // Calculate onboarding progress percentage
  const completedApps = employee.applications.filter(app => app.status === 'completed').length;
  const progressPercentage = (completedApps / employee.applications.length) * 100;

  // Format the start date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={employee.avatar} alt={employee.name} />
          <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">{employee.name}</h3>
          <p className="text-sm text-muted-foreground">{employee.jobTitle}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Email</div>
            <div className="text-sm">{employee.email}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Department</div>
            <div className="text-sm">{employee.department}</div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Started {formatDate(employee.startDate)}</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Onboarding Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Applications</h4>
            <ApplicationChecklist applications={employee.applications} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="text-xs text-muted-foreground">
          {employee.applications.length} applications assigned
        </div>
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
