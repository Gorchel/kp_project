window.onload = function(){
    sound = new Boolean(true);
    zoom = new Boolean (true);
    scroll = new Boolean (false);
    stopSend = new Boolean (false);
    confirmSend = new Boolean (false);
    servicesOpen = new Boolean (false);
    contactsOpen = new Boolean (false);
    
    //getFeatured
    $.ajax({
        type: "POST",
        url: "dataBaseWork.php",
        async: true,
        data: {'handler': 'indexFeatured'},
        success: function(data){
            indexArray = $.parseJSON(data); 
            var size = 1;
            for (item in indexArray){
                size++;
            }
            if (size > 1){
                for(var i = 1; i < size; i++){
                    var clientData = {img: indexArray[i][3],title: indexArray[i][1], body: indexArray[i][2]}; 
                    $('#indexFeaturedTmpl').tmpl(clientData).appendTo('.inline_block_obshiy');   
                }
            }
            else{
                $('.inline_block_obshiy').append('<span>News not found</span>'); 
                $('.inline_block_obshiy').css('overflow','auto');
            }
            delete size;
            delete indexArray;
        }
    });
    //Open form Contacts------------------------- 
    $('#contacts').click(function(){
        $.ajax({
            type: "POST",
            url: "contacts.php",
            async: false,
            success: function(data){
                $('body').prepend(data);
            }
        });
        var hgt = $(document).height() + 'px';
        $('.wrapper').height(hgt);
        var browser = bodyHtml();
        var scrollVar = $(browser).scrollTop() + $('body').height() * 0.1 + 'px';
        var scrollVarClose = ($(browser).scrollTop() + $('body').height() * 0.1) - 12 + 'px';
        $('.contacts-container').css('marginTop',scrollVar);
        $('#close').css('marginTop',scrollVarClose);  
        scroll = true;
        contactsOpen = true;
        canvasClose('#B5B0B0','#FFFFC2');
    })
    
    $(window).scroll(function(){
        var browser = bodyHtml();
        if(scroll == true && contactsOpen == true){
            var scrollVar = $(browser).scrollTop() + $('body').height() * 0.1 + 'px';
            var scrollVarClose = ($(browser).scrollTop() + $('body').height() * 0.1) - 12 + 'px';
            $('.contacts-container').css('marginTop',scrollVar);
            $('#close').css('marginTop',scrollVarClose);
        }

        if(scroll == true && servicesOpen == true){
            console.log('ewev');
            var scrollVar = $(browser).scrollTop() + $('body').height() * 0.1 + 'px';
            $('.modalWindow').css('marginTop',scrollVar);
        }          
    })
    //-------------------------------------------------------------
    //------Zoom page------------------------------------------
    var heightPage = $('body').height();
    $('#zoomPage').css('height',heightPage);
    
    $('#size').click(function(){
           $('#zoomPage').css('display','block');
           $('body').css('cursor','zoom-in');
    })
    
    $('#zoomPage').click(function(event){ 
        if(zoom == true){
            var zoomX = event.pageX + 'px';
            var zoomY = event.pageY + 'px';
            $('html').css({transformOrigin: zoomX + ' ' + zoomY,transform: "scale(2)"});
            $('body').css('cursor','zoom-out');
            zoom = false;
        }
        else
        {
            $('#zoomPage').css('display','none');
            $('html').css({transform: "scale(1)"});
            $('body').css('cursor','auto');
            zoom = true;
        }
    })
    //----------------------------------------------------
    $('.menu').mousedown(function(){
        $(this).css('color','rgb(181,178,178)');
    })
    
    $('.menu_back').mousedown(function(){
        $('#back').css('color','rgb(181,178,178)');
        $('#arrow').attr('src','img/back_click.png');
    })
    
    $('.menu').mouseup(function(){
        $(this).css('color','black');
    })
    
    $('.menu_back').mouseup(function(){
        $('#back').css('color','black');
        $('#arrow').attr('src','img/back_hover.png');
    })
    

}
//------------------------------------------
function bodyHtml(){
        var ua = navigator.userAgent;
        if ((ua.search(/Chrome/) > 0) || (ua.search(/Safari/) > 0))
            return 'body';
        else 
            return 'html';
}

