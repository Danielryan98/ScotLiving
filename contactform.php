<?php

if(isset($_POST['submit'])){
    $name = $_POST['name'];
    $mailFrom = $_POST['email'];
    $phoneNumber = $_POST['phonenumber'];

    $subject = "New call back request";
    $mailTo = "DannyR2K9@hotmail.co.uk"; //cant use gmail
    $headers = "From: ".$mailFrom;
    $txt = "New call back request.\n".$name."\n".$phoneMumber;

    mail($mailTo, $subject, $txt, $headers);
    header("Location: index.html?mailsent");
}