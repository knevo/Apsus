import storageService from '../../../services/storageService.js'
import { getRandomId } from '../../../services/Utils.js'
import Note from './noteModel.js'
let gNotes

export {
    addNote,
    deleteNote,
    getNotesToRender,
    getNoteById,
    updateNoteById,
    togglePin,
    addTodo,
}

function addNote(type, details, isDraft = false) {
    loadNotes()
    gNotes = JSON.parse(JSON.stringify(gNotes))
    const newNote = isDraft ? new Note(type, details, true) : new Note(type, details)
    gNotes.push(newNote)
    saveNotes()
    return Promise.resolve(newNote)

}
function deleteNote(noteId) {
    let noteIdx = getNoteIdxById(noteId)
    gNotes = JSON.parse(JSON.stringify(gNotes))
    gNotes.splice(noteIdx, 1)
    saveNotes()
    return Promise.resolve(true)
}

function loadNotes() {
    gNotes = storageService.loadFromStorage('notes', null)
    if (!gNotes || !gNotes.length) createTestNotes()
}

function saveNotes() {
    storageService.saveToStorage('notes', gNotes)
}

function getNoteIdxById(noteId) {
    return gNotes.findIndex(note => note.id === noteId)
}

function getNoteById(noteId) {
    let foundNote = gNotes.find(note => note.id === noteId)
    return Promise.resolve(...[foundNote])
}

function getNotesToRender(searchString) {

    let filteredNotes;
    loadNotes()

    if (searchString) {
        filteredNotes = searchNotes(searchString)
        filteredNotes = sortPinned(filteredNotes)
    } else gNotes = sortPinned(gNotes)

    return Promise.resolve([...filteredNotes || gNotes])
}

function sortPinned(arrayToSort) {
    return arrayToSort.slice().sort((note1, note2) => {
        if (note1.isPinned && note2.isPinned) return 0
        return note1.isPinned ? -1 : 1

    })
}

function searchNotes(searchString) {
    return gNotes.filter(note => {
        if (note.title.toLowerCase().includes(searchString)) return true
        if (note.type === 'txt') if (note.details.txt.toLowerCase().includes(searchString)) return true
        if (note.type === 'todo') {
            return note.details.todos.find(todo => todo.txt.toLowerCase().includes(searchString) !== -1)
        }
        return false
    })
}

function updateNoteById(noteId, updates) {

    getNoteById(noteId).then(noteToUpdate => {
        for (let field in updates) {
            if (updates[field].todos) noteToUpdate[field].todos = updateTodos(noteToUpdate[field].todos, updates[field].todos)
            else if (updates.style) noteToUpdate[field] = { ...noteToUpdate[field], ...updates[field] }
            else noteToUpdate[field] = updates[field];
        }
        gNotes = gNotes.map(note => (note.id === noteToUpdate.id) ? noteToUpdate : note)
        saveNotes()
    })
    return Promise.resolve(true);
}

function updateTodos(todosToUpdate, updatedTodo) {
    let newTodos = todosToUpdate.map(todo => (todo.id === updatedTodo.id) ? updatedTodo : todo)
    return [...newTodos]
}

function togglePin(noteId) {
    gNotes = JSON.parse(JSON.stringify(gNotes))
    return getNoteById(noteId).then(noteToPin => {
        noteToPin.isPinned = !noteToPin.isPinned
        saveNotes();
        return true;
    })
}

function addTodo(noteId, todoTxt) {
    getNoteById(noteId).then(noteToUpdate => {
        noteToUpdate.details.todos.push({ id: getRandomId(), txt: todoTxt, isDone: false })
        saveNotes()
    })
    return Promise.resolve(true)
}

function createTestNotes() {
    gNotes = [
        {
            id: getRandomId(),
            type: "txt",
            isPinned: true,
            title: 'Welcome to keep notes',
            details: {
                txt: "Try adding some notes for yourself!"
            },
            style: {
                backgroundColor: "#ffff9f"
            }
        },
        {
            id: getRandomId(),
            type: "todo",
            isPinned: true,
            title: 'Features',
            details: {
                todos: [
                    { id: getRandomId(), txt: "Adding todo lists", isDone: true },
                    { id: getRandomId(), txt: "embed spotify and youtube links", isDone: false },
                    { id: getRandomId(), txt: "linking to different video and sound files", isDone: false },
                    { id: getRandomId(), txt: "add google maps by coords or name!", isDone: false }
                ]
            },
            style: {
                backgroundColor: "#ffff9f"
            }
        },
        {
            id: getRandomId(),
            type: "txt",
            isPinned: false,
            title: 'React is a friend',
            details: {
                txt: "NOTTT...."
            },
            style: {
                backgroundColor: "#ffff9f"
            }
        },
        {
            id: getRandomId(),
            type: "img",
            isPinned: false,
            title: "Me playing Mi",
            details: {
                url: "https://loremflickr.com/320/240",
            },
            style: {
                backgroundColor: "#ffff9f"
            }
        },
        {
            id: getRandomId(),
            type: "music",
            isPinned: false,
            title: "Random nigga song",
            details: {
                url: "https://www.mboxdrive.com/Blue%20lights.mp3",
            },
            style: {
                backgroundColor: "#ffff9f"
            }
        },
        {
            id: getRandomId(),
            type: "img",
            isPinned: false,
            title: "my cat is awesome",
            details: {
                url: "https://cdn.shopify.com/s/files/1/1369/6411/articles/g_.fh_1_c23e86d3-e918-497c-b209-b583225ede34_2048x.progressive.jpg?v=1563422994",
            },
            style: {
                backgroundColor: "#ffff9f"
            }
        },
        {
            id: getRandomId(),
            type: "video",
            isPinned: false,
            title: "Cute bear",
            details: {
                url: "https://www.w3schools.com/html/movie.mp4",
            },
            style: {
                backgroundColor: "#ffff9f"
            }
        },
        {
            id: getRandomId(),
            type: "todo",
            title: "Grocery list:",
            isPinned: false,
            details: {
                todos: [
                    { id: getRandomId(), txt: "buy milk", isDone: false },
                    { id: getRandomId(), txt: "buy bamba", isDone: false },
                    { id: getRandomId(), txt: "forget to buy milk", isDone: false }
                ]
            },
            style: {
                backgroundColor: "lightsalmon"
            }
        },
        {
            id: getRandomId(),
            type: "video",
            title: "Awesome",
            isPinned: false,
            details: {
                url: 'https://www.youtube.com/watch?v=mXjNATmIruI'
            },
            style: {
                backgroundColor: "lightsalmon"
            }
        },
        {
            id: getRandomId(),
            type: "maps",
            title: "Home is far far away",
            isPinned: false,
            details: {
                place: '33.2397939,35.6496942'
            },
            style: {
                backgroundColor: "lightsalmon"
            }
        }
    ];
}