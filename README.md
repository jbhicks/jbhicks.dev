# jbhicks.dev

Home for my weird side projects and maybe a resume some day.

run:
Prerequisites are wgo and browser-sync:
``` bash
wgo -file=.go go run main.go & \
browser-sync start \
  --files './**/*.go' \
  --port 3000 \
  --proxy 'localhost:8080' \
  --middleware 'function(req, res, next) { \
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); \
    return next(); \
  }'
```

Built on:

* [Go lang](http://go.dev)
* [Gomponents](https://www.gomponents.com)
* [TailwindCSS](https://tailwindcss.com)
* [DaisyUI](https://daisyui.com)

Based on [Gomponents Tailwind Example](https://github.com/maragudk/gomponents-tailwind-example)
