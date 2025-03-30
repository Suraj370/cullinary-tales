from flask import Blueprint, request, jsonify, make_response
from app.models import User, get_user_by_email, get_user_by_id, user_exists, create_user, bcrypt
import jwt as pyjwt
from app.config import Config
from functools import wraps
import datetime

users_bp = Blueprint('users', __name__)



def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get("auth_token")
        if not token:

            auth_header = request.headers.get("Authorization")
            if auth_header and auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]  # Extract token after "Bearer "

        if not token:
            return jsonify({"error": "Unauthorized"}), 401  # No token

        print(token)

        try:
            data = pyjwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
            user = get_user_by_id(data["user_id"])  # Fetch user from DB
            if not user:
                return jsonify({"error": "User not found"}), 401
        except pyjwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except pyjwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

        return f(user, *args, **kwargs)

    return decorated
@users_bp.route('/')
def index():
    """Health check route."""
    return jsonify({"message": "API is running"}), 200


@users_bp.route('/register', methods=['POST'])
def register():
    """Handle user registration (React frontend)."""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    try:
        if user_exists(email):
            return jsonify({"error": "Email already exists"}), 400

        if create_user(email, password):
            return jsonify({"message": "Registration successful"}), 201

        return jsonify({"error": "Registration failed"}), 500

    except Exception as e:
        print(f"❌ Error during registration: {e}")
        return jsonify({"error": "Server error"}), 500


@users_bp.route('/login', methods=['POST'])
def login():
    """Handle user login (React frontend)."""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = get_user_by_email(email)


    try:
        if user and bcrypt.check_password_hash(user['password'], password):
            user_obj = User(user['id'], user['email'])
            token = pyjwt.encode(
                {"user_id": user_obj.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)},
                Config.SECRET_KEY,
                algorithm="HS256"
            )
            response = make_response(jsonify({"message": "Login successful",
                                              "user": {"id": user['id'], "email": user['email']}, "token": token}))

            response.set_cookie(
                "auth_token",
                token,

                samesite="None",
                max_age=86400  # Cookie lasts for 1 day
            )


            return response, 200

        # Explicitly return a response for failed login
        return jsonify({"error": "Invalid email or password"}), 401

    except Exception as e:
        print(f"❌ Error during login: {e}")
        return jsonify({"error": "Server error"}), 500




@users_bp.route('/user', methods=['GET'])
@token_required
def get_user(user):
    """Return authenticated user info"""
    print(user.email)
    user  = get_user_by_email(user.email)

    return jsonify({"user": {"id": user['id'], "email": user['email']}}), 200
@users_bp.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"message": "Logout successful"})
    response.set_cookie("auth_token", "", expires=0, httponly=True, secure=True, samesite="Lax")
    return response
