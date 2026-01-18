"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, TextInput } from "@/components";
import { useState } from "react";
import { LoginForm, loginSchema } from "@/utils";
import Link from "next/link";

export default function LoginScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginForm) => {
    setIsSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 5000));

      console.log("Login payload:", values);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 text-center">
              <h1 className="text-xl font-semibold text-slate-900">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-slate-600">Log in to continue.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <TextInput
                label="Email"
                name="email"
                register={register}
                error={errors.email?.message}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />

              <TextInput
                label="Password"
                name="password"
                register={register}
                error={errors.password?.message}
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                className="w-full"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                loadingText="Logging in..."
              >
                Log in
              </Button>

              <p className="mt-3 text-center text-sm text-slate-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
