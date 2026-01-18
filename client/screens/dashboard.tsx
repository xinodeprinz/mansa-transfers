"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Package, LogOut } from "lucide-react";
import { Button, ImageUpload, Modal, TextInput } from "@/components";
import { Product } from "@/types";
import {
  CreateProductForm,
  createProductSchema,
  formatCurrencyXaf,
  formatDate,
  initialProducts,
  mockUser,
} from "@/utils";
import { useState } from "react";

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
  });

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (values: CreateProductForm) => {
    setIsSubmitting(true);
    try {
      // ✅ Ready for your API call later
      console.log("Create product payload (ready for API):", values);

      const localImageUrl = URL.createObjectURL(values.image);

      const newProduct: Product = {
        id: `p_${Date.now()}`,
        title: values.title,
        imageUrl: localImageUrl,
        description: values.description ?? null,
        price: values.price,
        quantity: typeof values.quantity === "number" ? values.quantity : null,
        created_at: new Date().toISOString(),
      };

      setProducts((prev) => [newProduct, ...prev]);
      closeModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  const onLogout = () => {
    // Static behavior only
    console.log("Logout clicked");
    // optionally: window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage your products in one place.
            </p>
          </div>

          {/* User info + Logout */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-sm text-slate-700">
                <span className="font-semibold text-slate-900">
                  {`${mockUser.first_name} ${mockUser.last_name}`}
                </span>{" "}
                • {mockUser.email}
              </p>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>

        {/* Products */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-slate-700" aria-hidden="true" />
              <h2 className="text-base font-semibold text-slate-900">
                Your products
              </h2>
              <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                {products.length}
              </span>
            </div>

            <Button type="button" onClick={openModal} className="sm:w-auto">
              <span className="inline-flex items-center gap-2">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add product
              </span>
            </Button>
          </div>

          {products.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium text-slate-900">
                No products yet
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Click “Add product” to create your first one.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative overflow-hidden rounded-t-2xl border-b border-slate-100 bg-slate-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="h-44 w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {p.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Created {formatDate(p.created_at)}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-semibold text-slate-900">
                        {formatCurrencyXaf(p.price)}
                      </p>
                    </div>

                    {p.description ? (
                      <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                        {p.description}
                      </p>
                    ) : (
                      <p className="mt-3 text-sm text-slate-400 italic">
                        No description
                      </p>
                    )}

                    <div className="mt-4">
                      <p className="text-xs text-slate-600">
                        Qty:{" "}
                        <span className="font-semibold text-slate-900">
                          {typeof p.quantity === "number"
                            ? p.quantity
                            : "Unlimited"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Product Modal */}
        <Modal
          isOpen={isModalOpen}
          title="Add a product"
          description="Fill in the details below. You’ll plug your API call into the submit handler."
          onClose={closeModal}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextInput
                label="Title"
                name="title"
                register={register}
                error={errors.title?.message}
                placeholder="e.g., Silver Necklace"
                autoComplete="off"
                disabled={isSubmitting}
              />

              <TextInput
                label="Price (XAF)"
                name="price"
                register={register}
                error={errors.price?.message}
                placeholder="e.g., 15000"
                inputMode="numeric"
                autoComplete="off"
                disabled={isSubmitting}
              />
            </div>

            {/* ✅ Controller fixes validation for file input */}
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <ImageUpload
                  label="Product image"
                  value={(field.value as File) ?? null}
                  onChange={(file) => field.onChange(file)}
                  error={errors.image?.message}
                  helperText="A clean product photo works best."
                  disabled={isSubmitting}
                />
              )}
            />

            <TextInput
              label="Description (optional)"
              name="description"
              register={register}
              error={errors.description?.message}
              placeholder="Short description of the product..."
              autoComplete="off"
              disabled={isSubmitting}
            />

            <TextInput
              label="Quantity (optional)"
              name="quantity"
              register={register}
              error={errors.quantity?.message}
              placeholder="e.g., 10"
              inputMode="numeric"
              autoComplete="off"
              disabled={isSubmitting}
              helperText="Leave empty for Unlimited."
            />

            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end sm:gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <Button
                type="submit"
                className="sm:w-auto"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                loadingText="Saving product..."
              >
                Create product
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
