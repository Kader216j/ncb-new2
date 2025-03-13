function toggleMenu(){
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

function showBasic() {
    document.querySelector('.row1').classList.remove('hidden');
    document.querySelector('.row2').classList.add('hidden');
    document.querySelector('.row3').classList.add('hidden');
}

function showStandard() {
    document.querySelector('.row1').classList.add('hidden');
    document.querySelector('.row2').classList.remove('hidden');
    document.querySelector('.row3').classList.add('hidden');
}

function showPremium() {
    document.querySelector('.row1').classList.add('hidden');
    document.querySelector('.row2').classList.add('hidden');
    document.querySelector('.row3').classList.remove('hidden');
}


document.querySelector(".btn-basic").addEventListener("click", function () {
    this.style.backgroundColor = "#f4b400"; // Changes to green when clicked
    document.querySelector(".btn-standard").style.backgroundColor = "#0c0c3c";
    document.querySelector(".btn-premium").style.backgroundColor = "#0c0c3c";

});

document.querySelector(" .btn-standard").addEventListener("click", function () {
    this.style.backgroundColor = "#f4b400"; // Changes to green when clicked
    document.querySelector(".btn-basic").style.backgroundColor = "#0c0c3c";
    document.querySelector(".btn-premium").style.backgroundColor = "#0c0c3c";

});

document.querySelector(".btn-premium").addEventListener("click", function () {
    this.style.backgroundColor = "#f4b400"; // Changes to green when clicked
    document.querySelector(".btn-basic").style.backgroundColor = "#0c0c3c";
    document.querySelector(".btn-standard").style.backgroundColor = "#0c0c3c";

});





// popup starts here
function openPopup() {
    document.getElementById("enquiryPopup").style.display = "flex";
}
function closePopup() {
    document.getElementById("enquiryPopup").style.display = "none";
}





(function () {
    "use strict";
    /*
    * Form Validation
    */

    // Fetch all the forms we want to apply custom validation styles to
    const forms = document.querySelectorAll(".needs-validation");
    const result = document.getElementById("result");
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
        "submit",
        function (event) {
            if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();

            form.querySelectorAll(":invalid")[0].focus();
            } else {
            /*
            * Form Submission using fetch()
            */
            event.preventDefault();
            event.stopPropagation();
            
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            result.innerHTML = "Please wait...";

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                },
                body: json,
            })
                .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = json.message;
                    result.classList.remove("text-gray-500");
                    result.classList.add("text-green-500");
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                    result.classList.remove("text-gray-500");
                    result.classList.add("text-red-500");
                }
                })
                .catch((error) => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
                })
                .then(function () {
                form.reset();
                form.classList.remove("was-validated");
                setTimeout(() => {
                    result.style.display = "none";
                }, 5000);
                });
            }
            form.classList.add("was-validated");
        },
        false
        );
    });
    })();