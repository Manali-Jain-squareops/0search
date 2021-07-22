module blockworker/blockworkercore

go 1.14

require (
	blockworker/core v0.0.0
	github.com/0chain/gosdk v1.0.55
	go.mongodb.org/mongo-driver v1.5.1
	go.uber.org/zap v1.10.0
	gopkg.in/mgo.v2 v2.0.0-20190816093944-a6b53ec6cb22
	gopkg.in/natefinch/lumberjack.v2 v2.0.0 // indirect
)

replace blockworker/core => ../core
