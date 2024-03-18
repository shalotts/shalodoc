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

В данном файле все контейнеры находятся в одной сети, поэтому используем `depends_on:`

Когда будем делать другой стэк, будем уже использовать

```yaml
    external_links:
      - postgresql:postgresql
```

Создайте новые стэк в окружение portainer agent под названием `intra`. Перейдите в редактор и
поместите код докер компоуз, и содержимое env файла (при редактировании переменных окружения
выберите advanced)

::: details assets/docker/s1/docker-compose.yml
<<< @/docs/public/assets/docker/s1/docker-compose.yml
:::

- `TUNNEL_TOKEN` можно почитать в [cloudflared](/docs/02_devops/tunnel)
- `AUTHENTIK_SECRET_KEY` можно создать утилитой `pwgen` или `openssl`. Описано в [ориг. доке](https://docs.goauthentik.io/docs/installation/docker-compose#preparation)
- прикрепление почты и связка gmail почты с доменом cloudflare, описано пошагово в [комментариях](https://community.cloudflare.com/t/solved-how-to-use-gmail-smtp-to-send-from-an-email-address-which-uses-cloudflare-email-routing/382769)
::: details /assets/docker/s1/env.txt
<<< @/docs/public/assets/docker/s1/env.txt
:::

## Восстановление пароля

<iframe loading="lazy" width="420" height="240" src="https://www.youtube.com/embed/NKJkYz0BIlA"
title="Authentik
- Password Recovery Flow Setup" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
