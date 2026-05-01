"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IUser } from "@/types/patient.interface";

export const patientsColumns: Column<IUser>[] = [
  {
    header: "User",
    accessor: (patient) => (
      <UserInfoCell
        name={patient.name}
        email={patient.email}
        photo={patient.picture}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Contact",
    accessor: (patient) => (
      <div className="flex flex-col">
        <span className="text-sm">{patient.phone}</span>
      </div>
    ),
  },
  {
    header: "Role",
    accessor: (user) => (
      <StatusBadgeCell 
        value={user.role} 
        variant={user.role === "ADMIN" ? "success" : "secondary"}
      />
    ),
    sortKey: "role",
  },
  {
    header: "Joined",
    accessor: (patient) => <DateCell date={patient.createdAt} />,
    sortKey: "createdAt",
  },
];
