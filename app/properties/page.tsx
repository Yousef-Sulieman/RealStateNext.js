"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ArrowBigRight } from "lucide-react";
import { PropertyFilters as Filters } from "../types";
import Link from "next/link";
import React, { useEffect, useState, Suspense } from "react";
import PropertyCard from "../_components/PropertyCard";
import PropertyFilters from "../_components/PropertyFilters";
import { useSearchParams } from "next/navigation";

function PropertiesPageContent() {
  const [filters, setFilters] = useState<Filters>({});
  const properties = useQuery(api.properties.getProperties, filters);

  const searchParams = useSearchParams();
  const propertyType = searchParams.get("type");

  const getPageTitle = () => {
    switch (propertyType) {
      case "house":
        return "Houses";
      case "apartment":
        return "Apartments";
      case "townhouse":
        return "Town Houses";
      case "condo":
        return "Condos";
      default:
        return "All Properties";
    }
  };

  useEffect(() => {
    if (propertyType) {
      setFilters((prev) => ({
        ...prev,
        propertyType: propertyType,
      }));
    }
  }, [propertyType]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {getPageTitle()}
              </h1>
              {properties && (
                <p className="text-gray-600 mt-1">
                  {properties.length} properties found
                </p>
              )}
            </div>

            <Link href="/properties/new">
              <Button className="bg-[#e04141] hover:bg-[#c73636] flex items-center gap-2">
                <ArrowBigRight className="w-4 h-4" />
                Add Property
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters Column (1/4 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Filter Properties
              </h3>
              <PropertyFilters filters={filters} onFiltersChange={setFilters} />

              {/* Clear Filters Button */}
              {Object.keys(filters).length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setFilters({})}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Column (3/4 width) */}
          <div className="lg:col-span-3">
            {/* Loading State */}
            {properties === undefined ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white animate-pulse rounded-xl h-80 shadow-sm border"
                  ></div>
                ))}
              </div>
            ) : /* Empty State */
            properties.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {propertyType
                    ? `No ${getPageTitle().toLowerCase()} found`
                    : "No properties found"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {propertyType
                    ? "Try adjusting your filters or check back later for new listings."
                    : "Be the first to add a property to our platform."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/properties/new">
                    <Button className="bg-[#e04141] hover:bg-[#c73636]">
                      Add Your Property
                    </Button>
                  </Link>
                  {propertyType && (
                    <Link href="/properties">
                      <Button variant="outline">View All Properties</Button>
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              /* Properties Grid */
              <>
                {/* Results Summary */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-600">
                    Showing {properties.length}{" "}
                    {properties.length === 1 ? "property" : "properties"}
                  </div>

                  {/* Sort Options */}
                  <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                    <span>Sort by:</span>
                    <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                      <option>Newest First</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {properties?.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>

                {/* Back to All Properties Link */}
                {propertyType && (
                  <div className="text-center mt-12">
                    <Link href="/properties">
                      <Button variant="outline" size="lg">
                        View All Properties
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertiesPageContent />
    </Suspense>
  );
}
