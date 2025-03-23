import { logout } from "@/action/logout";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        await logout();
      }}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  );
}
