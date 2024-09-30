const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
copieIcon = document.querySelector(".input-box span"),
passwordInput = document.querySelector(".input-box input"),
passIndicator = document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn");

const caracteres ={
    minuscule: "abcdefghijklmnopqrstuvwxyz",
    majuscule: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    chiffres : "0123456789",
    symboles : "^!?$%&|[](){}:;.,*+-#@<>~"
};


const generationMDp = () =>{
    let staticMDP = "",
    randomMDP = "",
    excludeDuplicate = false,
    MDPLength = lengthSlider.value;

    options.forEach((option) => {
        if(option.checked) {
            if(option.id !== "exc-doublons" && option.id !== "spaces"){
                staticMDP += caracteres[option.id];
            } else if(option.id === "spaces"){
                staticMDP += `${staticMDP}`;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < MDPLength; i++) {
        let randomCarac = staticMDP[Math.floor(Math.random()* staticMDP.length)];
        if (excludeDuplicate){
            !randomMDP.includes(randomCarac) || randomCarac == " " ? (randomMDP += randomCarac) : i--;
        } else{
            randomMDP += randomCarac;
        }
    }
    passwordInput.value = randomMDP;
};

const uptadePassIndicator =() => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
};

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generationMDp();
    uptadePassIndicator()
};
  updateSlider();
  
  const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copieIcon.innerText = "check";
    copieIcon.style.color = "#4285F4";
    setTimeout(() => {
      copieIcon.innerText = "copy_all";
      copieIcon.style.color = "#707070";
    }, 1500);
};

  copieIcon.addEventListener("click", copyPassword);
  lengthSlider.addEventListener("input", updateSlider);
  generateBtn.addEventListener("click", generationMDp);




