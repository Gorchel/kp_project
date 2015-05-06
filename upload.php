<?php
        if(is_uploaded_file($_FILES["fileImg"]["tmp_name"]))
    {
        move_uploaded_file($_FILES["fileImg"]["tmp_name"], "img/".$_FILES["fileImg"]["name"]);
    } else {
        echo("Ошибка загрузки файла");
    }
?>
