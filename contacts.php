
<div class = "wrapper">
        <div class="contacts-container">
             <div class="contacts-container--name">
                <p> To:</p>
                <p style = "margin-top: 25px"> Subject:</p>
                <p style = "margin-top: 25px"> Message:</p>
             </div>
             <form class="content__form">
                <input class="contacts__input" id = "toBlock" name="to" onfocus = "inputFocus(this)">
                </br>
                <input class="contacts__input" id = "subjectBlock" name="subject" onfocus = "inputFocus(this)">
                </br>	
                <textarea class = "contacts__input" id = "message" onfocus = "inputFocus(this)"></textarea>
             </form>
                </br>
             <form>
                 <p id = "confirm">Data send...</p>
                 <input type="button" onclick = "sendBtn()" name="send" value="Send">	
             </form>
        </div>
        <canvas id='close' onmouseout = "canvasClose('#B5B0B0','#FFFFC2')" onmouseover = "canvasClose('black','#FFFFC2')" onmousedown =     "canvasClose('black','white')" onmouseup = "canvasClose('black','#FFFFC2')" onclick = "canvasClick()"> 
        </canvas>
</div>