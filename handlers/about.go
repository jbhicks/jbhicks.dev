package handlers

import (
	"net/http"

	"github.com/go-chi/chi"

	"github.com/jbhicks/jbhicks.dev/views"
)

func About(mux chi.Router) {
	mux.Get("/about", func(w http.ResponseWriter, r *http.Request) {
		_ = views.Page(views.Props{
			Title:   "About",
			Path:    "/about",
			Content: views.About(),
		}).Render(w)
	})
}
