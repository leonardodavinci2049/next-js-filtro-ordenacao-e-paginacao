import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-y-8">
      <h1 className="font-mono">New Project Nextr.JS</h1>
      <div>
        <Button variant="destructive" >Click Here</Button>
      </div>
    </div>
  );
}
