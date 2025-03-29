from flask import Flask, request, Response
from app.models import init_extensions, get_user_by_id
from flask_cors import CORS
from  app.config import Config

from app.routes.users import users_bp
from app.routes.recipes import favorites_bp




# Load user callback for Flask-Login

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)



    # Initialize extensions and register routes
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    init_extensions(app)
    app.register_blueprint(users_bp)
    app.register_blueprint(favorites_bp)


    return app