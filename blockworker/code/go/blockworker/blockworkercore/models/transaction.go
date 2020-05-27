package model

import (
	"blockworker/core/datastore"
	. "blockworker/core/logging"
	"context"
	"encoding/json"
	"time"

	"github.com/0chain/gosdk/core/transaction"
	"go.mongodb.org/mongo-driver/mongo"
	"go.uber.org/zap"
)

type Transaction struct {
	Hash                string      `bson:"hash,unique,not null"`
	BlockHash           string      `bson:"block_hash,not null"`
	Version             string      `bson:"version,not null"`
	ClientID            string      `bson:"client_id"`
	ToClientID          string      `bson:"to_client_id"`
	ChainID             string      `bson:"chain_id,not null"`
	TransactionData     string      `bson:"transaction_data"`
	Value               int64       `bson:"transaction_value"`
	Signature           string      `bson:"signature"`
	CreationDate        int64       `bson:"creation_date"`
	Fee                 int64       `bson:"transaction_fee"`
	TransactionType     int         `bson:"transaction_type"`
	TransactionOutput   string      `bson:"transaction_output"`
	OutputHash          string      `bson:"txn_output_hash"`
	Status              string      `bson:"transaction_status"`
	ConfirmationFetched bool        `bson:"confirmation_fetched"`
	MetaData            interface{} `bson:"metadata"`
	ParsedOutput        interface{} `bson:"parsed_output"`
	CreatedAt           time.Time   `bson:"created_at,not null"`
	UpdatedAt           time.Time   `bson:"updated_at,not null"`
}

func (Transaction) GetCollection() *mongo.Collection {
	return datastore.GetStore().GetDB().Collection("transactions")
}

func InsertTransactions(ctx context.Context, blockHash string, transactions []*transaction.Transaction) error {
	var ITransactions []interface{}
	transactionCollection := (&Transaction{}).GetCollection()
	for _, transaction := range transactions {
		dbTransaction := transferTransactionData(blockHash, transaction)
		if isJSONString(dbTransaction.TransactionData) {
			json.Unmarshal([]byte(dbTransaction.TransactionData), &dbTransaction.MetaData)
		}
		if isJSONString(dbTransaction.TransactionOutput) {
			json.Unmarshal([]byte(dbTransaction.TransactionOutput), &dbTransaction.ParsedOutput)
		}
		ITransactions = append(ITransactions, dbTransaction)
	}
	_, err := transactionCollection.InsertMany(ctx, ITransactions)
	if err != nil {
		Logger.Error("transaction_insert_many_failed", zap.Error(err), zap.Any("block_hash", blockHash))
		return err
	}
	Logger.Info("Transactions stored successfully", zap.Any("block_hash", blockHash))
	return nil
}

func isJSONString(data string) bool {
	var v interface{}
	err := json.Unmarshal([]byte(data), v)
	if err != nil {
		return true
	}
	return false
}

func transferTransactionData(blockHash string, transaction *transaction.Transaction) *Transaction {
	dbTransaction := new(Transaction)
	dbTransaction.Hash = transaction.Hash
	dbTransaction.BlockHash = blockHash
	dbTransaction.Version = transaction.Version
	dbTransaction.ClientID = transaction.ClientID
	dbTransaction.ToClientID = transaction.ToClientID
	dbTransaction.ChainID = transaction.ChainID
	dbTransaction.TransactionData = transaction.TransactionData
	dbTransaction.Value = transaction.Value
	dbTransaction.Signature = transaction.Signature
	dbTransaction.CreationDate = transaction.CreationDate
	dbTransaction.Fee = transaction.TransactionFee
	dbTransaction.TransactionType = transaction.TransactionType
	dbTransaction.TransactionOutput = transaction.TransactionOutput
	dbTransaction.OutputHash = transaction.OutputHash
	dbTransaction.ConfirmationFetched = false
	dbTransaction.CreatedAt = time.Now()
	dbTransaction.UpdatedAt = time.Now()
	return dbTransaction
}
