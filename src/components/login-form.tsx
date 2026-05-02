"use client";

import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";


interface LoginFormProps {
  redirect?: string;
}

const LoginForm = ({ redirect }: LoginFormProps) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  useEffect(() => {
    if (state?.success && state.redirect) {
      window.location.href = state.redirect;
    }
  }, [state]);

  return (
    <div className="space-y-6">
      <form action={formAction}>
        {redirect && <input type="hidden" name="redirect" value={redirect} />}

        <FieldGroup>
          <div className="grid grid-cols-1 gap-4">
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                className="rounded-xl"
              />
              <InputFieldError field="email" state={state} />
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="rounded-xl"
              />
              <InputFieldError field="password" state={state} />
            </Field>
          </div>

          <FieldGroup className="mt-6">
            <Field>
              <Button type="submit" disabled={isPending} className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 rounded-xl font-bold">
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>



      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <a href="/register" className="text-indigo-600 font-bold hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;

