export const formatDate = (date) => {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const formatIconName = (str) => str.replace(/-/g, "_").toUpperCase();
