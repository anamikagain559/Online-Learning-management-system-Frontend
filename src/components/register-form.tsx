"use client";

import { registerUser } from "@/services/auth/registerUser";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "./ui/input";

const RegisterForm = () => {
  // state can be null initially
  const [state, formAction, isPending] = useActionState(registerUser, null);

  // Show toast on error or success
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Account created successfully");
      window.location.href = "/login"; // client-side redirect
    } else if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" name="name" type="text" placeholder="John Doe" />
            <InputFieldError field="name" state={state ?? undefined} />
          </Field>

          {/* Address */}
          <Field>
            <FieldLabel htmlFor="address">Address</FieldLabel>
            <Input id="address" name="address" type="text" placeholder="123 Main St" />
            <InputFieldError field="address" state={state ?? undefined} />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" name="email" type="email" placeholder="m@example.com" />
            <InputFieldError field="email" state={state ?? undefined} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" name="password" type="password" />
            <InputFieldError field="password" state={state ?? undefined} />
          </Field>

          {/* Confirm Password */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input id="confirmPassword" name="confirmPassword" type="password" />
            <InputFieldError field="confirmPassword" state={state ?? undefined} />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="role">Role</FieldLabel>

          <select
            id="role"
            name="role"
            className="w-full border rounded-md p-2"
            defaultValue="STUDENT"
          >
            <option value="STUDENT">Student</option>
            <option value="INSTRUCTOR">Instructor</option>
          </select>

          <InputFieldError field="role" state={state ?? undefined} />
        </Field>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
