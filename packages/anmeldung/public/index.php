<?php
$mysqli = new mysqli("ec-nordbund.de", "d026b254", "HFBRVrwEWtx6fKTR", "d026b254");
$mysqli->set_charset("utf8");

if ($mysqli->connect_errno) {
  printf("Connect failed: %s\n", $mysqli->connect_error);
  exit();
}


if (isset($_GET['content'])) {
  $data = json_decode($_GET['content']);
  if(isset($data['person']) && isset($data['kontakt']) && isset($data['sonstiges']) && isset($data['datenschutz'])) {
    if(isset($data['datenschutz']['dsgvo'])) {
      if($data['datenschutz']['dsgvo']) {
        if(
          isset($data['person']['vorname']) &&
          isset($data['person']['nachname']) &&
          isset($data['person']['gebDat']) &&
          isset($data['person']['geschlecht']) && 
          isset($data['kontakt']['adresse']) && 
          isset($data['kontakt']['telefon']) && 
          isset($data['kontakt']['mail']) &&
          isset($data['sonstiges']['vegetarisch']) && 
          isset($data['sonstiges']['lebensmittelunvertraeglichkeiten']) && 
          isset($data['sonstiges']['gesundheitsinformationen']) && 
          isset($data['sonstiges']['bemerkungen'])
        ) {
          $g_split = explode("-", $data['person']['gebDat']);

          if(
            count($g_split) == 3 &&
            strlen($g_split[0] == 4) &&
            strlen($g_split[1] == 2) &&
            strlen($g_split[2] == 2) &&
            is_numeric($g_split[0]) &&
            is_numeric($g_split[1]) &&
            is_numeric($g_split[2]) &&
            strlen($data['person']['vorname'])>0 &&
            strlen($data['person']['vorname'])<=50 &&
            strlen($data['person']['nachname'])>0 &&
            strlen($data['person']['nachname'])<=50 &&
            strlen($data['kontakt']['mail'])>0 &&
            strlen($data['kontakt']['mail'])<=50 &&
            strlen($data['kontakt']['telefon'])>0 &&
            strlen($data['kontakt']['telefon'])<=20 &&
            is_numeric($data['kontakt']['telefon']) &&
            strlen($data['sonstiges']['lebensmittelunvertraeglichkeiten'])<=500 &&
            strlen($data['sonstiges']['gesundheitsinformationen'])<=5000 &&
            strlen($data['sonstiges']['bemerkungen'])<=500 &&
            (
              $data['person']['geschlecht'] == 'w' ||
              $data['person']['geschlecht'] == 'm'
            )
          ) {
            if(
              strlen($data['kontakt']['adresse']['strasse'])>0 &&
              strlen($data['kontakt']['adresse']['strasse'])<=50 &&
              strlen($data['kontakt']['adresse']['ort'])>0 &&
              strlen($data['kontakt']['adresse']['ort'])<=50 &&
              is_numeric($data['kontakt']['adresse']['plz']) &&
              strlen($data['kontakt']['adresse']['plz'])==5
            ) {
              $vorname = $data['person']['vorname'];
              $nachname = $data['person']['nachname'];
              $gebDat = $data['person']['gebDat'];
              $geschlecht = $data['person']['geschlecht'];

              $strasse = $data['kontakt']['adresse']['strasse'];
              $plz = $data['kontakt']['adresse']['ort'];
              $ort = $data['kontakt']['adresse']['plz'];

              $telefon = $data['kontakt']['telefon'];
              $mail = $data['kontakt']['mail'];

              $vegetarisch = $data['sonstiges']['vegetarisch'];
              $lebensmittelunvertraeglichkeiten = $data['sonstiges']['lebensmittelunvertraeglichkeiten'];
              $gesundheitsinformationen = $data['sonstiges']['gesundheitsinformationen'];
              $bemerkungen = $data['sonstiges']['bemerkungen']; 

              $token = (string)$_GET['token'];
              $vid = (int)$_GET['vid'];
              $token = $mysqli->real_escape_string($token);
              $vid = $mysqli->real_escape_string($vid);
              
              if ($result = $mysqli->query("SELECT * FROM _anmeldung_config WHERE vid = '$vid' AND token = '$token'")) {
                if(!$row = $result->fetch_row()){
                  die("{\"error\": \"Daten fehlerhaft.\"}");
                }
                $position = $row[2];

                // Handle extra fields {erlaubnisse, Zustimmungen die u.u. da sind und EXTRA fields im stepper extra}

              } else {
                die("{\"error\": \"Daten fehlerhaft.\"}");
              }
            } else {
              die("{\"error\": \"Daten nicht valid.\"}");    
            }
          } else {
            die("{\"error\": \"Daten nicht valid.\"}");  
          }
        } else {
          die("{\"error\": \"Daten fehlerhaft.\"}");  
        }
      } else {
        die("{\"error\": \"Speicherzustimmung fehlt (DSGVO).\"}");
      }
    } else {
      die("{\"error\": \"Daten fehlerhaft.\"}");  
    }
  } else {
    die("{\"error\": \"Daten fehlerhaft.\"}");
  }
  die();
}

if (isset($_GET['confirmToken'])) {

  die();
}


// Show Anmeldeform

if(!isset($_GET['token'])) {
  $_GET['token'] = '';
}

if(!isset($_GET['prev'])) {
  $_GET['prev'] = '';
}

$prev = $_GET['prev'];
$token = (string)$_GET['token'];
$vid = (int)$_GET['vid'];
$token = $mysqli->real_escape_string($token);
$vid = $mysqli->real_escape_string($vid);

if ($result = $mysqli->query("SELECT * FROM _anmeldung_config WHERE vid = '$vid' AND token = '$token'")) {
  if(!$row = $result->fetch_row()){
    die('Invalide Parameter');
  }
  $position = $row[2];
  $js = $row[3];

  if ($result = $mysqli->query("SELECT bezeichnung FROM veranstaltungen WHERE veranstaltungsID = '$vid'")) {
    if(!$row = $result->fetch_row()){
      die('Invalide Parameter');
    }
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
          window.$prev = '<?=$prev?>';
          window.$token = '<?=$token?>';
          window.$vid = <?=$vid?>;
          
          if(window.$rolle>0) {
            window.$options.title += ` <?=$row[0]?> (${['', '', 'Mitarbeiter', 'Küchenmitarbeiter', 'Küchenleitung', 'Leitung', 'Hauptleitung'][window.$rolle]})`
          }
        </script>
      </head>
      <body>
        <noscript>
          <strong>
            Hallo,
            <p>du hast JavaScript deaktiviert oder nutzt einen Browser der kein JavaScript versteht. Bitte schalte JavaScript an bzw. wechsle den Browser um dich anmelden zu können!</p>
          </strong>
        </noscript>
        <div id="anmeldung">
          Lade...<br>
          Sollte das Laden mehrere Minuten dauern unterstützen wir deinen Browser nicht.<br>
          Nutzt du nicht Internet Explorer 10 oder älter würde es uns helfen wenn du uns <a href="malto:datenschutz@ec-nordbund.de">informierst</a> welchen Browser du genau nutzt. Wir überprüfen dann ob wir den Browser unterstützen können. Überprüfe bitte vorher ob du die aktuellste Version deines Browsers nutzt.
        </div>
        <!-- Hier müssen die Build files injected werden. -->
      </body>
    </html>
    <?php
  }
} else {
  die('Fehler bei Query');
}
