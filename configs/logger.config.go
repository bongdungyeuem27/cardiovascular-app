package configs

import (
	"log"
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var Sugar *zap.SugaredLogger

func InitLogger() (*zap.Logger, *zap.SugaredLogger) {
	// Tạo cấu hình cho zap logger để ghi log vào file
	config := zap.NewProductionConfig()
	config.OutputPaths = []string{
		"app-debug.log", // Tên file log
	}

	// Tạo logger từ config
	logger, err := config.Build()
	if err != nil {
		log.Fatalf("Can't initialize zap logger: %v", err)
	}
	defer logger.Sync() // Đảm bảo log được flush

	// Tạo một sugar logger (dễ sử dụng hơn)
	sugar := logger.Sugar()

	// Redirect log tiêu chuẩn của Go vào zap logger
	zapWriter := zapcore.AddSync(os.Stdout)
	log.SetOutput(zapWriter)

	// Ghi log sử dụng zap
	sugar.Info("This is an info message logged by zap!")
	sugar.Error("This is an error message logged by zap!")

	Sugar = sugar

	return logger, sugar
}
