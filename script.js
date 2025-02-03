// // Function to make text editable
// function makeTextEditable() {
//     // Select all heading tags and paragraphs to make editable
//     const textElements = document.querySelectorAll('h1, h2, h3, p');

//     textElements.forEach((element) => {
//         element.addEventListener('click', function () {
//             const currentText = element.innerText;

//             // Create a textarea for editing
//             const inputField = document.createElement('textarea');
//             inputField.value = currentText;
//             inputField.style.width = `${element.offsetWidth}px`;
//             inputField.style.height = `${element.offsetHeight}px`;
//             inputField.style.fontSize = window.getComputedStyle(element).fontSize;
//             inputField.style.fontWeight = window.getComputedStyle(element).fontWeight;
//             inputField.style.fontFamily = window.getComputedStyle(element).fontFamily;
//             inputField.style.lineHeight = window.getComputedStyle(element).lineHeight;
//             inputField.style.resize = 'none'; // Prevent resizing
//             inputField.style.overflow = 'hidden'; // Prevent scrollbars for small text
//             inputField.style.boxSizing = 'border-box'; // Match the box model of the original element

//             // Replace the element with the textarea
//             element.replaceWith(inputField);

//             // Save changes when the user clicks outside the textarea
//             inputField.addEventListener('blur', function () {
//                 const newText = inputField.value;
//                 element.innerText = newText;
//                 inputField.replaceWith(element);
//             });

//             // Save changes when the user presses "Enter" in the textarea
//             inputField.addEventListener('keydown', function (e) {
//                 if (e.key === 'Enter') {
//                     e.preventDefault(); // Prevent newline
//                     const newText = inputField.value;
//                     element.innerText = newText;
//                     inputField.replaceWith(element);
//                 }
//             });

//             inputField.focus();
//         });
//     });
// }

// // Function to make images replaceable
// function makeImagesReplaceable() {
//     // Select all image elements and containers with background images
//     const imageElements = document.querySelectorAll('img, #bigImgContainer');

//     imageElements.forEach((element) => {
//         element.addEventListener('click', function () {
//             const inputFile = document.createElement('input');
//             inputFile.type = 'file';
//             inputFile.accept = 'image/*';

//             inputFile.addEventListener('change', function () {
//                 const file = inputFile.files[0];
//                 if (file) {
//                     const reader = new FileReader();
//                     reader.onload = function (e) {
//                         if (element.tagName === 'IMG') {
//                             element.src = e.target.result;
//                         } else {
//                             element.style.backgroundImage = `url(${e.target.result})`;
//                         }
//                     };
//                     reader.readAsDataURL(file);
//                 }
//             });

//             inputFile.click();
//         });
//     });
// }

// // Initialize the functionalities
// document.addEventListener('DOMContentLoaded', () => {
//     makeTextEditable();
//     makeImagesReplaceable();
// });














// // Function to make text editable
// function makeTextEditable() {
//     const textElements = document.querySelectorAll('h1, h2, h3, p');

//     textElements.forEach((element) => {
//         element.addEventListener('click', function () {
//             const currentText = element.innerText;

//             const inputField = document.createElement('textarea');
//             inputField.value = currentText;
//             inputField.style.width = `${element.offsetWidth}px`;
//             inputField.style.height = `${element.offsetHeight}px`;
//             inputField.style.fontSize = window.getComputedStyle(element).fontSize;
//             inputField.style.fontWeight = window.getComputedStyle(element).fontWeight;
//             inputField.style.fontFamily = window.getComputedStyle(element).fontFamily;
//             inputField.style.lineHeight = window.getComputedStyle(element).lineHeight;
//             inputField.style.resize = 'none';
//             inputField.style.overflow = 'hidden';
//             inputField.style.boxSizing = 'border-box';

//             element.replaceWith(inputField);

//             inputField.addEventListener('blur', function () {
//                 const newText = inputField.value;
//                 element.innerText = newText;
//                 inputField.replaceWith(element);
//             });

//             inputField.addEventListener('keydown', function (e) {
//                 if (e.key === 'Enter') {
//                     e.preventDefault();
//                     const newText = inputField.value;
//                     element.innerText = newText;
//                     inputField.replaceWith(element);
//                 }
//             });

//             inputField.focus();
//         });
//     });
// }

// // Function to make images replaceable
// function makeImagesReplaceable() {
//     const imageElements = document.querySelectorAll('img, #bigImgContainer');

//     imageElements.forEach((element) => {
//         element.addEventListener('click', function () {
//             const inputFile = document.createElement('input');
//             inputFile.type = 'file';
//             inputFile.accept = 'image/*';

//             inputFile.addEventListener('change', function () {
//                 const file = inputFile.files[0];
//                 if (file) {
//                     const reader = new FileReader();
//                     reader.onload = function (e) {
//                         if (element.tagName === 'IMG') {
//                             element.src = e.target.result;
//                         } else {
//                             element.style.backgroundImage = `url(${e.target.result})`;
//                         }
//                     };
//                     reader.readAsDataURL(file);
//                 }
//             });

//             inputFile.click();
//         });
//     });
// }

