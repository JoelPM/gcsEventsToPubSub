#!/bin/sh

STAGE_BUCKET="$1"
WATCH_BUCKET="$2"

usage() {
  echo "Usage: $0 stagebucket watchbucket"
  exit 1
}

if [[ -z "$STAGE_BUCKET" || -z "$WATCH_BUCKET" ]]; then
  usage
fi

CMD="gcloud beta functions deploy gcsEventsToPubSub --stage-bucket $STAGE_BUCKET --trigger-bucket $WATCH_BUCKET"

echo "executing:\t$CMD"

$CMD
