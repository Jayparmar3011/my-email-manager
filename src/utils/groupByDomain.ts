export const groupByDomain = (
  list: { email: string; isSelected: boolean }[]
) => {
  return list.reduce((acc: Record<string, string[]>, { email }) => {
    const domain = email.split("@")[1];
    if (!acc[domain]) acc[domain] = [];
    acc[domain].push(email);
    return acc;
  }, {});
};
