# THE DATABASE


## RUN MONGO WITH DOCKER

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongodb/mongodb-community-server:latest
```