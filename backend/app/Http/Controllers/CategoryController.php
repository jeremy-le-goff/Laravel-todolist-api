<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Task;
use Illuminate\Http\Request;

// extends Controller : Laravel nous suggère d'hériter du Controller fourni dans le même dossier
class CategoryController extends Controller
{
    // Création de la méthode list
    public function list()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $categories = Category::all();
        // on retourne une réponse au format JSON qui contient nos données
        return response()->json($categories);
        // Retour automatique au format JSON 👌
        // return $movies;
    }

    public function create(Request $request)

    {

        $name = $request->input('name');
        $validated = $request->validate(([
            'name' => 'required',
        ]));
        $categories = new Category();
        $categories->name = $name;
        if ($categories->save()) {
            return response()->json(['category' => $categories], 201);
        } else {
            return response()->json(['message' => 'Error saving category.'], 500);
        }
    }
    public function delete(int $id)
    {

        $categories = Category::find($id);
        if ($categories === null) {
            return response()->json(['message' => 'Category not found.'], 404);
        }

        $categories->delete();
        return response()->json(['message' => 'Category deleted.'], 200);
    }



    public function show(int $id)
    {
        $categorie = Category::find($id);
        return $categorie;
    }

    public function update(Request $request, $id)
    {
        $categories = Category::find($id);
        $validated = $request->validate(([
            'name' => 'required',
        ]));
        if (!$categories) {
            return response()->json(['message' => 'Error updating category'], 404);
        }
        $name = $request->input('name');
        $categories->name = $name;
        if ($categories->save()) {
            return response()->json(['category' => $categories], 201);
        } else {
            return response()->json(['response' => 'Error category not saving'], 500);
        }
    }
}
