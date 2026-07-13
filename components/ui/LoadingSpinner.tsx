import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex h-full w-full min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">Cargando...</p>
      </div>
    </div>
  );
}
