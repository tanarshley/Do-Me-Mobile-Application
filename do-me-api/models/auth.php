<?php
  class Auth{
    protected $pdo;

    public function __construct(\PDO $pdo){
      $this->pdo = $pdo;
    }

    public function signup($d){
      $d = file_get_contents('php://input');
      if(isset($d)){
        $request = json_decode($d);
        $inputEmail = $request->email;
      }

      $sql = "SELECT * FROM users WHERE email = '$inputEmail' LIMIT 1";

      if ($result = $this->pdo->query($sql)->fetchall()){
          return array("error"=>"Email is already used. Try another email.");
      }
      else {
          $sql = "INSERT INTO users (fullname, email, birthdate, password) VALUES (?, ?, ?, ?)";
          $sql = $this->pdo->prepare($sql);

          $sql->execute([
              $request->fullname,
              $request->email,
              $request->birthdate,
              $request->password
          ]);
          return array("data"=>"Registration Successful!");
      }
    }

    public function login($d){
      $d = file_get_contents('php://input');
      if(isset($d)){
        $request = json_decode($d);
        $userEmail = $request->email;
        $userPassword = $request->password;
      }

      $sql = "SELECT * FROM users WHERE email = '$userEmail' AND password = '$userPassword' LIMIT 1";

      if($res = $this->pdo->query($sql)->fetchAll()) {
    
        return array("data"=>array("user_id"=>$res[0]['user_id'], "fullname"=>$res[0]['fullname'], "email"=>$res[0]['email'], "birthdate"=>$res[0]['birthdate'], "password"=>$res[0]['password']));
        } else {

        return array("error"=>"Incorrect username or password");
    }
    }
  }
?>
