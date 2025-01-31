BINARY_NAME=.markbyte

CMD_DIR=cmd

build:
	go build -o $(BINARY_NAME) $(CMD_DIR)/*.go

run: build
	./$(BINARY_NAME)

clean:
	rm -f $(BINARY_NAME)
	rm -f $(CMD_DIR)/static/*.html
