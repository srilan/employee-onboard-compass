
import { Application } from "@/types";
import { Check, X, Clock, MessageSquare, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ApplicationChecklistProps {
  applications: Application[];
  onCommentChange?: (appId: string, comment: string) => void;
}

const ApplicationChecklist = ({ applications, onCommentChange }: ApplicationChecklistProps) => {
  const [editingComment, setEditingComment] = useState<string>("");
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  
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

  const commentCount = applications.filter(app => app.comments?.trim()).length;

  const toggleComment = (appId: string, currentComment: string) => {
    if (openCommentId === appId) {
      setOpenCommentId(null);
    } else {
      setOpenCommentId(appId);
      setEditingComment(currentComment || "");
    }
  };

  return (
    <div className="space-y-2">
      {commentCount > 0 && (
        <Accordion type="single" collapsible className="mb-4 border rounded-md overflow-hidden">
          <AccordionItem value="comments" className="border-none">
            <AccordionTrigger className="text-sm px-3 py-2 bg-gray-50 hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="font-medium">{commentCount} Application Comment{commentCount !== 1 ? 's' : ''}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-0 py-0">
              <div className="space-y-1 p-2 bg-white">
                {applications
                  .filter(app => app.comments?.trim())
                  .map(app => (
                    <div key={app.id} className="rounded-md bg-gray-50 p-3">
                      <div className="font-medium text-sm">{app.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{app.comments}</div>
                    </div>
                  ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      <ul className="space-y-2">
        {applications.map((app) => (
          <li 
            key={app.id} 
            className={cn(
              "rounded-md",
              getStatusBackground(app.status)
            )}
          >
            <div className="flex items-center justify-between py-1 px-3">
              <span className="text-sm">{app.name}</span>
              <div className="flex items-center space-x-2">
                <Collapsible 
                  open={openCommentId === app.id} 
                  onOpenChange={() => toggleComment(app.id, app.comments || "")}
                >
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full"
                    >
                      <MessageSquare 
                        className={cn(
                          "h-4 w-4", 
                          app.comments ? "text-blue-600 fill-blue-200" : "text-gray-400"
                        )} 
                      />
                    </Button>
                  </CollapsibleTrigger>
                </Collapsible>
                <span>{getStatusIcon(app.status)}</span>
              </div>
            </div>
            
            {openCommentId === app.id && (
              <CollapsibleContent className="px-3 pb-3">
                <div className="space-y-2 mt-2">
                  <Textarea 
                    placeholder="Add notes or comments about this application..."
                    value={editingComment}
                    onChange={(e) => setEditingComment(e.target.value)}
                    className="min-h-[100px] text-sm"
                  />
                  <div className="flex justify-end">
                    <Button 
                      size="sm" 
                      onClick={() => {
                        handleSaveComment(app.id);
                        setOpenCommentId(null);
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationChecklist;
