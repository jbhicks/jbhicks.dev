package views

import (
	"time"

	"github.com/go-chi/chi"
	g "github.com/maragudk/gomponents"

	hx "github.com/maragudk/gomponents-htmx"
	c "github.com/maragudk/gomponents/components"
	. "github.com/maragudk/gomponents/html"
)

const timeFormat = "15:04:05"

func Home(routes []chi.Route) g.Node {
	now := time.Now()
	return Div(
		Headline("jbhicks.dev"),
		P(
			g.Text("text goes here"),
		),

		SubHeadline("Mixes"),
		Div(Class("max-w-lg flex space-x-8"),
			Button(g.Text("Click me now"), Class("btn btn-primary btn-sm")),
		),
		Div(Class("max-w-7xl mx-auto p-4 prose lg:prose-lg xl:prose-xl"),
			H1(g.Text(`gomponents + HTMX`)),
			P(g.Textf(`Time at last full page refresh was %v.`, now.Format(timeFormat))),
			Partial(now),
			FormEl(Method("get"), Action("/soundcloud/stream?offset=1&limit=100"), hx.Boost("true"), hx.Target("#partial"), hx.Swap("outerHTML"),
				Button(Type("submit"), g.Text(`Get soundcloud stream`),
					Class("btn btn-primary btn-sm"),
				),
			),
		))
}

func Partial(now time.Time) g.Node {
	return P(ID("partial"), g.Textf(`Time was last updated at %v.`, now.Format(timeFormat)))
}

func NiceButton(text string, primary bool) g.Node {
	return Button(g.Text(text), c.Classes{
		"btn":           true,
		"btn-sm":        true,
		"btn-primary":   primary,
		"btn-secondary": !primary,
	})
}
