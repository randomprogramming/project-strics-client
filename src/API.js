export const REGISTER = "/api/register";
export const LOGIN = "/api/login";
export const LOGOUT = "/api/logout";
export const CREATE_TRANSACTION = "/api/create-transaction";
export const LOGGED_IN_ACCOUNT = "/api/logged-in-account";
export const INVENTORY = "/api/inventory";
export const PURHCASES = "/api/purchases";
export const SALES = "/api/sales";
export function markTransactionSoldUrl(id) {
  return `/api/mark-transaction-sold/${id}`;
}
export function deleteTransaction(id) {
  return `/api/delete-transaction/${id}`;
}
export const TOTAL_PROFIT = "/api/total-profit";
export const TRANSACTION_STATS = "/api/transaction-stats";
