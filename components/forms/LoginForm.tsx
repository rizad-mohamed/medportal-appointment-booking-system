"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { getUserByEmail } from "@/lib/actions/patient.actions";
import { LoginFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginFormValidation>) => {
    setIsLoading(true);
    setError(null);

    try {
      // Get user by email
      const user = await getUserByEmail(values.email);
      
      if (user && user.phone === values.phone) {
        // If user exists and phone matches, redirect to appointment form
        router.push(`/patients/${user.$id}/new-appointment`);
      } else {
        setError("Invalid email or phone number");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or phone number");
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome Back 👋</h1>
          <p className="text-dark-700">Sign in to continue.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="tharindu@example.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="+94 71 234 5678"
        />

        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}

        <SubmitButton isLoading={isLoading}>Sign In</SubmitButton>
      </form>
    </Form>
  );
};

export default LoginForm; 