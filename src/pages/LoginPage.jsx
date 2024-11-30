import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import React from "react";
import Spinner from "@/components/ui/spinner";

const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, "Your username is under 3 characters")
    .max(16, "Your username is over 16 characters")
    .regex(/^[a-z0-9]+$/, "Username can only contain lowercase letters and numbers."),
  password: z.string().min(8, "Your password is under 8 characters"),
});

const LoginPage = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
    reValidateMode: "onSubmit",
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleLogin = (values) => {
    console.log(values);
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="px-4 container mx-auto py-8 flex flex-col justify-center items-center h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="w-full max-w-[540px]">
          <Card>
            <CardHeader>
              <CardTitle>
                <img src="bigbox.svg" alt="BigBox" width={300} className="mx-auto" />
                <h1>Login</h1>
                <p className="text-muted-foreground text-sm font-normal mt-3">Please enter your credentials to access your account</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
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
                      <Input {...field} type={isChecked ? "text" : "password"} />
                    </FormControl>
                    <FormDescription>Password has to 8 characters or more</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-2">
                <Checkbox onCheckedChange={(checked) => setIsChecked(checked)} id="show-password" />
                <Label htmlFor="show-password">Show Password</Label>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col space-y-4 w-full">
                <Button type="submit">Login</Button>
                <Link to="/register">
                  <Button variant="link" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default LoginPage;
