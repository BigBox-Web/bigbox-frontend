import { AdminLayout } from "@/components/layout/AdminLayout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const createFormSchema = z
  .object({
    role: z.string().nonempty("Please select a role"),
    fullname: z
      .string()
      .min(3, "Your fullname is too short")
      .max(50, "Your fullname is too long")
      .regex(/^[a-zA-Z\s]+$/, "Your fullname should only contain letters and spaces"),
    email: z.string().email("Invalid email format"),
    phone_number: z
      .string()
      .min(10, "Your phone number is too short")
      .max(15, "Your phone number is too long")
      .regex(/^[0-9]+$/, "Your phone number should only contain digits"),
    username: z
      .string()
      .min(3, "Your username is under 3 characters")
      .max(16, "Your username is over 16 characters")
      .regex(/^[a-z0-9]+$/, "Username can only contain lowercase letters and numbers."),
    password: z.string().min(8, "Your password is under 8 characters"),
    repeatPassword: z.string().min(8, "Your password is under 8 characters"),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["repeatPassword"],
      });
    }
  });

const CreateUserPage = () => {
  const [userIsLoading, setUserIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      role: "",
      fullname: "",
      email: "",
      phone_number: "",
      username: "",
      password: "",
      repeatPassword: "",
    },
    resolver: zodResolver(createFormSchema),
    reValidateMode: "onSubmit",
  });

  const handleCreateUser = async (values) => {
    try {
      setUserIsLoading(true);

      await axiosInstance.post("/users", {
        role: values.role,
        fullname: values.fullname,
        email: values.email,
        phone_number: values.phone_number,
        username: values.username,
        password: values.password,
      });

      toast.success("User created successfully");
      form.reset();
      setTimeout(() => {
        navigate("/admin/users");
      }, 2000);
    } catch (err) {
      toast.error("Failed to create user. Please try again");
      console.log(err);
    } finally {
      setUserIsLoading(false);
    }
  };

  return (
    <AdminLayout title="Create Users" description="Add new users">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateUser)} className="w-full max-w-[540px]">
          <Card>
            <CardHeader>
              <CardTitle>
                <h1>Add a new user</h1>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="role">Role</FormLabel>
                    <FormControl>
                      <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="frontend">Frontend</SelectItem>
                          <SelectItem value="backend">Backend</SelectItem>
                          <SelectItem value="uiux">UIUX</SelectItem>
                          <SelectItem value="devops">DevOps</SelectItem>
                          <SelectItem value="datascientist">DataScientist</SelectItem>
                          <SelectItem value="dataanalyst">DataAnalyst</SelectItem>
                          <SelectItem value="itsupport">ITSupport</SelectItem>
                          <SelectItem value="productmanager">ProductManager</SelectItem>
                          <SelectItem value="projectmanager">ProjectManager</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>Role is required</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Fullname is required and must only contain alphabetic characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Please enter a valid email address (e.g., example@mail.com)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormDescription>Phone number must be at least 10 digits (e.g., 08123456789)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Username has to be between 3 and 16 characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription>Password has to 8 characters or more</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repeat Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription>Make sure your passwords match</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <div className="flex flex-col space-y-4 w-full">
                <Button disabled={userIsLoading} type="submit">
                  {userIsLoading ? "Creating User..." : "Create New User"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>

      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />
    </AdminLayout>
  );
};

export default CreateUserPage;
