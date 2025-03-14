<?php declare(strict_types=1);

$db_config['SGBD'] = 'mysql';
$db_config['HOST'] = 'devbdd.iutmetz.univ-lorraine.fr';
$db_config['DB_NAME'] = 'laroche5_pm2';
$db_config['USER'] = 'laroche5_appli';
$db_config['PASSWORD'] = '*******************';


try {
    $db = new PDO( $db_config['SGBD'].':host='.$db_config['HOST'].';dbname='.$db_config['DB_NAME'],
    $db_config['USER'], $db_config['PASSWORD'],
    array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));

    // permet d’afficher les caractères utf8 si la BdD est définie en utf8 (accents...)
    unset($db_config);

} catch( Exception $exception ) {

    die($exception->getMessage());
}
?>
