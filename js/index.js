var siteNameInput =document.getElementById('bookName');
var siteUrlInput =document.getElementById('siteUrl');
var btnAddSite = document.querySelector('.submit');
var btnUpdateSite = document.querySelector('.update');
var formControl=document.querySelectorAll('.form-control');
var index=0;

var siteList =[];

if (localStorage.getItem('sites')!==null) {
    
siteList= JSON.parse(localStorage.getItem('sites'));
dispalyData();


};

function addSite() {
    
    if(validName()==true && validUrl()==true){
        var site = {
            name:siteNameInput.value,
            url:siteUrlInput.value
    
        };
    
        
        siteList.push(site);
    
    
        localStorage.setItem('sites',JSON.stringify(siteList));
    
    
        clearData()
        dispalyData();
    
    }

}

function dispalyData() {
    
        var container=``;

        for (var i = 0; i < siteList.length; i++) {
            container+=`<tr>
            <td>${i+1}</td>
            <td>${siteList[i].name}</td>
            <td>
            <a href="${siteList[i].url}" target="_blank"
            ><button class="btn btn-visit">
              <i class="fa-solid fa-eye"></i> visit
            </button></a
          >
            </td>
            <td>
            <button onclick='setDataToUpade(${i})' class="btn btn-primary">
              <i class="fa-solid fa-pen-to-square"></i> Update
              </button>


              <button onclick='deleteSite(${i})' class="btn btn-danger">
                <i class="fa-solid fa-trash-can"></i> Delete
              </button>

            </td>
          </tr>`
            
        }
    
        document.getElementById('tbody').innerHTML=container;
    }



function clearData() {
    siteNameInput.value=null;
    siteUrlInput.value=null;
}



function deleteSite(deleteSites) {
    siteList.splice(deleteSites,1);
    localStorage.setItem('sites' , JSON.stringify(siteList))
    dispalyData()
}




btnAddSite.addEventListener('click', function(){
   
    addSite();
    
});


function validName() {
    var text = siteNameInput.value;
    var rgex = /^[a-z]{3,}$/i;
    var msgname=document.querySelector('.msgname');

    if (rgex.test(text)==true) {
        siteNameInput.classList.add('is-valid');
        siteNameInput.classList.remove('is-invalid');
        msgname.classList.replace('d-block', 'd-none');
        return true;


    }else{
        siteNameInput.classList.add('is-invalid');
        siteNameInput.classList.remove('is-valid');
        msgname.classList.replace('d-none', 'd-block');
        return true;
        

    }
}


function setDataToUpade(indexSite) {
    
    siteNameInput.value=siteList[indexSite].name;
    siteUrlInput.value=siteList[indexSite].url;

    btnAddSite.classList.add('d-none');
    btnUpdateSite.classList.remove('d-none');


    index=indexSite;
}


function updateSite() {
    
    if(validName()==true && validUrl()==true){
        var site = {
            name:siteNameInput.value,
            url:siteUrlInput.value
    
        };
    
        
        siteList.splice(index , 1 , site);
        btnAddSite.classList.remove('d-none');
        btnUpdateSite.classList.add('d-none');
    
        localStorage.setItem('sites',JSON.stringify(siteList));
    
    
        clearData()
        dispalyData();
    
    }
}



for (var i = 0; i < formControl.length; i++) {
    
    formControl[0].addEventListener('input', function(){
        validName();
    })
    formControl[1].addEventListener('input', function(){
        validUrl();
    })
    
}

function validUrl() {
    var text = siteUrlInput.value;
    var rgex = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    var msgurl=document.querySelector('.msgurl');

    if (rgex.test(text)==true) {
        siteUrlInput.classList.add('is-valid');
        siteUrlInput.classList.remove('is-invalid');
        msgurl.classList.replace('d-block', 'd-none')
        return true;

    }else{
        siteUrlInput.classList.add('is-invalid');
        siteUrlInput.classList.remove('is-valid');
        msgurl.classList.replace('d-none', 'd-block');
        return false

    }
}








