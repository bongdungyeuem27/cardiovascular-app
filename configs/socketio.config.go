package configs

import (
	socketio "github.com/googollee/go-socket.io"
)

func NewSocketIOClient() *socketio.Client {
	uri := "http://localhost:4002"
	client, err := socketio.NewClient(uri, nil)
	if err != nil {
		panic(err)
	}

	err = client.Connect()
	if err != nil {
		panic(err)
	}
	println("Connected to socket.io server: " + uri)
	return client
}
