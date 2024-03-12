---
parent: DevOps
title: Authentik
order: 2
---

# Authentik

::: warning
Текст не отформатирован
:::

## Единая точка входа

В компанию могут поступать новые сотрудники, в случае их найма/увальнения придётся
добавлять/лишать доступа. Также бывают визитеры, люди которым нужен временный доступ к ресурсам
компании. Речь идёт не только про доступ к wifi (freeradius мы не будем рассматривать), а
возможность получить по одному логину/паролю ко всем сервисам компании.


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
<<< @/docs/public/assets/docker/s1/docker-compose.yml
:::

::: details /assets/docker/s1/env.txt
<<< @/docs/public/assets/docker/s1/env.txt
:::

В данном файле все контейнеры находятся в одной сети, поэтому используем `depends_on:`

Когда будем делать другой стэк, будем уже использовать

```yaml
    external_links:
      - postgresql:postgresql
```
