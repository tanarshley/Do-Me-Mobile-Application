<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Credentials: true');
  header("Content-type: text/html; charset=utf-8");
  header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
  header("Access-Control-Allow-Method: POST");
  header("Access-Control-Max-Age: 3600");
  set_time_limit(1000);

  define ('DB_HOST', 'localhost');
  define ('DB_USER', 'root');
  define ('DB_PASS', '');
  define ('DB_NAME', 'do_me_db');
  define ('DB_CHARSET', 'utf8');

  class Connection {
    protected $conn = "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=".DB_CHARSET;
    protected $options =
    [
      \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
      \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
      \PDO::ATTR_EMULATE_PREPARES => false,
    ];

    public function connect() {
      return new PDO($this->conn, DB_USER, DB_PASS, $this->options);
    }
  }
?>
