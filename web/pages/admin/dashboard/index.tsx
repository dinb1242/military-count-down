import { NextPageWithLayout } from "../../_app";
import { AdminLayout } from "../../../layout/admin-layout";

export const AdminDashboard: NextPageWithLayout = () => {
  return (
    <div className={''}>
      대시보드
    </div>
  );
}

AdminDashboard.getLayout = (page) => {
  return (
    <AdminLayout>
      { page }
    </AdminLayout>
  )
}

export default AdminDashboard;