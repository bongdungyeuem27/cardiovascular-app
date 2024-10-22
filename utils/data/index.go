package data

import (
	"encoding/json"
	"errors"
	"sort"
	"strconv"

	"go.mongodb.org/mongo-driver/bson"
)

func Min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func Insert[E any](slice *[]E, less func(i int) bool, item E) error {
	idx := sort.Search(len(*slice), less)
	if idx > len(*slice) {
		return errors.New("NOT_FOUND_POSITION_TO_INSERT")
	}
	*slice = append(*slice, item)
	copy((*slice)[idx+1:], (*slice)[idx:])
	(*slice)[idx] = item
	return nil
}

func Map[E any, T any](slice *[]E, handle func(val *E, index int) T) []T {
	results := make([]T, 0, len(*slice))

	for i := 0; i < len(*slice); i++ {
		results = append(results, handle(&(*slice)[i], i))
	}

	return results
}

func Filter[E any](slice *[]E, handle func(item *E, index int) bool) []E {
	newSlice := []E{}

	for i, item := range *slice {
		temp := item

		if handle(&temp, i) {
			newSlice = append(newSlice, temp)
		}
	}
	return newSlice
}

type HashMap[T comparable, E any, P *E] map[T]P
type HashMapMultiple[T comparable, E any] map[T][]*E

func (table *HashMap[T, E, P]) Search(choose T) (result P, ok bool) {
	if table == nil {
		return nil, false
	}
	pick, ok := (*table)[choose]

	return pick, ok
}

func (table *HashMapMultiple[T, E]) Search(choose T) (result []*E, ok bool) {
	if table == nil {
		return nil, false
	}
	pick, ok := (*table)[choose]

	return pick, ok
}

func HashSearch[S ~[]E, E any, T comparable, P *E](slice *S, mapping func(i int) (key T), choose T) (result P, ok bool) {
	table := HashMap[T, E, P]{}

	for i := 0; i < len(*slice); i++ {
		key := mapping(i)
		table[key] = &((*slice)[i])
	}
	return table.Search(choose)
}

func LazyHashSearch[S ~[]E, E any, T comparable, P *E](slice *S, mapping func(i int) (key T)) HashMap[T, E, P] {
	table := HashMap[T, E, P]{}

	for i := 0; i < len(*slice); i++ {
		key := mapping(i)
		table[key] = &((*slice)[i])
	}
	return table
}

func LazyHashMultipleSearch[E any, T comparable](slice *[]E, mapping func(i int) (key T)) HashMapMultiple[T, E] {
	table := HashMapMultiple[T, E]{}

	for i := 0; i < len(*slice); i++ {
		key := mapping(i)
		table[key] = append(table[key], &((*slice)[i]))
	}
	return table
}

func UnmarshalBson[T any](data any) (T, error) {
	var myStruct T
	// Chuyển đổi map thành đối tượng BSON
	bsonData, err := bson.Marshal(data)
	if err != nil {
		return myStruct, err
	}

	// Chuyển đối tượng BSON thành struct

	err = bson.Unmarshal(bsonData, &myStruct)
	return myStruct, err
}

func StructToJSONToMap(obj interface{}) (newMap map[string]interface{}, err error) {
	data, err := json.Marshal(obj) // Convert to a json string

	if err != nil {
		return
	}

	err = json.Unmarshal(data, &newMap) // Convert to a map
	return
}

func Keys[T any](m map[string]T) []string {
	keys := make([]string, 0, len(m))
	for key := range m {
		keys = append(keys, key)
	}
	return keys
}

func StringToIntWithDefault(s string, defaultValue int) int {
	value, err := strconv.Atoi(s)
	if err != nil {
		return defaultValue
	}
	return value
}

func StructToBsonM(input any) bson.M {
	data, err := bson.Marshal(input)
	if err != nil {
		panic(err)
	}

	var bsonM bson.M
	err = bson.Unmarshal(data, &bsonM)
	if err != nil {
		panic(err)
	}

	return bsonM
}
