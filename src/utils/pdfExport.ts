import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Appliance } from '../types/appliance';
import { calculateTotalMonthlyKWh, calculateTotalMonthlyCost, formatCurrency, formatNumber, generateEnergySavingTips } from './calculations';

export const generatePDF = (appliances: Appliance[], rate: number, bandName: string) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Add header with logo and title
  doc.setFontSize(24);
  doc.setTextColor(59, 130, 246); // Blue-600
  doc.text('Nigerian Electricity Bill Calculator', pageWidth / 2, 20, { align: 'center' });
  
  // Add subtitle
  doc.setFontSize(14);
  doc.setTextColor(107, 114, 128); // Gray-500
  doc.text('Monthly Bill Summary', pageWidth / 2, 30, { align: 'center' });
  
  // Add DISCO information
  doc.setFontSize(10);
  doc.setTextColor(75, 85, 99); // Gray-600
  doc.text('DISCO: ' + bandName, 20, 40);
  doc.text('Rate: ₦' + rate + '/kWh', 20, 45);
  
  // Add summary boxes
  const totalMonthlyKWh = calculateTotalMonthlyKWh(appliances);
  const totalMonthlyCost = calculateTotalMonthlyCost(appliances, rate);
  
  // Summary box 1 - Total Energy Usage
  doc.setFillColor(239, 246, 255); // Blue-50
  doc.roundedRect(20, 50, 55, 30, 3, 3, 'F');
  doc.setFontSize(10);
  doc.setTextColor(30, 64, 175); // Blue-900
  doc.text('Total Energy Usage', 27, 58);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text(`${formatNumber(totalMonthlyKWh)} kWh`, 27, 68);
  
  // Summary box 2 - Electricity Rate
  doc.setFillColor(255, 251, 235); // Amber-50
  doc.roundedRect(85, 50, 55, 30, 3, 3, 'F');
  doc.setFontSize(10);
  doc.setTextColor(146, 64, 14); // Amber-900
  doc.text('Electricity Rate', 92, 58);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text(`₦${rate}/kWh`, 92, 68);
  
  // Summary box 3 - Total Monthly Bill
  doc.setFillColor(236, 253, 245); // Emerald-50
  doc.roundedRect(150, 50, 55, 30, 3, 3, 'F');
  doc.setFontSize(10);
  doc.setTextColor(6, 95, 70); // Emerald-900
  doc.text('Total Monthly Bill', 157, 58);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text(formatCurrency(totalMonthlyCost), 157, 68);
  
  // Add appliances table
  doc.setFontSize(14);
  doc.setTextColor(17, 24, 39); // Gray-900
  doc.text('Appliance Details', 20, 95);
  
  const tableData = appliances.map(appliance => [
    appliance.name,
    `${appliance.powerWatts}W`,
    `${appliance.hoursPerDay}h`,
    appliance.quantity.toString(),
    `${formatNumber(appliance.powerWatts * appliance.hoursPerDay * appliance.quantity / 1000)} kWh`
  ]);
  
  (doc as any).autoTable({
    startY: 100,
    head: [['Appliance', 'Power', 'Hours/Day', 'Quantity', 'Daily Usage']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [59, 130, 246], // Blue-600
      textColor: 255,
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 9
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251] // Gray-50
    }
  });
  
  // Add energy saving tips
  const tips = generateEnergySavingTips(appliances);
  if (tips.length > 0) {
    const finalY = (doc as any).lastAutoTable.finalY || 120;
    doc.setFontSize(14);
    doc.setTextColor(17, 24, 39); // Gray-900
    doc.text('Energy Saving Tips for Nigerian Homes', 20, finalY + 15);
    
    tips.forEach((tip, index) => {
      const y = finalY + 25 + (index * 35);
      
      // Tip box
      doc.setFillColor(255, 251, 235); // Amber-50
      doc.roundedRect(20, y, 170, 30, 3, 3, 'F');
      
      // Tip content
      doc.setFontSize(10);
      doc.setTextColor(146, 64, 14); // Amber-900
      doc.setFont(undefined, 'bold');
      doc.text(tip.title, 25, y + 8);
      
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(tip.tip, 25, y + 16, { maxWidth: 160 });
      
      doc.setFont(undefined, 'bold');
      doc.text(`Potential Monthly Savings: ${formatCurrency(tip.potentialSavings)}`, 25, y + 25);
    });
  }
  
  // Add Nigerian-specific information
  const infoY = (doc as any).lastAutoTable.finalY + (tips.length * 35) + 30;
  doc.setFontSize(12);
  doc.setTextColor(17, 24, 39); // Gray-900
  doc.text('Important Information for Nigerian Consumers', 20, infoY);
  
  doc.setFontSize(9);
  doc.setTextColor(75, 85, 99); // Gray-600
  const infoText = [
    '• Contact your DISCO for meter reading and billing issues',
    '• Keep your meter number and account details safe',
    '• Report power outages to your DISCO\'s customer service',
    '• Consider using prepaid meters for better consumption control',
    '• Save your NEPA/PHCN receipts for reference'
  ];
  
  infoText.forEach((text, index) => {
    doc.text(text, 25, infoY + 10 + (index * 6));
  });
  
  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128); // Gray-500
    doc.text(
      `Generated on ${new Date().toLocaleDateString()} • ${bandName} Tariff • Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  return doc;
}; 