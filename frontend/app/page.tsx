import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary-foreground">Loyalty Points System</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Customer Portal</CardTitle>
              <CardDescription>Check your points balance, view history, and redeem rewards</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="aspect-video relative bg-muted rounded-md flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-md" />
                <div className="text-center space-y-2 relative z-10">
                  <h3 className="text-xl font-medium">Track Your Rewards</h3>
                  <p className="text-muted-foreground">View your points and redeem for exclusive offers</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/customer/login" className="w-full">
                <Button className="w-full">Customer Login</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Employee Portal</CardTitle>
              <CardDescription>Manage customer points, offers, and redemptions</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="aspect-video relative bg-muted rounded-md flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-md" />
                <div className="text-center space-y-2 relative z-10">
                  <h3 className="text-xl font-medium">Manage Loyalty Program</h3>
                  <p className="text-muted-foreground">Add points, process redemptions, and track activity</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/employee/login" className="w-full">
                <Button className="w-full">Employee Login</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Loyalty Points System
        </div>
      </footer>
    </div>
  )
}

