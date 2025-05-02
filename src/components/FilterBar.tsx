
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Department, JobTitle } from "@/types";
import { getAllDepartments, getAllJobTitles } from "@/data/mockData";

interface FilterBarProps {
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: Department | "all") => void;
  onJobTitleChange: (value: JobTitle | "all") => void;
  onStatusFilterChange: (value: string) => void;
}

const FilterBar = ({
  onSearchChange,
  onDepartmentChange,
  onJobTitleChange,
  onStatusFilterChange,
}: FilterBarProps) => {
  const departments = getAllDepartments();
  const jobTitles = getAllJobTitles();

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Input
        placeholder="Search employees..."
        className="max-w-sm"
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="flex gap-4 flex-wrap">
        <Select onValueChange={(value) => onDepartmentChange(value as Department | "all")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onJobTitleChange(value as JobTitle | "all")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Job Titles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Job Titles</SelectItem>
            {jobTitles.map((title) => (
              <SelectItem key={title} value={title}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onStatusFilterChange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">In Progress</SelectItem>
            <SelectItem value="not-started">Not Started</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
