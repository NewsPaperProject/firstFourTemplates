document.addEventListener("DOMContentLoaded", function () {
    // Create Save Button
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save Page";
    saveButton.style.position = "fixed";
    saveButton.style.top = "10px";
    saveButton.style.right = "10px";
    saveButton.style.padding = "10px 15px";
    saveButton.style.backgroundColor = "#007bff";
    saveButton.style.color = "white";
    saveButton.style.border = "none";
    saveButton.style.borderRadius = "5px";
    saveButton.style.cursor = "pointer";
    document.body.appendChild(saveButton);

    function makeTextEditable() {
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');

        textElements.forEach((element, index) => {
            element.addEventListener('click', function () {
                const currentText = element.innerText;
                const computedStyle = window.getComputedStyle(element);
                const inputField = document.createElement('textarea');
                inputField.value = currentText;

                inputField.style.width = `${element.offsetWidth}px`;
                inputField.style.height = `${element.offsetHeight}px`;
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

                element.replaceWith(inputField);
                inputField.focus();

                inputField.addEventListener('blur', function () {
                    element.innerText = inputField.value;
                    localStorage.setItem(`text_${index}`, element.innerText);
                    inputField.replaceWith(element);
                });

                inputField.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        inputField.blur();
                    }
                });
            });
            
            const savedText = localStorage.getItem(`text_${index}`);
            if (savedText !== null) {
                element.innerText = savedText;
            }
        });
    }

    function makeImagesReplaceable() {
        const imageElements = document.querySelectorAll('img');

        imageElements.forEach((element, index) => {
            const savedSrc = localStorage.getItem(`image_${index}`);
            if (savedSrc) {
                element.src = savedSrc;
            }

            element.addEventListener('click', function () {
                const inputFile = document.createElement('input');
                inputFile.type = 'file';
                inputFile.accept = 'image/*';

                inputFile.addEventListener('change', function () {
                    const file = inputFile.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            element.src = e.target.result;
                            localStorage.setItem(`image_${index}`, e.target.result);
                        };
                        reader.readAsDataURL(file);
                    }
                });
                inputFile.click();
            });
        });
    }

    saveButton.addEventListener("click", function () {
        document.querySelectorAll('h1, h2, h3, h4, h5, h6, p').forEach((element, index) => {
            localStorage.setItem(`text_${index}`, element.innerText);
        });
        document.querySelectorAll('img').forEach((img, index) => {
            localStorage.setItem(`image_${index}`, img.src);
        });
        alert("Page saved successfully!");
    });

    makeTextEditable();
    makeImagesReplaceable();
});