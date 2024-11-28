import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IoAdd } from "react-icons/io5";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users", {
        params: {
          _limit: 5,
        },
      });

      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminLayout
      title="Users Management"
      description="Managing our users"
      rightSection={
        <div className="flex gap-2">
          <Link to="/admin/products/create">
            <Button>
              <IoAdd className="h-6 w-6 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      }
    >
      <Table className="p-4 border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Username</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            return (
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Link>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-6 h-6" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default UserManagementPage;
