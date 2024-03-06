---
parent: DevOps
title: Authentik
order: 1
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
```yaml
url: /assets/docker/s1/docker-compose.yml
```

::: details assets/docker/s1/docker-compose.yml
<<< @/docs/public/assets/docker/s1/docker-compose.yml
:::

В данном файле все контейнеры находятся в одной сети, поэтому используем `depends_on:`

Когда будем делать другой стэк, будем уже использовать

```yaml
    external_links:
      - postgresql:postgresql
```
