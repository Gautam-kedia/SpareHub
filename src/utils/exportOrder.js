import { companies } from '../data/products';
import { SHOP_NAME, whatsappDisplay } from '../config';

const companyName = (id) => companies.find((c) => c.id === id)?.name ?? '';

// Older cart items (saved before description/vehicle existed) fall back to splitting the name.
function describe(item) {
  if (item.description != null) return { description: item.description, vehicle: item.vehicle ?? '' };
  const [first, ...rest] = item.name.split(' - ');
  return { description: first, vehicle: rest.join(' - ') };
}

/** Build the order as an .xlsx file and download it. SheetJS is loaded only when needed. */
export async function exportOrderToExcel(items) {
  const XLSX = await import('xlsx');
  const date = new Date();
  const header = ['S.No', 'Part No', 'Company', 'Item Description', 'Vehicle', 'Qty', 'MRP (₹)', 'Amount (₹)'];

  const lines = items.map((item, i) => {
    const { description, vehicle } = describe(item);
    return [
      i + 1,
      item.partNo ?? '',
      companyName(item.companyId),
      description,
      vehicle,
      item.qty,
      item.price,
      item.price * item.qty,
    ];
  });
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const rows = [
    [`${SHOP_NAME} - Order`],
    [`Date: ${date.toLocaleDateString('en-IN')}`],
    [],
    header,
    ...lines,
    [],
    ['', '', '', '', 'Total', totalQty, '', total],
    [],
    [`Please send this file on WhatsApp to ${whatsappDisplay} to place your order.`],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [6, 18, 20, 36, 40, 6, 10, 12].map((wch) => ({ wch }));
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } },
    { s: { r: rows.length - 1, c: 0 }, e: { r: rows.length - 1, c: 7 } },
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Order');

  const stamp = date.toISOString().slice(0, 10);
  XLSX.writeFile(wb, `${SHOP_NAME}-Order-${stamp}.xlsx`);
}
