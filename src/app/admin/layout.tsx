import { ReactNode } from "react";
import { createClient } from "@/supabase/server";
import { RenderMounted } from "@/components/render-mounted";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default async function AdmintLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (authData?.user) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();
    if (error || !data) {
      console.log("Error fetching user data", error);
    }
  }

  return (
    <RenderMounted>
      <Header />
      <main className="min-h-[calc(100svh-128px)] py-3">{children}</main>
      <Footer />
    </RenderMounted>
  );
}
