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

    // Make text editable
    const editableElements = document.querySelectorAll(".newsText,.leftTopNews, .leftTopHeadline, .poppins, .leftPortionHead, .rightMostNews");
    editableElements.forEach((element, index) => {
        element.setAttribute("contenteditable", "true");
        const savedText = localStorage.getItem(`text_${index}`);
        if (savedText !== null) {
            element.innerHTML = savedText;
        }
    });

    // Load saved images
    const images = document.querySelectorAll("img");
    images.forEach((img, index) => {
        const savedSrc = localStorage.getItem(`image_${index}`);
        if (savedSrc) {
            img.src = savedSrc;
        }

        img.addEventListener("click", function () {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.addEventListener("change", function (event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        img.src = e.target.result;
                        localStorage.setItem(`image_${index}`, e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            });
            input.click();
        });
    });

    // Save Data on Button Click
    saveButton.addEventListener("click", function () {
        editableElements.forEach((element, index) => {
            localStorage.setItem(`text_${index}`, element.innerHTML);
        });

        images.forEach((img, index) => {
            localStorage.setItem(`image_${index}`, img.src);
        });

        alert("Page saved successfully!");
    });
});
