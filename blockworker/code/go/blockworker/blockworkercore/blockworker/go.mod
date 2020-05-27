module blockworker

go 1.14

require (
	blockworker/blockworkercore v0.0.0
	blockworker/core v0.0.0
	github.com/gorilla/handlers v1.4.2 // indirect
	github.com/gorilla/mux v1.7.4 // indirect
	github.com/spf13/viper v1.6.3 // indirect
)

replace blockworker/core => ../../core

replace blockworker/blockworkercore => ../../blockworkercore
