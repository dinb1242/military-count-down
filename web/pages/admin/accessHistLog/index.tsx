import { NextPageWithLayout } from "../../_app";
import { AdminLayout } from "../../../layout/admin-layout";

export const AdminAccessHistLog: NextPageWithLayout = () => {
  return (
    <div className={''}>
      ์ ์ ๋ก๊ทธ
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