"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { IPatient } from "@/types/patient.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import PatientFormDialog from "./PatientFormDialog";
import { patientsColumns } from "./patientsColumns";
import PatientViewDetailDialog from "./PatientsViewDetailDialog";

interface PatientsTableProps {
  patients: IPatient[];
}

const PatientsTable = ({ patients }: PatientsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingPatient, setDeletingPatient] = useState<IPatient | null>(null);
  const [viewingPatient, setViewingPatient] = useState<IPatient | null>(null);
  const [editingPatient, setEditingPatient] = useState<IPatient | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (patient: IPatient) => {
    setViewingPatient(patient);
  };

  const handleEdit = (patient: IPatient) => {
    setEditingPatient(patient);
  };

  const handleDelete = (patient: IPatient) => {
    setDeletingPatient(patient);
  };



  return (
    <>
      <ManagementTable
        data={patients}
        columns={patientsColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(patient) => patient.id!}
        emptyMessage="No patients found"
      />

      {/* Edit Patient Form Dialog */}
      <PatientFormDialog
        open={!!editingPatient}
        onClose={() => setEditingPatient(null)}
        patient={editingPatient!}
        onSuccess={() => {
          setEditingPatient(null);
          handleRefresh();
        }}
      />

      {/* View Patient Detail Dialog */}
      <PatientViewDetailDialog
        open={!!viewingPatient}
        onClose={() => setViewingPatient(null)}
        patient={viewingPatient}
      />
    </>
  );
};

export default PatientsTable;
