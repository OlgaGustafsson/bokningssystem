export const getFutureDate = (): string => {
    const today = new Date();
    const futureDate = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
    return futureDate.toISOString().split("T")[0];
  };