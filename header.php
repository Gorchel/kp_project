<!DOCTYPE html>
<html>
    <meta charsset="utf-8">
<title>KP</title>  
<head>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" type="text/css" href="styleContacts.css">
    <link rel="stylesheet" type="text/css" href="styleServices.css">
    <script type="text/javascript" src="java/jquery-2.1.3.min.js"></script>
    <script type="text/javascript" src="java/jquery.tmpl.js"></script>
    <script type="text/javascript" src="java/script.js"></script>
    <!------------------------------------------------------------------------------>
    <script id='indexFeaturedTmpl' type='x-jquery-tmpl'> 
        <div class="inline_block_1">
             <img class = 'servicesImage' src=${img}></br>
             <li id="punkt" type="circle"> <span id="red">${title}</span> </li>
             <p class="paragraf_inline">
                 ${body}
             </p>
        </div>
    </script>
    <!----------------------------------------------------------------------------->  
    <!---------------------------------------------------------------------------- --> 
    <script id='headingTable' type='x-jquery-tmpl'>       
            <tr>
                <th class = 'tableServices' id = 'titleThServices'><h3>Title</h3></th>
                <th class = 'tableServices' id = 'bodyThServices'><h3>Body</h3></th>
                <th class = 'tableServices' id = 'imgThServices'><h3>Image</h3></th>
                <th class = 'tableServices' id = 'createdThServices'><h3>Date</h3></th>
                <th class = 'tableServices' id = 'featuredThServices' colspan='2'><h3>Featured</h3></th>
            </tr>
    </script>
    <script id="contentTable" type="x-jquery-tmpl">
        <tr>
            <td class = 'tableServices' id = 'titleServices'><p id = 'Title_${id}' class = 'servicesTitleParagraf' onclick = 'modalForm(this,"title","Textarea","30px")'>${title}</p></td>
            <td class = 'tableServices' id = 'bodyServices'><p id = 'Body__${id}' onclick = 'modalForm(this,"body","Textarea","100px")' class = 'servicesBodyDate' id = 'id__Body${id}'>${body}</p></td>
            <td class = 'tableServices'>
                <p class = 'servicesImageBlock'>
                    <img class = "servicesImage" onclick = 'modalForm(this,"image","Image")' id = 'Image_${id}' src = ${image}>                
                </p>
            </td>
            <td class = 'tableServices' id = 'createdServices'>
                <p class = 'servicesBodyDate' id = 'Date__${id}' onclick = 'modalForm(this,"created","Date")'>${date}</p>
            </td>
            <td class = 'tableServices' id = 'featuredServices'>
                <form class = 'featuredForm'>
                <input type = 'button' name = 'featuredButton' id = 'idButton${id}' onclick = 'featuredButtonClick(this)' value = ${featured}>
                </form>
            </td>
            <td class = 'tableServices' id ="deleteServicesRowTd">
                 <div onclick = "modalForm(this,'delete','Delete')" class = "deleteServicesRow" id = 'idDelete${id}'></div>
            </td>
        </tr>
    </script>
    <!---------------------------------------------------------------------------- -->
    <!---------------------------------------------------------------------------- -->
    <script id="modalWindowPage" type="x-jquery-tmpl">
        <span id = "modalWindowHiddenSpan">${column}</span>
        <h3>Enter data</h3>
        <textarea class = 'modalWindowTextarea'>${value}</textarea><br/>
        <input type = 'button' class = 'modalWindowButton' id = 'id${idButton}' name = 'EnterData' onclick = "saveModalForm(this)" value = 'Save'>
        <input type = 'button' class = 'modalWindowButton' name = 'ClosePage' onclick = "closeModalForm()" value = 'Close'>
    </script>
     <!---------------------------------------------------------------------------- -->
         <!---------------------------------------------------------------------------- -->
    <script id="modalWindowPageDate" type="x-jquery-tmpl">
        <span id = "modalWindowHiddenSpan">${column}</span>
        <h3>Enter data</h3>
        <table id = "modalWindowTable">
            <tr>
                <th class = "modalWindowTable">Year</th>
                <th class = "modalWindowTable">Month</th>
                <th class = "modalWindowTable">Day</th>
            </tr>
            <tr>
                <td><input class = "modalWindowTable" id = "Year" type = 'text' value = ${Year}></td>
                <td><input class = "modalWindowTable" id = "Month" type = 'text' value = ${Month}></td>
                <td><input class = "modalWindowTable" id = "Day" type = 'text' value = ${Day}></td>
            </tr>
        </table>
        <input type = 'button' class = 'modalWindowButton' id = 'id${idButton}' name = 'EnterData' onclick = "saveModalFormDate(this)" value = 'Save'>
        <input type = 'button' class = 'modalWindowButton' name = 'ClosePage' onclick = "closeModalForm()" value = 'Close'>
    </script>
     <!---------------------------------------------------------------------------- -->
    <script id="modalWindowPageImage" type="x-jquery-tmpl">
        <span id = "modalWindowHiddenSpan">${column}</span><br/>
        <h3>Choose file</h3>
        <input type= 'button' id='buttonDownloadCopy' onclick='modalWindowButtonDownloadStart()' value='Choose file'>
                        <br/>
        <input type= 'text' id='buttonDownloadCopyText'>            
        <input type = 'file' name = 'uploadfile' accept="image/jpeg,image/png" onchange='fileOpen(this.files)' id = 'modalWindowButtonDownload'>          
                        <br/>           
        <input type = 'button' class = 'modalWindowButton' id = 'id${idButton}' name = 'EnterData' onclick = "saveModalFormImage(this)" value = 'Save'>
        <input type = 'button' class = 'modalWindowButton' name = 'ClosePage' onclick = "closeModalForm()" value = 'Close'>   
    </script>
    <!------------------------------------------------------------------------------>
    <script id="insertPage" type="x-jquery-tmpl">
        <span class = "servicesInsertSpan">Enter title</span>
        <textarea id="servicesInsertTitle"></textarea><br/>
        <br/><p class="line" id = 'insertLine'></p>
        
        <span class = "servicesInsertSpan">Enter body</span>
        <textarea id="servicesInsertBody"></textarea><br/>
        <br/><p class="line" id = 'insertLine'></p>
        
        <span class = "servicesInsertSpan">Choose image</span>
        <input type = 'file' name = 'uploadfile' accept="image/jpeg,image/png" onchange='fileInsertOpen(this.files)' id = 'modalWindowButtonDownload'> 
        <p class = "servicesInsertImage" onclick = "modalWindowButtonDownloadStart()">
            <img class = "servicesInsertImage" id = "servicesInsertImageId"><br/> 
        </p>  
        <br/><p class="line" id = 'insertLine'></p>   
        
        <span class = "servicesInsertSpan">Enter data</span>
        <table>
            <tr>
                <th>Year</th>
                <th>Month</th>
                <th>Day</th>
            </tr>
            <tr>
                <td><input id="servicesInsertDateYear" class = "serviceInsertText" type='text' maxlength = '4'></td>
                <td><input id="servicesInsertDateMonth" class = "serviceInsertText" type='text' maxlength = '2'></td>
                <td><input id="servicesInsertDateDay" class = "serviceInsertText" type='text' maxlength = '2'></td>
            </tr>
        </table><br/>
        <br/><p class="line" id = 'insertLine'></p>
        
        <span class = "servicesInsertSpan">Choose featured</span>
        <form class = 'featuredForm'>
            <input type = 'button' id = "insertFeaturedButton" name = 'featuredButton' class = "featuredButtonTrue" onclick = "featuredButtonClickStyle(this)" value = '+'>
        </form><br/><br/>
        <br/><p class="line" id = 'insertLine'></p><br/>
        
        <input type = 'button' class = 'modalWindowButton' value = 'Save' onclick = "insertServiceNewData()">
        <input type = 'button' class = 'modalWindowButton' onclick = "closeModalForm()" value = 'Close'>
    </script>
    <!------------------------------------------------------------------------------>
    <script id="deleteRowTmpl" type="x-jquery-tmpl">
        <br/>
        <h3>Are you sure?</h3>
        <input type = 'button' class = 'modalWindowButton' id = '${idButton}' value = 'Ok' onclick = "deleteRowClick(this)">
        <input type = 'button' class = 'modalWindowButton' onclick = "closeModalForm()" value = 'Close'>
    </script>

</head>

<body>
    <div id = "zoomPage"></div>
    <audio id = "audioPage" src="mp3/audio.mp3" type="audio/mpeg" loop></audio>
    <div class="verhnyaya_stroka"></div>
    <header>
                <img class="header_page" src="img/header_1.jpg">
                <p id="container_1"><a onmouseover = "hoverOver(this,'grey')" onmouseout = "hoverOut(this,'black')" href = "/">integro</a></p>
                <p id="container_2">PREMIUM SERVICE</p>
                <img class="header_panel" id="home" src="img/header_home.jpg" onclick = "goHome()">
                <img class="header_panel" id="window" src="img/header_window.jpg">
                <img class="header_panel" id="size" src="img/header_size.jpg">
    </header>