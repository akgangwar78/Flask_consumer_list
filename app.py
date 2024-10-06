from flask import Flask, request, jsonify, render_template
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure MySQL database
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'kowtavdu'
app.config['MYSQL_DB'] = 'consumer_db'

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('index.html')

# Fetch all consumers
@app.route('/api/consumers', methods=['GET'])
def get_consumers():
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, name, email, phone FROM consumers")
    consumers = cur.fetchall()
    cur.close()

    return jsonify([{
        'id': consumer[0],
        'name': consumer[1],
        'email': consumer[2],
        'phone': consumer[3]
    } for consumer in consumers])

# Fetch single consumer by id
@app.route('/api/consumer/<int:id>', methods=['GET'])
def get_consumer(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, name, email, phone FROM consumers WHERE id = %s", [id])
    consumer = cur.fetchone()
    cur.close()

    if consumer:
        return jsonify({
            'id': consumer[0],
            'name': consumer[1],
            'email': consumer[2],
            'phone': consumer[3]
        })
    return jsonify({'message': 'Consumer not found'}), 404

# Add new consumer
@app.route('/api/consumers', methods=['POST'])
def add_consumer():
    data = request.get_json()
    name, email, phone = data['name'], data['email'], data['phone']

    # Validation
    if not name or not email or not phone:
        return jsonify({'error': 'All fields are required!'}), 400

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO consumers (name, email, phone) VALUES (%s, %s, %s)", (name, email, phone))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Consumer added successfully'})

# Update existing consumer
@app.route('/api/consumer/<int:id>', methods=['PUT'])
def update_consumer(id):
    data = request.get_json()
    name, email, phone = data['name'], data['email'], data['phone']

    # Validation
    if not name or not email or not phone:
        return jsonify({'error': 'All fields are required!'}), 400

    cur = mysql.connection.cursor()
    cur.execute("UPDATE consumers SET name = %s, email = %s, phone = %s WHERE id = %s", (name, email, phone, id))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Consumer updated successfully'})

# Delete consumer
@app.route('/api/consumer/<int:id>', methods=['DELETE'])
def delete_consumer(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM consumers WHERE id = %s", [id])
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Consumer deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)

