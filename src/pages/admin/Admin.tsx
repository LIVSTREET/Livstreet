import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Inbox, Image } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AdminInboxTab } from "@/components/admin/AdminInboxTab";
import { AdminSymbolsTab } from "@/components/admin/AdminSymbolsTab";

export default function Admin() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("inbox");

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/admin");
      toast.success("Logget ut");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Ukjent feil";
      toast.error("Feil ved utlogging", {
        description: errorMessage,
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-semibold">Admin</h1>
              <p className="text-sm text-muted-foreground">
                Logget inn som {user.email}
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Logg ut
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="inbox" className="gap-2">
              <Inbox className="w-4 h-4" />
              Innboks
            </TabsTrigger>
            <TabsTrigger value="symbols" className="gap-2">
              <Image className="w-4 h-4" />
              Symboler
            </TabsTrigger>
          </TabsList>
          <TabsContent value="inbox">
            <AdminInboxTab />
          </TabsContent>
          <TabsContent value="symbols">
            <AdminSymbolsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
