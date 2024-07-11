package views

import (
	"github.com/go-chi/chi"
	g "github.com/maragudk/gomponents"
	c "github.com/maragudk/gomponents/components"
	. "github.com/maragudk/gomponents/html"
)

func Home(routes []chi.Route) g.Node {
	return Div(
		Headline("Welcome to jbhicks.dev! 🎉"),
		P(
			g.Text("Home for my weird side projects and maybe some resume type thing some day."),
		),

		SubHeadline("Buttons 😎"),
		Div(Class("max-w-lg flex space-x-8"),
			Button(g.Text("Click me"), Class("btn btn-primary btn-sm")),
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
