package client

type IResponse struct {
	Body    string `json:"body,omitempty"`
	Message string `json:"message,omitempty"`
	Error   error  `json:"error,omitempty"`
}

// type IBody struct {
// 	Offset  uint8  `json:"offset,omitempty"`
// 	Limit   uint8  `json:"limit,omitempty"`
// 	Total   uint8  `json:"total,omitempty"`
// 	CanNext bool   `json:"can_next,omitempty"`
// 	Items   string `json:"items,omitempty"`
// }

// type IRestyResponse[T any] struct {
// 	Offset  string `json:"offset,omitempty"`
// 	Limit   string `json:"limit,omitempty"`
// 	Total   string `json:"total,omitempty"`
// 	CanNext bool   `json:"can_next,omitempty"`
// 	Items   []T    `json:"items,omitempty"`
// }

type ISearchUniqueResponse struct {
	Body    []string `json:"body,omitempty"`
	Message string   `json:"message,omitempty"`
	Error   error    `json:"error,omitempty"`
}

type IPaginationParams struct {
	Offset string `json:"offset,omitempty"`
	Limit  string `json:"limit,omitempty"`
}
