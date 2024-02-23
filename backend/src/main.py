from flask import Flask
from .routes import user_blueprint, skill_blueprint

app = Flask(__name__)

app.register_blueprint(user_blueprint, url_prefix='/users')
app.register_blueprint(skill_blueprint, url_prefix='/skills')

@app.route('/')
def hello_world():
    return 'Hello, World!'