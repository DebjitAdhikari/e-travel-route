const whatsappNumber = '918392056130'; // website owner's number with country code
const whatsappBaseUrl = 'https://wa.me/';

async function handleFormSubmit(event) {
  event.preventDefault();
  
  // Collect form data
  const formData = {
    personal: {
      name: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      contactMethod: document.getElementById('contactMethod').value,
      contactTime: document.getElementById('contactTime').value
    },
    travel: {
      destination: Array.from(document.getElementById('destination').selectedOptions)
        .map(option => option.value),
      startDate: document.getElementById('startDate').value,
      endDate: document.getElementById('endDate').value,
      adults: document.getElementById('adults').value,
      children: document.getElementById('children').value,
      infants: document.getElementById('infants').value,
      tripType: document.getElementById('tripType').value,
      hotelCategory: document.getElementById('hotelCategory').value,
      mealPreference: document.getElementById('mealPreference').value,
      vehicleType: document.getElementById('vehicleType').value
    }
  };

  // Generate PDF
  const pdf = new jsPDF();
  pdf.setFontSize(18);
  pdf.text('Travel Booking Details', 20, 20);
  pdf.setFontSize(12);
  
  let yPosition = 30;
  const addSection = (title, data) => {
    pdf.setFontStyle('bold');
    pdf.text(title, 20, yPosition);
    yPosition += 10;
    pdf.setFontStyle('normal');
    Object.entries(data).forEach(([key, value]) => {
      pdf.text(`${key}: ${value}`, 20, yPosition);
      yPosition += 10;
    });
    yPosition += 5;
  };

  addSection('Personal Information', formData.personal);
  addSection('Travel Details', formData.travel);
  
  // Save PDF
  const pdfBlob = pdf.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Create WhatsApp message
  const message = `New Booking Request!\n\n*Personal Details*\nName: ${formData.personal.name}\nEmail: ${formData.personal.email}\nPhone: ${formData.personal.phone}\n\n*Travel Details*\nDestination: ${formData.travel.destination.join(', ')}\nDates: ${formData.travel.startDate} to ${formData.travel.endDate}\nTravelers: ${formData.travel.adults} Adults, ${formData.travel.children} Children, ${formData.travel.infants} Infants`;

  // Open WhatsApp with pre-filled message
  const whatsappUrl = `${whatsappBaseUrl}${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');

  // Automatically download PDF
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = `booking-${Date.now()}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Close modal
  bootstrap.Modal.getInstance(document.getElementById('reservationModal')).hide();
}
