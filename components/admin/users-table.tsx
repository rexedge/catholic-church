"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, Check, X } from "lucide-react";
// import { verifyPriest } from "@/app/actions/user";

interface UsersTableProps {
  users: any[];
  pageCount: number;
  currentPage: number;
}

export function UsersTable({ users, pageCount, currentPage }: UsersTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  // Create query string
  const createQueryString = (
    params: Record<string, string | number | null>
  ) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, String(value));
      }
    });

    return newSearchParams.toString();
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `${pathname}?${createQueryString({ search: searchQuery, page: 1 })}`
    );
  };

  // Handle role filter
  const handleRoleFilter = (role: string) => {
    router.push(
      `${pathname}?${createQueryString({ role: role || null, page: 1 })}`
    );
  };

  // Handle pagination
  const handlePagination = (page: number) => {
    router.push(`${pathname}?${createQueryString({ page })}`);
  };

  // Handle verify priest
  //   const handleVerifyPriest = async (priestId: string) => {
  //     setIsLoading((prev) => ({ ...prev, [priestId]: true }));

  //     try {
  //       const result = await verifyPriest(priestId);

  //       if (result.error) {
  //         toast.error(
  //             "Error",
  //             {
  //           description: result.error,
  //         });
  //       } else {
  //         toast.success(
  //             "Success",
  //             {
  //           description: "Priest account has been verified.",
  //         });
  //       }
  //     } catch (error) {
  //       toast.error(
  //           "Error",
  //           {
  //         description: "An unexpected error occurred. Please try again.",
  //       });
  //     } finally {
  //       setIsLoading((prev) => ({ ...prev, [priestId]: false }));
  //     }
  //   };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[300px]"
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
        <Select
          defaultValue={searchParams.get("role") || ""}
          onValueChange={handleRoleFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Roles</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="PRIEST">Priest</SelectItem>
            <SelectItem value="PARISHIONER">Parishioner</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Parish</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === "ADMIN"
                          ? "default"
                          : user.role === "PRIEST"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.parish?.name || "—"}</TableCell>
                  <TableCell>
                    {user.role === "PRIEST" ? (
                      user.isVerified ? (
                        <Badge className="bg-green-100 text-green-800">
                          <Check className="mr-1 h-3 w-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge
                          variant="destructive"
                          className="bg-red-100 text-red-800"
                        >
                          <X className="mr-1 h-3 w-3" /> Unverified
                        </Badge>
                      )
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/users/${user.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/users/${user.id}/edit`}>
                            Edit User
                          </Link>
                        </DropdownMenuItem>
                        {/* {user.role === "PRIEST" && !user.isVerified && (
                          <DropdownMenuItem
                            onClick={() => handleVerifyPriest(user.id)}
                            disabled={isLoading[user.id]}
                          >
                            {isLoading[user.id]
                              ? "Verifying..."
                              : "Verify Priest"}
                          </DropdownMenuItem>
                        )} */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </Button>
          <div className="text-sm">
            Page {currentPage} of {pageCount}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage >= pageCount}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
