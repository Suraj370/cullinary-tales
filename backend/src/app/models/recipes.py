from datetime import datetime
from flask_mysqldb import MySQL
mysql = MySQL()

def get_favorite_recipes(user_id):
    """Retrieve favorite recipes for a given user."""
    try:
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT recipe_id FROM user_favourite WHERE user_id = %s', (user_id,))
        result = cursor.fetchall()
        return [row['recipe_id'] for row in result]
    except Exception as e:
        return {'error': str(e)}

def get_history_recipes(user_id):
    """Retrieve recipe history for a given user."""
    try:
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT recipeid, dateofaccess FROM recipe_history WHERE userid = %s', (user_id,))
        result = cursor.fetchall()
        return [{'recipe_id': row['recipeid'], 'date_of_access': row['dateofaccess']} for row in result]
    except Exception as e:
        return {'error': str(e)}

def store_recipe(user_id, recipe_id):
    """Store a recipe access record in history."""
    try:
        date_of_access = datetime.today().date()
        cursor = mysql.connection.cursor()
        sql = "INSERT INTO recipe_history (userid, recipeid, dateofaccess) VALUES (%s, %s, %s)"
        cursor.execute(sql, (user_id, recipe_id, date_of_access))
        mysql.connection.commit()

        return {'success': 'History recorded'}
    except Exception as e:
        return {'error': str(e)}

def like_recipe(user_id, recipe_id):
    """Adds a recipe to the user's favorites."""
    try:
        cursor = mysql.connection.cursor()
        print(user_id, recipe_id)
        query = "INSERT INTO user_favourite (user_id, recipe_id) VALUES (%s, %s)"
        cursor.execute(query, (user_id, recipe_id))
        mysql.connection.commit()
        cursor.close()
        return {'message': 'Recipe liked successfully'}
    except Exception as e:
        return {'error': str(e)}


def dislike_recipe(user_id, recipe_id):
    """Removes a recipe from the user's favorites."""
    try:
        cursor = mysql.connection.cursor()
        query = "DELETE FROM user_favourite WHERE user_id = %s AND recipe_id = %s"
        cursor.execute(query, (user_id, recipe_id))
        mysql.connection.commit()
        cursor.close()
        return {'message': 'Recipe disliked successfully'}
    except Exception as e:
        return {'error': str(e)}

