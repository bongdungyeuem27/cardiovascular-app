package configs

import (
	"log"

	"github.com/elastic/go-elasticsearch/v8"
)

func InitES() *elasticsearch.Client {
	// Tạo cấu hình cho Elasticsearch client
	cfg := elasticsearch.Config{
		Addresses: []string{
			"http://localhost:9200", // URL của Elasticsearch, cập nhật URL nếu cần
		},
		Username: "elastic",       // Username cho Elasticsearch
		Password: "05092024!@#zZ", // Password cho Elasticsearch
	}

	// Tạo Elasticsearch client với cấu hình
	es, err := elasticsearch.NewClient(cfg)
	if err != nil {
		log.Fatalf("Error creating the client: %s", err)
	}

	return es
}