function hoverOver(handler,newColor){
    handler.style.color = newColor;
}
   
function hoverOut(handler,newColor){
    handler.style.color = newColor;
}

function menuBackOver(){
    var imgBack = document.getElementById('arrow');
    var spanBack = document.getElementById('back');
    imgBack.src = 'img/back_hover.png';
    spanBack.style.color = 'black';
}

function menuBackOut(){
    var imgBack = document.getElementById('arrow');
    var spanBack = document.getElementById('back');
    imgBack.src = 'img/back.png';
    spanBack.style.color = 'white';
}

function goHome(){
    document.location.href = '/';
}

function soundOnOff(handler){
    if (sound == false) {
        handler.innerHTML = 'on';
        sound = true;
        var song = document.getElementById('audioPage');
        song.pause();
    }
    else
    {
        handler.innerHTML = 'off';
        sound = false;
        var song = document.getElementById('audioPage');
        song.play();
    }
}

    
//Canvas---------------------
function canvasClose(stroke,fill){   
    var handler = document.getElementById("close");
    ctx = handler.getContext('2d');
    handler.width  = 30;
    handler.height = 30;
    ctx.beginPath();
    ctx.clearRect(0, 0, handler.width, handler.height);
    ctx.arc(15,15,10,0,2*Math.PI,false);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.arc(15,15,10,0,2*Math.PI,false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = stroke;
    ctx.stroke();
    ctx.moveTo(11,11);
    ctx.lineTo(19,19); 
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.moveTo(11,19);
    ctx.lineTo(19,11); 
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

function canvasClick(){
    scroll = false;
    stopSend = false;
    confirmSend = false;
    contactsOpen = false;
    $('input[name = "send"]').val("Send");
    $('.wrapper').remove();
};
//-------------------------------------------------------------------------------
//------------------SendInfo-----------------------------------------------------    
function sendBtn(){
    if(confirmSend == false){
        var trimSubject = $.trim($('#subjectBlock').val());
        var trimTo = $.trim($('#toBlock').val());
        var trimMessage = $.trim($('#message').val());
        if (trimSubject == "" || trimTo == "" || trimMessage == ""){
            if (trimSubject == ""){
                $('#subjectBlock').css('color','red');
                $('#subjectBlock').val("Enter data...");
            }
            if (trimTo == ""){
                $('#toBlock').css('color','red');
                $('#toBlock').val("Enter data...");
            }
            if (trimMessage == ""){
                $('#message').css('color','red');
                $('#message').val("Enter data...");
            }
            stopSend = true;
        }
        
        if (document.getElementById('toBlock').style.color != 'red' && document.getElementById('subjectBlock').style.color != 'red' && document.getElementById('message').style.color != 'red')
        {
            stopSend = false;
        }
        
        if (!stopSend){
            $.ajax({
                type: "POST",
                url: "dataBaseWork.php",
                async: true,
                data:{'handler': 'contacts', 'email':$('#toBlock').val(),'subject':$('#subjectBlock').val(),'message':$('#message').val()},
                success: function(){
                    $('.content__form').remove();
                    $('.contacts-container--name').remove();
                    $('#confirm').css('display','block');
                    $('input[name = "send"]').val("Okey");
                    confirmSend = true;
                }
            });  
        }
    }
    else{
        canvasClick();
    }
}

function inputFocus(handler){
    if(stopSend && handler.style.color == 'red'){
        handler.value = '';
        handler.style.color = 'rgba(0, 0, 0, 0.5)';
    }
}
//--------------------------

//Services----------------
function featuredButtonClickStyle(handler){
     if ($(handler).val() == '+'){
        handler.value = '-';
        $(handler).removeClass("featuredButtonTrue");
        $(handler).addClass("featuredButtonFalse");
    }
    else{         
         handler.value = '+';
         $(handler).removeClass("featuredButtonFalse");
         $(handler).addClass("featuredButtonTrue");
        
    }
}

function featuredButtonClick(handler){
    featuredButtonClickStyle(handler);
    updateDataBase(handler.id,'featured',handler.value);   
}

function featuredButtonStyle(){
    $('input[name = "featuredButton"]').each(function(){
        if ($(this).val() == '+'){
            $(this).addClass("featuredButtonTrue");
            
            
        }
        else
        {
            $(this).addClass("featuredButtonFalse");
        }
    })
    
}

function updateDataBase(id,column,value){
    if (column == 'featured')
        if (value == '+')
            value = 1;
        else 
            value = 0;
     id = id.slice(8);//that become id
     $.ajax({
            type: "POST",
            url: "dataBaseWork.php",
            async: false,
            data: {'handler': 'servicesUpdate','id':id,'column':column,'value': value},
            success: function(data){
               console.log(data);
            }
    });
      
}

function modalForm(handler,column,tmpl,heightTextarea){
    servicesOpen = true;
    scroll = true;
    $('body').prepend('<div class = modalBlockPage><div class = "modalWindow"</div></div>');
    var hgt = $(document).height() + 'px';
    $('.modalBlockPage').height(hgt);
    var browser = bodyHtml();
    if($(browser).scrollTop){}
    var scrollVar = $(browser).scrollTop() + $('body').height() * 0.1 + 'px';
    $('.modalWindow').css('marginTop',scrollVar);
    if (tmpl == 'Textarea'){
        var clientData = {value: handler.innerHTML,idButton: handler.id, column: column};
        $('#modalWindowPage').tmpl(clientData).appendTo('.modalWindow');
        $('.modalWindowTextarea').css('height',heightTextarea);
        delete clientData;
    }
    
    if (tmpl == 'Date'){
        var clientData = {Year: handler.innerHTML.slice(0,4),
                          Month: handler.innerHTML.slice(5,7),
                          Day: handler.innerHTML.slice(8,10), idButton: handler.id, column: column};
        $('#modalWindowPageDate').tmpl(clientData).appendTo('.modalWindow');
        delete clientData;
    }  
    
    if (tmpl == 'Image'){
        var clientData = {idButton: handler.id, column: column};
        $('#modalWindowPageImage').tmpl(clientData).appendTo('.modalWindow');
        delete clientData;
    }
    
    if (tmpl == 'Insert'){
       $('#insertPage').tmpl().appendTo('.modalWindow');
    }
    
    if (tmpl == 'Delete'){
       var clientData = {idButton: handler.id};
       $('#deleteRowTmpl').tmpl(clientData).appendTo('.modalWindow');
       delete clientData;
    }
}

function closeModalForm(){
    scroll = false;
    servicesOpen = false;
    $('.modalBlockPage').remove();
}

function saveModalForm(handler){
    if ($('.modalWindowTextarea').val() == ""){
        alert('Please enter data');
        return;
    }
    updateDataBase(handler.id,$('#modalWindowHiddenSpan').html(),$('.modalWindowTextarea').val());
    closeModalForm();
    servicesPageUpdate();
}

function saveModalFormDate(handler){
    regExp = new RegExp('^[0-9]+$');
     if ( !regExp.test($('#Year.modalWindowTable').val()) || !regExp.test($('#Month.modalWindowTable').val()) || !regExp.test($('#Day.modalWindowTable').val())){
        alert('Incorrect data');
        return;
    }
    var valueHandler = $('#Year.modalWindowTable').val() + "-" + $('#Month.modalWindowTable').val() + "-" + $('#Day.modalWindowTable').val();
    updateDataBase(handler.id,$('#modalWindowHiddenSpan').html(),valueHandler);
    delete valueHandler;
    closeModalForm();
    servicesPageUpdate();
}

function servicesPageUpdate(){
    giveArray();
    $('.obshiy_fon').html(
        "<table cellspacing = '0' cellpadding = '4' id = 'servicesTable'></table>"
    );
    

    $("#headingTable").tmpl().appendTo( "#servicesTable" );
    var size = 1;
    for (item in arrayServices){
        size++;
    }
    for(var i = 1; i < size; i++){
        var clientData = {id: arrayServices[i][0], title: arrayServices[i][1],body: arrayServices[i][2],image: arrayServices[i][3], date: arrayServices[i][4],featured: function() {
                     if (arrayServices[i][5] == '1'){
                        return '+';
                     }
                     else{
                        return '-';
                     }
                }
        };
        $("#contentTable").tmpl(clientData).appendTo( "#servicesTable" );
        delete clientData;
    }
     $("#servicesTable").append('<tr><td colspan = "6"><input type = "button" onclick = "modalForm(this,\'\',\'Insert\')"  class = "servicesInsertButton" value = "Insert new data"></td></tr>');
    featuredButtonStyle();
    delete size;
}

function giveArray(){
     $.ajax({
        type: "POST",
        url: "dataBaseWork.php",
        async: false,
        data: {'handler': 'services'},
        success: function(data){
            arrayServices = $.parseJSON(data); 
        }
    });
}


function fileOpen(data){
    document.getElementById("buttonDownloadCopyText").value = data[0].name;
    $('#buttonDownloadCopyText').css('display','block');
}

function saveImg(file){
    var formData = new FormData();
    formData.append('fileImg', file);
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '/upload.php', true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                console.log(xmlhttp.responseText);
            }
        }
    };
    xmlhttp.send(formData);
    delete formData;
}

