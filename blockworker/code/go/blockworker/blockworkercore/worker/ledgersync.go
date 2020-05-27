package worker

import (
	model "blockworker/blockworkercore/models"
	. "blockworker/core/logging"
	"context"

	"github.com/0chain/gosdk/core/block"
	"go.uber.org/zap"
)

func LedgerSync(ctx context.Context, roundToProcess int64) {
	blockChan := make(chan *block.Block)
	go fetchBlock(ctx, blockChan, roundToProcess, forward)
	for {
		select {
		case <-ctx.Done():
			return
		case blockToProcess := <-blockChan:
			if exists := model.CheckBlockPresentInDB(ctx, blockToProcess.Round); exists {
				Logger.Info("Block already present in DB", zap.Any("round", blockToProcess.Round))
				continue
			}
			go func(ctx context.Context, b *block.Block) {
				retries := 5
				for retries > 0 {
					err := model.InsertBlock(ctx, b)
					if err != nil {
						Logger.Error("Failed to insert block to the DB", zap.Any("round", b.Round), zap.Error(err))
						retries--
						continue
					}
					Logger.Info("Insert block successfully to the DB", zap.Any("round", b.Round))
					return
				}
			}(ctx, blockToProcess)
		}
	}
}
