$(function () {

    let username = $('#userEmail')
    let firstName = $('#firstName')
    let lastName = $('#lastName')
    // let gender = $('input[name="genderOptions"]')
    let dob = $('#inputDOB')
    let city = $('#inputCity')
    let state = $('#inputState')
    let pinCode = $('#inputPin')

    // To get details from db and autofill the form

    $.get('/api/userdetails', (user) => {
        username.val(user.username)
        firstName.val(user.firstName)
        lastName.val(user.lastName)
        dob.val(user.dob)
        city.val(user.city)
        state.val(user.state)
        pinCode.val(user.pincode)
        switch(user.gender) {
            case "Male": 
                $('#maleRadio').prop("checked", true);
                break;
            case "Female": 
                $('#femaleRadio').prop("checked", true);
                break;
            case "Others": 
                $('#othersRadio').prop("checked", true);
                break;
        }
    })

})