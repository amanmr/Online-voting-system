window.onload=()=>{

    let submit=document.getElementById('but1')
    submit.onclick=()=>{
        let password=document.getElementById('password').value
        let confirmpassword=document.getElementById('confirmpassword').value
        let number=document.getElementById('number')
        if(password!=confirmpassword){
            alert("Password didnt match")
            return false;
        }
    }
}

