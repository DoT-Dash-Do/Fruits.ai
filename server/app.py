from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb+srv://dbUser:qwer1234@cluster0.aeovvic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['fruit_database']
collection = db['fruit_faq']

@app.route('/add_faq', methods=['POST'])
def add_question():
    data = request.json
    question = data.get('question')
    answer = data.get('answer')
    fruit_type = data.get('fruit_type')

    if question and answer and fruit_type:
        question_id = collection.insert_one({
            'question': question,
            'answer': answer,
            'fruit_type': fruit_type
        }).inserted_id
        return jsonify({'message': 'FAQ added', 'id': str(question_id)}), 201
    return jsonify({'error': 'Missing fields'}), 400

@app.route('/faqs', methods=['GET'])
def get_questions():
    fruit_type = request.args.get('fruit_type')
    if fruit_type:
        questions = list(collection.find({'fruit_type': fruit_type}))
    else:
        questions = list(collection.find())

    for question in questions:
        question['_id'] = str(question['_id'])
    return jsonify(questions), 200

@app.route('/update_faq/<id>', methods=['PUT'])
def update_question(id):
    data = request.json
    question = data.get('question')
    answer = data.get('answer')
    fruit_type = data.get('fruit_type')

    update_data = {}
    if question:
        update_data['question'] = question
    if answer:
        update_data['answer'] = answer
    if fruit_type:
        update_data['fruit_type'] = fruit_type

    if update_data:
        result = collection.update_one({'_id': ObjectId(id)}, {'$set': update_data})
        if result.modified_count:
            return jsonify({'message': 'FAQ updated'}), 200
        return jsonify({'message': 'No changes made'}), 200
    return jsonify({'error': 'No data provided'}), 400

@app.route('/delete_faq/<id>', methods=['DELETE'])
def delete_question(id):
    result = collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count:
        return jsonify({'message': 'FAQ deleted'}), 200
    return jsonify({'error': 'FAQ not found'}), 404

@app.route('/faq/<id>', methods=['GET'])
def get_question_by_id(id):
    try:
        question = collection.find_one({'_id': ObjectId(id)})
        if question:
            question['_id'] = str(question['_id'])
            return jsonify(question), 200
        return jsonify({'error': 'FAQ not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)