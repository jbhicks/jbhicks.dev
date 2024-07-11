package views

import (
	"fmt"

	g "github.com/maragudk/gomponents"
	c "github.com/maragudk/gomponents/components"
	. "github.com/maragudk/gomponents/html"
)

type Props struct {
	Title   string
	Path    string
	Content g.Node
}

func Page(p Props) g.Node {
	fmt.Println(p.Path)
	return c.HTML5(c.HTML5Props{
		Title:    p.Title,
		Language: "en",
		Head: []g.Node{
			Link(Rel("stylesheet"), Href("/static/styles/app.css"), Type("text/css")),
			Link(Rel("stylesheet"), Href("https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css"), Type("text/css")),
		},
		Body: []g.Node{
			Nav(Class("navbar bg-base-300 justify-between"),
				Container(
					Div(Class("flex items-baseline space-x-4"),
						NavbarLink("/", "Home", p.Path),
						NavbarLink("/about", "About", p.Path),
					),
				),
			),
			Container(
				Main(p.Content),
			),
		},
	})
}

// Container restricts the width of the children, centers, and adds some padding.
func Container(children ...g.Node) g.Node {
	return Div(Class("max-w-7xl mx-auto px-4"), g.Group(children))
}

func NavbarLink(path, text, currentPath string) g.Node {
	active := path == currentPath

	return A(Href(path),
		c.Classes{
			"p-3 text-sm font-medium focus:text-white": true,
			"text-white":                     active,
			"text-gray-300 hover:text-white": !active,
		},
		g.Text(text),
	)
}
