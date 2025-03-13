// export const formattedAmount = new Intl.NumberFormat("en-US", {
//   style: "decimal",
//   useGrouping: true,
//   minimumFractionDigits: 2,
//   maximumFractionDigits: 2,
// }).format(item.Monto);

export const formattedAmount = (item: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(item);
};

export const formattedNumber = (item: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(item);
};

export const formatDate = (item: any) => {
  if (!item) return;
  const date = new Date(item);

  const monthNames = [
    "ene.",
    "feb.",
    "mar.",
    "abr.",
    "may.",
    "jun.",
    "jul.",
    "ago.",
    "sep.",
    "oct.",
    "nov.",
    "dic.",
  ];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};

export const formatdate = (item: any) => {
  const date = new Date(item);
  const monthNames = [
    "ene.",
    "feb.",
    "mar.",
    "abr.",
    "may.",
    "jun.",
    "jul.",
    "ago.",
    "sep.",
    "oct.",
    "nov.",
    "dic.",
  ];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedDate = `${day} ${month} ${year} `;
  const fechaPostFormato = formattedDate;
  if (!item) {
    return;
  } else {
    return fechaPostFormato;
  }
};
export const CurrentFormatDate = () => {
  const date = new Date();
  const monthNames = [
    "ene.",
    "feb.",
    "mar.",
    "abr.",
    "may.",
    "jun.",
    "jul.",
    "ago.",
    "sep.",
    "oct.",
    "nov.",
    "dic.",
  ];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${day}${month}${year}${hour}:${minute}Hrs`;
};
