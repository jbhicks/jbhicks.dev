(trap 'kill $(jobs -p)' SIGINT; wgo -file=.go go run main.go & \
  browser-sync start \
   --files './**/*.go' \
   --port 8080 \
   --proxy 'localhost:8080' \
   --middleware 'function(req, res, next) { \
     res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); \
     return next(); \
   }')
