// function generatePDF() {
//     const { jsPDF } = window.jspdf;
//     const selectedSize = document.getElementById('paperSize').value; // Get user-selected size
//     const pdf = new jsPDF('p', 'mm', selectedSize);
//     const pages = ['pageOne', 'pageTwo', 'pageThree', 'pageFour', 'pageFive'];
//     const promises = [];

//     const sizes = {
//         a4: { width: 210, height: 297 },
//         a3: { width: 297, height: 420 }
//     };

//     const pageWidth = sizes[selectedSize].width;
//     const pageHeight = sizes[selectedSize].height;
//     const padding = 10; // Consistent padding

//     const notification = document.createElement('div');
//     notification.innerText = 'Preparing your PDF, please wait...';
//     notification.style.position = 'fixed';
//     notification.style.top = '20px';
//     notification.style.left = '50%';
//     notification.style.transform = 'translateX(-50%)';
//     notification.style.backgroundColor = '#007bff';
//     notification.style.color = '#fff';
//     notification.style.padding = '10px 20px';
//     notification.style.borderRadius = '5px';
//     notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
//     notification.style.zIndex = '1000';
//     document.body.appendChild(notification);

//     pages.forEach((id, index) => {
//         const element = document.getElementById(id);
//         if (element) {
//             promises.push(
//                 html2canvas(element, {
//                     useCORS: true,
//                     allowTaint: false,
//                     scale: selectedSize === 'a3' ? 3 : 2, // Adjust scaling for A3
//                 }).then((canvas) => {
//                     const imgWidth = pageWidth - 2 * padding;
//                     const imgHeight = (canvas.height * imgWidth) / canvas.width;
//                     const x = padding;
//                     const y = padding;

//                     if (index > 0) pdf.addPage();
//                     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, imgWidth, imgHeight);
//                 })
//             );
//         }
//     });

//     Promise.all(promises)
//         .then(() => {
//             pdf.save(`document_${selectedSize}.pdf`);
//             notification.innerText = 'Download complete! Your PDF is ready.';
//             setTimeout(() => notification.remove(), 3000);
//         })
//         .catch((error) => {
//             console.error('Error generating PDF:', error);
//             notification.innerText = 'An error occurred while generating the PDF.';
//             setTimeout(() => notification.remove(), 5000);
//         });
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const container = document.createElement('div');
//     container.style.position = 'fixed';
//     container.style.bottom = '20px';
//     container.style.right = '20px';
//     container.style.display = 'flex';
//     container.style.gap = '10px';

//     const sizeSelector = document.createElement('select');
//     sizeSelector.id = 'paperSize';
//     sizeSelector.innerHTML = `<option value="a4">A4</option><option value="a3">A3</option>`;

//     const pdfButton = document.createElement('button');
//     pdfButton.innerText = 'Generate PDF';
//     pdfButton.style.padding = '10px 20px';
//     pdfButton.style.backgroundColor = '#007bff';
//     pdfButton.style.color = '#fff';
//     pdfButton.style.border = 'none';
//     pdfButton.style.borderRadius = '5px';
//     pdfButton.style.cursor = 'pointer';
//     pdfButton.addEventListener('click', generatePDF);

//     container.appendChild(sizeSelector);
//     container.appendChild(pdfButton);
//     document.body.appendChild(container);
// });

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const selectedSize = document.getElementById('pdfSizeSelector').value;
    const pdf = new jsPDF('p', 'mm', selectedSize);
    const pages = ['pageOne', 'pageTwo', 'pageThree', 'pageFour', 'pageFive'];
    const promises = [];

    const padding = 5; // in mm
    let scale = 2; // Default scale for A4
    let imgWidth, pageHeight;

    // Adjust width, height & scale based on selected size
    switch (selectedSize) {
        case 'a2':
            imgWidth = 420 - 2 * padding; // A2 width
            pageHeight = 594 - 2 * padding; // A2 height
            scale = 4;
            break;
        case 'a3':
            imgWidth = 297 - 2 * padding; // A3 width
            pageHeight = 420 - 2 * padding; // A3 height
            scale = 3;
            break;
        default:
            imgWidth = 210 - 2 * padding; // A4 width
            pageHeight = 297 - 2 * padding; // A4 height
            scale = 2;
            break;
    }

    // Show notification
    const notification = document.createElement('div');
    notification.innerText = `Generating ${selectedSize.toUpperCase()} PDF, please wait...`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = '#007bff';
    notification.style.color = '#fff';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    notification.style.zIndex = '1000';
    document.body.appendChild(notification);

    pages.forEach((id, index) => {
        const element = document.getElementById(id);

        if (element) {
            promises.push(
                html2canvas(element, {
                    useCORS: true,
                    allowTaint: false,
                    scale: scale,
                }).then((canvas) => {
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    const x = padding; // Start position X
                    const y = padding; // Start position Y

                    if (index > 0) pdf.addPage();
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, imgWidth, imgHeight);
                })
            );
        }
    });

    Promise.all(promises)
        .then(() => {
            pdf.save(`newspaper_${selectedSize}.pdf`);
            notification.innerText = `Download complete! Your ${selectedSize.toUpperCase()} PDF is ready.`;
            setTimeout(() => notification.remove(), 3000);
        })
        .catch((error) => {
            console.error('Error generating PDF:', error);
            notification.innerText = 'An error occurred while generating the PDF.';
            setTimeout(() => notification.remove(), 5000);
        });
}

// Create dropdown and download button
document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.right = '20px';
    container.style.display = 'flex';
    container.style.gap = '10px';
    container.style.alignItems = 'center';

    // Dropdown for PDF size selection
    const select = document.createElement('select');
    select.id = 'pdfSizeSelector';
    select.style.padding = '10px';
    select.style.border = '1px solid #ccc';
    select.style.borderRadius = '5px';
    select.style.cursor = 'pointer';

    ['a4', 'a3', 'a2'].forEach((size) => {
        const option = document.createElement('option');
        option.value = size;
        option.innerText = `Download ${size.toUpperCase()} PDF`;
        select.appendChild(option);
    });

    // Download button
    const button = document.createElement('button');
    button.innerText = 'Download PDF';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#007bff';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

    button.addEventListener('click', generatePDF);

    container.appendChild(select);
    container.appendChild(button);
    document.body.appendChild(container);
});

