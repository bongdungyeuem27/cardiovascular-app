package enums

type ELabel string

const (
	MEDIUM ELabel = "Medium"
	HIGH   ELabel = "High"
	DANGER ELabel = "Danger"
)

var ELabelMap = []struct {
	Value  ELabel
	TSName string
}{
	{MEDIUM, "Medium"},
	{HIGH, "High"},
	{DANGER, "Danger"},
}
