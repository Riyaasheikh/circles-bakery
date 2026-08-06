import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  beforeLoad: async () => {
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (!uid) throw redirect({ to: "/auth" });
    const { data: staff } = await supabase.rpc("is_staff", { _user_id: uid });
    if (!staff) throw redirect({ to: "/account" });
    return { staff: true };
  },
  component: () => <Outlet />,
});
