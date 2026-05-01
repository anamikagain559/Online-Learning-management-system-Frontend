import UsersFilter from "@/components/modules/Admin/UsersManagement/UsersFilter";
import UsersTable from "@/components/modules/Admin/UsersManagement/PatientsTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getUsers } from "@/services/admin/usersManagement";
import { Suspense } from "react";

const AdminUserManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const usersResult = await getUsers(queryString);

  const totalPages = Math.ceil(
    (usersResult?.meta?.total || 1) / (usersResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Users Management"
        description="Manage system users, roles, and account statuses"
      />

      {/* Search, Filters */}
      <UsersFilter />

      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <UsersTable patients={usersResult?.data || []} />
        <TablePagination
          currentPage={usersResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminUserManagementPage;
