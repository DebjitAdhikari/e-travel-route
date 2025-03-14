document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const contactMethod = document.getElementById("contactMethod").value;
    const contactTime = document.getElementById("contactTime").value;
    
    // Get selected destinations from checkboxes
    const destination = Array.from(
        document.querySelectorAll("input[name='destination[]']:checked")
    ).map((checkbox) => checkbox.value);

    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const adults = document.getElementById("adults").value;
    const children = document.getElementById("children").value || "0";
    const infants = document.getElementById("infants").value || "0";
    const tripType = document.getElementById("tripType").value;
    const customDetails = document.getElementById("customDetails").value || "N/A";
    const hotelCategory = document.getElementById("hotelCategory").value;
    const mealPreference = document.getElementById("mealPreference").value;

    // Transport details
    const transportRequired = document.querySelector("input[name='transportRequired']:checked").value;
    const vehicleType = document.getElementById("vehicleType").value;

    const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// Set title background
doc.setFillColor(30, 144, 255);
doc.rect(0, 0, 210, 20, "F");
doc.setTextColor(255, 255, 255);
doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.text("Booking Confirmation", 65, 12);

// Reset text color
doc.setTextColor(0, 0, 0);
doc.setFont("helvetica", "normal");
doc.setFontSize(12);

// Add Section Headers
const addSection = (title, y) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(title, 10, y);
  doc.line(10, y + 2, 70, y + 2);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
};

// Add content without special symbols
addSection("Personal Details", 30);
doc.text(`Full Name: ${fullName}`, 10, 40);
doc.text(`Email: ${email}`, 10, 50);
doc.text(`Phone: ${phone}`, 10, 60);
doc.text(`Preferred Contact: ${contactMethod} at ${contactTime}`, 10, 70);

addSection("Travel Information", 80);
doc.text(`Destination(s): ${destination.length > 0 ? destination.join(", ") : "None"}`, 10, 90);
doc.text(`Travel Dates: ${startDate} to ${endDate}`, 10, 100);
doc.text(`Travelers: Adults - ${adults}, Children - ${children}, Infants - ${infants}`, 10, 110);

addSection("Accommodation", 120);
doc.text(`Hotel Category: ${hotelCategory}`, 10, 130);
doc.text(`Meal Preference: ${mealPreference}`, 10, 140);

addSection("Transport Details", 150);
doc.text(`Transport Required: ${transportRequired}`, 10, 160);
doc.text(`Preferred Vehicle: ${vehicleType}`, 10, 170);

addSection("Additional Details", 180);
doc.text(`Trip Type: ${tripType}`, 10, 190);

const customPackageText = `Custom Package Details: ${customDetails}`;
const wrappedText = doc.splitTextToSize(customPackageText, 180);
doc.text(wrappedText, 10, 200);

// doc.text(`Custom Package Details: ${customDetails}`, 10, 200);

// Footer
// doc.setFontSize(10);
// doc.setTextColor(100);
// doc.text("Thank you for booking with us! Have a great trip!", 60, 220);

// Save PDF
doc.save("Booking_Details.pdf");



    // WhatsApp redirection (Manual file attachment required)
    const phoneNumber = "918392056130"; // Replace with actual WhatsApp number
    const message = encodeURIComponent(`Hello, here are my details:\nName: ${fullName}\nEmail: ${email}\nDestinations: ${destination.join(", ")}\n\nPlease attach the downloaded PDF manually.`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Show WhatsApp button
    const whatsappLink = document.getElementById("whatsappLink");
    whatsappLink.href = whatsappUrl;
    whatsappLink.style.display = "inline-block";
});
