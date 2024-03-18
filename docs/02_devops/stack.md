---
parent: DevOps
title: Stack
order: 0
---

# Stack

## DevOps

### Минимальные требования для серверного оборудования:

- OS: Linux
- CPU: ~
- MEMORY: ~
- Домен второго уровня. В статье описан метод туннелирования cloudflare, [список поддерживаемых
  провайдеров](https://developers.cloudflare.com/dns/troubleshooting/faq/#why-do-i-have-to-remove-my-ds-record-when-signing-up-for-cloudflare).

### Стэк

- `authentik` - SSO авторизация. Единая точка входа для авторизации в приложения. Один
  логин/пароль на все
- - Очень полезно когда нужно заходить в приложение под разными ролями.
- - Keycloak больше для крупных компаний
- `portainer` - Web UI для docker
- - Кубы сложнее, дороже. В доке также отсутствует ansible
- `clouflared` - Быстрый проброс из локального окружения в интернет без проброса портов и белого
  адреса
- - Не все интернет провайдеры одобрят данное решение, в таком случае смотрим [альтернативу](https://github.com/anderspitman/awesome-tunneling)
- - В качестве альтернативы очень близкое решение `packetriot`, но если говорить про полностью
    `self-hosted` решение, то лучше выбирать `SirTunnel`
- `wiki.js` - Сервис для документации
- `cinny`/`rocketchat` - Чат клиент для `matrix` в стиле `discord`.
- `jitsi` - Аудио/видео чат.