// // Function to generate PDF
// function generatePDF() {
//     const { jsPDF } = window.jspdf;
//     const pages = ['pageOne', 'pageTwo', 'pageThree', 'pageFour', 'pageFive']; // Include all pages
//     const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size in portrait orientation
//     const promises = [];

//     pages.forEach((id, index) => {
//         const element = document.getElementById(id);
//         if (element) {
//             promises.push(
//                 html2canvas(element, {
//                     useCORS: true,
//                     allowTaint: false,
//                     scale: 2, // Increase scale for better quality
//                     width: element.offsetWidth,
//                     height: element.offsetHeight,
//                 }).then((canvas) => {
//                     const imgData = canvas.toDataURL('image/png');
//                     const imgWidth = 210; // A4 width in mm
//                     const pageHeight = 297; // A4 height in mm
//                     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//                     if (index > 0) pdf.addPage();
//                     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//                 })
//             );
//         }
//     });

//     Promise.all(promises)
//         .then(() => {
//             pdf.save('document.pdf');
//         })
//         .catch((error) => {
//             console.error('Error generating PDF:', error);
//         });
// }

// // Initialize the functionalities
// document.addEventListener('DOMContentLoaded', () => {
//     makeTextEditable();
//     makeImagesReplaceable();

//     const pdfButton = document.createElement('button');
//     pdfButton.innerText = 'Generate PDF';
//     pdfButton.style.position = 'fixed';
//     pdfButton.style.bottom = '20px';
//     pdfButton.style.right = '20px';
//     pdfButton.style.padding = '10px 20px';
//     pdfButton.style.backgroundColor = '#007bff';
//     pdfButton.style.color = '#fff';
//     pdfButton.style.border = 'none';
//     pdfButton.style.borderRadius = '5px';
//     pdfButton.style.cursor = 'pointer';

//     pdfButton.addEventListener('click', generatePDF);

//     document.body.appendChild(pdfButton);
// });











































// Function to make text editable
function makeTextEditable() {
    const textElements = document.querySelectorAll('h1, h2, h3, p');

    textElements.forEach((element) => {
        element.addEventListener('click', function () {
            const currentText = element.innerText;

            const inputField = document.createElement('textarea');
            inputField.value = currentText;
            inputField.style.width = `${element.offsetWidth}px`;
            inputField.style.height = `${element.offsetHeight}px`;
            inputField.style.fontSize = window.getComputedStyle(element).fontSize;
            inputField.style.fontWeight = window.getComputedStyle(element).fontWeight;
            inputField.style.fontFamily = window.getComputedStyle(element).fontFamily;
            inputField.style.lineHeight = window.getComputedStyle(element).lineHeight;
            inputField.style.resize = 'none';
            inputField.style.overflow = 'hidden';
            inputField.style.boxSizing = 'border-box';

            element.replaceWith(inputField);

            inputField.addEventListener('blur', function () {
                const newText = inputField.value;
                element.innerText = newText;
                inputField.replaceWith(element);
            });

            inputField.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const newText = inputField.value;
                    element.innerText = newText;
                    inputField.replaceWith(element);
                }
            });

            inputField.focus();
        });
    });
}

// Function to make images replaceable
function makeImagesReplaceable() {
    const imageElements = document.querySelectorAll('img, #bigImgContainer');

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
                        if (element.tagName === 'IMG') {
                            element.src = e.target.result;
                        } else {
                            element.style.backgroundImage = `url(${e.target.result})`;
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });

            inputFile.click();
        });
    });
}

// // Function to generate PDF
// function generatePDF() {
//     const { jsPDF } = window.jspdf;
//     const pages = ['pageOne', 'pageTwo', 'pageThree', 'pageFour', 'pageFive'];
//     const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size in portrait orientation
//     const promises = [];

//     pages.forEach((id, index) => {
//         const element = document.getElementById(id);
//         if (element) {
//             promises.push(
//                 html2canvas(element, {
//                     useCORS: true,
//                     allowTaint: false,
//                     scale: 2,
//                 }).then((canvas) => {
//                     const imgData = canvas.toDataURL('image/png');
//                     const imgWidth = pdf.internal.pageSize.getWidth();
//                     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//                     // If it's not the first page, add a new page
//                     if (index > 0) pdf.addPage();

//                     // Add the image to the PDF, adjusted to fill the page
//                     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//                 })
//             );
//         }
//     });

//     Promise.all(promises)
//         .then(() => {
//             pdf.save('document.pdf');
//         })
//         .catch((error) => {
//             console.error('Error generating PDF:', error);
//         });
// }

// Initialize the functionalities
document.addEventListener('DOMContentLoaded', () => {
    makeTextEditable();
    makeImagesReplaceable();

    // const pdfButton = document.createElement('button');
    // pdfButton.innerText = 'Generate PDF';
    // pdfButton.style.position = 'fixed';
    // pdfButton.style.bottom = '20px';
    // pdfButton.style.right = '20px';
    // pdfButton.style.padding = '10px 20px';
    // pdfButton.style.backgroundColor = '#007bff';
    // pdfButton.style.color = '#fff';
    // pdfButton.style.border = 'none';
    // pdfButton.style.borderRadius = '5px';
    // pdfButton.style.cursor = 'pointer';

    // pdfButton.addEventListener('click', generatePDF);

    // document.body.appendChild(pdfButton);
});