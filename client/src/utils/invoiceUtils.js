/**
 * Converts a URL to a base64 data URL so images work in print windows.
 */
const toDataUrl = async (url) => {
  try {
    const res  = await fetch(url);
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch {
    return '';
  }
};

/**
 * Opens a styled print window with the invoice matching the Client Invoice template.
 *
 * @param {Object} inv      – Invoice document from MongoDB
 * @param {string} logoUrl  – The imported logo URL (xtremeblack.png)
 */
export const downloadInvoicePDF = async (inv, logoUrl) => {
  const logoDataUrl = logoUrl ? await toDataUrl(logoUrl) : '';

  const items      = inv.items || [];
  const subtotal   = items.reduce((s, i) => s + (parseFloat(i.price) || 0) * (parseFloat(i.qty) || 0), 0);
  const tax        = parseFloat(inv.tax) || 0;
  const grand      = parseFloat(inv.grandTotal) || 0;
  const taxPercent = parseFloat(inv.taxPercent) || 0;

  // Filled item rows
  const itemRows = items.map((item, i) => `
    <tr>
      <td class="td-center">${item.no ?? i + 1}</td>
      <td class="td">${item.description || ''}</td>
      <td class="td-right">${item.price ? '$' + (parseFloat(item.price) || 0).toFixed(2) : ''}</td>
      <td class="td-right">${item.qty ? (parseFloat(item.qty) || 0) : ''}</td>
      <td class="td-right">${item.price && item.qty ? '$' + ((parseFloat(item.price) || 0) * (parseFloat(item.qty) || 0)).toFixed(2) : ''}</td>
    </tr>`).join('');

  // Empty padding rows so table always shows at least 5 rows
  const emptyCount = Math.max(0, 5 - items.length);
  const emptyRows  = Array.from({ length: emptyCount }).map(() => `
    <tr>
      <td class="td-center">&nbsp;</td>
      <td class="td">&nbsp;</td>
      <td class="td-right">&nbsp;</td>
      <td class="td-right">&nbsp;</td>
      <td class="td-right">&nbsp;</td>
    </tr>`).join('');

  const logoImg = logoDataUrl
    ? `<img src="${logoDataUrl}" alt="Xtreme Mobile Tire" style="height:110px;width:auto;object-fit:contain;" />`
    : `<div style="font-size:22px;font-weight:900;color:#dc2626;letter-spacing:-1px;">XTREME<span style="color:#111;font-size:14px;font-weight:700;"> Mobile Tire</span></div>`;

  const paidBadge = inv.status === 'paid'
    ? `<span style="display:inline-block;background:#dcfce7;color:#16a34a;border:1px solid #bbf7d0;border-radius:4px;padding:2px 8px;font-size:11px;font-weight:700;margin-left:10px;">✓ PAID</span>`
    : '';

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Invoice ${inv.invoiceNumber || ''}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: Arial, Helvetica, sans-serif; background:#fff; color:#111827; font-size:13px; }
    @media print {
      body { print-color-adjust:exact; -webkit-print-color-adjust:exact; }
      @page { margin:12mm; size:A4 portrait; }
      .no-print { display:none !important; }
    }
    .page { max-width:794px; margin:0 auto; padding:32px 36px; }

    /* ── Header ── */
    .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:22px; }
    .header-left h1 { font-size:26px; font-weight:700; color:#111827; }
    .header-left p  { font-size:13px; color:#6b7280; margin-top:5px; }

    /* ── Info Row ── */
    .info-row { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px;
                border-top:1px solid #d1d5db; border-bottom:1px solid #d1d5db;
                padding:14px 0; margin-bottom:18px; }
    .info-client .c-name  { font-weight:700; font-size:14px; color:#111827; }
    .info-client p        { font-size:12px; color:#374151; margin-top:3px; }
    .info-dates .dg       { margin-bottom:10px; }
    .info-dates .dl       { font-size:11px; color:#9ca3af; font-weight:600; text-transform:uppercase; letter-spacing:.5px; }
    .info-dates .dv       { font-size:13px; color:#1f2937; font-weight:500; margin-top:2px; }
    .info-company .co-name{ font-weight:700; font-size:13px; color:#111827; }
    .info-company p       { font-size:12px; color:#6b7280; margin-top:2px; }
    .info-company .hst    { margin-top:6px; font-size:12px; color:#374151; }

    /* ── Table ── */
    table { width:100%; border-collapse:collapse; margin-bottom:0; }
    thead th { padding:8px 10px; font-size:12px; font-weight:700;
               border:1px solid #d1d5db; background:#f9fafb; }
    thead th.r { text-align:right; }
    .td        { padding:9px 10px; border:1px solid #e5e7eb; font-size:13px; }
    .td-right  { padding:9px 10px; border:1px solid #e5e7eb; font-size:13px; text-align:right; }
    .td-center { padding:9px 10px; border:1px solid #e5e7eb; font-size:13px; text-align:center; }

    /* ── Totals ── */
    .totals-wrap { display:flex; justify-content:flex-end; margin-top:8px; }
    .totals-inner { width:270px; border-collapse:collapse; }
    .t-row td  { padding:6px 10px; font-size:13px; border:1px solid #e5e7eb; }
    .t-row .lbl{ color:#6b7280; text-align:right; }
    .t-row .val{ text-align:right; font-weight:500; color:#111827; }
    .t-hi      { background:#eff6ff; }
    .t-hi .lbl { color:#374151; font-weight:600; }
    .t-hi .val { color:#1d4ed8; font-weight:700; }
    .t-grand .lbl{ color:#111827; font-weight:700; font-size:14px; }
    .t-grand .val{ color:#1d4ed8; font-weight:700; font-size:14px; }

    /* ── Footer ── */
    .footer-terms { border-top:1px solid #d1d5db; padding-top:12px; margin-top:20px; }
    .footer-terms .ft-title { font-size:12px; font-weight:700; color:#111827; margin-bottom:4px; }
    .footer-terms p { font-size:12px; color:#6b7280; line-height:1.5; }
    .footer-terms a { color:#2563eb; }
    .footer-code  { text-align:center; border-top:1px solid #e5e7eb;
                    padding-top:10px; margin-top:14px; }
    .footer-code p{ font-size:11px; color:#9ca3af; }

    .download-btn { display:block; width:180px; margin:24px auto; padding:12px 0;
                    background:#dc2626; color:#fff; border:none; border-radius:8px;
                    font-size:14px; font-weight:700; cursor:pointer; text-align:center; }
  </style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div class="header">
    <div class="header-left">
      <h1>Client Invoice ${paidBadge}</h1>
      <p>Invoice No # ${inv.invoiceNumber || '—'}</p>
    </div>
    <div class="header-logo">
      ${logoImg}
    </div>
  </div>

  <!-- Info Row -->
  <div class="info-row">
    <div class="info-client">
      <p class="c-name">${inv.clientName || inv.companyName || '—'}</p>
      ${inv.companyName && inv.clientName && inv.companyName !== inv.clientName ? `<p>${inv.companyName}</p>` : ''}
      ${inv.clientPhone   ? `<p>${inv.clientPhone}</p>` : ''}
      ${inv.clientAddress ? `<p>${inv.clientAddress}</p>` : ''}
      ${inv.driverName    ? `<p>Driver: ${inv.driverName}</p>` : ''}
    </div>
    <div class="info-dates">
      <div class="dg">
        <p class="dl">Issue Date</p>
        <p class="dv">${inv.issueDate || '—'}</p>
      </div>
      <div class="dg">
        <p class="dl">Due Date</p>
        <p class="dv">${inv.dueDate || '—'}</p>
      </div>
      ${inv.paidAt ? `<div class="dg"><p class="dl">Paid On</p><p class="dv">${new Date(inv.paidAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</p></div>` : ''}
    </div>
    <div class="info-company">
      <p class="co-name">XTREME MOBILE TIRE</p>
      <p>857 Winterton Way, Mississauga</p>
      <p>ON L5V 1Z5 Canada</p>
      <p class="hst">HST# 799787635RT001</p>
    </div>
  </div>

  <!-- Table -->
  <table>
    <thead>
      <tr>
        <th style="width:46px;text-align:center;">No</th>
        <th>Item Details</th>
        <th class="r" style="width:90px;">Price</th>
        <th class="r" style="width:56px;">Qty</th>
        <th class="r" style="width:100px;">Total</th>
      </tr>
    </thead>
    <tbody>
      ${itemRows}
      ${emptyRows}
    </tbody>
  </table>

  <!-- Totals -->
  <div class="totals-wrap">
    <table class="totals-inner">
      <tr class="t-row">
        <td class="lbl">Sub Total</td>
        <td class="val">$${subtotal.toFixed(2)}</td>
      </tr>
      <tr class="t-row t-hi">
        <td class="lbl">Net Total</td>
        <td class="val">$${subtotal.toFixed(2)}</td>
      </tr>
      <tr class="t-row">
        <td class="lbl">Total Tax${taxPercent > 0 ? ' ' + taxPercent + '%' : ''}</td>
        <td class="val">$${tax.toFixed(2)}</td>
      </tr>
      <tr class="t-row t-hi t-grand">
        <td class="lbl">Grand Total</td>
        <td class="val">$${grand.toFixed(2)}</td>
      </tr>
    </table>
  </div>

  <!-- Footer -->
  <div class="footer-terms">
    <p class="ft-title">Terms and Conditions</p>
    <p>Please Send payment via E-transfer or bank Transfer to:
      <a href="mailto:Payments@xtrememobiletire.com">Payments@xtrememobiletire.com</a>
    </p>
  </div>
  <div class="footer-code">
    <p>Assigned Code : ${inv.invoiceNumber || '—'} 2025 : XTREME Mobile -FixTire</p>
  </div>

</div>

<div class="no-print" style="text-align:center;padding:16px;">
  <button class="download-btn" onclick="window.print()">Download / Print PDF</button>
</div>

<script>
  window.addEventListener('load', () => { setTimeout(() => window.print(), 400); });
  window.onafterprint = () => window.close();
</script>
</body>
</html>`;

  const win = window.open('', '_blank', 'width=900,height=750,scrollbars=yes');
  if (!win) { alert('Please allow pop-ups to download the invoice PDF.'); return; }
  win.document.write(html);
  win.document.close();
};
