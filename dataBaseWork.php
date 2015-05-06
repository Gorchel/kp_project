<?php
    if ($_POST[handler] == 'contacts'){
        $host = 'localhost';
        $user = 'root';
        $pass = '';
        $bdname = 'kpdatabase';
        $table = 'Contacts';
        $link = @mysql_connect($host,$user,$pass) or die("Could not connect to MySQL server!");
        mysql_select_db($bdname);    
        mysql_set_charset('utf8');
        mysql_query("INSERT INTO $table (email, subject, message) VALUES ('$_POST[email]','$_POST[subject]','$_POST[message]')");
        mysql_close($link);
        unset($link);
    }
    
    if ($_POST[handler] == 'services'){
        $host = 'localhost';
        $user = 'root';
        $pass = '';
        $bdname = 'kpdatabase';
        $table = 'Services';
        $link = @mysql_connect($host,$user,$pass) or die("Could not connect to MySQL server!");
        mysql_select_db($bdname);    
        mysql_set_charset('utf8');
        $result = mysql_query("SELECT * FROM $table ORDER by created DESC" );
        $counter = 1;
        while ($line = mysql_fetch_assoc($result)) {
            $myArray[$counter][0] = $line['id'];
            $myArray[$counter][1] = $line['title'];
            $myArray[$counter][2] = $line['body'];
            $myArray[$counter][3] = $line['image'];
            $myArray[$counter][4] = $line['created'];
            $myArray[$counter][5] = $line['featured'];
            $counter++;
        }
        echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
            mysql_free_result($result);
            mysql_close($link);
        unset($link);
    }
    
    if ($_POST[handler] == 'servicesUpdate'){
        $host = 'localhost';
        $user = 'root';
        $pass = '';
        $bdname = 'kpdatabase';
        $table = 'Services';
        $column = $_POST[column];
        $value = $_POST[value];
        $id_table = $_POST[id];
        $link = new mysqli($host, $user, $pass, $bdname);
        if ($link->connect_errno) {
            echo "Не удалось подключиться к MySQL: (" . $link->connect_errno . ") " . $link->connect_error;
        }
        $link->query("UPDATE $table SET $column = '$value' WHERE `id` = '$id_table'", MYSQLI_USE_RESULT) or die(mysqli_error($link));
        mysqli_close($link);
        unset($link);
    }
    
     if ($_POST[handler] == 'servicesInsert'){
        $imgVar = "img/".$_POST[imgName];
        $titlevar = $_POST[titleVar];
        $bodyvar = $_POST[bodyVar];
        $datevar = $_POST[dateVar];
        $featuredVar = $_POST[featuredVar];
        $host = 'localhost';
        $user = 'root';
        $pass = '';
        $bdname = 'kpdatabase';
        $table = 'Services';
        $link = new mysqli($host, $user, $pass, $bdname);
        if ($link->connect_errno) {
            echo "Не удалось подключиться к MySQL: (" . $link->connect_errno . ") " . $link->connect_error;
        }
        $link->query("INSERT INTO $table (title,body,image,created,featured) VALUES ('$titlevar','$bodyvar','$imgVar','$datevar','$featuredVar')", MYSQLI_USE_RESULT) or die(mysqli_error($link));
        mysqli_close($link);
        unset($link);
     }
     
     if ($_POST[handler] == 'deleteRow'){
        $id = $_POST[id];
        $host = 'localhost';
        $user = 'root';
        $pass = '';
        $bdname = 'kpdatabase';
        $table = 'Services';
        $link = new mysqli($host, $user, $pass, $bdname);
        if ($link->connect_errno) {
            echo "Не удалось подключиться к MySQL: (" . $link->connect_errno . ") " . $link->connect_error;
        }
        $link->query("DELETE FROM $table WHERE `id` = '$id'", MYSQLI_USE_RESULT) or die(mysqli_error($link));
        mysqli_close($link);
        unset($link);
     }
     
     if ($_POST[handler] == 'indexFeatured'){
        $host = 'localhost';
        $user = 'root';
        $pass = '';
        $bdname = 'kpdatabase';
        $table = 'Services';
        $link = new mysqli($host, $user, $pass, $bdname);
        if ($link->connect_errno) {
            echo "Не удалось подключиться к MySQL: (" . $link->connect_errno . ") " . $link->connect_error;
        }
        $result = $link->query("SELECT * FROM $table WHERE featured = '1' ORDER by created DESC",MYSQLI_USE_RESULT) or die(mysqli_error($link));
        $counter = 1;
        while ($line = $result->fetch_assoc()) {
            $myArray[$counter][0] = $line['id'];
            $myArray[$counter][1] = $line['title'];
            $myArray[$counter][2] = $line['body'];
            $myArray[$counter][3] = $line['image'];
            $myArray[$counter][4] = $line['created'];
            $myArray[$counter][5] = $line['featured'];
            $counter++;
        }
        echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
        mysqli_free_result($result);
        mysqli_close($link);
        unset($link);
     }
     
?>