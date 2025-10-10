<template>
  <div style="display:none"></div>
</template>

<script>
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default {
  name: 'ReportBuilderPlugin',
  methods: {
    async exportToPDF(items, filename = 'report.pdf') {
      // Create a temporary DOM element to render items
      const container = document.createElement('div');
      container.style.width = '800px';
      container.style.padding = '10px';
      container.style.background = '#fff';
      items.forEach((item) => {
        const el = document.createElement('div');
        el.style.marginBottom = '12px';
        if (item.type === 'text') {
          el.innerText = item.data.text || '';
        } else if (item.type === 'table') {
          const table = document.createElement('table');
          table.style.borderCollapse = 'collapse';
          table.style.width = '100%';
          const cols = item.data.columns || ['col1', 'col2'];
          const rows = item.data.rows || [];
          const thead = document.createElement('thead');
          const thr = document.createElement('tr');
          cols.forEach((c) => { const th = document.createElement('th'); th.innerText = c; th.style.border='1px solid #ccc'; th.style.padding='4px'; thr.appendChild(th); });
          thead.appendChild(thr);
          table.appendChild(thead);
          const tbody = document.createElement('tbody');
          rows.forEach((r) => { const tr = document.createElement('tr'); cols.forEach((c) => { const td = document.createElement('td'); td.innerText = r[c] || ''; td.style.border='1px solid #ccc'; td.style.padding='4px'; tr.appendChild(td); }); tbody.appendChild(tr); });
          table.appendChild(tbody);
          el.appendChild(table);
        } else if (item.type === 'chart') {
          // For charts, if provided with a canvas or SVG data URL, render image
          if (item.data.image) {
            const img = document.createElement('img');
            img.src = item.data.image;
            img.style.maxWidth = '100%';
            el.appendChild(img);
          } else {
            el.innerText = item.data.title || 'Chart';
          }
        }
        container.appendChild(el);
      });
      document.body.appendChild(container);
      try {
        const canvas = await html2canvas(container, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename);
      } finally {
        document.body.removeChild(container);
      }
    },
    saveReport(items) {
      localStorage.setItem('customReport', JSON.stringify(items));
    },
    loadReport() {
      return JSON.parse(localStorage.getItem('customReport') || '[]');
    },
  },
};
</script>
