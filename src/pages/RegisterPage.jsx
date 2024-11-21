import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const registerFormSchema = z
  .object({
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

const RegisterPage = () => {
  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phone_number: "",
      username: "",
      password: "",
      repeatPassword: "",
    },
    resolver: zodResolver(registerFormSchema),
    reValidateMode: "onSubmit",
  });

  const handleLogin = (values) => {
    alert(`Username: ${values.username} | Password: ${values.password}`);
  };

  return (
    <main className="px-4 container mx-auto py-8 flex flex-col justify-center items-center h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="w-full max-w-[540px]">
          <Card>
            <CardHeader>
              <CardTitle>
                <img src="/logo-bigbox.svg" alt="BigBox" width={300} className="mx-auto" />
                <h1>Register</h1>
                <p className="text-muted-foreground text-sm font-normal mt-3">Create an account to start your journey with us</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
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
                      <Input {...field} />
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
                <Button type="submit">Register</Button>
                <Link to="/login">
                  <Button variant="link" className="w-full">
                    Login
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

export default RegisterPage;