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
    const transportRequired = document.querySelector("input[name='transportRequired']:checked").value;
    const vehicleType = document.getElementById("vehicleType").value;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add Logo
    const logoPath = "img/e-travel-logo.png";
    doc.addImage(logoPath, "PNG", 10, 10, 40, 20);

    // Company Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Evolve Travel Route", 60, 20);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("I69 Station Road (East), New Barrackpore, Kolkata – 700131", 60, 30);
    doc.text("info@evolvetravelroute.com", 60, 38);
    doc.text("+91-96259 11922 | +91-93323 63323", 60, 46);

    // Add a separator
    doc.setLineWidth(0.5);
    doc.line(10, 55, 200, 55);

    // Section Headers Function
    const addSection = (title, y) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(30, 144, 255);
        doc.text(title, 10, y);
        doc.setLineWidth(0.2);
        doc.line(10, y + 2, 70, y + 2);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
    };

    addSection("Personal Details", 65);
    doc.text(`Full Name: ${fullName}`, 10, 75);
    doc.text(`Email: ${email}`, 10, 85);
    doc.text(`Phone: ${phone}`, 10, 95);
    doc.text(`Preferred Contact: ${contactMethod} at ${contactTime}`, 10, 105);

    addSection("Travel Information", 115);
    doc.text(`Destination(s): ${destination.length > 0 ? destination.join(", ") : "None"}`, 10, 125);
    doc.text(`Travel Dates: ${startDate} to ${endDate}`, 10, 135);
    doc.text(`Travelers: Adults - ${adults}, Children - ${children}, Infants - ${infants}`, 10, 145);

    addSection("Accommodation", 155);
    doc.text(`Hotel Category: ${hotelCategory}`, 10, 165);
    doc.text(`Meal Preference: ${mealPreference}`, 10, 175);

    addSection("Transport Details", 185);
    doc.text(`Transport Required: ${transportRequired}`, 10, 195);
    doc.text(`Preferred Vehicle: ${vehicleType}`, 10, 205);

    addSection("Additional Details", 215);
    doc.text(`Trip Type: ${tripType}`, 10, 225);

    const customPackageText = `Custom Package Details: ${customDetails}`;
    const wrappedText = doc.splitTextToSize(customPackageText, 180);
    doc.text(wrappedText, 10, 235);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for booking with us! Have a great trip!", 60, 270);

    // Save PDF
    doc.save("Booking_Details.pdf");

    // WhatsApp redirection
    const phoneNumber = "918392056130";
    const message = encodeURIComponent(`Hello, here are my details:\nName: ${fullName}\nEmail: ${email}\nDestinations: ${destination.join(", ")}\n\nPlease attach the downloaded PDF manually.`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    const whatsappLink = document.getElementById("whatsappLink");
    whatsappLink.href = whatsappUrl;
    whatsappLink.style.display = "inline-block";
});