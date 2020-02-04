import {getRandomId} from '../../../services/Utils.js'

export default class Note {
    constructor(type, details,draft=false) {
        this.id= draft? 'draft':getRandomId()
        this.title=''
        this.type = type
        this.isPinned = false
        this.details = details
        this.style={
            backgroundColor:'',
            color:'black'
        }
    }
}