import PageBreadcrumb from "@/components/admin/PageBreadCrumb";
import CategoriesTable from "@/components/admin/tables/CategoriesTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | Admin ALTEG",
  description: "Product categories",
};

export default function CategoriesPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Categories" />
      <div className="space-y-6">
        <CategoriesTable />
      </div>
    </div>
  );
}
