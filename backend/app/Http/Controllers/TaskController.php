<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


// extends Controller : Laravel nous suggère d'hériter du Controller fourni dans le même dossier
class TaskController extends Controller
{
    // Création de la méthode list
    public function list()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $tasks = Task::all()->load('category');
        // on retourne une réponse au format JSON qui contient nos données
        return response()->json($tasks);
        // Retour automatique au format JSON 👌
        // return $movies;
    }

    /**
     * Création de la méthode show
     *
     * @param int $id L'id du film à retourner
     */
    public function show(int $id)
    {
        // Utilisation de la méthode find() grâce à l'héritage
        $task = Task::find($id);
        // Retour automatique au format JSON 👌
        return $task;
        // en décomposé :
        // return response()->json($movie);
    }

    public function create(Request $request)

    {

        $title = $request->input('title');
        $category = $request->input('category_id');
        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 500);
        }
        $task = new Task();
        $task->title = $title;
        $task->category_id = $category;
        if ($task->save()) {
            return response()->json($task->load('category'), 201);
        } else {
            return response()->json(['message' => 'Error saving task.'], 500);
        }
    }

    public function delete(int $id)
    {

        $task = Task::find($id);
        if ($task === null) {
            return response()->json(['message' => 'Task not found.'], 404);
        }

        $task->delete();
        return response()->json(['message' => 'Task deleted.'], 200);
    }

    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (!$task) {
            return response()->json(['message' => 'Error updating task'], 404);
        }
        $title = $request->input('title');
        $task->title = $title;
        if ($task->save()) {
            return response()->json(['task' => $task], 201);
        } else {
            return response()->json(['response' => 'Error task not saving'], 500);
        }
    }
}
