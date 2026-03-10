import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllTravelPlans } from "@/services/travelPlan/travelPlan.service";
import { Suspense } from "react";
import TravelPlansFilter from "@/components/modules/Admin/TravelPlans/TravelPlansFilter";
import TravelPlansTable from "@/components/modules/Admin/TravelPlans/TravelPlansTable";
import AddTravelPlanButton from "@/components/modules/Admin/TravelPlans/AddTravelPlanButton";

const AdminTravelPlansPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const result = await getAllTravelPlans(queryString);

  const totalPages = Math.ceil(
    (result?.meta?.total || 1) / (result?.meta?.limit || 1)
  );

  return (
    <div className="min-h-full space-y-8 animate-in fade-in duration-700">
      <ManagementPageHeader
        title="Travel Command Center"
        description="Oversee global travel blueprints and manage traveler interaction"
      >
        <AddTravelPlanButton />
      </ManagementPageHeader>

      <div className="grid gap-8">
        {/* Search & Intelligence */}
        <TravelPlansFilter />

        <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
          <div className="space-y-6">
            <TravelPlansTable plans={result?.data || []} />
            
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

export default AdminTravelPlansPage;
