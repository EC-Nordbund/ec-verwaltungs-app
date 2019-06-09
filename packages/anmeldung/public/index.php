<?php

if(!isset($_GET['token'])) {
  $_GET['token'] = '';
}

$token = (string)$_GET['token'];
$vid = (int)$_GET['vid'];

$mysqli = new mysqli("ec-nordbund.de", "d026b254", "HFBRVrwEWtx6fKTR", "d026b254");

$mysqli->set_charset("utf8");
$token = $mysqli->real_escape_string($token);
$vid = $mysqli->real_escape_string($vid);

// echo "Token: '$token' <br>";
// echo "VID: '$vid'";

if ($mysqli->connect_errno) {
  printf("Connect failed: %s\n", $mysqli->connect_error);
  exit();
}
// echo "SELECT * FROM _anmeldung_config WHERE vid = '$vid' AND token = '$token'";
if ($result = $mysqli->query("SELECT * FROM _anmeldung_config WHERE vid = '$vid' AND token = '$token'")) {
  if(!$row = $result->fetch_row()){
    die('Invalide Parameter');
  }
  $position = $row[2];
  $js = $row[3];

  ?>
  <!DOCTYPE html>
  <html lang="de">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons">
      <script src="/js/plzs.js"></script>
      <script>
        window.$options = <?=$js?>;
        window.$rolle = <?=$position?>;
        // window.onload = function () {
        //   window.show();
        // }
      </script>
    </head>
    <body>
      <noscript>
        <strong>We're sorry but anmeldung-new doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
      </noscript>
      <div id="anmeldung"></div>
    </body>
  </html>
  <?php
} else {
  die('Fehler bei Query');
}
