"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ... imports
interface SearchFilterProps {
  categories: string[];
  hideCategoryDropdown?: boolean;
}

export default function SearchFilter({ categories, hideCategoryDropdown }: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 1. Initialize State
  const [search, setSearch] = useState(searchParams.get("query") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");

  // 2. SYNC FROM URL (Downstream)
  useEffect(() => {
    const urlQuery = searchParams.get("query") || "";
    const urlCategory = searchParams.get("category") || "all";
    setSearch((prev) => (prev !== urlQuery ? urlQuery : prev));
    setCategory((prev) => (prev !== urlCategory ? urlCategory : prev));
  }, [searchParams]);

  // 3. SYNC TO URL (Upstream)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const currentQuery = params.get("query") || "";
      const currentCategory = params.get("category") || "all";

      if (search === currentQuery && category === currentCategory) return;

      if (search) params.set("query", search);
      else params.delete("query");

      if (category && category !== "all") params.set("category", category);
      else params.delete("category");

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, category, router, pathname, searchParams]);

  return (
    <div className={`flex flex-col md:flex-row gap-4 w-full ${hideCategoryDropdown ? '' : 'p-2 rounded-2xl shadow-lg border border-slate-100 bg-white'}`}>
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
        <Input
          placeholder="Search models, specs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`pl-12 border-transparent focus:ring-2 focus:ring-red-100 h-12 text-base rounded-xl transition-all ${hideCategoryDropdown ? 'bg-slate-100 border-none' : 'bg-slate-50 focus:bg-white'}`}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Category Dropdown (Conditionally Rendered) */}
      {!hideCategoryDropdown && (
        <div className="w-full md:w-[280px]">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-red-100 h-12 rounded-xl px-4">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="capitalize py-3 cursor-pointer">
                  {cat.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}