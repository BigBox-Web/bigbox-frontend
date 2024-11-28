import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IoAdd } from "react-icons/io5";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";

const UserManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  const handleNextPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) + 1);

    setSearchParams(searchParams);
  };

  const handlePreviousPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) - 1);

    setSearchParams(searchParams);
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users", {
        params: {
          _per_page: 5,
          _page: Number(searchParams.get("page")),
        },
      });

      setHasNextPage(Boolean(response.data.next));
      setUsers(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Mount & Update
  useEffect(() => {
    if (searchParams.get("page")) {
      fetchUsers();
    }
  }, [searchParams.get("page")]);

  // Mount
  useEffect(() => {
    if (!searchParams.get("page") || Number(searchParams.get("page")) < 1) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    } else if (Number(searchParams.get("page")) > 4) {
      searchParams.set("page", 4);
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <AdminLayout
      title="Users Management"
      description="Managing our users"
      rightSection={
        <div className="flex gap-2 mt-4">
          <Link to="/admin/products/create">
            <Button>
              <IoAdd className="h-6 w-6 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      }
    >
      {/* Table */}
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

      {/* Pagination */}
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <Button disabled={searchParams.get("page") == 1} onClick={handlePreviousPage} variant="ghost">
              <ChevronLeft className="w-6 h-6 mr-2" /> Previous
            </Button>
          </PaginationItem>

          <PaginationItem className="mx-8 font-semibold">Page {searchParams.get("page")}</PaginationItem>

          <PaginationItem>
            <Button disabled={!hasNextPage} onClick={handleNextPage} variant="ghost">
              Next <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </AdminLayout>
  );
};

export default UserManagementPage;
