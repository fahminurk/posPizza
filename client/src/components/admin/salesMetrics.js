// File: salesMetrics.js

// Fungsi untuk menghitung metrik penjualan
function calculateSalesMetrics(
  totalRevenueFromSales,
  returns,
  discounts,
  otherDeductions,
  costOfGoodsSold,
  totalNumberOfTransactions
) {
  // Fungsi untuk menghitung persentase
  function calculatePercentage(value, total) {
    return (value / total) * 100;
  }

  // Menghitung nilai-nilai metrik penjualan
  function calculateGrossSales() {
    return totalRevenueFromSales; // Gross Sales
  }

  function calculateNetSales() {
    const grossSales = calculateGrossSales();
    return grossSales - returns - discounts - otherDeductions; // Net Sales
  }

  function calculateGrossProfit() {
    const grossSales = calculateGrossSales();
    return grossSales - costOfGoodsSold; // Gross Profit
  }

  function calculateTotalTransaction() {
    return totalNumberOfTransactions; // Total Transaction
  }

  // Menghitung persentase untuk masing-masing metrik
  function calculateGrossSalesPercentage() {
    const grossSales = calculateGrossSales();
    return calculatePercentage(grossSales, totalRevenueFromSales);
  }

  function calculateNetSalesPercentage() {
    const netSales = calculateNetSales();
    const grossSales = calculateGrossSales();
    return calculatePercentage(netSales, grossSales);
  }

  function calculateGrossProfitPercentage() {
    const grossProfit = calculateGrossProfit();
    const grossSales = calculateGrossSales();
    return calculatePercentage(grossProfit, grossSales);
  }

  function calculateTotalTransactionPercentage() {
    const totalTransaction = calculateTotalTransaction();
    return calculatePercentage(totalTransaction, totalNumberOfTransactions);
  }

  // Mengembalikan objek dengan nilai-nilai metrik penjualan dan persentase
  return {
    grossSales: calculateGrossSales(),
    grossSalesPercentage: calculateGrossSalesPercentage().toFixed(2),
    netSales: calculateNetSales(),
    netSalesPercentage: calculateNetSalesPercentage().toFixed(2),
    grossProfit: calculateGrossProfit(),
    grossProfitPercentage: calculateGrossProfitPercentage().toFixed(2),
    totalTransaction: calculateTotalTransaction(),
    totalTransactionPercentage:
      calculateTotalTransactionPercentage().toFixed(2),
  };
}

// Export fungsi calculateSalesMetrics agar dapat digunakan di file lain
module.exports = calculateSalesMetrics;
