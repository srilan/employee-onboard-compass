
import { Application } from "@/types";
import { Check, X, Clock, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ApplicationChecklistProps {
  applications: Application[];
  onCommentChange?: (appId: string, comment: string) => void;
}

const ApplicationChecklist = ({ applications, onCommentChange }: ApplicationChecklistProps) => {
  const [editingComment, setEditingComment] = useState<string>("");
  
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

  const handleSaveComment = (appId: string) => {
    if (onCommentChange) {
      onCommentChange(appId, editingComment);
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
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 rounded-full"
                  onClick={() => setEditingComment(app.comments || "")}
                >
                  <MessageSquare 
                    className={cn(
                      "h-4 w-4", 
                      app.comments ? "text-blue-600 fill-blue-200" : "text-gray-400"
                    )} 
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Comments for {app.name}</h4>
                  <Textarea 
                    placeholder="Add notes or comments about this application..."
                    value={editingComment}
                    onChange={(e) => setEditingComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-end">
                    <Button 
                      size="sm" 
                      onClick={() => handleSaveComment(app.id)}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <span>{getStatusIcon(app.status)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ApplicationChecklist;
