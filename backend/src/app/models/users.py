from flask_login import UserMixin
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt

mysql = MySQL()
bcrypt = Bcrypt()

class User(UserMixin):
    """User model for Flask-Login."""
    def __init__(self, id,  email):
        self.id = id
        self.email = email



def get_user_by_id(user_id):
    """Load user from database by ID for Flask-Login."""
    try:
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * FROM users WHERE id = %s', (user_id,))
        user = cursor.fetchone()
        cursor.close()
        return User(user['id'], user['email']) if user else None
    except Exception as e:
        print(f"Error loading user: {e}")
        return None

def get_user_by_email(email):
    """Fetch user by email from database."""
    try:
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
        user = cursor.fetchone()
        cursor.close()
        return user
    except Exception as e:
        print(f"Error fetching user by email: {e}")
        return None

def user_exists( email):
    """Check if a user with the given username or email already exists."""
    try:
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * FROM users WHERE  email = %s', ( email))
        existing_user = cursor.fetchone()
        cursor.close()
        return bool(existing_user)
    except Exception as e:
        print(f"Error checking user existence: {e}")
        return False

def create_user( email, password):
    """Create a new user in the database."""
    try:
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        cursor = mysql.connection.cursor()
        cursor.execute('INSERT INTO users ( email, password) VALUES (%s, %s)',
                      ( email, hashed_password))
        mysql.connection.commit()
        cursor.close()
        return True
    except Exception as e:
        print(f"Error creating user: {e}")
        mysql.connection.rollback()
        return False