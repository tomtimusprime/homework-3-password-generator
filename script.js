/** PSEUDO CODE
 * declare Password array - will be empty
 * Data needed: length, 4 different values - lowercase, uppercase, numeric, special.
 * Create 4 arrays - each containing the different data types
 * prompt the user for password length
 * validate input: make sure less than 128 characters, make sure the input is an actual number, then make some comparisons that it's less than 128 characters. Make sure it's a positive number - no negatives.
 * Store in a variable -
 * prompt for the type of characters the user wants to include - 4 options
 * Separate prompts with confirm (true or false) values. Lowercase - true or false and then assign those to separate variables.
 * Create acceptable characters array pulled from the 4 arrays.
 * for loop based on number user gives us and then generate a random character on each iteration.
 * Use random number to selet a random character from our array and then push that to our password variable
 * Display on the generated password on document.
 */


//Declare variables
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let lowerCase = "abcdefghijklmnopqrstuvwxyz".split("");
let upperCase = lowerCase.map(function (letter) {
  return letter.toUpperCase();
})
let special = "!@#$%^&*()-_+=?/\[]{}<>".split(""); 

//Create promptForLengt(), promptForCharacters() and generatePassword() functions
function promptForLength() {
  let userResponse = prompt("How long would you like your password to be? (No more than 128 characters)");
  let numberResponse = Number(userResponse);
  while (isNaN(numberResponse) || numberResponse > 128 || numberResponse < 8) {
      if (isNaN(numberResponse)) {
        userResponse = prompt("That's not a number. Please enter a number.");
      }
      else if(numberResponse > 128) {
        userResponse = prompt("That's too many characters.");
      }
      else if (numberResponse < 8) {
        userResponse = prompt("That's not enough characters.");
      }
      // if(userResponse === null) {
      //   return null;
      // }
      numberResponse = Number(userResponse);//Need to turn that value into a number once again if we get to this point because everytime the userResponse is asked it's value is always a string. 
  } 
  return numberResponse;   
}

function promptForCharacters(question) {
  let response = prompt(question).toLowerCase();
  do {
    if(response === "yes") {
      return true;
    }
    else if (response === "no") {
      return false;
    }
    else {
      response = prompt("I don't recognize that answer. " + question).toLowerCase();
    }
  } while (response !== "yes" && response !== "no"); // could also be "while(true);""

}

/**A simpler, more succinct way to prompt for characters that I want to remember */
// function promptForCharacters(question) {
//   let response = prompt(question).toLowerCase();
//   while(response !== "yes" && response !== "no") {
//     response = prompt(question).toLowerCase();
//   }
//   return (response === "yes") ? true : false; 
// }

function generatePassword() {
  let length = promptForLength();
  let useNumbers = false;
  let useLowerCase = false;
  let useUpperCase = false;
  let useSpecial = false;
  
  do {
    useNumbers = promptForCharacters("Do you want to use numbers? (yes or no)");
    useLowerCase = promptForCharacters("Do you want to use lower case letters? (yes or no)");
    useUpperCase = promptForCharacters("Do you want to use upper case letters? (yes or no)");
    useSpecial = promptForCharacters("Do you want to use special characters? (yes or no)");
    if(!useNumbers && !useLowerCase && !useUpperCase && !useSpecial) {
      alert("You need to choose at least one character type.");
    }
  } while(!useNumbers && !useLowerCase && !useUpperCase && !useSpecial);
  
  let passArray = [];//resets
  if (useNumbers) {
    passArray.splice(0,0,...numbers);//The three dots means to include the whole array
  } 
  if (useLowerCase) {
    passArray.splice(0,0,...lowerCase);
  }
  if (useUpperCase) {
    passArray.splice(0,0,...upperCase);
  }
  if (useSpecial) {
    passArray.splice(0,0,...special);
  }
  let password = "";
  for(i = 0; i <= length; i++) {
    let randomNum = Math.floor(Math.random() * passArray.length);
    password += passArray[randomNum];
  }
  return password;
}

// Write password to the #password input
function writePassword() {
  var passwordText = document.querySelector("#password");
  passwordText.value = " ";
  var password = generatePassword();
  
  passwordText.value = password;
}

// Assignment Code
var generateBtn = document.querySelector("#generate");
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


