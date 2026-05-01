"use client";

import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Chrome } from "lucide-react";

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

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-500 font-bold">Or continue with</span>
        </div>
      </div>

      <Button variant="outline" className="w-full py-6 rounded-xl border-slate-200 font-bold flex items-center gap-2">
        <Chrome className="h-5 w-5 text-rose-500" />
        Login with Google
      </Button>

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

