<?php
    class Get{
        protected $pdo;

        public function __construct(\PDO $pdo){
            $this->pdo = $pdo;
        }

        public function get_userData($d){
            $d = file_get_contents('php://input');
            if(isset($d)){
              $request = json_decode($d);
              $userFullname = $request->fullname;
              $userEmail = $request->email;
              $userBirthdate = $request->birthdate;
              $userPassword = $request->password;
            }
            $data = [];

            $sql = "SELECT * FROM users WHERE user_id='$d->user_id'";

            if($res = $this->pdo->query($sql)->fetchAll()) {
                
                foreach ($res as $record) {
					array_push($data, $record);
				}
				return array("data"=>$data);
            }
            
            else {
                return array("error"=>"No data detected");
            } 
        }

        public function get_todos($d){
            $d = file_get_contents('php://input');
            if(isset($d)){
              $request = json_decode($d);
              $req_user_id = $request->user_id;
            }
            $data = [];

            $sql = "SELECT * FROM todos WHERE user_id = '$request->user_id' ORDER BY todo_id DESC";

            if($res = $this->pdo->query($sql)->fetchAll()) {
                
                foreach ($res as $record) {
					array_push($data, $record);
				}
				return array("data"=>$data);
            }
            
            else {
                return array("error"=>"No data detected");
            } 
        }

        public function get_low_priority($d){
            $d = file_get_contents('php://input');
            if(isset($d)){
              $request = json_decode($d);
              $req_user_id = $request->user_id;
            }
            $data = [];

            $sql = "SELECT * FROM todos WHERE user_id='$request->user_id' AND priority='Low'";

            if($res = $this->pdo->query($sql)->fetchAll()) {
                
                foreach ($res as $record) {
                    array_push($data, $record);
                }
                return array("data"=>$data);
            }
                
            else {
                return array("error"=>"No data detected");
            }
        }

        public function get_medium_priority($d){
            $d = file_get_contents('php://input');
            if(isset($d)){
              $request = json_decode($d);
              $req_user_id = $request->user_id;
            }
            $data = [];

            $sql = "SELECT * FROM todos WHERE user_id='$request->user_id' AND priority='Medium'";

            if($res = $this->pdo->query($sql)->fetchAll()) {
                
                foreach ($res as $record) {
                    array_push($data, $record);
                }
                return array("data"=>$data);
            }
                
            else {
                return array("error"=>"No data detected");
            }
        }

        public function get_high_priority($d){
            $d = file_get_contents('php://input');
            if(isset($d)){
              $request = json_decode($d);
              $req_user_id = $request->user_id;
            }
            $data = [];

            $sql = "SELECT * FROM todos WHERE user_id='$request->user_id' AND priority='High'";

            if($res = $this->pdo->query($sql)->fetchAll()) {
                
                foreach ($res as $record) {
                    array_push($data, $record);
                }
                return array("data"=>$data);
            }
                
            else {
                return array("error"=>"No data detected");
            }
        }

        public function get_archives($d){
            $d = file_get_contents('php://input');
            if(isset($d)){
              $request = json_decode($d);
              $req_user_id = $request->user_id;
            }
            $data = [];
            $sql = "SELECT * FROM archives WHERE user_id='$request->user_id' ORDER BY archive_id DESC";

            if($res = $this->pdo->query($sql)->fetchAll()) {

                foreach($res as $record) {
                    array_push($data, $record);
                }
                return array("data"=>$data);
            }
            else {
                return array("error"=>"No data detected");
            }
        }
    }
?>