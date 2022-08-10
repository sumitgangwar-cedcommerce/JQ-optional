$data = [];
$set = new Set();
$edit_item = '';
$user = '';
const submitHandler = (event) => {
    event.preventDefault();
    $id = event.target.id.value;
    $fname = event.target.fname.value;
    $lname = event.target.lname.value;
    $password = event.target.password.value;
    $cpass = event.target.cpass.value;
    $contact = event.target.contact.value;
    $email = event.target.email.value;
    $type = event.target.type.value;
    if($password !== $cpass)    alert("Password and Confirm password should be same");
    else if($set.has($id)) alert("Enter different ID");
    else{
        alert('Successfully Registered');
        $set.add($id);
        $data[$email] = {
                        "id": $id,
                        "fname":$fname,
                        "lname": $lname,
                        "password": $password,
                        "contact": $contact,
                        "email": $email,
                        "type": $type
        }
    }
}
const loginHandler = (event) => {
    event.preventDefault();
    $email = event.target.email.value;
    $password = event.target.password.value;
    if(Object.keys($data).length === 0) alert('Please register first');   
    else if($data[$email]===undefined || $data[$email]['password']!==$password)    alert("Invalid credentials");
    else{
        alert("Login Successfull");
        if($data[$email]['type']=='user')  $('#res').html(`<h1>Welcome ${$data[$email]['fname']} ${$data[$email]['lname']}</h1>`);
        else{
            $user =$data[$email]['fname'] + " " + $data[$email]['lname'];
            showData();
        }
    }
}
const showData = (chk)=>{
    $t = `<h1>Welcome ${$user}!</h1>`;
    $t+= "<table>"+
            "<tr>"+
                "<th>Id<th>"+
                "<th>Fname<th>"+
                "<th>Lname<th>"+
                "<th>Password<th>"+
                "<th>Contact<th>"+
                "<th>Email<th>"+
                "<th>Type<th>"+
                "<th colspan='2'>Action<th>"+
            "<tr>";
    Object.keys($data).map((item , i)=>{
        // debugger;
        $t+="<tr>"+
                "<td>"+$data[item]['id']+"<td>"+
                "<td>"+$data[item]['fname']+"<td>"+
                "<td>"+$data[item]['lname']+"<td>"+
                "<td>"+$data[item]['password']+"<td>"+
                "<td>"+$data[item]['contact']+"<td>"+
                "<td>"+$data[item]['email']+"<td>"+
                "<td>"+$data[item]['type']+"<td>"+
                `<td><button onclick='edit("${item}" , event)'><i class='fa-solid fa-pen-to-square'></i></button><td>`+
                `<td><button onclick='del("${item}")'><i class='fa-solid fa-trash-can'></i></button><td>`+
            "<tr>";
    })
    $t+="</table>";
    if(chk) $('#res').html($t);
    else document.getElementById('res').innerHTML+=$t;
}

const del = (item) =>{
    delete $data[item];
    showData(1);
}
const edit = (item , event) =>{
    $('#form')[0].id.focus();
    $edit_item = item;
    $('#form')[0].onsubmit =  (event)=>updateItem(item , event);
    $('#form')[0].id.value = $data[item]['id'];
    $('#form')[0].fname.value = $data[item]['fname'];
    $('#form')[0].lname.value = $data[item]['lname'];
    $('#form')[0].password.value = $data[item]['password'];
    $('#form')[0].cpass.value = $data[item]['password'];
    $('#form')[0].contact.value = $data[item]['contact'];
    $('#form')[0].email.value = $data[item]['email'];
    $('#form')[0].type.value = $data[item]['type'];
    $('#form')[0].submit.innerHTML = "Update";
    
}

const updateItem = (item , event) => {
    event.preventDefault();
    $id = event.target.id.value;
    $fname = event.target.fname.value;
    $lname = event.target.lname.value;
    $password = event.target.password.value;
    $cpass = event.target.cpass.value;
    $contact = event.target.contact.value;
    $email = event.target.email.value;
    $type = event.target.type.value;
    if($password!=$cpass)   alert('Password and Confirm password should be same');
    else{
        $data[item]['id'] = $id;
        $data[item]['fname'] = $fname;
        $data[item]['lname'] = $lname;
        $data[item]['password'] = $password;
        $data[item]['contact'] = $contact;
        $data[item]['email'] = $email;
        $data[item]['type'] = $type;
        $('#form')[0].submit.innerHTML = "Register";
        $('#form')[0].onsubmit =  (event)=>submitHandler(event);
        alert("Update Successfully");
        showData(1);
    }
    
    
}