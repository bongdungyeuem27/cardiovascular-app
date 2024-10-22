package configs

import (
	"time"

	"github.com/go-resty/resty/v2"
)

func NewRestyClient() *resty.Client {

	// Create a Resty Client
	client := resty.New()

	// Unique settings at Client level
	// --------------------------------
	// Enable debug mode
	client.SetDebug(true)
	client.DisableTrace()

	// Set client timeout as per your need
	client.SetTimeout(10 * time.Minute)

	// Host URL for all request. So you can use relative URL in the request
	client.SetBaseURL("http://localhost:4002")

	// Headers for all request
	client.SetHeader("Accept", "application/json")
	client.SetHeaders(map[string]string{
		"Content-Type": "application/json",
	})

	return client
}
