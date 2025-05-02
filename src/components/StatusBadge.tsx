
import { cn } from "@/lib/utils";

type StatusType = 'completed' | 'pending' | 'not-started';

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case 'completed':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          label: 'Completed'
        };
      case 'pending':
        return {
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-800',
          label: 'In Progress'
        };
      case 'not-started':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          label: 'Not Started'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          label: 'Unknown'
        };
    }
  };

  const { bgColor, textColor, label } = getStatusConfig(status);

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        bgColor,
        textColor
      )}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
