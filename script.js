const form = document.querySelector("#studentForm");
const studentName = document.querySelector("#studentName");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const dob = document.querySelector("#dob");
const course = document.querySelector("#course");
const about = document.querySelector("#about");
const photo = document.querySelector("#photo");
const studentContainer = document.querySelector("#studentContainer");
const studentCount = document.querySelector("#studentCount");

const students = [];

const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const phoneError = document.querySelector("#phoneError");
const dobError = document.querySelector("#dobError");
const genderError = document.querySelector("#genderError");
const courseError = document.querySelector("#courseError");
const skillsError = document.querySelector("#skillsError");
const aboutError = document.querySelector("#aboutError");
const photoError = document.querySelector("#photoError");

function clearErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    dobError.textContent = "";
    genderError.textContent = "";
    courseError.textContent = "";
    skillsError.textContent = "";
    aboutError.textContent = "";
    photoError.textContent = "";
}

function validateForm() {
    clearErrors();
    let isValid = true;

    const nameValue = studentName.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const dobValue = dob.value;
    const aboutValue = about.value.trim();

    const nameRegex = /^[A-Za-z ]{3,}$/;

    if (nameValue === "") {
        nameError.textContent = "Name is required";
        isValid = false;
    } else if (!nameRegex.test(nameValue)) {
        nameError.textContent = "Name must contain only letters and spaces and have at least 3 characters";
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        emailError.textContent = "Email is required";
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.textContent = "Enter a valid email";
        isValid = false;
    }

    const phoneRegex = /^\d{10}$/;

    if (phoneValue === "") {
        phoneError.textContent = "Phone number is required";
        isValid = false;
    } else if (!phoneRegex.test(phoneValue)) {
        phoneError.textContent = "Phone number must contain exactly 10 digits";
        isValid = false;
    }

    if (dobValue === "") {
        dobError.textContent = "Date of birth is required";
        isValid = false;
    } else {
        const selectedDate = new Date(dobValue);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            dobError.textContent = "Future date is not allowed";
            isValid = false;
        }
    }

    const gender = document.querySelector('input[name="gender"]:checked');

    if (!gender) {
        genderError.textContent = "Please select gender";
        isValid = false;
    }

    if (course.value === "") {
        courseError.textContent = "Please select a course";
        isValid = false;
    }

    const selectedSkills = document.querySelectorAll(
        'input[name="skills"]:checked'
    );

    if (selectedSkills.length === 0) {
        skillsError.textContent = "Please select at least one skill";
        isValid = false;
    }

    if (aboutValue === "") {
        aboutError.textContent = "About student is required";
        isValid = false;
    }

    if (photo.files.length === 0) {
        photoError.textContent = "Profile photo is required";
        isValid = false;
    }

    return isValid;
}

function createStudentCard(student) {
    const card = document.createElement("div");
    card.classList.add("student-card");
    card.dataset.id = student.id;

    const image = document.createElement("img");
    image.src = student.photo;
    image.alt = student.name;

    const heading = document.createElement("h3");
    heading.textContent = student.name;

    const emailText = document.createElement("p");
    emailText.textContent = "Email: " + student.email;
    
    const phoneText = document.createElement("p");
    phoneText.textContent = "Phone: " + student.phone;

    const dobText = document.createElement("p");
    dobText.textContent = "Date of Birth: "+student.dob;

    const genderText = document.createElement("p");
    genderText.textContent = "Gender: "+student.gender;

    const courseText = document.createElement("p");
    courseText.textContent = "Course: " + student.course;

    const skillsText = document.createElement("p");
    skillsText.textContent = "Skills: " + student.skills.join(", ");

    const aboutText = document.createElement("p");
    aboutText.textContent = "About: " + student.about;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    card.appendChild(image);
    card.appendChild(heading);
    card.appendChild(emailText);
    card.appendChild(phoneText);
    card.appendChild(dobText);
    card.appendChild(genderText);
    card.appendChild(courseText);
    card.appendChild(skillsText);
    card.appendChild(aboutText);
    card.appendChild(deleteButton);

    studentContainer.appendChild(card);
}

function updateStudentCount() {
    studentCount.textContent = students.length;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    const selectedSkills = document.querySelectorAll(
        'input[name="skills"]:checked'
    );

    const skills = [];

    selectedSkills.forEach(function(skill) {
        skills.push(skill.value);
    });

    const imageFile = photo.files[0];
    const photoURL = URL.createObjectURL(imageFile);

    const student = {
        id: Date.now(),
        name: studentName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        dob: dob.value,
        gender: gender.value,
        course: course.value,
        skills: skills,
        about: about.value.trim(),
        photo: photoURL
    };

    students.push(student);
    createStudentCard(student);
    updateStudentCount();

    form.reset();
    clearErrors();
});

studentContainer.addEventListener("click", function(event) {
    if (!event.target.classList.contains("delete-btn")) {
        return;
    }

    const card = event.target.closest(".student-card");
    const studentId = Number(card.dataset.id);

    const studentIndex = students.findIndex(function(student) {
        return student.id === studentId;
    });

    if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
    }

    card.remove();
    updateStudentCount();
});
