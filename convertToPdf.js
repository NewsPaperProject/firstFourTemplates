const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load the local HTML file with proper handling of CSS and images
    const htmlFilePath = path.resolve(__dirname, 'template1Page1.html');
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // Serve CSS inline
    const cssFilePath = path.resolve(__dirname, 'template1Page1.css');
    const cssContent = fs.readFileSync(cssFilePath, 'utf8');

    // Inject CSS into the HTML
    await page.setContent(`
        <!DOCTYPE html>
        <html>
            <head>
                <style>${cssContent}</style>
            </head>
            <body>${htmlContent}</body>
        </html>
    `, { waitUntil: 'networkidle0' });

    // IDs of divs that correspond to each PDF page
    const pageIds = ['pageOne', 'pageTwo', 'pageThree', 'pageFour', 'pageFive'];
    const pdfPath = path.resolve(__dirname, 'output.pdf');
    const pdfBuffers = [];

    for (const id of pageIds) {
        const element = await page.$(`#${id}`);
        if (element) {
            // Get the bounding box of the element
            const boundingBox = await element.boundingBox();
            const width = Math.ceil(boundingBox.width);
            const height = Math.ceil(boundingBox.height);

            // Adjust viewport to the div's size
            await page.setViewport({
                width,
                height,
            });

            // Add the div to the PDF
            const buffer = await page.pdf({
                printBackground: true,
                width: `${width}px`,
                height: `${height}px`,
                pageRanges: '1', // Single page per div
            });

            pdfBuffers.push(buffer);
        } else {
            console.warn(`Element with ID '${id}' not found.`);
        }
    }

    // Merge all PDF buffers into a single file
    fs.writeFileSync(pdfPath, Buffer.concat(pdfBuffers));
    console.log(`PDF successfully created at: ${pdfPath}`);

    // Close the browser
    await browser.close();
})();
