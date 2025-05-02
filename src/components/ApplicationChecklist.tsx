
import { Application } from "@/types";
import { Check, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApplicationChecklistProps {
  applications: Application[];
}

const ApplicationChecklist = ({ applications }: ApplicationChecklistProps) => {
  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-600" />;
      case 'not-started':
        return <X className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusBackground = (status: Application['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50';
      case 'pending':
        return 'bg-amber-50';
      case 'not-started':
        return 'bg-red-50';
    }
  };

  return (
    <ul className="space-y-2">
      {applications.map((app) => (
        <li 
          key={app.id} 
          className={cn(
            "flex items-center justify-between py-1 px-3 rounded-md",
            getStatusBackground(app.status)
          )}
        >
          <span className="text-sm">{app.name}</span>
          <span>{getStatusIcon(app.status)}</span>
        </li>
      ))}
    </ul>
  );
};

export default ApplicationChecklist;
