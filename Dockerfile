FROM golang:1.22 as build
WORKDIR /app
COPY . .
RUN go build -o /serve .

FROM scratch
COPY --from=build /serve /serve
EXPOSE 3000
CMD ["/serve"]
