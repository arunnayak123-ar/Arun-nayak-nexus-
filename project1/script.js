document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const regNo = document.getElementById("regNo").value.trim();
    const branch = document.getElementById("branch").value;
    const year = document.getElementById("year").value;

    if (regNo && branch && year) {
        document.getElementById("message").innerText = "Registration successful!";
    } else {
        document.getElementById("message").innerText = "Please fill all the fields.";
        document.getElementById("message").style.color = "red";
    }
});