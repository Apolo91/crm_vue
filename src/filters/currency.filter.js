export default function currencyFilter(value, currency = "RUB") {
  return Intl.NumberFormat("ru-Ru", {
    style: "currency",
    currency
  }).format(value);
}
