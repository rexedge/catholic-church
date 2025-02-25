import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getParishes } from "@/app/actions/parish";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signup } from "@/app/actions/auth";
import { Parish } from "@prisma/client";

export default async function SignUpPage() {
  // Fetch parishes for the select input
  const { data: parishes } = (await getParishes()) as { data: Parish[] };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Choose your account type to get started
        </p>
      </div>

      <Tabs defaultValue="parishioner" className="space-y-6">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="parishioner">Parishioner</TabsTrigger>
          <TabsTrigger value="priest">Priest</TabsTrigger>
        </TabsList>

        <TabsContent value="parishioner">
          {/* @ts-expect-error: Expected error */}
          <form className="space-y-4" action={signup}>
            <input type="hidden" name="role" value="PARISHIONER" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Phone number"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                required
              />
            </div>
            <div className="space-y-2">
              <Select name="parishId" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your default parish" />
                </SelectTrigger>
                <SelectContent>
                  {parishes?.map((parish: Parish) => (
                    <SelectItem key={parish.id} value={parish.id}>
                      {parish.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                You can still attend masses at any parish
              </p>
            </div>
            <Button type="submit" className="w-full">
              Create Parishioner Account
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="priest">
          {/* @ts-expect-error: Expected error */}
          <form className="space-y-4" action={signup}>
            <input type="hidden" name="role" value="PRIEST" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Phone number"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                required
              />
            </div>
            <div className="space-y-2">
              <Select name="parishId" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your parish" />
                </SelectTrigger>
                <SelectContent>
                  {parishes?.map((parish: Parish) => (
                    <SelectItem key={parish.id} value={parish.id}>
                      {parish.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Create Priest Account
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
