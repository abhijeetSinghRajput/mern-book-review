import React from "react";
import { ModeToggle } from "./mode-toggle";
import { useAuthStore } from "@/stores/useAuthStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut, User, Mail, Plus } from "lucide-react";
import CreateBookDrawer from "./CreateBookDialog";
import { Separator } from "./ui/separator";

const Header = () => {
  const { authUser } = useAuthStore();

  // Get first character of user's name or email
  const getInitial = () => {
    if (authUser?.fullName) {
      return authUser.fullName.charAt(0).toUpperCase();
    }
    if (authUser?.email) {
      return authUser.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };

  return (
    <header className="sticky top-0 w-full border-b bg-background/95 backdrop-blur z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold">Book Reviewer</h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            {/* Theme Toggle */}
            <CreateBookDrawer />
            <ModeToggle />
            
            {/* User Avatar Popover */}
            {authUser ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="size-10 text-lg">
                      <AvatarFallback className="text-muted-foreground">
                        {getInitial()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-max p-2" align="end">
                  <div className="flex flex-col space-y-4">
                    {/* User Info Section */}
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-accent text-muted-foreground text-lg">
                          {getInitial()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">
                            {authUser.fullName || "User"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {authUser.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Actions Section */}
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="text-sm text-muted-foreground">Not signed in</div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
