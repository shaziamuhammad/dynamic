// listing elements
document.getElementById('resumeForm')?.addEventListener('submit', function(event){
    event.preventDefault() ;

    // Get referenceto form elements using IDs
   
   const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement ;
    const nameElement = document.getElementById('name') as HTMLInputElement ;
    const emailElement = document.getElementById('email') as HTMLInputElement ;
    const addressElement = document.getElementById('address') as HTMLInputElement ;
    const phoneElement = document.getElementById('phone') as HTMLInputElement ;
    const educationElement = document.getElementById('education') as HTMLInputElement ;
    const experienceElement = document.getElementById('experience') as HTMLInputElement ;
    const skillsElement = document.getElementById('skills') as HTMLInputElement ;

   
   if (profilePictureInput && 
    nameElement && 
    emailElement && 
    addressElement && 
    phoneElement && 
    educationElement && experienceElement && skillsElement)
    {
        // **********************************************************************************
        const name = nameElement.value ;
        const email = emailElement.value ;
        const address = addressElement.value ;
        const phone = phoneElement.value ;
        const education = educationElement.value ;
        const experience = experienceElement.value ;
        const skills = skillsElement.value ;
      // **********************************************************************************
    // picture elements
    const profilePictureFile = profilePictureInput.files?.[0] ;
    const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
    

    // create resume output
    const resumeHTML =  `
<h2>Resume</h2>
${profilePictureURL ? `<img src ="${profilePictureURL}  alt ="Profile Picture" class= "profilePicture">` : '' }
<p><strong>Name:</strong> <span id= "edit-name" class="editable"> ${name}</span> </p>
<p><strong>Email:</strong> <span id= "edit-email" class="editable"> ${email} </span> </p> 
<p><strong>Address:</strong> <span id= "edit-address" class="editable"> ${address}</span> </p>
<p><strong>Phone Number:</strong> <span id= "edit-phone" class="editable"> ${phone}</span> </p>

<h3>Education</h3>

<p id= "edit-education" class="editable">${education}</p>

<h3>Experience</h3>
<p id= "edit-experience" class="editable">${experience}</p>

<h3>Skills</h3>
<p id= "edit-skills" class="editable">${skills}</p>

    `;
    // ************************************************************
    const resumeOutputElement = document.getElementById('resumeOutput')
    if (resumeOutputElement){ 
        resumeOutputElement.innerHTML = resumeHTML ;
        resumeOutputElement.classList.remove("hidden")
        // create container for button
        const buttonsContainer = document.createElement("div") ;
        buttonsContainer.id ="buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer) ;
        // add download PDF button

        const downloadButton = document.createElement("button");
        downloadButton.textContent= "Download as PDF" ;
        downloadButton.addEventListener("click", () =>{
            window.print ();
        });
        // Allow user to print as PDF 
        buttonsContainer.appendChild(downloadButton) ;
        // add shareable link button 

        const shareLinkButton = document.createElement("button") ;
        shareLinkButton.textContent = "Shareable Link" ;
        shareLinkButton.addEventListener("click" , async() => {
            try{
                // create unique shareablelink
                const shareablelink = `https://yourdomain.com/resumes/${name.replace(
                    /\s+/g ,
                    "_"
                )} _cv.html`;
                // clipboard API TO copy link
                await navigator.clipboard.writeText(shareablelink) ;
                alert("Shareable link copied to clipboardk!");
            } catch (err){
                console.error("Failed to copy link :" , err) ;
                alert("Fail to copy Link , Please try again") ;
            }
        });
        buttonsContainer.appendChild(shareLinkButton) ;

    } else{
        console.error("Not Found");
    } }else{ console.error("Forms element are missing")}
}) ;
    makeEditable();
//  } )

function makeEditable (){
    const editableElements = document.querySelectorAll('.editable') ;
    editableElements.forEach(element => { 
        element.addEventListener('click' , function(){
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "" 
            // replace content
            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN'){
                const input = document.createElement('input')
                input.type ='text'
                input.value = currentValue
                input.classList.add('editing-input')

                input.addEventListener('blur', function(){
                    currentElement.textContent = input.value ;
                    currentElement.style.display= 'inline'
                    input.remove()
                })
                currentElement.style.display = 'none'
                currentElement.parentNode?.insertBefore(input, currentElement)
                input.focus()
            }
        })

    })
}