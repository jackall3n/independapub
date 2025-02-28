import { Button } from "~/components/ui/button";
import { BeerIcon, FactoryIcon, HomeIcon } from "lucide-react";

export function Sidebar() {
  return (
    <div>
      <div className="p-4">
        <Button size="icon" variant="ghost">
          <BeerIcon />
        </Button>
      </div>

      <nav className="flex flex-col justify-center space-y-2 p-4">
        <Button size="icon" variant="ghost">
          <HomeIcon />
        </Button>

        <Button size="icon" variant="ghost">
          <FactoryIcon />
        </Button>
      </nav>
    </div>
  );
}
