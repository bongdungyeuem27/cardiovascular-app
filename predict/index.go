package predict

import (
	"app/client"
	"app/predict/data"
	"app/predict/enums"
	"context"
	"fmt"

	// Import the correct package

	"github.com/sjwhitworth/golearn/base"
	"github.com/sjwhitworth/golearn/ensemble"
)

// App struct
type App struct {
	ctx         *context.Context
	rf          *ensemble.RandomForest
	rfStructure *base.DenseInstances
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (a *App) Startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = &ctx

	reader := data.GetReaderFromData()

	// Đọc dữ liệu từ file CSV
	data, err := base.ParseCSVToInstancesFromReader(reader, true)
	if err != nil {
		panic(err)
	}

	// Tạo mô hình Random Forest với 10 cây và mỗi cây xem xét 2 đặc trưng
	rf := ensemble.NewRandomForest(10, 20)

	// Huấn luyện mô hình với tập huấn luyện
	rf.Fit(data)

	sample := base.NewStructuralCopy(data)

	a.rf = rf
	a.rfStructure = sample
}

// domReady is called after front-end resources have been loaded
func (a App) DomReady(ctx context.Context) {
	// Add your action here

}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) BeforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) Shutdown(ctx context.Context) {
	// Perform your teardown here
}

func (a *App) RegisterEnums(lasts []any) []any {
	// Perform your teardown here
	return []any{enums.ELabelMap}
}

func (a *App) RegisterStructs(lasts []any) []any {
	// Perform your teardown here
	return append(lasts, a)
}

func (a *App) Predict(input []float64) *client.IResponse {

	instance := base.NewStructuralCopy(a.rfStructure)
	instance.Extend(1)
	for i, val := range input {
		attSpec, _ := instance.GetAttribute(instance.AllAttributes()[i])
		instance.Set(attSpec, 0, attSpec.GetAttribute().GetSysValFromString(fmt.Sprintf("%f", val)))
	}

	// Thực hiện dự đoán với mô hình đã tải từ file
	predictedNew, err := a.rf.Predict(instance)

	if err != nil {
		return &client.IResponse{
			Error:   err,
			Body:    "{}",
			Message: "error",
		}
	}

	fmt.Println(predictedNew.RowString(0))

	result := predictedNew.RowString(0)

	return &client.IResponse{
		Error:   nil,
		Body:    result,
		Message: "oke",
	}

}
