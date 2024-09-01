package handlers

import (
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/jbhicks/jbhicks.dev/views"
)

func Home(mux chi.Router) {
	mux.Get("/", func(w http.ResponseWriter, r *http.Request) {
		routes := mux.Routes()

		_ = views.Page(views.Props{
			Title:   "Home",
			Path:    "/",
			Content: views.Home(routes),
		}).Render(w)
	})

	mux.Post("/", func(w http.ResponseWriter, r *http.Request) {
		now := time.Now()
		_ = views.Partial(now).Render(w)
	})
}
