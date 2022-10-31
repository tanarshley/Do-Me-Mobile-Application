<?php
require_once ("./config/database.php");
require_once ("./models/auth.php");
require_once ("./models/post.php");
require_once ("./models/get.php");

$dbconnect = new Connection();
$pdo = $dbconnect->connect();

$auth = new Auth($pdo);
$post = new Post($pdo);
$get = new Get($pdo);

  $req = [];
  if(isset($_REQUEST['request'])){
    $req = explode('/', rtrim($_REQUEST['request'], '/'));
  }
  else{
    $req = array("errorcatcher");
  }

  switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
      switch ($req[0]){
        // user registration
        case 'register':
          $d = json_decode(file_get_contents('php://input'), true);
          echo json_encode($auth->signup($d));
        break;

        // user login
        case 'login':
          $d = json_decode(file_get_contents('php://input'), true);
          echo json_encode($auth->login($d));
        break;

        // user update profile
        case 'updateInfo':
          $d = json_decode(file_get_contents('php://input'));
          echo json_encode($post->update_info($d));
        break;

        // user update password
        case 'updatePassword':
          $d = json_decode(file_get_contents('php://input'));
          echo json_encode($post->update_password($d));
        break;

        // user update avatar
        case 'update_avatar':
          $d = json_decode(file_get_contents('php://input'), true);
          echo json_encode($auth->update_avatar($d));
        break;

        // get user data
        case 'get_userData':
          $d = json_decode(file_get_contents('php://input'), true);
          echo json_encode($get->get_userData($d));
        break;

        // user add new todo
        case 'addTodos':
          $d = json_decode(file_get_contents('php://input'));
          echo json_encode($post->add_todo($d));
        break;

        // user update todo
        case 'updateTodo':
          $d = json_decode(file_get_contents('php://input'));
          echo json_encode($post->update_todo($d));
        break;

        // user delete todo
        case 'deleteTodo':
          $d = json_decode(file_get_contents('php://input'));
          echo json_encode($post->delete_todo($d));
        break;

        case 'completeTodo':
          $d = json_decode(file_get_contents('php://input'));
          echo json_encode($post->complete_todo($d));
        break;

        case 'getArchives':
          $d = json_decode(file_get_contents('php://input'));
          echo json_encode($get->get_archives($d));
        break;

        case 'getTodos':
          $d = json_decode(file_get_contents('php://input'));
          echo json_encode($get->get_todos($d));
        break;

        case 'getLowPriority':
          $d = json_decode(file_get_contents('php://input'));
          echo json_encode($get->get_low_priority($d));
        break;

        case 'getMediumPriority':
          $d = json_decode(file_get_contents('php://input'));
          echo json_encode($get->get_medium_priority($d));
        break;

        case 'getHighPriority':
          $d = json_decode(file_get_contents('php://input'));
          echo json_encode($get->get_high_priority($d));
        break;

        default:
          echo "Invalid Request";
        break;
      }
    break;

    default:
       echo "Prohibited Request";
    break;
  }
?>

