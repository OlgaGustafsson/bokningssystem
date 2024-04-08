export const formatDate = (date: string | number | Date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('sv-SE');
  };