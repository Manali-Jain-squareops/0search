install-docker:
	@echo "Installing Docker"

	@sudo apt-get update

	@sudo apt-get install \
		apt-transport-https \
		ca-certificates \
		curl \
		software-properties-common -y

	@curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

	@sudo add-apt-repository \
		"deb [arch=amd64] https://download.docker.com/linux/ubuntu \
		$$(lsb_release -cs) \
		stable"

	@sudo apt-get update

	@sudo apt-get --yes --no-install-recommends install docker-ce

	@sudo usermod --append --groups docker "$$USER"

	@sudo systemctl enable docker

	@echo "Waiting for Docker to start..."

	@sleep 3

	@sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

	@sudo chmod +x /usr/local/bin/docker-compose
	@sleep 5
	@echo "Docker Installed successfully"

install-docker-if-not-already-installed:
	@if [ -z "$$(which docker)" ]; then\
		make install-docker;\
	fi

set-up: install-docker-if-not-already-installed

lint:
	npx eslint src/ --ext=ts,js --fix

check-install-deps:
	node bin/check-install-dependencies.js

killstart:
	node --inspect babel-loader.js ./src/server

start-ledger-sync:
	node --inspect babel-loader.js ./src/sync

dev-server: check-install-deps
	npx concurrently --names "SERVER,LINT" -c "bgBlue.bold,bgMagenta.bold" "NODE_ENV=development npx nodemon --exec 'make killstart'"

dev-ledger-sync: check-install-deps
	npx concurrently --names "SERVER,LINT" -c "bgBlue.bold,bgMagenta.bold" "NODE_ENV=development npx nodemon --exec 'make start-ledger-sync'"

dev-lint:
	npx nodemon --exec 'make lint'