function saveModalFormImage(handler){
    var file = document.getElementById("modalWindowButtonDownload").files[0];
    saveImg(file);
    var valueHandler = 'img/' + file.name;
    updateDataBase(handler.id,$('#modalWindowHiddenSpan').html(),valueHandler)
    delete valueHandler;
    delete file;
    closeModalForm();
    servicesPageUpdate();
}

function modalWindowButtonDownloadStart(){
    document.getElementById("modalWindowButtonDownload").click();
}

function fileInsertOpen(file){
    if (window.FileReader){
        var reader = new FileReader();
        reader.onload = function(event){
			var the_url = event.target.result;
			$('#servicesInsertImageId').attr('src',the_url)
        }       
        reader.readAsDataURL(file[0]);
    }
    else{
        $('#servicesInsertImageId').attr('src','img/dataDownload.png');
    }
}

function insertServiceNewData(){
    regExp = new RegExp('^[0-9]+$');
    var getImg = document.getElementById("modalWindowButtonDownload");
    var trimTitle = $('#servicesInsertTitle').val();
    var trimBody = $('#servicesInsertBody').val();
    var trimYear = $('#servicesInsertDateYear').val();
    var trimMonth = $('#servicesInsertDateMonth').val();
    var trimDay = $('#servicesInsertDateDay').val();

    if (($.trim(trimTitle) != "") && ($.trim(trimBody) != "") && (getImg.files[0]) && (  $.trim(trimYear) != "") && ( $.trim(trimMonth) != "") && ($.trim(trimDay) != "") && (regExp.test($('#servicesInsertDateYear').val())) && (regExp.test($('#servicesInsertDateMonth').val())) && (regExp.test($('#servicesInsertDateDay').val())) && ($('#servicesInsertDateMonth').val() > 0) && ($('#servicesInsertDateMonth').val() <= 12) && ($('#servicesInsertDateDay').val() > 0) && ($('#servicesInsertDateDay').val() <= 31)){
        var insertDate = $('#servicesInsertDateYear').val() + '-' + $('#servicesInsertDateMonth').val() + '-' + $('#servicesInsertDateDay').val();
        saveImg(getImg.files[0]);//saveImage in server
        
        var featuredVar;
        if ($('#insertFeaturedButton').val() == '+')
            featuredVar = 1;
        else    
            featuredVar = 0;
        //send data to server
        $.ajax({
            type: "POST",
            url: "dataBaseWork.php",
            async: false,
            data: {'handler': 'servicesInsert','titleVar':$('#servicesInsertTitle').val(),'bodyVar':$('#servicesInsertBody').val(),'imgName': getImg.files[0].name, 'dateVar': insertDate, 'featuredVar': featuredVar},
            success: function(data){
               console.log(data);
            }
        });
        
        closeModalForm();
        servicesPageUpdate();
    }
    else {
        alert('Enter All Data');
    }
}

function deleteRowClick(handler){
    id = handler.id.slice(8);
    $.ajax({
        type: "POST",
        url: "dataBaseWork.php",
        async: false,
        data: {'handler': 'deleteRow','id': id},
        success: function(data){
           console.log(data);
        }
    });
    closeModalForm();
    servicesPageUpdate();
}


