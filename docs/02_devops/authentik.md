---
parent: DevOps
title: Authentik
---

# Authentik

::: warning
Текст не отформатирован
:::

`Надпись на языке Мордора гласит: "Одно Кольцо, чтоб править всеми, Оно главнее всех, Оно 
соберёт всех вместе И заключит во Тьме"`

Создайте в `portainer` сеть:

Networks->Add network+

- Name: `intra_net`
- Driver: `Bridge`

Мы будем размещать остальные ресурсы в отдельных стэках, для общения назначаем общую 
внешнию сеть у каждого контейнера.

```yaml
networks:
      - intra_net
```

А в конце добавляем 

```yaml
networks:
  intra_net:
    external: true
```

::: details assets/docker/s1/docker-compose.yml
```yaml
version: "3.8"
services:
  postgresql:
    image: postgres:16.2-alpine
    container_name: postgres
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -d $${PG_DB} -U $${PG_USER}"]
      start_period: 20s
      interval: 30s
      retries: 5
      timeout: 5s
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=${PG_USER:-authentik}
      - POSTGRES_PASSWORD=${PG_PASS}
    env_file:
      - stack.env
    volumes:
      - postgres:/var/lib/postgresql/data
      - entry_db:/docker-entrypoint-initdb.d
    networks:
      - intra_net

  redis:
    image: redis:alpine
    command: --save 60 1 --loglevel warning
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "redis-cli ping | grep PONG"]
      start_period: 20s
      interval: 30s
      retries: 5
      timeout: 3s
    env_file:
      - stack.env
    volumes:
      - redis:/data
    networks:
      - intra_net

  auth_server:
    image: ${AUTHENTIK_IMAGE:-ghcr.io/goauthentik/server}:${AUTHENTIK_TAG:-2024.2.1}
    restart: unless-stopped
    command: server
    environment:
      AUTHENTIK_REDIS__HOST: redis
      AUTHENTIK_POSTGRESQL__HOST: postgresql
      AUTHENTIK_POSTGRESQL__USER: ${PG_USER:-authentik}
      AUTHENTIK_POSTGRESQL__NAME: ${PG_DB:-authentik}
      AUTHENTIK_POSTGRESQL__PASSWORD: ${PG_PASS}
    env_file:
      - stack.env
    volumes:
      - ./media:/media
      - ./custom-templates:/templates
    ports:
      - "${COMPOSE_PORT_HTTP:-9000}:9000"
      - "${COMPOSE_PORT_HTTPS:-9443}:9443"
    depends_on:
      - postgresql
      - redis
    networks:
      - intra_net

  worker:
    image: ${AUTHENTIK_IMAGE:-ghcr.io/goauthentik/server}:${AUTHENTIK_TAG:-2024.2.1}
    restart: unless-stopped
    command: worker
    environment:
      AUTHENTIK_REDIS__HOST: redis
      AUTHENTIK_POSTGRESQL__HOST: ${PG_HOST:-postgresql}
      AUTHENTIK_POSTGRESQL__USER: ${PG_USER:-authentik}
      AUTHENTIK_POSTGRESQL__NAME: ${PG_DB:-authentik}
      AUTHENTIK_POSTGRESQL__PASSWORD: ${PG_PASS}
    env_file:
      - stack.env
    # `user: root` and the docker socket volume are optional.
    # See more for the docker socket integration here:
    # https://goauthentik.io/docs/outposts/integrations/docker
    # Removing `user: root` also prevents the worker from fixing the permissions
    # on the mounted folders, so when removing this make sure the folders have the correct UID/GID
    # (1000:1000 by default)
    user: root
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./media:/media
      - ./certs:/certs
      - ./custom-templates:/templates
    depends_on:
      - postgresql
      - redis
    networks:
      - intra_net

volumes:
  entry_db:
    driver: local
  postgres:
    driver: local
  database:
    driver: local
  redis:
    driver: local

networks:
  intra_net:
    external: true
```
:::

В данном файле все контейнеры находятся в одной сети, поэтому используем `depends_on:`

Когда будем делать другой стэк, будем уже использовать 

```yaml
    external_links:
      - postgresql:postgresql
```