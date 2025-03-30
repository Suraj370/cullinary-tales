from flask import Blueprint, request, jsonify, session
from app.models import get_favorite_recipes, get_history_recipes, store_recipe, like_recipe, dislike_recipe
favorites_bp = Blueprint('favorites', __name__)

@favorites_bp.route('/api/favorite-recipes', methods=['POST'])
def favorite_recipes():
    """API to get a user's favorite recipes."""
    try:
        data = request.get_json()
        user_id = data.get('user_id')

        if not user_id:
            return jsonify({'error': 'User ID is required'}), 400

        favorite_recipes = get_favorite_recipes(user_id)
        return jsonify({'favourite_recipes': favorite_recipes}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@favorites_bp.route('/api/history', methods=['POST'])
def history_recipes():
    """API to get a user's recipe history."""
    try:
        data = request.get_json()
        user_id = data.get('user_id')

        if not user_id:
            return jsonify({'error': 'User ID is required'}), 400

        history = get_history_recipes(user_id)
        return jsonify({'history': history}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@favorites_bp.route('/store_recipe', methods=['POST'])
def store_recipe_access():
    """API to store a recipe access record in history."""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        recipe_id = data.get('recipe_id')

        if not all([user_id, recipe_id]):
            return jsonify({'error': 'User ID and Recipe ID are required'}), 400

        response = store_recipe(user_id, recipe_id)
        return jsonify(response), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@favorites_bp.route('/like_recipe', methods=['POST'])
def like_recipe_route():
    data = request.get_json()
    return jsonify(like_recipe(data['user_id'], data['recipe_id']))


@favorites_bp.route('/dislike_recipe', methods=['POST'])
def dislike_recipe_route():
    data = request.get_json()
    return jsonify(dislike_recipe(data['user_id'], data['recipe_id']))
