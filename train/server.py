import numpy as np
import tensorflow as tf
from flask import Flask, jsonify, request

# Khởi tạo ứng dụng Flask
app = Flask(__name__)

# Load mô hình đã lưu dưới định dạng SavedModel hoặc h5
model = tf.keras.models.load_model("random_forest_classifier_model.h5")


# Định nghĩa route để nhận GET request và trả về kết quả dự đoán
@app.route("/predict", methods=["GET"])
def predict():
    try:
        # Lấy dữ liệu từ query string của GET request (ví dụ như tuổi, giới tính,...)
        # Giả sử bạn có dữ liệu gồm 20 feature cần được nhập vào mô hình
        # Đây là ví dụ giả định với các biến số
        input_data = request.args.getlist("features", type=float)

        # Chuyển input thành định dạng numpy array
        input_array = np.array([input_data])

        # Thực hiện dự đoán
        prediction = model.predict(input_array)

        # Chuyển đổi kết quả dự đoán thành JSON
        return jsonify({"prediction": prediction.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    # Chạy ứng dụng Flask
    app.run(debug=True, host="127.0.0.1", port=8000)
