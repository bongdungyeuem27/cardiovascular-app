package text

import (
	"strings"
	"unicode"

	"golang.org/x/text/unicode/norm"
)

// Hàm bỏ dấu
func RemoveDiacritics(input string) string {
	t := norm.NFD.String(input)
	return strings.Map(func(r rune) rune {
		if unicode.Is(unicode.Mn, r) { // Mn: Nonspacing_Mark
			return -1
		}
		return r
	}, t)
}
