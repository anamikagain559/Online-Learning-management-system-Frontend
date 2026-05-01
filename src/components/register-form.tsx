"use client";

import { registerUser } from "@/services/auth/registerUser";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import { User, Mail, Lock, MapPin, GraduationCap, Briefcase } from "lucide-react";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const [selectedRole, setSelectedRole] = useState("STUDENT");

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Account created successfully! Welcome to LearnHub.");
      window.location.href = "/login";
    } else if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name" className="text-slate-700 font-bold flex items-center gap-2">
              <User className="h-4 w-4 text-indigo-500" />
              Full Name
            </FieldLabel>
            <Input id="name" name="name" type="text" placeholder="John Doe" className="rounded-xl border-slate-200 focus:ring-indigo-500" />
            <InputFieldError field="name" state={state ?? undefined} />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email" className="text-slate-700 font-bold flex items-center gap-2">
              <Mail className="h-4 w-4 text-indigo-500" />
              Email Address
            </FieldLabel>
            <Input id="email" name="email" type="email" placeholder="m@example.com" className="rounded-xl border-slate-200 focus:ring-indigo-500" />
            <InputFieldError field="email" state={state ?? undefined} />
          </Field>

          {/* Address */}
          <Field>
            <FieldLabel htmlFor="address" className="text-slate-700 font-bold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-indigo-500" />
              Address
            </FieldLabel>
            <Input id="address" name="address" type="text" placeholder="123 Main St, NY" className="rounded-xl border-slate-200 focus:ring-indigo-500" />
            <InputFieldError field="address" state={state ?? undefined} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password" className="text-slate-700 font-bold flex items-center gap-2">
              <Lock className="h-4 w-4 text-indigo-500" />
              Password
            </FieldLabel>
            <Input id="password" name="password" type="password" placeholder="••••••••" className="rounded-xl border-slate-200 focus:ring-indigo-500" />
            <InputFieldError field="password" state={state ?? undefined} />
          </Field>

          {/* Confirm Password */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="confirmPassword" className="text-slate-700 font-bold flex items-center gap-2">
              <Lock className="h-4 w-4 text-indigo-500" />
              Confirm Password
            </FieldLabel>
            <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" className="rounded-xl border-slate-200 focus:ring-indigo-500" />
            <InputFieldError field="confirmPassword" state={state ?? undefined} />
          </Field>
        </div>

        {/* Role Selection */}
        <div className="mt-8">
          <FieldLabel className="text-slate-700 font-bold mb-4 block">Select Your Role</FieldLabel>
          <input type="hidden" name="role" value={selectedRole} />
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setSelectedRole("STUDENT")}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                selectedRole === "STUDENT"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700 ring-4 ring-indigo-50"
                  : "border-slate-100 bg-white text-slate-500 hover:border-slate-200"
              }`}
            >
              <GraduationCap className={`h-8 w-8 mb-2 ${selectedRole === "STUDENT" ? "text-indigo-600" : "text-slate-300"}`} />
              <span className="font-bold">Student</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("INSTRUCTOR")}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                selectedRole === "INSTRUCTOR"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700 ring-4 ring-indigo-50"
                  : "border-slate-100 bg-white text-slate-500 hover:border-slate-200"
              }`}
            >
              <Briefcase className={`h-8 w-8 mb-2 ${selectedRole === "INSTRUCTOR" ? "text-indigo-600" : "text-slate-300"}`} />
              <span className="font-bold">Instructor</span>
            </button>
          </div>
          <InputFieldError field="role" state={state ?? undefined} />
        </div>

        <FieldGroup className="mt-10">
          <Field>
            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-8 rounded-2xl shadow-xl shadow-indigo-100 transition-all hover:scale-[1.01]"
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <FieldDescription className="px-6 text-center mt-6">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 font-bold hover:underline">
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
