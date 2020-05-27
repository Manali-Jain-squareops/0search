package worker

import (
	"blockworker/core/config"
	"context"
	"time"

	. "blockworker/core/logging"

	"github.com/0chain/gosdk/core/block"
	"github.com/0chain/gosdk/zcncore"
	"go.uber.org/zap"
)

type FetchMode string

const (
	forward  FetchMode = "forward"
	backward FetchMode = "backward"
)

func SetupWorkers(ctx context.Context) {
	latestBlock, err := zcncore.GetLatestFinalized(ctx, 1)
	if err != nil {
		Logger.Error("Failed to get latest finalized block from blockchain", zap.Error(err))
		panic("GetLatestFinalized failed")
	}
	roundToProcess := latestBlock.Round
	go LedgerSync(ctx, roundToProcess)
	go Scanner(ctx, roundToProcess-1)
}

func fetchBlock(ctx context.Context, blockChan chan *block.Block, round int64, mode FetchMode) {
	for round > 0 {
		select {
		case <-ctx.Done():
			return
		default:
			Logger.Info("Fetching block by round from blockchain", zap.Any("round", round))
			block, err := zcncore.GetBlockByRound(ctx, zcncore.GetMinShardersVerify(), round)
			if err != nil {
				Logger.Error("Unable to get block by round from blockchain", zap.Error(err))
				time.Sleep(time.Duration(config.Configuration.RoundFetchDelayInMilliSeconds) * time.Millisecond)
				continue
			}

			Logger.Info("Got block by round from blockchain", zap.Any("round", round))
			blockChan <- block

			if mode == forward {
				round++
			} else {
				round--
			}
		}
	}
}
