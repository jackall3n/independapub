import { useParams } from "next/navigation";
import { useMemo } from "react";

export function useVenueId() {
  const { id } = useParams<{ id?: string }>();

  return useMemo(() => {
    if (!id) {
      return undefined;
    }

    return decodeURIComponent(id).replaceAll("+", " ");
  }, [id]);
}
