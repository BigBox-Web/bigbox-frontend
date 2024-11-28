import { IoTicket, IoPeople, IoShieldCheckmarkSharp, IoMenu } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useState } from "react";

const SidebarItem = (props) => {
  const { children } = props;

  return (
    <Button variant="ghost" size="lg" className="w-full rounded-none justify-start">
      {children}
    </Button>
  );
};

export const AdminLayout = (props) => {
  const { title, description, rightSection, children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    alert("Logging out...");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className={`min-h-screen border-r transition-transform duration-300 ${isSidebarOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full"}`}>
        <div className={`h-16 flex-col flex items-center justify-center border-b ${isSidebarOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
          <img src="/bigbox.svg" alt="BigBox" width={150} />
        </div>

        {isSidebarOpen && (
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
        )}
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-0" : "ml-0"}`}>
        <header className="h-16 border-b w-full flex justify-between items-center px-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
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

        <main className="flex flex-col p-4">
          <div className="flex justify-between items-center pb-4 border-b mb-8">
            <div>
              <h1 className="font-bold text-4xl">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            {rightSection}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
};
