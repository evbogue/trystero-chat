import { joinRoom } from './trystero-torrent.min.js'
import { h } from './h.js'

const input = h('input')

const screen = h('div', [
  input,
  h('button', {onclick: () => {
    if (input.value) {
      sendmsg({msg: input.value})
      screen.appendChild(h('div', ['Sent: ' + input.value]))
      input.value = ''
    }
  }}, ['Send'])
])

document.body.appendChild(screen)

const config = {appId: 'testing4321'}

const room = joinRoom(config, 'testroom')

const [ sendmsg, onmsg ] = room.makeAction('message')

room.onPeerJoin(peerId => screen.appendChild(h('div', [peerId + ' joined.'])))

room.onPeerLeave(peerId => screen.appendChild(h('div', [peerId + ' left.'])))

onmsg((data, peerId) => {
  screen.appendChild(h('div', [peerId + ': ' + data.msg])) 
}) 

