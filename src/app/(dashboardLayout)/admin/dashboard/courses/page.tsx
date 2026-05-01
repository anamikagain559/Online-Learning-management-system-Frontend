import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllCourses } from "@/services/course/course.service";
import { Suspense } from "react";
import CoursesFilter from "@/components/modules/Admin/Courses/CoursesFilter";
import CoursesTable from "@/components/modules/Admin/Courses/CoursesTable";
import AddCourseButton from "@/components/modules/Admin/Courses/AddCourseButton";

const AdminCoursesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const result = await getAllCourses(queryString);

  const totalPages = Math.ceil(
    (result?.meta?.total || 1) / (result?.meta?.limit || 1)
  );

  return (
    <div className="min-h-full space-y-8 animate-in fade-in duration-700">
      <ManagementPageHeader
        title="Course Management Center"
        description="Oversee global course curriculums and manage student interaction"
      >
        <AddCourseButton />
      </ManagementPageHeader>

      <div className="grid gap-8">
        <CoursesFilter />

        <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
          <div className="space-y-6">
            <CoursesTable courses={result?.data || []} />
            
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">
                    Viewing Page {result?.meta?.page} of {totalPages}
                </p>
                <TablePagination
                  currentPage={result?.meta?.page || 1}
                  totalPages={totalPages || 1}
                />
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default AdminCoursesPage;
