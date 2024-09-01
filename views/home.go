package views

import (
	"github.com/go-chi/chi"
	g "github.com/maragudk/gomponents"
	c "github.com/maragudk/gomponents/components"
	. "github.com/maragudk/gomponents/html"
)

func Home(routes []chi.Route) g.Node {
	return Div(
		Headline("jbhicks.dev"),
		P(
			g.Text("text goes here"),
		),

		SubHeadline("Mixes"),
		Div(Class("max-w-lg flex space-x-8"),
			Button(g.Text("Click me now"), Class("btn btn-primary btn-sm")),
		),
	)
}

func NiceButton(text string, primary bool) g.Node {
	return Button(g.Text(text), c.Classes{
		"btn":           true,
		"btn-sm":        true,
		"btn-primary":   primary,
		"btn-secondary": !primary,
	})
}
