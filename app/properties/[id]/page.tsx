"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Bath, Bed, Calendar, MapPin, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, use } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import ScheduleViewing from "@/app/_components/ScheduleViewing";

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const { id } = use(params);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch property
  const property = useQuery(api.properties.getProperty, {
    id: id as any,
  });

  const deleteProperty = useMutation(api.properties.deleteProperty);

  const handleDelete = async () => {
    try {
      await deleteProperty({ id: id as any });
      router.push("/properties");
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property");
    }
  };

  if (property === undefined) return <p>Loading...</p>;
  if (property === null) return <p>Property not found.</p>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mt-10 justify-end">
        {property?._id && (
          <Link href={`/properties/${property._id}/edit`}>
            <Button>Edit</Button>
          </Link>
        )}

        <Button onClick={handleDelete} className="bg-red-600">
          Delete
        </Button>
      </div>

      {/* Image Gallery */}
      {/* Image Gallery */}
      <div className="mb-8 mt-5">
        {property.images && property.images.length > 0 ? (
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full rounded-lg overflow-hidden">
              <Image
                alt="img"
                width={1500}
                height={1500}
                className="object-cover w-full h-[550px]"
                src={property.images[selectedImageIndex]}
              />
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`border rounded-lg overflow-hidden ${
                      selectedImageIndex === index
                        ? "ring-2 ring-red-500"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      width={150}
                      height={150}
                      alt="thumbnail"
                      className="object-cover w-[150px] h-[150px]"
                      src={image}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <span className="text-gray-400">No images available</span>
        )}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{property.title}</h1>

            <div className="flex items-center text-gray-600 mb-4">
              <MapPin />
              <span>
                {property.address}, {property.city}, {property.state}{" "}
                {property.zipCode}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <p className="text-3xl font-bold text-red-600">
                ${property.price.toLocaleString()}
              </p>

              {property.status === "for-rent" && (
                <span className="text-lg text-gray-600">/month</span>
              )}
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="mb-5 font-bold">Property Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Bed className="mx-auto mb-2" />
                <p>{property.bedrooms} Bedrooms</p>
              </div>

              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Bath className="mx-auto mb-2" />
                <p>{property.bathrooms} Bathrooms</p>
              </div>

              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Square className="mx-auto mb-2" />
                <p>{property.area} Sq Ft</p>
              </div>

              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Calendar className="mx-auto mb-2" />
                <p>{property.propertyType}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-bold">Description</h3>
            <p className="text-gray-700">{property.description}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-bold text-lg">Contact Information</h3>

            <div className="mt-5 flex flex-col items-center space-y-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-[200px]">Contact Agent</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogDescription>
                      <div className="flex items-center gap-4 mt-4">
                        <Image
                          width={100}
                          height={100}
                          alt="whatsapp"
                          src="/whatsApp.jpg"
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-2xl font-bold text-green-600">
                            +90 442 512 24
                          </p>
                          <p className="text-gray-600">WhatsApp Available</p>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <ScheduleViewing
                property={{
                  _id: property._id,
                  title: property.title,
                }}
              />

              <Button className="w-[200px]">Save Property</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
