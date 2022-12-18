package handler

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/magiclabs/magic-admin-go/token"
)

const authBearer = "Bearer"

func Handler(w http.ResponseWriter, r *http.Request) {
	if !strings.HasPrefix(r.Header.Get("authorization"), authBearer) {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Bearer token is required")

	}

	did := r.Header.Get("authorization")[len(authBearer)+1:]

	tk, err := token.NewToken(did)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Malformed DID token error: %s", err.Error())
	}

	if err := tk.Validate(); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Malformed DID token error: %s", err.Error())

	}

	fmt.Fprintf(w, string(tk.GetIssuer()))

}
