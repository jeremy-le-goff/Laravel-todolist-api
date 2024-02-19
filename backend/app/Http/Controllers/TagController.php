<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


// extends Controller : Laravel nous suggère d'hériter du Controller fourni dans le même dossier
class TagController extends Controller
{
    // Création de la méthode list
    public function list()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $tags = Tag::all();
        // on retourne une réponse au format JSON qui contient nos données
        return response()->json($tags);
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

        $tags = Tag::find($id);
        return $tags;
    }

    public function create(Request $request)

    {

        $label = $request->input('label');
        $validator = Validator::make($request->all(), [
            'label' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $tag = new Tag();
        $tag->label = $label;
        if ($tag->save()) {
            return response()->json(['tag' => $tag], 201);
        } else {
            return response()->json(['message' => 'Error saving tag.'], 500);
        }
    }

    public function delete(int $id)
    {

        $tag = Tag::find($id);
        if ($tag === null) {
            return response()->json(['message' => 'Tag not found.'], 404);
        }

        $tag->delete();
        return response()->json(['message' => 'Task deleted.'], 200);
    }

    public function update(Request $request, $id)
    {
        $tag = Tag::find($id);
        $validator = Validator::make($request->all(), [
            'label' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (!$tag) {
            return response()->json(['message' => 'Error updating tag'], 404);
        }
        $label = $request->input('label');
        $tag->label = $label;
        if ($tag->save()) {
            return response()->json(['tag' => $tag], 201);
        } else {
            return response()->json(['response' => 'Error tag not saving'], 500);
        }
    }
}
