const skills = document.querySelector('#skill_list');
const modal_edit = document.querySelector('#modal_edit');
const add_devs =document.getElementById('add_devs');
const devs_data =document.getElementById('devs_data');
const skill_edit =document.getElementById('skill_edit');

const skillLoad = () => {

    axios.get('http://localhost:5050/skill').then(data =>{

    let skill_list = '';
    data.data.map(skill =>{
        skill_list +=`
        <option value="${skill.id}">${skill.skill}</option>
        `;
    });
    skills.insertAdjacentHTML('beforeend', skill_list);

    });
}
skillLoad();

// edit skill


/**
 * devloper data 
 *
 */

const devloperData = () => {
    axios.get('http://localhost:5050/devlopers').then(res =>{
        let data_list = '';
        res.data.map((dev , index) => {
            data_list +=`
                    <tr>
                    <td>${index + 1}</td>
                    <td>${dev.name}</td>
                    <td>${dev.email}</td>
                    <td>${dev.cell}</td>
                    <td><img style="object-fit:cover; width:50px;height:50px;" src="${ dev.photo }" alt=""></td>
                    <td>
                        <a data-bs-toggle="modal" class="btn btn-info btn-sm" onclick="viewDevs(${dev.id})" href="#modal_view"><i class="fa-solid fa-eye-slash"></i></a>
                        <a data-bs-toggle="modal" class="btn btn-primary btn-sm" onclick="editDevs(${dev.id})" href="#modal_edit"><i class="fa-solid fa-edit"></i></a>
                        <a data-bs-toggle="modal" class="btn btn-danger btn-sm" onclick="deleteDevs(${dev.id})" href="#modal_delete"><i class="fa-solid fa-trash-can"></i></a>
                    </td>
                </tr>
            `;
        });
        devs_data.innerHTML =data_list;
    });
}
devloperData();

/**
 * Add new devloper
 */

 add_devs.addEventListener('submit', function(e) {
    e.preventDefault();
    let name =this.querySelector('#name');
    let email =this.querySelector('#email');
    let cell =this.querySelector('#cell');
    let photo =this.querySelector('#photo');
    let skillid =this.querySelector('#skill_list');
    

   if( name.value == '' || email.value == '' || cell.value == '' || photo.value == '' || skillid.value == ''){
       alert('All fields a required !');
   }else{
    axios.post('http://localhost:5050/devlopers',{
        id    :"",
        name  :name.value,
        email :email.value,
        cell  :cell.value,
        photo :photo.value,
        skillid :skillid.value

}).then(res =>{
    name.value = '';
    email.value = '';
    cell.value = '';
    photo.value = '';
    skillid.value = '';

    devloperData();
});
 }
 });

//  devs edit 
const skillLoade = () => {

    axios.get('http://localhost:5050/skill').then(data =>{

    let skill_list = '';
    data.data.map(skill =>{
        skill_list +=`
        <option value="${skill.id}">${skill.skill}</option>
        `;
    });
    skill_edit.insertAdjacentHTML('beforeend', skill_list);

    });
}
skillLoade();

 function editDevs(id) {
    let name =document.getElementById('ename');
    let email =document.getElementById('eemail');
    let cell =document.getElementById('ecell');
    let photo =document.getElementById('ephoto');
    let skill_edit =document.getElementById('skill_edit');
    let preview =document.getElementById('epre');
    let edit_id =document.getElementById('edit_id');
    axios.get(`http://localhost:5050/devlopers/${id}`).then(res => {

    name.value= res.data.name;
    email.value= res.data.email;
    cell.value= res.data.cell;
    photo.value= res.data.photo;
    skill_edit.children[res.data.skill].setAttribute('selected', true);
    edit_id.value= id;
    preview.setAttribute('src', res.data.photo);

    });
 }

 modal_edit.addEventListener('submit', function(e){
     e.preventDefault();

     let name =this.querySelector('#ename');
    let email =this.querySelector('#eemail');
    let cell =this.querySelector('#ecell');
    let photo =this.querySelector('#ephoto');
    let skill =this.querySelector('#eskill_list');
    let edit_id =this.querySelector('#edit_id');

    axios.patch(`http://localhost:5050/devlopers/${edit_id.value}`,{
        id    :"",
        name  :name.value,
        email :email.value,
        cell  :cell.value,
        photo :photo.value,
        skillid :skill.value

    }).then(res =>{
        name.value = '';
        email.value = '';
        cell.value = '';
        photo.value = '';
        skill.value = '';
    
        devloperData();
    });
 });

//  data delete 

let delete_data;

function deleteDevs(id) {
    delete_data=id;

}

function delete_devs(){
    axios.delete(`http://localhost:5050/devlopers/${delete_data}`).then(res =>{
        devloperData();
    });
}

// view data 
 const devs_view = document.getElementById('devs_view');
 const view_img = document.getElementById('view_img');

 function viewDevs(id){

    axios.get(`http://localhost:5050/devlopers/${id}`).then(res =>{
        view_img.setAttribute('src', res.data.photo);
        devs_view.innerHTML=`
        
        <tr>
            <td>${res.data.id}</td>
            <td>${res.data.name}</td>
            <td>${res.data.email}</td>
            <td>${res.data.cell}</td>
            <td>${skillDvs(res.data.id)}</td>
        </tr>
        `
    });
 }

 function skillDvs(id){
  if(id == '1'){
      return'PHP Devloper'; 
  }else if(id == '2'){
    return'Laravel Devloper';   
  }else if(id == '3'){
    return'Django Devloper';   
  }else if(id == '4'){
    return'Python Devloper';   
  }else if(id == '5'){
    return'WordPress Devloper';   
  }else if(id == '6'){
    return'IOS Devloper';
  }else if(id == '7'){
    return'Javasript Devloper';   
  }
}
