"use client";

import PropertyForm from "@/app/_components/PropertyForm";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const property = useQuery(api.properties.getProperty, {
    id: id as any,
  });

  if (property === undefined) {
    return <div>Loading property...</div>;
  }

  if (property === null) {
    return <div>Property not found</div>;
  }

  return (
    <div>
      <PropertyForm isEditing={true} initialData={property} propertyId={id} />
    </div>
  );
}
