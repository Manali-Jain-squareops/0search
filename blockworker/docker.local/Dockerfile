FROM golang:1.11.4-alpine3.8 as blockworker_build

RUN apk add --update --no-cache build-base linux-headers git cmake bash perl grep

# Install Herumi's cryptography
RUN apk add gmp gmp-dev openssl-dev && \
    cd /tmp && \
    wget -O - https://github.com/herumi/mcl/archive/master.tar.gz | tar xz && \
    wget -O - https://github.com/herumi/bls/archive/master.tar.gz | tar xz && \
    mv mcl* mcl && \
    mv bls* bls && \
    make -C mcl -j $(nproc) lib/libmclbn256.so install && \
    cp mcl/lib/libmclbn256.so /usr/local/lib && \
    make -C bls -j $(nproc) install && \
    rm -R /tmp/mcl && \
    rm -R /tmp/bls

ENV SRC_DIR=/blockworker
ENV GO111MODULE=on

# Download the dependencies:
# Will be cached if we don't change mod/sum files
COPY ./code/go/blockworker/core/go.mod          ./code/go/blockworker/core/go.sum          $SRC_DIR/go/blockworker/core/
COPY ./code/go/blockworker/blockworkercore/go.mod     ./code/go/blockworker/blockworkercore/go.sum     $SRC_DIR/go/blockworker/blockworkercore/

WORKDIR $SRC_DIR/go/blockworker/blockworkercore/blockworker
RUN go mod download

# Add the source code:
ADD ./code/go/blockworker $SRC_DIR/go/blockworker

RUN go build -v -tags "bn256 development" -ldflags "-X 0chain.net/core/build.BuildTag=$GIT_COMMIT"

# Copy the build artifact into a minimal runtime image:
FROM golang:1.11.4-alpine3.8
ENV APP_DIR=/blockworker
WORKDIR $APP_DIR
RUN apk add gmp gmp-dev openssl-dev
COPY --from=blockworker_build  /usr/local/lib/libmcl*.so \
    /usr/local/lib/libbls*.so \
    /usr/local/lib/
COPY --from=blockworker_build $APP_DIR/go/blockworker/blockworkercore/blockworker/blockworker $APP_DIR/bin/blockworker

