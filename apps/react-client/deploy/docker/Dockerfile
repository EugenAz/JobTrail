FROM caddy:2.6-alpine
WORKDIR /usr/share/caddy

COPY dist/apps/react-client ./site

COPY apps/react-client/deploy/docker/Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
