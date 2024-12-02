import { createClient } from "@/supabase/server";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { ADMIN } from "@/constants/constants";
export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  console.log(authData);

  if (authData?.user) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();
    console.log(data);
    if (error || !data) {
      console.log("Error fetching user data", error);
    }
    if (data?.type === ADMIN) {
      return redirect("/admin");
    }
  }

  return <>{children}</>;
}
