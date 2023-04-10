package main

import (
	"bytes"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
	"time"
)

type T struct {
	Name string `json:"name"`
}

type Type struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type Invoice struct {
	Datetime  time.Time `csv:"datetime" json:"datetime"`
	Type      string    `csv:"type"`
	TypeId    string    `json:"typeId"`
	AccountId string    `json:"accountId"`
	Title     string    `csv:"title" json:"title"`
	Amount    float64   `csv:"amount" json:"amount"`
	Status    string    `json:"status"`
}

func main() {
	var types []Type
	var invoices []Invoice

	f, err := os.Open("db.csv")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	lines, err := csv.NewReader(f).ReadAll()
	if err != nil {
		return
	}

	for _, line := range lines {

		t, err := time.ParseInLocation("2006-01-02", line[0], time.Local)
		if err != nil {
			fmt.Println(err)
		}

		var am, _ = strconv.ParseFloat(line[3], 64)

		invoice := Invoice{
			Datetime:  t,
			Type:      line[1],
			Title:     line[2],
			Amount:    am,
			AccountId: "clgasp7k90000udu8ppezeewa",
			TypeId:    "123456",
			Status:    "FINISHED",
		}
		invoices = append(invoices, invoice)
	}

	var ts []string

	for _, invoice := range invoices {
		ts = append(ts, invoice.Type)
	}

	ts = removeDuplicate(ts)
	for _, t := range ts {

		url := "http://127.0.0.1:8000/type"

		var newT = T{
			Name: t,
		}

		marshal, _ := json.Marshal(newT)

		req, _ := http.NewRequest("POST", url, bytes.NewBuffer(marshal))
		req.Header.Set("Content-Type", "application/json")
		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			panic(err)
		}
		defer resp.Body.Close()
		body, _ := io.ReadAll(resp.Body)

		var newType Type

		json.Unmarshal(body, &newType)

		types = append(types, newType)
	}

	for i, invoice := range invoices {
		for _, t := range types {
			if invoice.Type == t.Name {
				invoice.TypeId = t.Id
				invoices[i] = invoice
			}
		}
	}

	for _, invoice := range invoices {
		m, err := json.Marshal(invoice)
		if err != nil {
			return
		}

		url := "http://127.0.0.1:8000/invoice"

		req, _ := http.NewRequest("POST", url, bytes.NewBuffer(m))
		req.Header.Set("Content-Type", "application/json")
		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			panic(err)
		}
		defer resp.Body.Close()
		body, _ := io.ReadAll(resp.Body)
		fmt.Println(string(body))
	}

}

func removeDuplicate[T string | int](sliceList []T) []T {
	allKeys := make(map[T]bool)
	var list []T
	for _, item := range sliceList {
		if _, value := allKeys[item]; !value {
			allKeys[item] = true
			list = append(list, item)
		}
	}
	return list
}
