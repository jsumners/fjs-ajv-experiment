import path from 'path'
import umeta from 'umeta'
import execa from 'execa'
import got from 'got'

const { dirName } = umeta(import.meta)
let statsResponse

console.log('Exercising server-a...')
const serverA = execa.node(path.join(dirName, 'server-a', 'index.js'), {
  cwd: path.join(dirName, 'server-a')
})
for (let i = 1; i <= 2000; i += 1) {
  await got.get(`http://127.0.0.1:8000/${i}`)
}
statsResponse = await got.get('http://127.0.0.1:8000/stats', {
  responseType: 'json'
})
const serverAStats = statsResponse.body
serverA.kill()

console.log('Exercising server-b...')
const serverB = execa.node(path.join(dirName, 'server-b', 'index.js'), {
  cwd: path.join(dirName, 'server-b')
})
for (let i = 1; i <= 2000; i += 1) {
  await got.get(`http://127.0.0.1:8001/${i}`)
}
statsResponse = await got.get('http://127.0.0.1:8001/stats', {
  responseType: 'json'
})
const serverBStats = statsResponse.body
serverB.kill()

console.log('server-a stats:', serverAStats)
console.log('server-b stats:', serverBStats)
console.log()
console.log('heap delta:', serverBStats.heapTotal - serverAStats.heapTotal)
