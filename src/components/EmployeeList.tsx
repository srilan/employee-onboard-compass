
import { useState, useMemo } from "react";
import { Employee, Department, JobTitle } from "@/types";
import EmployeeCard from "./EmployeeCard";
import FilterBar from "./FilterBar";

interface EmployeeListProps {
  employees: Employee[];
}

const EmployeeList = ({ employees }: EmployeeListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<Department | "all">("all");
  const [jobTitleFilter, setJobTitleFilter] = useState<JobTitle | "all">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Department filter
      const matchesDepartment =
        departmentFilter === "all" || employee.department === departmentFilter;

      // Job title filter
      const matchesJobTitle =
        jobTitleFilter === "all" || employee.jobTitle === jobTitleFilter;

      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        employee.applications.some((app) => app.status === statusFilter);

      return matchesSearch && matchesDepartment && matchesJobTitle && matchesStatus;
    });
  }, [employees, searchTerm, departmentFilter, jobTitleFilter, statusFilter]);

  return (
    <div>
      <FilterBar
        onSearchChange={setSearchTerm}
        onDepartmentChange={setDepartmentFilter}
        onJobTitleChange={setJobTitleFilter}
        onStatusFilterChange={setStatusFilter}
      />
      
      {filteredEmployees.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-muted-foreground">No employees found matching your filters.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
