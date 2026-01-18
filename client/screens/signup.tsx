"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Button } from "@/components";
import { normalizeCameroonPhone, SignUpForm, signUpSchema } from "@/utils";
import { useState } from "react";
import Link from "next/link";

export default function SignupScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (values: SignUpForm) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...values,
        phone: normalizeCameroonPhone(values.phone),
      };

      await new Promise((r) => setTimeout(r, 5000));

      console.log("Signup payload:", payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        {/* Wider card on desktop to use horizontal space */}
        <div className="w-full max-w-2xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 text-center">
              <h1 className="text-xl font-semibold text-slate-900">
                Create your account
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Simple, fast, and secure.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <TextInput
                  label="First name"
                  name="first_name"
                  register={register}
                  error={errors.first_name?.message}
                  placeholder="John"
                  autoComplete="given-name"
                />

                <TextInput
                  label="Last name"
                  name="last_name"
                  register={register}
                  error={errors.last_name?.message}
                  placeholder="Doe"
                  autoComplete="family-name"
                />

                <TextInput
                  label="Email"
                  name="email"
                  register={register}
                  error={errors.email?.message}
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                />

                <TextInput
                  label="Phone (MTN or Orange)"
                  name="phone"
                  register={register}
                  error={errors.phone?.message}
                  placeholder="+237 6xx xxx xxx"
                  inputMode="tel"
                  autoComplete="tel"
                  helperText="Examples: 6xxxxxxxx, +2376xxxxxxxx"
                />

                {/* Password spans full width (still compact) */}
                <div className="lg:col-span-2">
                  <TextInput
                    label="Password"
                    name="password"
                    register={register}
                    error={errors.password?.message}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="new-password"
                  />
                </div>

                {/* Button full width */}
                <div className="lg:col-span-2 pt-1">
                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={isSubmitting}
                    disabled={isSubmitting} // only disable while submitting
                    loadingText="Creating account..."
                  >
                    Create account
                  </Button>

                  <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
