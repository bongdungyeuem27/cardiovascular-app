package configs

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func StartMongo(ctx context.Context) *mongo.Client {
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://127.0.0.1:27017"))
	if err != nil {
		if err = client.Disconnect(ctx); err != nil {
			log.Fatalln(err)
		}
		log.Fatalln(err)

	}
	fmt.Println("mongo connection established")
	return client
}
