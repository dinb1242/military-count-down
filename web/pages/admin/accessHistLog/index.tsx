import { NextPageWithLayout } from "../../_app";
import { AdminLayout } from "../../../layout/admin-layout";

export const AdminAccessHistLog: NextPageWithLayout = () => {
  return (
    <div className={''}>
      접속 로그
    </div>
  );
}

AdminAccessHistLog.getLayout = (page) => {
  return (
    <AdminLayout>
      { page }
    </AdminLayout>
  )
}

export default AdminAccessHistLog;