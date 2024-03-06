---
parent: DevOps
title: Tunnel
order: 2
---

# Tunnel

От нас требуется только создать токен.

```yaml
  tunnel:
    container_name: s1-cloudflared-tunnel
    image: cloudflare/cloudflared
    restart: unless-stopped
    command: tunnel run
    environment:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
    networks:
      - authentik
```

Для создания токена переходим в аккаунт [Zero Trust](https://one.dash.cloudflare.com/)

Создаём туннель в Networks->Tunnels->Create tunnels и копируем токен

<img src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1709744012/shalodoc/as1chuvu2xrajpc3ty43.png" width="300" alt="copy token"/>

Токен вставляем в переменную окружения TUNNEL_TOKEN

Для привязки к поддомену мы создаём `CNAME` запись здесь. Кликаем по названию туннеля.

<img src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1709744407/shalodoc/hk46osydstomfoy8tdsq.png" width="300"/>

Переходим во вкладку Public hostname->Add a public hostname

Пишем название субдомена, а в поле service выбираем протокол http/https, название контейнера и
внутренний порт (под внешним вы заходите из `localhost`). У меня получилось для `authentik`
`http://authentik:9000`

Для удобства я связываю контейнер `authentik` c контейнером `s1-cloudflared-tunnel` одной
внешней сетью в режиме `bridge`.

::: warning
В случае возникновение проблем рекомендую просмотреть логи контейнера

`cloudflared-tunnel`
:::

::: danger
Использовать сертификат только на одном конце нарушает политику безопасности, используйте на
точке входе [Origin CA certificates](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/)
:::
