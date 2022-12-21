import { NextPageWithLayout } from "../../_app";
import { AdminLayout } from "../../../layout/admin-layout";

export const AdminUserMgm: NextPageWithLayout = () => {
  return (
    <div className={''}>
      유저 관리
    </div>
  );
}

AdminUserMgm.getLayout = (page) => {
  return (
    <AdminLayout>
      { page }
    </AdminLayout>
  )
}

export default AdminUserMgm;