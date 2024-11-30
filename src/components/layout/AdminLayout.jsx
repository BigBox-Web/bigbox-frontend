import { IoTicket, IoPeople, IoShieldCheckmarkSharp, IoMenu } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useState } from "react";

const SidebarItem = ({ children }) => (
  <Button variant="ghost" size="lg" className="w-full rounded-none justify-start">
    {children}
  </Button>
);

export const AdminLayout = ({ title, description, rightSection, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    alert("Logging out...");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 bg-white border-r transition-transform duration-300 min-h-screen
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:w-72`}
      >
        <div className="h-16 flex items-center justify-center border-b">
          <img src="/bigbox.svg" alt="BigBox" width={150} />
        </div>

        <div className="flex flex-col space-y-0 py-4">
          <SidebarItem>
            <IoPeople className="h-6 w-6 mr-4" />
            User Management
          </SidebarItem>

          <SidebarItem>
            <IoTicket className="h-6 w-6 mr-4" />
            Ticket Management
          </SidebarItem>

          <SidebarItem>
            <IoShieldCheckmarkSharp className="h-6 w-6 mr-4" />
            Approval
          </SidebarItem>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="h-16 border-b w-full flex items-center px-4">
          {/* Hamburger Menu */}
          <Button onClick={toggleSidebar} className="lg:hidden" variant="ghost" size="icon">
            <IoMenu className="h-6 w-6" />
          </Button>

          {/* Avatar with dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer absolute right-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => alert("Edit Profile")}>Edit Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Change Password")}>Change Password</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Section */}
        <main className="flex flex-col p-4">
          <div className="flex justify-between items-start pb-4 border-b mb-8 flex-col sm:flex-row">
            <div>
              <h1 className="font-bold text-4xl">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            {rightSection}
          </div>

          {children}
        </main>
      </div>

      {/* Overlay (Small screens) */}
      {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"></div>}
    </div>
  );
};
