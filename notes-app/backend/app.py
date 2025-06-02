from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# MySQL Configuration — update to your MySQL credentials
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''       # Put your MySQL password here
app.config['MYSQL_DB'] = 'notesdb'

mysql = MySQL(app)

def create_table():
    with app.app_context():
        cur = mysql.connection.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS notes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL
            )
        """)
        mysql.connection.commit()
        cur.close()

@app.route('/api/notes', methods=['GET'])
def get_notes():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT id, title, description FROM notes ORDER BY id DESC")
        rows = cur.fetchall()
        cur.close()
        notes = [{'id': r[0], 'title': r[1], 'description': r[2]} for r in rows]
        return jsonify(notes)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/notes', methods=['POST'])
def add_note():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')

    if not title or not description:
        return jsonify({'error': 'Title and Description are required'}), 400

    try:
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO notes (title, description) VALUES (%s, %s)", (title, description))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Note created'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/notes/<int:id>', methods=['PUT'])
def update_note(id):
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')

    if not title or not description:
        return jsonify({'error': 'Title and Description are required'}), 400

    try:
        cur = mysql.connection.cursor()
        cur.execute("UPDATE notes SET title=%s, description=%s WHERE id=%s", (title, description, id))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Note updated'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/notes/<int:id>', methods=['DELETE'])
def delete_note(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM notes WHERE id=%s", (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Note deleted'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    create_table()
    app.run(debug=True)
