curl -X POST http://localhost:3000/user/create \
           -H "Content-Type: application/json" \
           -d '{
         "username": "test1",
         "email": "test1@example.com",
         "password": "haslo",
         "avatar": "http://example.com/avatar.jpg"
       }'


curl -X POST http://localhost:3000/rooms/create \
              -H "Content-Type: application/json" \
              -d '{
                "roomId": "tsuzu",
                "maxPlayers": 12,
                "maxRounds": "40",
                "password": "pulabubu"
              }'
saaaaaaaa

 curl -X POST http://localhost:3000/rooms/tsuzu/join \
           -H "Content-Type: application/json" \
           -d '{
         "player": "test1",
         "password": "pulabubu"
       }'

dlod
       