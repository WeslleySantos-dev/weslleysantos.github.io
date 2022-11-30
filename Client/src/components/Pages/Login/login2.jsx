import Login from './Login'
document.body.addEventListener('keydown', function (event) {
    
    const key = event.key;
    let v1 = document.querySelector('#login').value;
    let v2 = document.querySelector('#password').value;
    console.log(key,v1,v2);
    if (key == 'Enter') {
        if (v1) {
            if (v2) {
                Login.handleClickButton()
            } else {

            }
        }
    }

});