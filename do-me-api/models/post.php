<?php
    class Post{
        protected $pdo;

        public function __construct(\PDO $pdo){
            $this->pdo = $pdo;
        }

        public function add_todo($d){
            $sql = "INSERT INTO todos (user_id, todo_title, todo_description, todo_date, todo_time, priority) VALUES (?, ?, ?, ?, ?, ?)";
            $sql = $this->pdo->prepare($sql);

            $sql->execute([
                $d->user_id,
                $d->todo_title,
                $d->todo_description,
                $d->todo_date,
                $d->todo_time,
                $d->priority
            ]);

            $count = $sql->rowCount();

            if($count){
                return array("data"=>"Successfully Insert $count record(s)");
            }
            else{
                return array("error"=>"No Record inserted");
            }
        }

        public function update_todo($d){
            $sql = "UPDATE todos SET todo_title = '$d->todo_title', todo_description = '$d->todo_description', todo_date = '$d->todo_date', todo_time = '$d->todo_time', priority = '$d->priority' WHERE todo_id = '$d->todo_id' AND user_id = '$d->user_id'";
            $sql = $this->pdo->prepare($sql);
    
            #execute the query
            $sql->execute([]);
    
            #count affected rows
            $count = $sql->rowCount();
    
            if($count){
                return array("data"=>"Successfully Updated $count row(s)");
            }
            else{
                return array("error"=>"No Record updated");
            }
        }

    public function delete_todo($d){
        $sql = "DELETE FROM todos WHERE todo_id = '$d->todo_id' AND user_id = '$d->user_id'";
        $sql = $this->pdo->prepare($sql);

        #execute the query
        $sql->execute();

        #count affected rows
        $count = $sql->rowCount();

        if($count){
            return array("data"=>"Successfully Deleted $count row(s)");
        }
        else{
            return array("error"=>"No Record deleted)");
        }
    }

    public function complete_todo($d){
        $sql = "INSERT INTO archives (todo_id, user_id, todo_title, todo_description, todo_date, todo_time, priority, todo_dateCompleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $sql = $this->pdo->prepare($sql);

        $sql->execute([
            $d->todo_id,
            $d->user_id,
            $d->todo_title,
            $d->todo_description,
            $d->todo_date,
            $d->todo_time,
            $d->priority,
            $d->todo_dateCompleted
        ]);

        $removeDo = "DELETE FROM todos WHERE todo_id = '$d->todo_id' AND user_id = '$d->user_id'";
        $removeDo = $this->pdo->prepare($removeDo);

        #execute the query
        $removeDo->execute();
        
        $count = $sql->rowCount();

        if($count){
          return array("data"=>"Successfully done, Inserted $count record(s)");
      }
      else{
          return array("error"=>"No Record inserted");
      }
    }

    public function update_info($d){
        $sql = "UPDATE users SET fullname = '$d->fullname', email = '$d->email', birthdate = '$d->birthdate' WHERE user_id = '$d->user_id'";

        $sql = $this->pdo->prepare($sql);

        #execute the query
        $sql->execute([]);

        #count affected rows
        $count = $sql->rowCount();

        if($count){
            return array("data"=>"Successfully Updated $count row(s)");
        }
        else{
            return array("error"=>"No Record updated");
        }
    }

    public function update_password($d){
        $sql = "UPDATE users SET password = '$d->password' WHERE user_id = '$d->user_id'";
        $sql = $this->pdo->prepare($sql);

        $sql->execute([]);

        $count = $sql->rowCount();

        if($count){
            return array("data"=>"Successfully Updated $count row(s)");
            }
        else{
            return array("error"=>"No Record updated");
        }
    }
}
?>
