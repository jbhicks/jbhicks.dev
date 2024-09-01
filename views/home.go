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
			FormEl(Method("post"), Action("/"), hx.Boost("true"), hx.Target("#partial"), hx.Swap("outerHTML"),
				Button(Type("submit"), g.Text(`Update time`),
					Class("rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"),
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
