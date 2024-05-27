// export const futureDate = new Date();
// futureDate.setMonth(futureDate.getMonth() + 6);
// const maxDate = futureDate.toISOString().split("T")[0];

export const getFutureDate = (): string => {
    const today = new Date();
    const futureDate = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
    return futureDate.toISOString().split("T")[0];
  };