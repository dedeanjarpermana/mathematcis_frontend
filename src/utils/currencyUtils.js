// utils/currencyUtils.js

export const formatRupiah = (number) => {
    if (!number) return "Rp. 0,00"; // Handle jika nilai null atau undefined
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2
    }).format(number).replace("IDR", "Rp");
  };
  