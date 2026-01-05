import PatientsFilter from "@/components/modules/Admin/UsersManagement/UsersFilter";
import PatientsTable from "@/components/modules/Admin/UsersManagement/PatientsTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getUsers } from "@/services/admin/usersManagement";
import { Suspense } from "react";

const AdminPatientsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const patientsResult = await getUsers(queryString);

  const totalPages = Math.ceil(
    (patientsResult?.meta?.total || 1) / (patientsResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Users Management"
        description="Manage Users information and details"
      />

      {/* Search, Filters */}
      <PatientsFilter />

      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <PatientsTable patients={patientsResult?.data || []} />
        <TablePagination
          currentPage={patientsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminPatientsManagementPage;
