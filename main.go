package main

import (
	"app/predict"
	"context"
	"embed"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed all:frontend/public/favicon.png
var icon []byte

func main() {

	// configs.InitLogger()

	// _logger := logger.NewFileLogger("app.log")

	predictApp := predict.NewApp()

	// Create the application menu
	AppMenu := menu.NewMenuFromItems(
		menu.EditMenu(), // this worked
	)

	// FileMenu := AppMenu.AddSubmenu("File")
	// FileMenu.AddText("&Open", keys.CmdOrCtrl("o"), openFile)
	// FileMenu.AddSeparator()
	// FileMenu.AddText("Quit", keys.CmdOrCtrl("q"), func(_ *menu.CallbackData) {
	// 	runtime.Quit()
	// })

	// if runtime.GOOS == "darwin" {
	// 	AppMenu.Append(menu.EditMenu()) // Enable default Edit menu on macOS
	// }

	app := &options.App{
		Title:             "Diagnosis of diabetes",
		DisableResize:     false,
		Fullscreen:        false,
		WindowStartState:  options.Maximised,
		Frameless:         false,
		MinWidth:          400,
		MinHeight:         400,
		StartHidden:       false,
		HideWindowOnClose: false,
		BackgroundColour:  &options.RGBA{R: 0, G: 0, B: 0, A: 255},
		AlwaysOnTop:       false,
		// AssetServer: &assetserver.Options{
		// 	Assets:     nil, // Replace with actual assets
		// 	Handler:    nil, // Replace with actual handler
		// 	Middleware: nil, // Replace with actual middleware
		// },

		AssetServer: &assetserver.Options{
			Assets: assets,
		},

		Menu:               AppMenu, // Reference the menu above
		LogLevel:           logger.DEBUG,
		LogLevelProduction: logger.ERROR,
		// Logger:             _logger,
		Mac: &mac.Options{
			TitleBar: &mac.TitleBar{
				TitlebarAppearsTransparent: false,
				HideTitle:                  false,
				HideTitleBar:               false,
				FullSizeContent:            true,
				UseToolbar:                 false,
				HideToolbarSeparator:       false,
			},
			Appearance:           mac.DefaultAppearance,
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
			About: &mac.AboutInfo{
				Title:   "Diagnosis of diabetes",
				Message: "© 2024 Me",
				Icon:    icon, // Replace with actual icon
			},
		},
		Windows: &windows.Options{
			WebviewIsTransparent:              false,
			WindowIsTranslucent:               false,
			BackdropType:                      windows.Mica,
			DisablePinchZoom:                  false,
			DisableWindowIcon:                 false,
			DisableFramelessWindowDecorations: false,
			WebviewUserDataPath:               "",
			WebviewBrowserPath:                "",
			Theme:                             windows.SystemDefault,
			// CustomTheme: &windows.ThemeSettings{
			// 	DarkModeTitleBar:   windows.RGB(20, 20, 20),
			// 	DarkModeTitleText:  windows.RGB(200, 200, 200),
			// 	DarkModeBorder:     windows.RGB(20, 0, 20),
			// 	LightModeTitleBar:  windows.RGB(200, 200, 200),
			// 	LightModeTitleText: windows.RGB(20, 20, 20),
			// 	LightModeBorder:    windows.RGB(200, 200, 200),
			// },
		},
		Linux: &linux.Options{
			Icon:                icon, // Replace with actual icon
			WindowIsTranslucent: false,
			WebviewGpuPolicy:    linux.WebviewGpuPolicyAlways,
			ProgramName:         "Diagnosis of diabetes",
		},
		Debug: options.Debug{
			OpenInspectorOnStartup: false,
		},
		OnStartup: func(_ctx context.Context) {
			predictApp.Startup(_ctx)
		},
		OnDomReady: func(ctx context.Context) {
			predictApp.DomReady(ctx)
		},

		// OnShutdown:                       app.shutdown,
		// OnBeforeClose:                    app.beforeClose,
		EnableDefaultContextMenu:         true,
		EnableFraudulentWebsiteDetection: true,
		Bind:                             predictApp.RegisterStructs([]any{}),
		EnumBind:                         predictApp.RegisterEnums([]any{}),
		ErrorFormatter: func(err error) any {
			return err.Error()
		},
		SingleInstanceLock: &options.SingleInstanceLock{
			UniqueId: "c9c8fd93-6758-4144-87d1-34bdb0a8bd60",
			// OnSecondInstanceLaunch: app.onSecondInstanceLaunch,
		},
		DragAndDrop: &options.DragAndDrop{
			EnableFileDrop:     true,
			DisableWebViewDrop: false,
			CSSDropProperty:    "--wails-drop-target",
			CSSDropValue:       "drop",
		},
	}

	err := wails.Run(app)

	if err != nil {
		log.Fatal(err)
	}
}
