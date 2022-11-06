FROM redis:7.0.5-bullseye

COPY ./redis.conf /
COPY ./users.acl /

CMD [ "redis-server", "/redis.conf"]