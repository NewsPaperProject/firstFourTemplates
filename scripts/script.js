function makeTextEditable() {
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');

    textElements.forEach((element) => {
        element.addEventListener('click', function () {
            const currentText = element.innerText;

            // Get computed styles
            const computedStyle = window.getComputedStyle(element);

            // Create a textarea
            const inputField = document.createElement('textarea');
            inputField.value = currentText;

            // Match textarea size to the element
            inputField.style.width = `${element.offsetWidth}px`;
            inputField.style.height = `${element.offsetHeight}px`;
            // inputField.style.width = computedStyle.width;
            // inputField.style.height = computedStyle.height;
            inputField.style.fontSize = computedStyle.fontSize;
            inputField.style.fontWeight = computedStyle.fontWeight;
            inputField.style.fontFamily = computedStyle.fontFamily;
            inputField.style.lineHeight = computedStyle.lineHeight;
            inputField.style.padding = computedStyle.padding;
            inputField.style.margin = computedStyle.margin;
            inputField.style.border = computedStyle.border;
            inputField.style.boxSizing = computedStyle.boxSizing;
            inputField.style.resize = 'none';
            inputField.style.overflow = 'hidden';
            inputField.style.whiteSpace = 'pre-wrap';

            // Replace the element with the textarea
            element.replaceWith(inputField);
            inputField.focus();

            // Save changes on blur
            inputField.addEventListener('blur', function () {
                element.innerText = inputField.value;
                inputField.replaceWith(element);
            });

            // Prevent new lines or exceeding max length on Enter
            inputField.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    inputField.blur(); // Save on Enter
                }
            });
        });
    });
}



function makeImagesReplaceable() {
    const imageElements = document.querySelectorAll('img');

    imageElements.forEach((element) => {
        element.addEventListener('click', function () {
            const inputFile = document.createElement('input');
            inputFile.type = 'file';
            inputFile.accept = 'image/*';

            inputFile.addEventListener('change', function () {
                const file = inputFile.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const img = new Image();
                        img.src = e.target.result;

                        img.onload = function () {
                            // Create canvas to crop the image to fit the original dimensions
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');

                            // Set canvas size to element's fixed dimensions
                            canvas.width = element.clientWidth;
                            canvas.height = element.clientHeight;

                            // Calculate cropping position (centered)
                            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                            const xOffset = (img.width * scale - canvas.width) / 2;
                            const yOffset = (img.height * scale - canvas.height) / 2;

                            // Draw cropped image on canvas
                            ctx.drawImage(
                                img,
                                -xOffset, 
                                -yOffset, 
                                img.width * scale, 
                                img.height * scale
                            );

                            // Set the cropped image as the new source
                            element.src = canvas.toDataURL();
                        };
                    };
                    reader.readAsDataURL(file);
                }
            });

            inputFile.click();
        });
    });
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a3');
    const pages = ['pageOne', 'pageTwo', 'pageThree', 'pageFour', 'pageFive'];
    const promises = [];

    const padding = 5; // in mm

    // Show a notification to the user
    const notification = document.createElement('div');
    notification.innerText = 'Preparing your PDF, please wait...';
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

        console.log(`Processing element: ${id}`, element);
        if (!element) {
            console.warn(`Element with ID ${id} not found!`);
        }

        if (element) {
            promises.push(
                html2canvas(element, {
                    useCORS: true,
                    allowTaint: false,
                    scale: 2,
                }).then((canvas) => {
                    const imgWidth = 210 - 2 * padding; // A4 width minus padding
                    const pageHeight = 297 - 2 * padding; // A4 height minus padding
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    const x = padding; // Start position X
                    const y = padding; // Start position Y

                    if (index > 0) pdf.addPage();
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, imgWidth, imgHeight);
                })
            );
        } else {
            console.log(`Element with ID: ${id} not found`);
        }
    });

    Promise.all(promises)
        .then(() => {
            pdf.save('document.pdf');
            notification.innerText = 'Download complete! Your PDF is ready.';
            setTimeout(() => notification.remove(), 3000); // Remove notification after 3 seconds
        })
        .catch((error) => {
            console.error('Error generating PDF:', error);
            notification.innerText = 'An error occurred while generating the PDF.';
            setTimeout(() => notification.remove(), 5000); // Remove after 5 seconds in case of error
        });
}

// Attach event listener to the download button
document.getElementById('downloadPDF').addEventListener('click', generatePDF);

// Initialize the functionalities
document.addEventListener('DOMContentLoaded', () => {
    makeTextEditable();
    makeImagesReplaceable();
    // Add a button for PDF generation
    const pdfButton = document.createElement('button');
    pdfButton.innerText = 'Generate PDF';
    pdfButton.style.position = 'fixed';
    pdfButton.style.bottom = '20px';
    pdfButton.style.right = '20px';
    pdfButton.style.padding = '10px 20px';
    pdfButton.style.backgroundColor = '#007bff';
    pdfButton.style.color = '#fff';
    pdfButton.style.border = 'none';
    pdfButton.style.borderRadius = '5px';
    pdfButton.style.cursor = 'pointer';

    pdfButton.addEventListener('click', generatePDF);

    document.body.appendChild(pdfButton);
});

document.getElementById('downloadPDF').addEventListener('click', function () {
    const element = document.body; // Select the entire page or specific section

    const notification = document.createElement('div');
    notification.innerText = 'Preparing your PDF, please wait...';
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

    html2canvas(element, { scale: 2 })
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height],
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('newspaper.pdf');
            notification.innerText = 'Download complete! Your PDF is ready.';
            setTimeout(() => notification.remove(), 3000); // Remove notification after 3 seconds
        })
        .catch((error) => {
            console.error('Error generating PDF:', error);
            notification.innerText = 'An error occurred while generating the PDF.';
            setTimeout(() => notification.remove(), 5000); // Remove after 5 seconds in case of error
        });
});

function togglePrintMode() {
    document.body.classList.toggle('print-view');
}
